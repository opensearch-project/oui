/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';
import { OuiLoadingElastic, SIZES } from './loading_elastic';

describe('OuiLoadingElastic', () => {
  test('is rendered', () => {
    const component = render(<OuiLoadingElastic {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  describe('size', () => {
    SIZES.forEach((size) => {
      test(`${size} is rendered`, () => {
        const component = render(
          <OuiLoadingElastic {...requiredProps} size={size} />
        );

        expect(component).toMatchSnapshot();
      });
    });
  });

  it('should console deprecation warning', () => {
    console.warn = jest.fn();

    mount(<OuiLoadingElastic {...requiredProps} />);

    expect(console.warn).toHaveBeenCalledTimes(1);
    expect(console.warn).toHaveBeenCalledWith(
      '[DEPRECATED] OuiLoadingElastic is deprecated in favor of OuiLoadingDashboards and will be removed in v2.0.0.'
    );
  });
});
