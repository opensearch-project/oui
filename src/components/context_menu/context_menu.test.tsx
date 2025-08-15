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
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { requiredProps } from '../../test';

import { OuiContextMenu, SIZES } from './context_menu';
import { setTimeout } from 'timers';

const panel3 = {
  id: 3,
  title: '3',
  items: [
    {
      name: <span style={{ color: 'tomato' }}>foo</span>,
      key: 'foo',
    },
  ],
};

const panel2 = {
  id: 2,
  title: '2',
  content: <div>2</div>,
};

const panel1 = {
  id: 1,
  title: '1',
  width: 400,
  items: [
    {
      name: '2a',
      panel: 2,
    },
    {
      name: '2b',
      panel: 2,
    },
    {
      name: '2c',
      panel: 2,
    },
  ],
};

const panel0 = {
  id: 0,
  title: '0',
  items: [
    {
      name: '1',
      panel: 1,
    },
  ],
};

const panels = [panel0, panel1, panel2, panel3];

export const tick = (ms = 0) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

describe('OuiContextMenu', () => {
  test('is rendered', () => {
    const { container } = render(<OuiContextMenu {...requiredProps} />);

    expect(container).toMatchSnapshot();
  });

  it('panel item can contain JSX', () => {
    const { container } = render(
      <OuiContextMenu panels={panels} initialPanelId={3} />
    );

    expect(container).toMatchSnapshot();
  });

  it('panel item can be a separator line', () => {
    const { container } = render(
      <OuiContextMenu
        panels={[
          {
            id: 3,
            title: 'Testing separator',
            items: [
              { name: 'Foo', key: 'foo' },
              { isSeparator: true },
              { name: 'Bar', key: 'bar' },
            ],
          },
        ]}
        initialPanelId={3}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it('can pass-through horizontal rule props', () => {
    const { container } = render(
      <OuiContextMenu
        panels={[
          {
            id: 3,
            title: 'Testing separator',
            items: [
              {
                isSeparator: true,
                key: 'separator',
                margin: 's',
                size: 'half',
              },
            ],
          },
        ]}
        initialPanelId={3}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    describe('panels and initialPanelId', () => {
      it('renders the referenced panel', () => {
        const { container } = render(
          <OuiContextMenu panels={panels} initialPanelId={2} />
        );

        expect(container).toMatchSnapshot();
      });

      it('allows you to click the title button to go back to the previous panel', async () => {
        const { container } = render(
          <OuiContextMenu panels={panels} initialPanelId={2} />
        );

        await tick(20);

        expect(container).toMatchSnapshot();

        // Navigate to a different panel.
        const user = userEvent.setup();
        const titleButton = screen.getByTestId('contextMenuPanelTitleButton');

        await act(async () => {
          await user.click(titleButton);
          await tick(20);
        });

        expect(container).toMatchSnapshot();
      });
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const { container } = render(
            <OuiContextMenu panels={panels} initialPanelId={2} size={size} />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });
  });
});
