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
import { OuiButton } from '../../../../src/components';

import { OuiWindowEvent } from '../../../../src/services';

export const ModalExample = (props) => {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const close = () => {
    if (open) {
      setOpen(false);
    }
  };

  const closeOnEscape = ({ key }) => {
    if (key === 'Escape') {
      close();
    }
  };

  const { modal: Modal, buttonText = 'Open Modal' } = props;
  const button = <OuiButton onClick={openModal}>{buttonText}</OuiButton>;

  return (
    <div>
      <OuiWindowEvent event="keydown" handler={closeOnEscape} />
      {open ? <Modal onClose={close} /> : button}
    </div>
  );
};
