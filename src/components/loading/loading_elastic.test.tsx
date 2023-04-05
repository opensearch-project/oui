/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';
import { getDeprecatedMessage } from '../../utils';
import { OuiLoadingElastic, SIZES, WARNING } from './loading_elastic';

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

  it('should console warning about a deprecated component', () => {
    console.warn = jest.fn();
    mount(<OuiLoadingElastic {...requiredProps} />);

    expect(console.warn).toHaveBeenCalledWith(getDeprecatedMessage(WARNING));
  });
});
