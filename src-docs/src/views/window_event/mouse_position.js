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
  OuiSwitch,
  OuiDescriptionList,
  OuiSpacer,
} from '../../../../src/components';

import { OuiWindowEvent } from '../../../../src/services';

export const MousePosition = () => {
  const [tracking, setTracking] = useState(false);
  const [coordinates, setCoordinates] = useState({});

  const onSwitchChange = () => {
    setTracking(!tracking);
  };

  const onMouseMove = ({ clientX, clientY }) => {
    setCoordinates({ clientX, clientY });
  };

  const listItems = [
    {
      title: 'Position X',
      description: coordinates.clientX || '??',
    },
    {
      title: 'Position Y',
      description: coordinates.clientY || '??',
    },
  ];
  return (
    <div>
      <OuiSwitch
        label="Track mouse position"
        checked={tracking}
        onChange={onSwitchChange}
      />
      {tracking ? (
        <OuiWindowEvent event="mousemove" handler={onMouseMove} />
      ) : null}
      <OuiSpacer size="l" />
      <OuiDescriptionList listItems={listItems} />
      <OuiSpacer size="xxl" />
    </div>
  );
};
