/*
 * SPDX-License-Identifier: Apache-2.0
 *
 * The OpenSearch Contributors require contributions made to
 * this file be licensed under the Apache-2.0 license or a
 * compatible open source license.
 *
 * Modifications Copyright OpenSearch Contributors. See
 * GitHub history for details.
 */

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  useEffect,
  useState,
  forwardRef,
  CSSProperties,
  Fragment,
  ComponentType,
  ComponentPropsWithRef,
  PropsWithChildren,
  MutableRefObject,
} from 'react';
import classnames from 'classnames';

import {
  keys,
  OuiWindowEvent,
  useCombinedRefs,
  OuiBreakpointSize,
  isWithinMinBreakpoint,
  throttle,
} from '../../services';

import { CommonProps, keysOf } from '../common';
import { OuiFocusTrap } from '../focus_trap';
import { OuiOverlayMask, OuiOverlayMaskProps } from '../overlay_mask';
import { OuiButtonIcon, OuiButtonIconPropsForButton } from '../button';
import { OuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { OuiOutsideClickDetector } from '../outside_click_detector';
import { OuiPortal } from '../portal';

const typeToClassNameMap = {
  push: 'ouiFlyout--push',
  overlay: null,
};

export const TYPES = keysOf(typeToClassNameMap);
type _OuiFlyoutType = typeof TYPES[number];

const sideToClassNameMap = {
  left: 'ouiFlyout--left',
  right: null,
};

export const SIDES = keysOf(sideToClassNameMap);
type _OuiFlyoutSide = typeof SIDES[number];

const sizeToClassNameMap = {
  s: 'ouiFlyout--small',
  m: 'ouiFlyout--medium',
  l: 'ouiFlyout--large',
};

export const SIZES = keysOf(sizeToClassNameMap);
export type OuiFlyoutSize = typeof SIZES[number];

/**
 * Custom type checker for named flyout sizes since the prop
 * `size` can also be CSSProperties['width'] (string | number)
 */
function isOuiFlyoutSizeNamed(value: any): value is OuiFlyoutSize {
  return SIZES.includes(value as any);
}

const paddingSizeToClassNameMap = {
  none: 'ouiFlyout--paddingNone',
  s: 'ouiFlyout--paddingSmall',
  m: 'ouiFlyout--paddingMedium',
  l: 'ouiFlyout--paddingLarge',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
type _OuiFlyoutPaddingSize = typeof PADDING_SIZES[number];

type _OuiFlyoutProps = {
  onClose: () => void;
  /**
   * Defines the width of the panel.
   * Pass a predefined size of `s | m | l`, or pass any number/string compatible with the CSS `width` attribute
   */
  size?: OuiFlyoutSize | CSSProperties['width'];
  /**
   * Sets the max-width of the panel,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
  /**
   * Customize the padding around the content of the flyout header, body and footer
   */
  paddingSize?: _OuiFlyoutPaddingSize;
  /**
   * Adds an OuiOverlayMask and wraps in an OuiPortal
   */
  ownFocus?: boolean;
  /**
   * Hides the default close button. You must provide another close button somewhere within the flyout.
   */
  hideCloseButton?: boolean;
  /**
   * Specify an aria-label for the close button of the flyout.
   * Default is `'Close this dialog'`.
   */
  closeButtonAriaLabel?: string;
  /**
   * Extends OuiButtonIconProps onto the close button
   */
  closeButtonProps?: Partial<OuiButtonIconPropsForButton>;
  /**
   * Position of close button.
   * `inside`: Floating to just inside the flyout, always top right;
   * `outside`: Floating just outside the flyout near the top (side dependent on `side`). Helpful when the close button may cover other interactable content.
   */
  closeButtonPosition?: 'inside' | 'outside';
  /**
   * Adjustments to the OuiOverlayMask that is added when `ownFocus = true`
   */
  maskProps?: OuiOverlayMaskProps;
  /**
   * How to display the the flyout in relation to the body content;
   * `push` keeps it visible, pushing the `<body>` content via padding
   */
  type?: _OuiFlyoutType;
  /**
   * Forces this interaction on the mask overlay or body content.
   * Defaults depend on `ownFocus` and `type` values
   */
  outsideClickCloses?: boolean;
  /**
   * Which side of the window to attach to.
   * The `left` option should only be used for navigation.
   */
  side?: _OuiFlyoutSide;
  /**
   * Defaults to `dialog` which is best for most cases of the flyout.
   * Otherwise pass in your own, aria-role, or `null` to remove it and use the semantic `as` element instead
   */
  role?: null | string;
  /**
   * Named breakpoint or pixel value for customizing the minimum window width to enable the `push` type
   */
  pushMinBreakpoint?: OuiBreakpointSize | number;
  style?: React.CSSProperties;
};

// Using ReactHTML rather than JSX.IntrinsicElements here because it does not include
// SVG element types which cause errors because they do not have all the attributes needed.
type ComponentTypes =
  | 'div'
  | 'span'
  | 'nav'
  | 'aside'
  | 'section'
  | 'article'
  | 'header'
  | ComponentType;

export type OuiFlyoutProps<T extends ComponentTypes = 'div'> = CommonProps &
  ComponentPropsWithRef<T> & {
    /**
     * Sets the HTML element for `OuiFlyout`
     */
    as?: T;
  } & _OuiFlyoutProps;

const OuiFlyout = forwardRef(
  <T extends ComponentTypes>(
    {
      className,
      children,
      as: Element = 'div' as T,
      hideCloseButton = false,
      closeButtonProps,
      closeButtonAriaLabel,
      closeButtonPosition = 'inside',
      onClose,
      ownFocus = true,
      side = 'right',
      size = 'm',
      paddingSize = 'l',
      maxWidth = false,
      style,
      maskProps,
      type = 'overlay',
      outsideClickCloses = false,
      role = 'dialog',
      pushMinBreakpoint = 'l',
      ...rest
    }: PropsWithChildren<OuiFlyoutProps<T>>,
    ref:
      | ((instance: ComponentPropsWithRef<T> | null) => void)
      | MutableRefObject<ComponentPropsWithRef<T> | null>
      | null
  ) => {
    /**
     * Setting the initial state of pushed based on the `type` prop
     * and if the current window size is large enough (larger than `pushMinBreakpoint`)
     */
    const [windowIsLargeEnoughToPush, setWindowIsLargeEnoughToPush] = useState(
      isWithinMinBreakpoint(
        typeof window === 'undefined' ? 0 : window.innerWidth,
        pushMinBreakpoint
      )
    );

    const isPushed = type === 'push' && windowIsLargeEnoughToPush;

    /**
     * Watcher added to the window to maintain `isPushed` state depending on
     * the window size compared to the `pushBreakpoint`
     */
    const functionToCallOnWindowResize = throttle(() => {
      if (isWithinMinBreakpoint(window.innerWidth, pushMinBreakpoint)) {
        setWindowIsLargeEnoughToPush(true);
      } else {
        setWindowIsLargeEnoughToPush(false);
      }
      // reacts every 50ms to resize changes and always gets the final update
    }, 50);

    /**
     * Setting up the refs on the actual flyout element in order to
     * accommodate for the `isPushed` state by adding padding to the body equal to the width of the element
     */
    const [resizeRef, setResizeRef] = useState<ComponentPropsWithRef<T> | null>(
      null
    );
    const setRef = useCombinedRefs([setResizeRef, ref]);
    // TODO: Allow this hooke to be conditional
    const dimensions = useResizeObserver(resizeRef as Element);

    useEffect(() => {
      // This class doesn't actually do anything by OUI, but is nice to add for consumers (JIC)
      document.body.classList.add('ouiBody--hasFlyout');

      /**
       * Accomodate for the `isPushed` state by adding padding to the body equal to the width of the element
       */
      if (type === 'push') {
        // Only add the event listener if we'll need to accommodate with padding
        window.addEventListener('resize', functionToCallOnWindowResize);

        if (isPushed) {
          if (side === 'right') {
            document.body.style.paddingRight = `${dimensions.width}px`;
          } else if (side === 'left') {
            document.body.style.paddingLeft = `${dimensions.width}px`;
          }
        }
      }

      return () => {
        document.body.classList.remove('ouiBody--hasFlyout');

        if (type === 'push') {
          window.removeEventListener('resize', functionToCallOnWindowResize);

          if (side === 'right') {
            document.body.style.paddingRight = '';
          } else if (side === 'left') {
            document.body.style.paddingLeft = '';
          }
        }
      };
    }, [type, side, dimensions, isPushed, functionToCallOnWindowResize]);

    /**
     * ESC key closes flyout (always?)
     */
    const onKeyDown = (event: KeyboardEvent) => {
      if (!isPushed && event.key === keys.ESCAPE) {
        event.preventDefault();
        onClose();
      }
    };

    let newStyle;
    let widthClassName;
    let sizeClassName;

    // Setting max-width
    if (maxWidth === true) {
      widthClassName = 'ouiFlyout--maxWidth-default';
    } else if (maxWidth !== false) {
      const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
      newStyle = { ...style, maxWidth: value };
    }

    // Setting size
    if (isOuiFlyoutSizeNamed(size)) {
      sizeClassName = sizeToClassNameMap[size];
    } else if (newStyle) {
      newStyle.width = size;
    } else {
      newStyle = { ...style, width: size };
    }

    const classes = classnames(
      'ouiFlyout',
      typeToClassNameMap[type as _OuiFlyoutType],
      sideToClassNameMap[side as _OuiFlyoutSide],
      sizeClassName,
      paddingSizeToClassNameMap[paddingSize as _OuiFlyoutPaddingSize],
      widthClassName,
      className
    );

    let closeButton;
    if (onClose && !hideCloseButton) {
      const closeButtonClasses = classnames(
        'ouiFlyout__closeButton',
        `ouiFlyout__closeButton--${closeButtonPosition}`,
        closeButtonProps?.className
      );

      closeButton = (
        <OuiI18n token="ouiFlyout.closeAriaLabel" default="Close this dialog">
          {(closeAriaLabel: string) => (
            <OuiButtonIcon
              display={closeButtonPosition === 'outside' ? 'fill' : 'empty'}
              iconType="cross"
              color="text"
              aria-label={closeButtonAriaLabel || closeAriaLabel}
              data-test-subj="ouiFlyoutCloseButton"
              {...closeButtonProps}
              className={closeButtonClasses}
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                onClose();
                closeButtonProps?.onClick && closeButtonProps.onClick(e);
              }}
            />
          )}
        </OuiI18n>
      );
    }

    const flyoutContent = (
      // @ts-expect-error JSX element without construct
      <Element
        {...(rest as ComponentPropsWithRef<T>)}
        role={role}
        className={classes}
        tabIndex={-1}
        style={newStyle || style}
        ref={setRef}>
        {closeButton}
        {children}
      </Element>
    );

    /*
     * Trap focus even when `ownFocus={false}`, otherwise closing
     * the flyout won't return focus to the originating button.
     *
     * Set `clickOutsideDisables={true}` when `ownFocus={false}`
     * to allow non-keyboard users the ability to interact with
     * elements outside the flyout.
     */
    let flyout = (
      <OuiFocusTrap disabled={isPushed} clickOutsideDisables={!ownFocus}>
        {/* Outside click detector is needed if theres no overlay mask to auto-close when clicking on elements outside */}
        <OuiOutsideClickDetector
          isDisabled={isPushed || !outsideClickCloses}
          onOutsideClick={() => onClose()}>
          {flyoutContent}
        </OuiOutsideClickDetector>
      </OuiFocusTrap>
    );

    // If ownFocus is set, wrap with an overlay and allow the user to click it to close it.
    if (ownFocus && !isPushed) {
      flyout = (
        <OuiOverlayMask
          onClick={onClose}
          headerZindexLocation="below"
          {...maskProps}>
          {flyout}
        </OuiOverlayMask>
      );
    } else if (!isPushed) {
      // Otherwise still wrap within an OuiPortal so it appends (unless it is the push style)
      flyout = <OuiPortal>{flyout}</OuiPortal>;
    }

    return (
      <Fragment>
        <OuiWindowEvent event="keydown" handler={onKeyDown} />
        {flyout}
      </Fragment>
    );
  }
);

OuiFlyout.displayName = 'OuiFlyout';

export { OuiFlyout };
