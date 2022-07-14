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

import {
  findTestSubject,
  requiredProps,
  takeMountedSnapshot,
} from '../../test';
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
    const component = mount(
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
    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  test('renders OuiConfirmModal without OuiModalBody, if empty', () => {
    const component = mount(
      <OuiConfirmModal
        title="A confirmation modal"
        onCancel={() => {}}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        {...requiredProps}
      />
    );
    expect(
      takeMountedSnapshot(component, { hasArrayOutput: true })
    ).toMatchSnapshot();
  });

  test('onConfirm', () => {
    const component = mount(
      <OuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    findTestSubject(component, 'confirmModalConfirmButton').simulate('click');
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onCancel).toHaveBeenCalledTimes(0);
  });

  test('isLoading', () => {
    const component = mount(
      <OuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        isLoading
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
      />
    );

    findTestSubject(component, 'confirmModalConfirmButton').simulate('click');
    expect(onConfirm).toHaveBeenCalledTimes(0);
  });

  test('onConfirm can be disabled', () => {
    const component = mount(
      <OuiConfirmModal
        onCancel={onCancel}
        onConfirm={onConfirm}
        cancelButtonText="Cancel Button Text"
        confirmButtonText="Confirm Button Text"
        confirmButtonDisabled={true}
      />
    );

    findTestSubject(component, 'confirmModalConfirmButton').simulate('click');
    expect(onConfirm).toHaveBeenCalledTimes(0);
    expect(onCancel).toHaveBeenCalledTimes(0);
  });

  describe('onCancel', () => {
    test('triggerd by click', () => {
      const component = mount(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
        />
      );

      findTestSubject(component, 'confirmModalCancelButton').simulate('click');
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    test('triggered by esc key', () => {
      const component = mount(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          data-test-subj="modal"
        />
      );

      findTestSubject(component, 'modal').simulate('keydown', {
        key: keys.ESCAPE,
      });
      expect(onConfirm).toHaveBeenCalledTimes(0);
      expect(onCancel).toHaveBeenCalledTimes(1);
    });
  });

  describe('defaultFocusedButton', () => {
    test('is cancel', (done) => {
      const component = mount(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          defaultFocusedButton={CANCEL_BUTTON}
        />
      );

      // The auto-focus implementation waits a frame before focusing.
      requestAnimationFrame(() => {
        const button = findTestSubject(
          component,
          'confirmModalCancelButton'
        ).getDOMNode();
        expect(document.activeElement).toEqual(button);
        done();
      });
    });

    test('is confirm', (done) => {
      const component = mount(
        <OuiConfirmModal
          onCancel={onCancel}
          onConfirm={onConfirm}
          cancelButtonText="Cancel Button Text"
          confirmButtonText="Confirm Button Text"
          defaultFocusedButton={CONFIRM_BUTTON}
        />
      );

      // The auto-focus implementation waits a frame before focusing.
      requestAnimationFrame(() => {
        const button = findTestSubject(
          component,
          'confirmModalConfirmButton'
        ).getDOMNode();
        expect(document.activeElement).toEqual(button);
        done();
      });
    });
  });
});
