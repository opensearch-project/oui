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

import React, { FunctionComponent } from 'react';
import { render, act } from '@testing-library/react';
import { useRenderToText } from './render_to_text';

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

afterAll(() => {
  jest.restoreAllMocks();
});

describe('useRenderToText', () => {
  it("Returns a ReactNode's rendered string content", () => {
    const renderedTexts: string[] = [];

    const Component: FunctionComponent = ({ children }) => {
      const text = useRenderToText(children);
      renderedTexts.push(text);
      return <div>{text}</div>;
    };

    const { rerender } = render(
      <Component>
        <div>
          <button>Hello There</button>
        </div>
      </Component>
    );

    act(() => {
      rerender(
        <Component>
          <span>and this</span>
        </Component>
      );
    });

    expect(renderedTexts).toEqual([
      '',
      '',
      'Hello There',
      'Hello There',
      'Hello There',
      'and this',
    ]);
  });
});
