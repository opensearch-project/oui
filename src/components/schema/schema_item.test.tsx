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

  test('it only renders at most 2 actions', () => {
    const actions = Array(3)
      .fill(null)
      .map(() => ({
        iconType: 'trash',
        onClick: () => {},
      }));
    const component = render(
      <OuiSchemaItem {...requiredProps} label="Test" actions={actions} />
    );
    expect(component.find('.ouiSchemaItem__actions').children().length).toBe(2);
  });

  test('it renders compressed correctly', () => {
    const component = render(
      <OuiSchemaItem {...requiredProps} label="Test" compressed />
    );
    expect(component).toMatchSnapshot();
  });
});
