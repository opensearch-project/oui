/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { OuiSplitButtonControl } from './split_button_control';

describe('OuiSplitButtonControl', () => {
  test('is rendered', () => {
    const component = render(
      <OuiSplitButtonControl {...requiredProps}>Test</OuiSplitButtonControl>
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('fullWidth is rendered', () => {
      const component = render(
        <OuiSplitButtonControl fullWidth>Test</OuiSplitButtonControl>
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading is rendered', () => {
      const component = render(
        <OuiSplitButtonControl isLoading>Test</OuiSplitButtonControl>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
