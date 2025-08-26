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
import { render } from '@testing-library/react';
import { requiredProps } from '../../test/required_props';
import cheerio from 'cheerio';

import {
  OuiIcon,
  SIZES,
  TYPES,
  COLORS,
  clearIconComponentCache,
  appendIconComponentCache,
} from './icon';
import { PropsOf } from '../common';
// @ts-ignore importing from a JS file
import { icon as OuiIconVideoPlayer } from './assets/videoPlayer.js';
// @ts-ignore importing from a JS file
import { icon as OuiIconBeaker } from './assets/beaker.js';

jest.mock('./icon', () => {
  return jest.requireActual('./icon');
});

jest.mock('../../services/react', () => {
  const originalModule = jest.requireActual('../../services/react');
  const { act } = jest.requireActual('../../test/react_test_utils');
  return {
    ...originalModule,
    enqueueStateChange: (fn: Function) => {
      act(() => {
        fn();
      });
    },
  };
});

beforeEach(() => clearIconComponentCache());

afterAll(() => {
  jest.restoreAllMocks();
});

const prettyHtml = cheerio.load('');

function testIcon(props: PropsOf<OuiIcon>) {
  return () => {
    expect.assertions(1);
    return new Promise<void>((resolve) => {
      const onIconLoad = () => {
        expect(prettyHtml(container.innerHTML)).toMatchSnapshot();
        resolve();
      };
      const { container } = render(
        <OuiIcon {...props} onIconLoad={onIconLoad} />
      );
    });
  };
}

describe('OuiIcon', () => {
  test('is rendered', testIcon({ type: 'search', ...requiredProps }));

  describe('props', () => {
    describe('other props', () => {
      test(
        'are passed through to the icon',
        testIcon({
          type: 'search',
          'aria-label': 'A Search Icon',
          title: 'Search',
        })
      );
    });

    describe('title and titleId', () => {
      test(
        'are passed and generate an aria-labelledby',
        testIcon({
          type: 'search',
          title: 'Search icon',
          titleId: 'id-test',
        })
      );
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        test('${size} is rendered', testIcon({ type: 'search', size }));
      });
    });

    describe('type', () => {
      TYPES.forEach((type) => {
        test(`${type} is rendered`, testIcon({ type }));
      });
    });

    describe('color', () => {
      [
        ...COLORS,
        '#fde',
        '#885522',
        'rgb(100, 150, 200)',
        'hsla(270, 60%, 70%, 0.9)',
      ].forEach((color) => {
        it(`${color} is rendered`, testIcon({ type: 'search', color }));
      });
    });

    describe('tabIndex', () => {
      it(
        'renders focusable="false" when not provided',
        testIcon({ type: 'search' })
      );

      it(
        'renders focusable="false" when -1',
        testIcon({ type: 'search', tabIndex: -1 })
      );

      it(
        'renders focusable="true" when 0',
        testIcon({ type: 'search', tabIndex: 0 })
      );
    });
  });

  describe('appendIconComponentCache', () => {
    it('does nothing if not called', () => {
      const { container } = render(<OuiIcon type="videoPlayer" />);
      const { container: expectedIcon } = render(<OuiIconBeaker />);
      expect(container.querySelector('svg')?.innerHTML).toBe(
        expectedIcon.querySelector('svg')?.innerHTML
      );
    });

    it('injects the specified icon', () => {
      appendIconComponentCache({
        videoPlayer: OuiIconVideoPlayer,
      });
      const { container } = render(<OuiIcon type="videoPlayer" />);
      const { container: expectedIcon } = render(<OuiIconVideoPlayer />);
      expect(container.querySelector('svg')?.innerHTML).toBe(
        expectedIcon.querySelector('svg')?.innerHTML
      );
    });

    it('does not impact non-loaded icons', () => {
      appendIconComponentCache({
        videoPlayer: OuiIconVideoPlayer,
      });
      const { container } = render(<OuiIcon type="accessibility" />);
      const { container: expectedIcon } = render(<OuiIconBeaker />);
      expect(container.querySelector('svg')?.innerHTML).toBe(
        expectedIcon.querySelector('svg')?.innerHTML
      );
    });
  });

  describe('render different types of icons', () => {
    it('renders icon when type is in cache', () => {
      appendIconComponentCache({
        videoPlayer: OuiIconVideoPlayer,
      });
      const { container } = render(<OuiIcon type="videoPlayer" />);
      expect(prettyHtml(container.innerHTML)).toMatchSnapshot();
    });

    it('renders custom svg from absolute url', () => {
      const { container } = render(
        <OuiIcon type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" />
      );
      expect(prettyHtml(container.innerHTML)).toMatchSnapshot();
    });

    it('renders custom svg from relative url', () => {
      const { container } = render(<OuiIcon type="./assets/beaker.svg" />);
      expect(prettyHtml(container.innerHTML)).toMatchSnapshot();
    });

    it('renders default icon when type is not in OuiIconType', () => {
      const { container } = render(<OuiIcon type="foo" />);
      expect(prettyHtml(container.innerHTML)).toMatchSnapshot();
    });

    it('renders custom components', () => {
      const CustomIcon = ({ ...props }) => {
        return (
          <span role="img" aria-label="heart" {...props}>
            ❤️
          </span>
        );
      };
      const { container } = render(<OuiIcon type={CustomIcon} />);
      expect(prettyHtml(container.innerHTML)).toMatchSnapshot();
    });
  });
});
