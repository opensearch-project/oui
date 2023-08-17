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

import { OuiSchemaItem } from './schema_item';

describe('OuiSchema', () => {
  test('is rendered', () => {
    const component = render(<OuiSchemaItem {...requiredProps} label="Test" />);

    expect(component).toMatchSnapshot();
  });
});
