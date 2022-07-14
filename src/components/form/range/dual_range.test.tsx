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

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { OuiDualRange } from './dual_range';

const props = {
  onChange: () => {},
};

describe('OuiDualRange', () => {
  test('is rendered', () => {
    const component = render(
      <OuiDualRange
        name="name"
        id="id"
        value={['1', '8']}
        {...props}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const component = render(
        <OuiDualRange {...props} value={['1', '8']} disabled />
      );

      expect(component).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const component = render(
        <OuiDualRange {...props} value={['1', '8']} fullWidth />
      );

      expect(component).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(
        <OuiDualRange {...props} value={['1', '8']} compressed />
      );

      expect(component).toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(
        <OuiDualRange {...props} value={['1', '8']} showLabels />
      );

      expect(component).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(
        <OuiDualRange
          {...props}
          value={['1', '8']}
          showTicks
          tickInterval={20}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const component = render(
        <OuiDualRange
          {...props}
          value={[20, 100]}
          showTicks
          ticks={[
            { label: '20kb', value: 20 },
            { label: '100kb', value: 100 },
          ]}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('range should render', () => {
      const component = render(
        <OuiDualRange {...props} showRange value={[1, 8]} />
      );

      expect(component).toMatchSnapshot();
    });

    test('inputs should render', () => {
      const component = render(
        <OuiDualRange
          name="name"
          id="id"
          value={['1', '8']}
          showInput
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const component = render(
        <OuiDualRange
          name="name"
          id="id"
          value={['1', '8']}
          showInput="inputWithPopover"
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('levels should render', () => {
      const component = render(
        <OuiDualRange
          levels={[
            {
              min: 0,
              max: 20,
              color: 'danger',
            },
            {
              min: 20,
              max: 100,
              color: 'success',
            },
          ]}
          value={['1', '8']}
          onChange={() => {}}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isDraggable should render', () => {
      const component = render(
        <OuiDualRange isDraggable value={['1', '8']} onChange={() => {}} />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('allows value prop to accept numbers', () => {
    const component = render(<OuiDualRange value={[1, 8]} {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('allows value prop to accept empty strings', () => {
    const component = render(<OuiDualRange value={['', '']} {...props} />);

    expect(component).toMatchSnapshot();
  });

  describe('input props', () => {
    test('can be applied to min and max inputs', () => {
      const component = render(
        <OuiDualRange
          name="name"
          id="id"
          min={1}
          max={10}
          value={['1', '8']}
          onChange={() => {}}
          showInput
          minInputProps={{ 'aria-label': 'Min value' }}
          maxInputProps={{ 'aria-label': 'Max value' }}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });
});
