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

import { OuiCard } from './card';

import { OuiIcon } from '../icon';
import { OuiI18n } from '../i18n';
import { COLORS, SIZES } from '../panel/panel';

describe('OuiCard', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiCard
        title="Card title"
        description="Card description"
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  describe('props', () => {
    test('icon', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          icon={<OuiIcon className="myIconClass" type="apmApp" />}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('a null icon', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          icon={null}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('hasBorder', () => {
      const { container } = render(
        <OuiCard title="Card title" description="Card description" hasBorder />
      );

      expect(container).toMatchSnapshot();
    });

    test('horizontal', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          layout="horizontal"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('image', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          image={
            <div>
              <img
                src="https://source.unsplash.com/400x200/?Nature"
                alt="Nature"
              />
            </div>
          }
        />
      );

      expect(container).toMatchSnapshot();
    });

    describe('href', () => {
      it('supports href as a link', () => {
        const { container } = render(
          <OuiCard title="Hoi" description="There" href="#" />
        );

        expect(container).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      it('supports onClick as a link', async () => {
        const handler = jest.fn();
        render(
          <OuiCard title="Hoi" description="There" href="#" onClick={handler} />
        );

        const user = userEvent.setup();
        const link = screen.getByRole('link');

        await act(async () => {
          await user.click(link);
        });

        expect(handler).toHaveBeenCalledTimes(1);
      });

      it('supports onClick as a button', async () => {
        const handler = jest.fn();
        render(<OuiCard title="Hoi" description="There" onClick={handler} />);

        const user = userEvent.setup();
        const button = screen.getByRole('button');

        await act(async () => {
          await user.click(button);
        });

        expect(handler).toHaveBeenCalledTimes(1);
      });
    });

    test('titleElement', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          titleElement="h4"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('titleElement with nodes', () => {
      const { container } = render(
        <OuiCard
          title={
            <OuiI18n token="ouiCard.title" default="Card title" /> // eslint-disable-line
          }
          description="Card description"
          titleElement="h4"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('titleSize', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          titleSize="xs"
        />
      );

      expect(container).toMatchSnapshot();
    });

    describe('accepts div props', () => {
      test('like style', () => {
        const { container } = render(
          <OuiCard
            title="Card title"
            description="Card description"
            style={{ minWidth: 0 }}
          />
        );

        expect(container).toMatchSnapshot();
      });
    });

    test('footer', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          footer={<span>Footer</span>}
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('children', () => {
      const { container } = render(<OuiCard title="Card title">Child</OuiCard>);

      expect(container).toMatchSnapshot();
    });

    test('children with description', () => {
      const { container } = render(
        <OuiCard title="Card title" description="Card description">
          Child
        </OuiCard>
      );

      expect(container).toMatchSnapshot();
    });

    test('textAlign', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          textAlign="right"
        />
      );

      expect(container).toMatchSnapshot();
    });

    test('isDisabled', () => {
      const { container } = render(
        <OuiCard title="Card title" description="Card description" isDisabled />
      );

      expect(container).toMatchSnapshot();
    });

    describe('paddingSize', () => {
      SIZES.forEach((size) => {
        test(`${size} is rendered`, () => {
          const { container } = render(
            <OuiCard
              title="Card title"
              description="Card description"
              paddingSize={size}
            />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    describe('display', () => {
      COLORS.forEach((color) => {
        test(`${color} is rendered`, () => {
          const { container } = render(
            <OuiCard
              title="Card title"
              description="Card description"
              display={color}
            />
          );

          expect(container).toMatchSnapshot();
        });
      });
    });

    test('selectable', () => {
      const { container } = render(
        <OuiCard
          title="Card title"
          description="Card description"
          selectable={{
            onClick: () => {},
          }}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  test('horizontal selectable', () => {
    const { container } = render(
      <OuiCard
        title="Card title"
        description="Card description"
        layout="horizontal"
        selectable={{
          onClick: () => {},
        }}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('betaBadgeProps renders href', () => {
    const { container } = render(
      <OuiCard
        title="Card title"
        description="Card description"
        betaBadgeProps={{
          href: 'http://www.elastic.co/',
        }}
        betaBadgeLabel="Link"
      />
    );

    expect(container).toMatchSnapshot();
  });
});
