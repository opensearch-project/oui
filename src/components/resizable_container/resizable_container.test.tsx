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
import { requiredProps } from '../../test';

import { OuiResizableContainer } from './resizable_container';

describe('OuiResizableContainer', () => {
  test('is rendered', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel initialSize={50}>Testing</OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel initialSize={50}>123</OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be vertical', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps} direction="vertical">
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel initialSize={50}>Testing</OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel initialSize={50}>123</OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can be controlled externally', () => {
    const panel1 = 50;
    const panel2 = 50;
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel size={panel1}>Testing</OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel size={panel2}>123</OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have scrollable panels', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel initialSize={50} scrollable>
              Testing
            </OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel initialSize={50} scrollable>
              123
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have more than two panels', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel initialSize={33}>Testing</OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel initialSize={33}>123</OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel initialSize={33}>And again</OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can adjust panel props', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel initialSize={50} paddingSize="none">
              Testing
            </OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel initialSize={50} color="plain">
              123
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('can have toggleable panels', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel mode="collapsible" initialSize={20}>
              Sidebar
            </OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel mode="main" initialSize={80}>
              Sidebar content
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });

  test('toggleable panels can be configurable', () => {
    const component = render(
      <OuiResizableContainer {...requiredProps}>
        {(OuiResizablePanel, OuiResizableButton) => (
          <>
            <OuiResizablePanel
              mode={[
                'collapsible',
                {
                  'data-test-subj': 'panel-toggle',
                  className: 'panel-toggle',
                  position: 'top',
                },
              ]}
              initialSize={20}>
              Sidebar
            </OuiResizablePanel>
            <OuiResizableButton />
            <OuiResizablePanel mode="main" initialSize={80}>
              Sidebar content
            </OuiResizablePanel>
          </>
        )}
      </OuiResizableContainer>
    );

    expect(component).toMatchSnapshot();
  });
});
