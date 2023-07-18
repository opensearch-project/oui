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
  HTMLAttributes,
  FunctionComponent,
  useState,
  useEffect,
  MouseEventHandler,
} from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../../common';
import { OuiIcon, IconType } from '../../icon';
import { OuiPopover, OuiPopoverProps } from '../../popover';
import { OuiI18n } from '../../i18n';
import {
  OuiHeaderSectionItemButton,
  OuiHeaderSectionItemButtonProps,
} from '../header_section';
import { OuiBreakpointSize } from '../../../services/breakpoint';
import { OuiHideFor, OuiShowFor } from '../../responsive';

type OuiHeaderLinksGutterSize = 'xs' | 's' | 'm' | 'l';
type OuiHeaderLinksPopoverButtonProps = Partial<
  OuiHeaderSectionItemButtonProps
> & {
  iconType?: IconType;
};

export type OuiHeaderLinksProps = CommonProps &
  HTMLAttributes<HTMLElement> & {
    /**
     * Spacing between direct children
     */
    gutterSize?: OuiHeaderLinksGutterSize;
    /**
     * A list of named breakpoints at which to show the popover version
     */
    popoverBreakpoints?: OuiBreakpointSize[] | 'all' | 'none';
    /**
     * Extend the functionality of the OuiPopover.button which is a OuiHeaderSectionItemButton.
     * With the addition of `iconType` to change the display icon which defaults to `apps`
     */
    popoverButtonProps?: OuiHeaderLinksPopoverButtonProps;
    /**
     * Extend the functionality of the OuiPopover
     */
    popoverProps?: Omit<OuiPopoverProps, 'button' | 'closePopover'>;
  };

const gutterSizeToClassNameMap: {
  [gutterSize in OuiHeaderLinksGutterSize]: string;
} = {
  xs: '--gutterXS',
  s: '--gutterS',
  m: '--gutterM',
  l: '--gutterL',
};
export const GUTTER_SIZES = keysOf(gutterSizeToClassNameMap);

export const OuiHeaderLinks: FunctionComponent<OuiHeaderLinksProps> = ({
  children,
  className,
  gutterSize = 's',
  popoverBreakpoints = ['xs', 's'],
  popoverButtonProps,
  popoverProps,
  ...rest
}) => {
  const { onClick, iconType = 'apps', ...popoverButtonRest } =
    popoverButtonProps || {};

  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  const onMenuButtonClick: MouseEventHandler<
    HTMLButtonElement & HTMLAnchorElement
  > = (e) => {
    onClick?.(e);
    setMobileMenuIsOpen(!mobileMenuIsOpen);
  };

  const closeMenu = () => {
    setMobileMenuIsOpen(false);
  };

  useEffect(() => {
    window.addEventListener('resize', closeMenu);
    return () => {
      window.removeEventListener('resize', closeMenu);
    };
  });

  const classes = classNames('ouiHeaderLinks', className);

  const button = (
    <OuiI18n token="ouiHeaderLinks.openNavigationMenu" default="Open menu">
      {(openNavigationMenu: string) => (
        <OuiHeaderSectionItemButton
          aria-label={openNavigationMenu}
          onClick={onMenuButtonClick}
          {...popoverButtonRest}>
          <OuiIcon type={iconType} size="m" />
        </OuiHeaderSectionItemButton>
      )}
    </OuiI18n>
  );

  return (
    <OuiI18n token="ouiHeaderLinks.appNavigation" default="App menu">
      {(appNavigation: string) => (
        <nav className={classes} aria-label={appNavigation} {...rest}>
          <OuiHideFor sizes={popoverBreakpoints}>
            <div
              className={classNames('ouiHeaderLinks__list', [
                `ouiHeaderLinks__list${gutterSizeToClassNameMap[gutterSize]}`,
              ])}>
              {children}
            </div>
          </OuiHideFor>

          <OuiShowFor sizes={popoverBreakpoints}>
            <OuiPopover
              button={button}
              isOpen={mobileMenuIsOpen}
              anchorPosition="downRight"
              closePopover={closeMenu}
              panelPaddingSize="none"
              {...popoverProps}>
              <div
                className={classNames('ouiHeaderLinks__mobileList', [
                  `ouiHeaderLinks__mobileList${gutterSizeToClassNameMap[gutterSize]}`,
                ])}>
                {children}
              </div>
            </OuiPopover>
          </OuiShowFor>
        </nav>
      )}
    </OuiI18n>
  );
};
