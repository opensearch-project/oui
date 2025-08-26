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
import { render, fireEvent, waitFor } from '@testing-library/react';

import { requiredProps } from '../../test';
import { keys } from '../../services';

import {
  CANCEL_BUTTON,
  CONFIRM_BUTTON,
  OuiConfirmModal,
} from './confirm_modal';

let onConfirm: jest.Mock;
let onCancel: jest.Mock;

beforeEach(() => {
  onConfirm = jest.fn();
  onCancel = jest.fn();
});

describe('OuiConfirmModal', () => {
  test('renders OuiConfirmModal', () => {
    render(
      <OuiConfirmModal
        title="A confirmation modal"
        onCancel={() => {}}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        {...requiredProps}>
        This is a confirmation modal example
      </OuiConfirmModal>
    );
    expect(document.body).toMatchSnapshot();
  });

  test('renders OuiConfirmModal without OuiModalBody, if empty', () => {
    render(
      <OuiConfirmModal
        title="A confirmation modal"
        onCancel={() => {}}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        {...requiredProps}
      />
    );
    expect(document.body).toMatchSnapshot();
  });

  test('onConfirm', () => {
    const { getByTestId } = render(
      <OuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    fireEvent.click(getByTestId('confirmModalConfirmButton'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(0);
  });

  test('isLoading', () => {
    const { getByTestId } = render(
      <OuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        isLoading
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    fireEvent.click(getByTestId('confirmModalConfirmButton'));
    expect(onConfirm).toHaveBeenCalledTimes(0);
  });

  test('onConfirm can be disabled', () => {
    const { getByTestId } = render(
      <OuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        confirmButtonDisabled={true}
      />
    );

    fireEvent.click(getByTestId('confirmModalConfirmButton'));
    expect(onConfirm).toHaveBeenCalledTimes(0);
    expect(onCancel).toHaveBeenCalledTimes(0);
  });

  describe('onCancel', () => {
    test('triggerd by click', () => {
      const { getByTestId } = render(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
        />
      );

      fireEvent.click(getByTestId('confirmModalCancelButton'));
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('triggered by esc key', () => {
      const { getByTestId } = render(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          data-test-subj="modal"
        />
      );

      fireEvent.keyDown(getByTestId('modal'), {
        key: keys.ESCAPE,
      });
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultFocusedButton', () => {
    test('is cancel', async () => {
      const { getByTestId } = render(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          defaultFocusedButton={CANCEL_BUTTON}
        />
      );

      // The auto-focus implementation waits a frame before focusing.
      await waitFor(() => {
        const button = getByTestId('confirmModalCancelButton');
        expect(document.activeElement).toEqual(button);
      });
    });

    test('is confirm', async () => {
      const { getByTestId } = render(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          defaultFocusedButton={CONFIRM_BUTTON}
        />
      );

      // The auto-focus implementation waits a frame before focusing.
      await waitFor(() => {
        const button = getByTestId('confirmModalConfirmButton');
        expect(document.activeElement).toEqual(button);
      });
    });
  });
});
