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
import { OuiPortal } from './portal';

describe('OuiPortal', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('should render OuiPortal', () => {
    const component = mount(<OuiPortal>Content</OuiPortal>);

    expect(document.body.innerHTML).toEqual('<div>Content</div>');
    expect(component).toMatchSnapshot();
  });

  it('should attach Content inside an element', () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);
    document.body.appendChild(document.createElement('div'));

    mount(<OuiPortal insert={{ root: container }}>Content</OuiPortal>);

    expect(document.body.innerHTML).toEqual(
      '<div id="container">Content</div><div></div>'
    );
  });

  it('should attach Content before an element', () => {
    const container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);

    mount(
      <OuiPortal insert={{ sibling: container, position: 'before' }}>
        Content
      </OuiPortal>,
      { attachTo: document.body }
    );

    expect(document.body.innerHTML).toEqual(
      '<div>Content</div><div id="container"></div>'
    );
  });
});
