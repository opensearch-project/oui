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

import {
  OuiPinnableListGroup,
  OuiPinnableListGroupItemProps,
} from './pinnable_list_group';

const someListItems: OuiPinnableListGroupItemProps[] = [
  {
    label: 'Label with iconType',
    iconType: 'stop',
  },
  {
    label: 'Custom extra action',
    extraAction: {
      iconType: 'bell',
      alwaysShow: true,
      'aria-label': 'bell',
    },
  },
  {
    label: 'Active link',
    isActive: true,
    href: '#',
  },
  {
    label: 'Button with onClick',
    pinned: true,
    onClick: (e) => {
      console.log('Visualize clicked', e);
    },
  },
  {
    label: 'Link with href',
    href: '#',
  },
  {
    label: 'Not pinnable',
    href: '#',
    pinnable: false,
  },
];

describe('OuiPinnableListGroup', () => {
  test('is rendered', () => {
    const component = render(
      <OuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
      />
    );

    expect(component).toMatchSnapshot();
  });

  test('can have custom pin icon titles', () => {
    const component = render(
      <OuiPinnableListGroup
        {...requiredProps}
        listItems={someListItems}
        onPinClick={() => {}}
        pinTitle={(item: OuiPinnableListGroupItemProps) =>
          `Pin ${item.label} to the top`
        }
        unpinTitle={(item: OuiPinnableListGroupItemProps) =>
          `Unpin ${item.label} to the top`
        }
      />
    );

    expect(component).toMatchSnapshot();
  });
});
