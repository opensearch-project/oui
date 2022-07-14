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

import React from 'react';

import {
  OuiModal,
  OuiModalBody,
  OuiModalHeader,
  OuiModalHeaderTitle,
} from '../../../../src/components';

import { ModalExample } from './modal_example_container';

const BasicModal = ({ onClose }) => (
  <OuiModal onClose={onClose} style={{ width: '800px' }}>
    <OuiModalHeader>
      <OuiModalHeaderTitle>
        <h1>Example modal</h1>
      </OuiModalHeaderTitle>
    </OuiModalHeader>
    <OuiModalBody>
      <p>
        This modal closes when you press ESC, using a window event listener.
      </p>
    </OuiModalBody>
  </OuiModal>
);

export const BasicWindowEvent = () => <ModalExample modal={BasicModal} />;
