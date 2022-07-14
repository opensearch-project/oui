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
  OuiStat,
  OuiFlexItem,
  OuiFlexGroup,
  OuiPanel,
  OuiIcon,
  OuiSwitch,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isLoading, setLoading] = useState(false);

  const onToggleChange = (e) => {
    setLoading(e.target.checked);
  };

  return (
    <div>
      <OuiFlexGroup>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title="8,888"
              description="Total widgets"
              textAlign="right"
              isLoading={isLoading}>
              <OuiIcon type="empty" />
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title="2,000"
              description="Pending widgets"
              titleColor="accent"
              textAlign="right"
              isLoading={isLoading}>
              <OuiIcon type="clock" color="accent" />
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title="6,800"
              description="Success widgets"
              titleColor="success"
              textAlign="right"
              isLoading={isLoading}>
              <OuiIcon type="check" color="success" />
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
        <OuiFlexItem>
          <OuiPanel>
            <OuiStat
              title="88"
              description="Error widgets"
              titleColor="danger"
              textAlign="right"
              isLoading={isLoading}>
              <OuiIcon type="alert" color="danger" />
            </OuiStat>
          </OuiPanel>
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer />
      <OuiSwitch
        label="Show as loading"
        checked={isLoading}
        onChange={onToggleChange}
      />
    </div>
  );
};
