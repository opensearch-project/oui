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

import { OuiRange } from './range';

const props = {
  value: '8',
};

describe('OuiRange', () => {
  test('is rendered', () => {
    const component = render(
      <OuiRange
        name="name"
        id="id"
        onChange={() => {}}
        {...props}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('disabled should render', () => {
      const component = render(<OuiRange {...props} disabled />);

      expect(component).toMatchSnapshot();
    });

    test('fullWidth should render', () => {
      const component = render(<OuiRange {...props} fullWidth />);

      expect(component).toMatchSnapshot();
    });

    test('compressed should render', () => {
      const component = render(<OuiRange {...props} compressed />);

      expect(component).toMatchSnapshot();
    });

    test('labels should render', () => {
      const component = render(<OuiRange {...props} showLabels />);

      expect(component).toMatchSnapshot();
    });

    test('ticks should render', () => {
      const component = render(
        <OuiRange {...props} showTicks tickInterval={20} />
      );

      expect(component).toMatchSnapshot();
    });

    test('custom ticks should render', () => {
      const component = render(
        <OuiRange
          {...props}
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
      const component = render(<OuiRange {...props} showRange />);

      expect(component).toMatchSnapshot();
    });

    test('value should render', () => {
      const { value, ...localProps } = props;
      const component = render(
        <OuiRange
          value="200"
          showValue
          valuePrepend="before"
          valueAppend="after"
          {...localProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('input should render', () => {
      const component = render(
        <OuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('slider should display in popover', () => {
      const component = render(
        <OuiRange
          name="name"
          id="id"
          onChange={() => {}}
          showInput="inputWithPopover"
          {...props}
          {...requiredProps}
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('levels should render', () => {
      const component = render(
        <OuiRange
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
          value={20}
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  test('allows value prop to accept a number', () => {
    const { value, ...localProps } = props;
    const component = render(
      <OuiRange value={8} onChange={() => {}} showValue {...localProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('allows value prop to accept empty string', () => {
    const { value, ...localProps } = props;
    const component = render(
      <OuiRange value={''} onChange={() => {}} {...localProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
