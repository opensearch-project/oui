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

/* eslint-disable no-restricted-globals */
import React, { useState } from 'react';

import { OuiButton } from '../../../../src/components/button';
import {
  OuiContextMenuPanel,
  OuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { OuiPopover } from '../../../../src/components/popover';
import { useIsWithinBreakpoints } from '../../../../src/services/hooks/useIsWithinBreakpoints';
import { OUI_THEME, OUI_THEMES } from '../../../../src/themes';

import { ThemeContext } from '../with_theme';

type GuideThemeSelectorProps = {
  onToggleLocale: () => {};
  selectedLocale: string;
  context?: any;
};

export const GuideThemeSelector: React.FunctionComponent<GuideThemeSelectorProps> = ({
  ...rest
}) => {
  return (
    <ThemeContext.Consumer>
      {(context) => <GuideThemeSelectorComponent context={context} {...rest} />}
    </ThemeContext.Consumer>
  );
};

// @ts-ignore Context has no type
const GuideThemeSelectorComponent: React.FunctionComponent<GuideThemeSelectorProps> = ({
  context,
}) => {
  const isMobileSize = useIsWithinBreakpoints(['xs', 's']);
  const [isPopoverOpen, setPopover] = useState(false);

  const onButtonClick = () => {
    setPopover(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopover(false);
  };

  const currentTheme: OUI_THEME =
    OUI_THEMES.find((theme) => theme.value === context.theme) || OUI_THEMES[0];

  const getIconType = (value: OUI_THEME['value']) => {
    return value === currentTheme.value ? 'check' : 'empty';
  };

  const items = OUI_THEMES.map((theme) => {
    return (
      <OuiContextMenuItem
        key={theme.value}
        icon={getIconType(theme.value)}
        onClick={() => {
          closePopover();
          context.changeTheme(theme.value);
        }}>
        {theme.text}
      </OuiContextMenuItem>
    );
  });

  const button = (
    <OuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      color="ghost"
      minWidth={0}
      onClick={onButtonClick}>
      {isMobileSize ? 'Theme' : currentTheme.text}
    </OuiButton>
  );

  return (
    <OuiPopover
      id="docsThemeSelector"
      repositionOnScroll
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downRight">
      <OuiContextMenuPanel size="s" items={items} />
    </OuiPopover>
  );
};
