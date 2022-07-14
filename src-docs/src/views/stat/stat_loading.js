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

import { OuiSwitch, OuiStat, OuiSpacer } from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(true);

  const onToggleChange = (e) => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <OuiStat
        title="7,600 mm"
        description="Total People"
        isLoading={isLoading}
      />
      <OuiSpacer />
      <OuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
