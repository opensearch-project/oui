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

import React, { useState } from 'react';

import {
  OuiButton,
  OuiConfirmModal,
  OuiFlexGroup,
  OuiFlexItem,
} from '../../../../src/components';

export default () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDestroyModalVisible, setIsDestroyModalVisible] = useState(false);

  const closeModal = () => setIsModalVisible(false);
  const showModal = () => setIsModalVisible(true);

  const closeDestroyModal = () => setIsDestroyModalVisible(false);
  const showDestroyModal = () => setIsDestroyModalVisible(true);

  let modal;

  if (isModalVisible) {
    modal = (
      <OuiConfirmModal
        title="Do this thing"
        onCancel={closeModal}
        onConfirm={closeModal}
        cancelButtonText="No, don't do it"
        confirmButtonText="Yes, do it"
        defaultFocusedButton="confirm">
        <p>You&rsquo;re about to do something.</p>
        <p>Are you sure you want to do this?</p>
      </OuiConfirmModal>
    );
  }

  let destroyModal;

  if (isDestroyModalVisible) {
    destroyModal = (
      <OuiConfirmModal
        title="Do this destructive thing"
        onCancel={closeDestroyModal}
        onConfirm={closeDestroyModal}
        cancelButtonText="No, don't do it"
        confirmButtonText="Yes, do it"
        buttonColor="danger"
        defaultFocusedButton="confirm">
        <p>You&rsquo;re about to destroy something.</p>
        <p>Are you sure you want to do this?</p>
      </OuiConfirmModal>
    );
  }

  return (
    <div>
      <OuiFlexGroup responsive={false} wrap gutterSize="xs">
        <OuiFlexItem grow={false}>
          <OuiButton onClick={showModal}>Show confirm modal</OuiButton>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiButton onClick={showDestroyModal}>
            Show dangerous confirm modal
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>
      {modal}
      {destroyModal}
    </div>
  );
};
