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
import { render, mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';

import { OuiFlyout, SIZES, PADDING_SIZES, SIDES } from './flyout';

jest.mock('../overlay_mask', () => ({
  OuiOverlayMask: ({ headerZindexLocation, ...props }: any) => (
    <div {...props} />
  ),
}));

jest.mock('../portal', () => ({
  OuiPortal: ({ children }: { children: any }) => children,
}));

describe('OuiFlyout', () => {
  test('is rendered', () => {
    const component = mount(
      <OuiFlyout {...requiredProps} onClose={() => {}} />
    );

    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  describe('props', () => {
    test('role can be removed', () => {
      const component = mount(<OuiFlyout onClose={() => {}} role={null} />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    test('hideCloseButton', () => {
      const component = mount(<OuiFlyout onClose={() => {}} hideCloseButton />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    test('closeButtonProps', () => {
      const component = mount(
        <OuiFlyout onClose={() => {}} closeButtonProps={requiredProps} />
      );

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    test('closeButtonPosition can be outside', () => {
      const component = mount(
        <OuiFlyout onClose={() => {}} closeButtonPosition="outside" />
      );

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('closeButtonAriaLabel', () => {
      test('has a default label for the close button', () => {
        const component = render(<OuiFlyout onClose={() => {}} />);
        const label = component
          .find('[data-test-subj="ouiFlyoutCloseButton"]')
          .prop('aria-label');
        expect(label).toBe('Close this dialog');
      });

      test('sets a custom label for the close button', () => {
        const component = render(
          <OuiFlyout
            onClose={() => {}}
            closeButtonAriaLabel="Closes specific flyout"
          />
        );
        const label = component
          .find('[data-test-subj="ouiFlyoutCloseButton"]')
          .prop('aria-label');
        expect(label).toBe('Closes specific flyout');
      });
    });

    test('accepts div props', () => {
      const component = mount(<OuiFlyout onClose={() => {}} id="imaflyout" />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('sides', () => {
      SIDES.forEach((side) => {
        it(`${side} is rendered`, () => {
          const component = mount(<OuiFlyout onClose={() => {}} side={side} />);

          expect(
            takeMountedSnapshot(component, { hasArrayOutput: true })
          ).toMatchSnapshot();
        });
      });
    });

    describe('type=push', () => {
      test('is rendered', () => {
        const component = mount(
          <OuiFlyout onClose={() => {}} type="push" pushMinBreakpoint="xs" />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });
    });

    test('is rendered as nav', () => {
      const component = mount(<OuiFlyout onClose={() => {}} as="nav" />);

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('size', () => {
      SIZES.forEach((size) => {
        it(`${size} is rendered`, () => {
          const component = mount(<OuiFlyout onClose={() => {}} size={size} />);

          expect(
            takeMountedSnapshot(component, { hasArrayOutput: true })
          ).toMatchSnapshot();
        });
      });

      it('accepts custom number', () => {
        const component = mount(<OuiFlyout onClose={() => {}} size={500} />);

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });
    });

    describe('paddingSize', () => {
      PADDING_SIZES.forEach((paddingSize) => {
        it(`${paddingSize} is rendered`, () => {
          const component = mount(
            <OuiFlyout onClose={() => {}} paddingSize={paddingSize} />
          );

          expect(
            takeMountedSnapshot(component, { hasArrayOutput: true })
          ).toMatchSnapshot();
        });
      });
    });

    describe('maxWidth', () => {
      test('can be set to a default', () => {
        const component = mount(
          <OuiFlyout onClose={() => {}} maxWidth={true} />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });

      test('can be set to a custom number', () => {
        const component = mount(
          <OuiFlyout onClose={() => {}} maxWidth={1024} />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });

      test('can be set to a custom value and measurement', () => {
        const component = mount(
          <OuiFlyout onClose={() => {}} maxWidth="24rem" />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });
    });

    test('outsideClickCloses', () => {
      const component = mount(
        <OuiFlyout onClose={() => {}} outsideClickCloses />
      );

      expect(
        takeMountedSnapshot(component, { hasArrayOutput: true })
      ).toMatchSnapshot();
    });

    describe('ownFocus', () => {
      test('can be false', () => {
        const component = mount(
          <OuiFlyout onClose={() => {}} ownFocus={false} />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });

      test('can alter mask props with maskProps without throwing error', () => {
        const component = mount(
          <OuiFlyout
            onClose={() => {}}
            maskProps={{ headerZindexLocation: 'above' }}
          />
        );

        expect(
          takeMountedSnapshot(component, { hasArrayOutput: true })
        ).toMatchSnapshot();
      });
    });
  });
});
