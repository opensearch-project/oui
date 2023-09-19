/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { OuiLoadingDashboards, SIZES } from './loading_dashboards';

describe('OuiLoadingDashboards', () => {
  test('is rendered', () => {
    const component = render(<OuiLoadingDashboards {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const component = render(
          <OuiLoadingDashboards {...requiredProps} size={size} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });
});
