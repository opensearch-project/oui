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
import { shallow } from 'enzyme';
import { OuiCopy } from './copy';
import { requiredProps } from '../../test';

describe('OuiCopy', () => {
  test('is rendered', () => {
    const component = shallow(
      <OuiCopy textToCopy="some text" {...requiredProps}>
        {(copy) => <button onClick={copy}>Click to copy input text</button>}
      </OuiCopy>
    );
    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    test('beforeMessage', () => {
      const component = shallow(
        <OuiCopy textToCopy="some text" beforeMessage="copy this">
          {(copy) => <button onClick={copy}>Click to copy input text</button>}
        </OuiCopy>
      );
      expect(component.state('tooltipText')).toBe('copy this');
    });

    test('afterMessage', () => {
      const component = shallow<OuiCopy>(
        <OuiCopy textToCopy="some text" afterMessage="successfuly copied">
          {(copy) => <button onClick={copy}>Click to copy input text</button>}
        </OuiCopy>
      );
      const instance = component.instance();
      expect(instance.props.afterMessage).toBe('successfuly copied');
    });
  });
});
