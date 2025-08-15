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
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { requiredProps } from '../../test';
import { keys } from '../../services';

import { OuiImage } from './image';

describe('OuiImage', () => {
  test('is rendered', () => {
    const { container } = render(
      <OuiImage alt="alt" size="l" url="/cat.jpg" {...requiredProps} />
    );

    expect(container).toMatchSnapshot();
  });

  test('is rendered and allows full screen', () => {
    const { container } = render(
      <OuiImage
        alt="alt"
        size="l"
        url="/cat.jpg"
        allowFullScreen
        {...requiredProps}
      />
    );

    expect(container).toMatchSnapshot();
  });

  test('is rendered with src', () => {
    const { container } = render(
      <OuiImage alt="alt" float="left" src="/cat.jpg" />
    );

    expect(container).toMatchSnapshot();
  });

  test('is rendered with a float', () => {
    const { container } = render(
      <OuiImage alt="alt" float="left" url="/cat.jpg" />
    );

    expect(container).toMatchSnapshot();
  });

  test('is rendered with a margin', () => {
    const { container } = render(
      <OuiImage alt="alt" margin="l" url="/cat.jpg" />
    );

    expect(container).toMatchSnapshot();
  });

  test('is rendered with custom size', () => {
    const { container } = render(
      <OuiImage alt="alt" size={50} url="/cat.jpg" />
    );

    expect(container).toMatchSnapshot();
  });

  test('is rendered with a node as the caption', () => {
    const { container } = render(
      <OuiImage alt="alt" caption={<span>caption</span>} url="/cat.jpg" />
    );

    expect(container).toMatchSnapshot();
  });

  describe('Full screen behaviour', () => {
    beforeEach(() => {
      render(
        <OuiImage
          alt="alt"
          size="l"
          url="/cat.jpg"
          allowFullScreen
          {...requiredProps}
          data-test-subj="ouiImage"
        />
      );

      const activateButton = screen.getByTestId('activateFullScreenButton');
      fireEvent.click(activateButton);
    });

    test('full screen image is rendered', () => {
      const overlayMask = screen.getByTestId('fullScreenOverlayMask');
      expect(overlayMask).toBeInTheDocument();

      // Find the image within the full screen overlay
      const fullScreenImage = screen.getAllByTestId('ouiImage')[1]; // Get the second instance which is in the overlay
      expect(fullScreenImage).toBeInTheDocument();
    });

    test('close using close icon', () => {
      const deactivateFullScreenBtn = screen.getByTestId(
        'deactivateFullScreenButton'
      );
      expect(deactivateFullScreenBtn).toBeInTheDocument();

      act(() => {
        fireEvent.click(deactivateFullScreenBtn);
      });

      expect(
        screen.queryByTestId('fullScreenOverlayMask')
      ).not.toBeInTheDocument();
    });

    test('close using ESCAPE key', () => {
      const deactivateFullScreenBtn = screen.getByTestId(
        'deactivateFullScreenButton'
      );
      expect(deactivateFullScreenBtn).toBeInTheDocument();

      act(() => {
        fireEvent.keyDown(deactivateFullScreenBtn, {
          key: keys.ESCAPE,
          bubbles: true,
        });
      });

      expect(
        screen.queryByTestId('fullScreenOverlayMask')
      ).not.toBeInTheDocument();
    });

    test('close using overlay mask', () => {
      const overlayMask = screen.getByTestId('fullScreenOverlayMask');
      expect(overlayMask).toBeInTheDocument();

      act(() => {
        fireEvent.click(overlayMask);
      });

      expect(
        screen.queryByTestId('fullScreenOverlayMask')
      ).not.toBeInTheDocument();
    });
  });
});
