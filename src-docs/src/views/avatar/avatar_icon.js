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

import React, { useContext } from 'react';
import { ThemeContext } from '../../components';

import { OuiAvatar, OuiSpacer, OuiTitle } from '../../../../src/components';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');

  return (
    <div>
      <OuiTitle size="xs">
        <h2>Avatar colors and sizes</h2>
      </OuiTitle>
      <OuiSpacer />
      <OuiAvatar size="s" name="Small size" iconType="managementApp" />
      &emsp;
      <OuiAvatar size="m" name="Medium size" iconType="managementApp" />
      &emsp;
      <OuiAvatar size="l" name="Large" iconType="managementApp" />
      &emsp;
      <OuiAvatar
        size="xl"
        color="plain"
        name="Plain color"
        iconType="managementApp"
      />
      <OuiSpacer />
      <OuiTitle size="xs">
        <h2>Icon colors and sizes</h2>
      </OuiTitle>
      <OuiSpacer />
      <OuiAvatar name="Avatar color" iconType="managementApp" color="#BD10E0" />
      &emsp;
      <OuiAvatar
        name="Custom iconColor"
        iconType="managementApp"
        color={isDarkTheme ? '#103148' : '#E6F1FA'}
        iconColor="primary"
      />
      &emsp;
      <OuiAvatar
        name="Null iconColor"
        iconType="managementApp"
        color={isDarkTheme ? '#343741' : '#D3DAE6'}
        iconColor={null}
      />
      &emsp;
      <OuiAvatar name="Large iconSize" iconType="managementApp" iconSize="l" />
      &emsp;
    </div>
  );
};
