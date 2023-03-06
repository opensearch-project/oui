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
  OuiHeader,
  OuiHeaderLogo,
  OuiSwitch,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [position, setPosition] = useState('static');

  const sections = [
    {
      items: [
        <OuiHeaderLogo iconType="logoOpenSearch">OpenSearch</OuiHeaderLogo>
      ],
      borders: 'right',
    },
  ];

  return (
    <>
      <OuiSwitch
        label={'Make header fixed position'}
        checked={position === 'fixed'}
        onChange={(e) => setPosition(e.target.checked ? 'fixed' : 'static')}
      />
      <OuiSpacer />
      <OuiHeader position={position} sections={sections} />
    </>
  );
};
