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
  OuiFormRow,
  OuiFieldText,
} from '../../../../src/components';

export default () => {
  const [isLoading, setIsLoading] = useState(false);
  clearTimeout(searchTimeout);
  const searchTimeout = setTimeout(() => {
    // Simulate a remotely-executed search.
    setIsLoading(false);
  }, 1200);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
    setIsLoading(true);
  };
  const closeModal = () => {
    setIsModalVisible(false);
    setIsLoading(false);
    clearTimeout(searchTimeout);
  };

  const [value, setValue] = useState('');
  const onChange = (e) => {
    setValue(e.target.value);
  };

  let modal;

  if (isModalVisible) {
    modal = (
      <OuiConfirmModal
        title="Delete the OUI repo?"
        onCancel={closeModal}
        onConfirm={() => {
          closeModal();
          window.alert('Shame on you!');
        }}
        confirmButtonText="Delete"
        cancelButtonText="Cancel"
        buttonColor="danger"
        initialFocus="[name=delete]"
        confirmButtonDisabled={value.toLowerCase() !== 'delete'}
        isLoading={isLoading}>
        <OuiFormRow label="Type the word 'delete' to confirm">
          <OuiFieldText
            name="delete"
            isLoading={isLoading}
            value={value}
            onChange={onChange}
          />
        </OuiFormRow>
      </OuiConfirmModal>
    );
  }

  return (
    <div>
      <OuiButton onClick={showModal}>Show loading confirm modal</OuiButton>
      {modal}
    </div>
  );
};
