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
  OuiOverlayMask,
  OuiButton,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';

export default () => {
  const [maskOpen, changeMask] = useState(false);
  const [maskWithClickOpen, changeMaskWithClick] = useState(false);

  const modal = (
    <React.Fragment>
      <OuiOverlayMask
        onClick={() => {
          changeMask(false);
        }}>
        <OuiTitle>
          <h2> Click anywhere to close overlay. </h2>
        </OuiTitle>
      </OuiOverlayMask>
    </React.Fragment>
  );

  const maskWithClick = (
    <OuiOverlayMask>
      <OuiButton
        onClick={() => {
          changeMaskWithClick(false);
        }}>
        Click this button to close
      </OuiButton>
    </OuiOverlayMask>
  );

  return (
    <React.Fragment>
      <OuiButton
        onClick={() => {
          changeMask(true);
        }}>
        Overlay with onClick
      </OuiButton>
      <OuiSpacer size="xxl" />
      <OuiButton onClick={() => changeMaskWithClick(true)}>
        Overlay with button
      </OuiButton>
      {maskOpen ? modal : undefined}
      {maskWithClickOpen ? maskWithClick : undefined}
    </React.Fragment>
  );
};
