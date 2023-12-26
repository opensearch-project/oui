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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { OuiSplitButton } from './split_button';

describe('OuiSplitButton', () => {
  test('is rendered', () => {
    const component = render(<OuiSplitButton {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
