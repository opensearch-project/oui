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
import { OuiWindowEvent } from './window_event';

describe('OuiWindowEvent', () => {
  beforeEach(() => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('attaches handler to window event on mount', () => {
    const handler = () => null;
    shallow(<OuiWindowEvent event="click" handler={handler} />);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.addEventListener).toHaveBeenCalledWith('click', handler);
  });

  test('removes handler on unmount', () => {
    const handler = () => null;
    const wrapper = shallow(<OuiWindowEvent event="click" handler={handler} />);
    wrapper.unmount();
    expect(window.removeEventListener).toHaveBeenLastCalledWith(
      'click',
      handler
    );
  });

  test('removes and re-attaches handler to window event on update', () => {
    const handler1 = () => null;
    const handler2 = () => null;
    const wrapper = shallow(
      <OuiWindowEvent event="click" handler={handler1} />
    );

    expect(window.addEventListener).toHaveBeenLastCalledWith('click', handler1);

    wrapper.setProps({ event: 'hover', handler: handler2 });

    expect(window.removeEventListener).toHaveBeenLastCalledWith(
      'click',
      handler1
    );
    expect(window.addEventListener).toHaveBeenLastCalledWith('hover', handler2);
  });

  test('does not remove or re-attach handler if update is irrelevant', () => {
    const handler = () => null;
    const wrapper = shallow(<OuiWindowEvent event="click" handler={handler} />);
    expect(window.addEventListener).toHaveBeenCalledTimes(1);

    wrapper.setProps({ whatever: 'ugh' });
    expect(window.addEventListener).toHaveBeenCalledTimes(1);
    expect(window.removeEventListener).not.toHaveBeenCalled();
  });
});
