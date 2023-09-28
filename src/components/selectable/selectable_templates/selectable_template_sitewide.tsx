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
  FunctionComponent,
  ReactNode,
  useState,
  CSSProperties,
  ReactElement,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { useCombinedRefs, throttle } from '../../../services';
import { OuiSelectable, OuiSelectableProps } from '../selectable';
import { OuiPopoverTitle, OuiPopoverFooter } from '../../popover';
import { OuiPopover, Props as PopoverProps } from '../../popover/popover';
import { useOuiI18n, OuiI18n } from '../../i18n';
import { OuiSelectableMessage } from '../selectable_message';
import { OuiLoadingSpinner } from '../../loading';
import {
  OuiSelectableTemplateSitewideOption,
  ouiSelectableTemplateSitewideFormatOptions,
  ouiSelectableTemplateSitewideRenderOptions,
} from './selectable_template_sitewide_option';
import {
  OuiBreakpointSize,
  isWithinBreakpoints,
} from '../../../services/breakpoint';
import { OuiSpacer } from '../../spacer';

export type OuiSelectableTemplateSitewideProps = Partial<
  Omit<OuiSelectableProps<{ [key: string]: any }>, 'options'>
> & {
  /**
   * Extends the typical OuiSelectable #Options with the addition of pre-composed elements
   * such as `icon`, `avatar`and `meta`
   */
  options: OuiSelectableTemplateSitewideOption[];
  /**
   * Override some of the OuiPopover props housing the list.
   * The default width is `600`
   */
  popoverProps?: Partial<PopoverProps> & { width?: CSSProperties['width'] };
  /**
   * Optionally provide a title for the popover
   */
  popoverTitle?: ReactNode;
  /**
   * Optionally provide a footer for the popover
   */
  popoverFooter?: ReactNode;
  /**
   * Optionally provide a separate button for toggling the display of the popover.
   */
  popoverButton?: ReactElement;
  /**
   * Pass an array of named breakpoints for which to show the `popoverButton`.
   * If `undefined`, the `popoverButton` will always show (if provided)
   */
  popoverButtonBreakpoints?: OuiBreakpointSize[];
};

export const OuiSelectableTemplateSitewide: FunctionComponent<OuiSelectableTemplateSitewideProps> = ({
  children,
  className,
  options,
  popoverProps,
  popoverTitle,
  popoverFooter,
  searchProps,
  listProps,
  isLoading,
  popoverButton,
  popoverButtonBreakpoints,
  ...rest
}) => {
  /**
   * Breakpoint management
   */
  const [canShowPopoverButton, setCanShowPopoverButton] = useState(
    typeof window !== 'undefined' && popoverButtonBreakpoints
      ? isWithinBreakpoints(window.innerWidth, popoverButtonBreakpoints)
      : true
  );

  const functionToCallOnWindowResize = throttle(() => {
    const newWidthIsWithinBreakpoint = popoverButtonBreakpoints
      ? isWithinBreakpoints(window.innerWidth, popoverButtonBreakpoints)
      : true;

    if (newWidthIsWithinBreakpoint !== canShowPopoverButton) {
      setCanShowPopoverButton(newWidthIsWithinBreakpoint);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [functionToCallOnWindowResize]);

  /**
   * i18n text
   */
  const [searchPlaceholder] = useOuiI18n(
    ['ouiSelectableTemplateSitewide.searchPlaceholder'],
    ['Search for anything...']
  );

  /**
   * Popover helpers
   */
  const [popoverRef, setPopoverRef] = useState<HTMLElement | null>(null);
  const [popoverIsOpen, setPopoverIsOpen] = useState(false);
  const { closePopover: _closePopover, panelRef, width, ...popoverRest } = {
    ...popoverProps,
  };

  const closePopover = () => {
    setPopoverIsOpen(false);
    _closePopover && _closePopover();
  };

  const togglePopover = () => {
    setPopoverIsOpen(!popoverIsOpen);
  };

  // Width applied to the internal div
  const popoverWidth: CSSProperties['width'] = width || 600;
  const setPanelRef = useCombinedRefs([setPopoverRef, panelRef]);

  /**
   * Search helpers
   */
  const searchOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onFocus && searchProps.onFocus(e);
    if (canShowPopoverButton) return;

    setPopoverIsOpen(true);
  };

  const onSearchInput = (e: React.FormEvent<HTMLInputElement>) => {
    searchProps && searchProps.onInput && searchProps.onInput(e);
    setPopoverIsOpen(true);
  };

  const searchOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    searchProps && searchProps.onBlur && searchProps.onBlur(e);
    if (canShowPopoverButton) return;

    if (!popoverRef?.contains(e.relatedTarget as HTMLElement)) {
      setPopoverIsOpen(false);
    }
  };

  /**
   * Classes
   */
  const classes = classNames('ouiSelectableTemplateSitewide', className);
  const searchClasses = classNames(
    'ouiSelectableTemplateSitewide__search',
    searchProps && searchProps.className
  );
  const listClasses = classNames(
    'ouiSelectableTemplateSitewide__list',
    listProps && listProps.className
  );

  /**
   * List options
   */
  const formattedOptions = ouiSelectableTemplateSitewideFormatOptions(options);

  const loadingMessage = (
    <OuiSelectableMessage style={{ minHeight: 300 }}>
      <OuiLoadingSpinner size="l" />
      <br />
      <p>
        <OuiI18n
          token="ouiSelectableTemplateSitewide.loadingResults"
          default="Loading results"
        />
      </p>
    </OuiSelectableMessage>
  );

  const emptyMessage = (
    <OuiSelectableMessage style={{ minHeight: 300 }}>
      <p>
        <OuiI18n
          token="ouiSelectableTemplateSitewide.noResults"
          default="No results available"
        />
      </p>
    </OuiSelectableMessage>
  );

  /**
   * Changes based on showing the `popoverButton` if provided.
   * This will move the search input into the popover
   * and use the passed `popoverButton` as the popover trigger.
   */
  let popoverTrigger: ReactElement;
  if (popoverButton && canShowPopoverButton) {
    popoverTrigger = React.cloneElement(popoverButton, {
      ...popoverButton.props,
      onClick: togglePopover,
      onKeyDown: (e: KeyboardEvent) => {
        // Selectable preventsDefault on Enter which kills browser controls for pressing the button
        e.stopPropagation();
      },
    });
  }

  return (
    <OuiSelectable
      isLoading={isLoading}
      options={formattedOptions}
      renderOption={ouiSelectableTemplateSitewideRenderOptions}
      singleSelection={true}
      searchProps={{
        placeholder: searchPlaceholder,
        isClearable: true,
        ...(searchProps as Omit<typeof searchProps, 'className'>),
        onFocus: searchOnFocus,
        onBlur: searchOnBlur,
        onInput: onSearchInput,
        className: searchClasses,
      }}
      listProps={{
        rowHeight: 68,
        showIcons: false,
        onFocusBadge: {
          iconSide: 'right',
          children: (
            <OuiI18n
              token="ouiSelectableTemplateSitewide.onFocusBadgeGoTo"
              default="Go to"
            />
          ),
        },
        ...listProps,
        className: listClasses,
      }}
      loadingMessage={loadingMessage}
      emptyMessage={emptyMessage}
      noMatchesMessage={emptyMessage}
      {...rest}
      className={classes}
      searchable>
      {(list, search) => (
        <OuiPopover
          panelPaddingSize="none"
          isOpen={popoverIsOpen}
          ownFocus={!!popoverTrigger}
          display={popoverTrigger ? 'inlineBlock' : 'block'}
          {...popoverRest}
          panelRef={setPanelRef}
          button={popoverTrigger ? popoverTrigger : search}
          closePopover={closePopover}>
          <div style={{ width: popoverWidth, maxWidth: '100%' }}>
            {popoverTitle || popoverTrigger ? (
              <OuiPopoverTitle paddingSize="s">
                {popoverTitle}
                {popoverTitle && search && <OuiSpacer />}
                {search}
              </OuiPopoverTitle>
            ) : undefined}
            {list}
            {popoverFooter && (
              <OuiPopoverFooter paddingSize="s">
                {popoverFooter}
              </OuiPopoverFooter>
            )}
          </div>
        </OuiPopover>
      )}
    </OuiSelectable>
  );
};
