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

import classNames from 'classnames';
import React, {
  CSSProperties,
  forwardRef,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';
import { useCombinedRefs } from '../../services';
import { OuiScreenReaderOnly } from '../accessibility';
import { CommonProps, ExclusiveUnion } from '../common';
import { OuiI18n } from '../i18n';
import { useResizeObserver } from '../observer/resize_observer';
import { OuiPortal, OuiPortalInsert } from '../portal';

type BottomBarPaddingSize = 'none' | 's' | 'm' | 'l';

// Exported for testing
export const paddingSizeToClassNameMap: {
  [value in BottomBarPaddingSize]: string | null;
} = {
  none: null,
  s: 'ouiBottomBar--paddingSmall',
  m: 'ouiBottomBar--paddingMedium',
  l: 'ouiBottomBar--paddingLarge',
};

export const POSITIONS = ['static', 'fixed', 'sticky'] as const;
export type _BottomBarPosition = typeof POSITIONS[number];

type _BottomBarExclusivePositions = ExclusiveUnion<
  { position?: 'static' | 'sticky' },
  {
    position?: 'fixed';
    /**
     * Whether to wrap in OuiPortal. Can be configured using "insert" prop.
     * Only works if `position` is `fixed`.
     */
    usePortal?: boolean;
    /**
     * Configuration for placing children in the DOM. By default, attaches children to the body element.
     * Only works if `position` is `fixed` and `usePortal` is true.
     */
    insert?: OuiPortalInsert;
    /**
     * Whether the component should apply padding on the document body element to afford for its own displacement height.
     * Only works if `position` is `fixed` and `usePortal` is true.
     */
    affordForDisplacement?: boolean;
  }
>;

export type OuiBottomBarProps = CommonProps &
  HTMLAttributes<HTMLElement> &
  _BottomBarExclusivePositions & {
    /**
     * Padding applied to the bar. Default is 'm'.
     */
    paddingSize?: BottomBarPaddingSize;
    /**
     * Optional class applied to the body element on mount.
     */
    bodyClassName?: string;
    /**
     * Customize the screen reader heading that helps users find this control. Default is 'Page level controls'.
     */
    landmarkHeading?: string;
    /**
     * Starting vertical position when `fixed` position.
     * Offset from the top of the window when `sticky` position.
     * Has no affect on `static` positions.
     */
    top?: CSSProperties['top'];
    /**
     * Ending horizontal position when `fixed` position.
     * Has no affect on `static` or `sticky` positions.
     */
    right?: CSSProperties['right'];
    /**
     * Starting vertical position when `fixed` position.
     * Offset from the bottom of the window when `sticky` position.
     * Has no affect on `static` positions.
     */
    bottom?: CSSProperties['bottom'];
    /**
     * Starting horizontal position when `fixed` position.
     * Has no affect on `static` or `sticky` positions.
     */
    left?: CSSProperties['left'];
  };

export const OuiBottomBar = forwardRef<
  HTMLElement, // type of element or component the ref will be passed to
  OuiBottomBarProps // what properties apart from `ref` the component accepts
>(
  (
    {
      position = 'fixed',
      paddingSize = 'm',
      affordForDisplacement = true,
      children,
      className,
      bodyClassName,
      landmarkHeading,
      usePortal = true,
      insert,
      left,
      right,
      bottom,
      top,
      style,
      ...rest
    },
    ref
  ) => {
    // Force some props if `fixed` position, but not if the user has supplied these
    affordForDisplacement =
      position !== 'fixed' ? false : affordForDisplacement;
    usePortal = position !== 'fixed' ? false : usePortal;

    const [resizeRef, setResizeRef] = useState<HTMLElement | null>(null);
    const setRef = useCombinedRefs([setResizeRef, ref]);
    // TODO: Allow this hooke to be conditional
    const dimensions = useResizeObserver(resizeRef);

    useEffect(() => {
      if (affordForDisplacement && usePortal) {
        document.body.style.paddingBottom = `${dimensions.height}px`;
      }

      if (bodyClassName) {
        document.body.classList.add(bodyClassName);
      }

      return () => {
        if (affordForDisplacement && usePortal) {
          document.body.style.paddingBottom = '';
        }

        if (bodyClassName) {
          document.body.classList.remove(bodyClassName);
        }
      };
    }, [affordForDisplacement, usePortal, dimensions, bodyClassName]);

    const classes = classNames(
      'ouiBottomBar',
      `ouiBottomBar--${position}`,
      paddingSizeToClassNameMap[paddingSize],
      className
    );

    const newStyle = {
      left,
      right,
      bottom,
      top,
      ...style,
    };

    const bar = (
      <>
        <OuiI18n
          token="ouiBottomBar.screenReaderHeading"
          default="Page level controls">
          {(screenReaderHeading: string) => (
            // Though it would be better to use aria-labelledby than aria-label and not repeat the same string twice
            // A bug in voiceover won't list some landmarks in the rotor without an aria-label
            <section
              aria-label={
                landmarkHeading ? landmarkHeading : screenReaderHeading
              }
              className={classes}
              ref={setRef}
              style={newStyle}
              {...rest}>
              <OuiScreenReaderOnly>
                <h2>
                  {landmarkHeading ? landmarkHeading : screenReaderHeading}
                </h2>
              </OuiScreenReaderOnly>
              {children}
            </section>
          )}
        </OuiI18n>
        <OuiScreenReaderOnly>
          <p aria-live="assertive">
            {landmarkHeading ? (
              <OuiI18n
                token="ouiBottomBar.customScreenReaderAnnouncement"
                default="There is a new region landmark called {landmarkHeading} with page level controls at the end of the document."
                values={{ landmarkHeading }}
              />
            ) : (
              <OuiI18n
                token="ouiBottomBar.screenReaderAnnouncement"
                default="There is a new region landmark with page level controls at the end of the document."
              />
            )}
          </p>
        </OuiScreenReaderOnly>
      </>
    );

    return usePortal ? <OuiPortal insert={insert}>{bar}</OuiPortal> : bar;
  }
);

OuiBottomBar.displayName = 'OuiBottomBar';
