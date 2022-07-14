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
import { mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { OuiControlBar, Control } from './control_bar';

const handleClick = () => {
  console.log('You clicked');
};

const controls: Control[] = [
  {
    controlType: 'breadcrumbs',
    id: 'current_file_path',
    responsive: false,
    breadcrumbs: [
      {
        text: 'src',
      },
      {
        text: 'components',
      },
    ],
  },
  {
    controlType: 'button',
    id: 'sound_the_alarm',
    label: 'Sound the Alarm',
    onClick: handleClick,
    'data-test-subj': 'dts',
  },
  {
    controlType: 'text',
    id: 'close_the_hatch',
    text: 'Close the Hatch',
  },
  {
    controlType: 'divider',
  },
  {
    controlType: 'icon',
    id: 'sample_icon',
    iconType: 'alert',
    color: 'danger',
    'aria-label': 'Sample Icon',
  },
  {
    controlType: 'spacer',
  },
  {
    controlType: 'tab',
    id: 'flight_815',
    label: 'Flight 815',
    onClick: handleClick,
  },
];

describe('OuiControlBar', () => {
  test('is rendered', () => {
    const component = takeMountedSnapshot(
      mount(<OuiControlBar controls={controls} {...requiredProps} />)
    );

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('mobile is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} showOnMobile />
      );

      expect(component).toMatchSnapshot();
    });

    test('showContent is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} showContent>
          Content
        </OuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('size is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} size="s">
          Content
        </OuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('maxHeight is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} maxHeight="20rem">
          Content
        </OuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('leftOffset is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} leftOffset={200}>
          Content
        </OuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('rightOffset is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} rightOffset={200}>
          Content
        </OuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });

    test('position is rendered', () => {
      const component = mount(
        <OuiControlBar controls={controls} position="absolute">
          Content
        </OuiControlBar>
      );

      expect(component).toMatchSnapshot();
    });
  });
});
