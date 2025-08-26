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
import { requiredProps } from '../../test';

import { OuiCollapsibleNav } from './collapsible_nav';
import { OuiOverlayMaskProps } from '../overlay_mask';

jest.mock('../overlay_mask', () => ({
  OuiOverlayMask: ({ headerZindexLocation, ...props }: any) => (
    <div {...props} />
  ),
}));

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: { children: any }) => children,
}));

const propsNeededToRender = { id: 'id', isOpen: true, onClose: () => {} };
const flyoutProps = {
  size: 240,
  ownFocus: false,
  outsideClickCloses: false,
  maskProps: { headerZindexLocation: 'above' } as OuiOverlayMaskProps,
};

describe('OuiCollapsibleNav', () => {
  test('is rendered', () => {
    render(<OuiCollapsibleNav {...propsNeededToRender} {...requiredProps} />);

    expect(document.body).toMatchSnapshot();
  });

  describe('props', () => {
    test('onClose', () => {
      render(<OuiCollapsibleNav {...propsNeededToRender} onClose={() => {}} />);

      expect(document.body).toMatchSnapshot();
    });

    test('size', () => {
      render(<OuiCollapsibleNav {...propsNeededToRender} size={240} />);

      expect(document.body).toMatchSnapshot();
    });

    test('isDocked', () => {
      const { container } = render(
        <OuiCollapsibleNav {...propsNeededToRender} isDocked={true} />
      );

      expect(container).toMatchSnapshot();
    });

    test('dockedBreakpoint', () => {
      render(
        <OuiCollapsibleNav {...propsNeededToRender} dockedBreakpoint={500} />
      );

      expect(document.body).toMatchSnapshot();
    });

    test('button', () => {
      render(
        <OuiCollapsibleNav {...propsNeededToRender} button={<button />} />
      );

      expect(document.body).toMatchSnapshot();
    });

    test('showButtonIfDocked', () => {
      render(
        <OuiCollapsibleNav
          {...propsNeededToRender}
          button={<button />}
          isDocked={true}
          showButtonIfDocked={true}
        />
      );

      expect(document.body).toMatchSnapshot();
    });

    test('accepts OuiFlyout props', () => {
      render(<OuiCollapsibleNav {...propsNeededToRender} {...flyoutProps} />);

      expect(document.body).toMatchSnapshot();
    });
  });

  describe('close button', () => {
    test('can be hidden', () => {
      render(
        <OuiCollapsibleNav {...propsNeededToRender} hideCloseButton={true} />
      );

      expect(document.body).toMatchSnapshot();
    });
  });

  test('does not render if isOpen is false', () => {
    const { container } = render(
      <OuiCollapsibleNav onClose={() => {}} id="id" />
    );

    expect(container).toMatchSnapshot();
  });
});
