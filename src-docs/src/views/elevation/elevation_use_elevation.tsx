/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

import { OuiButton } from '../../../../src/components/button';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiPanel } from '../../../../src/components/panel';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiText } from '../../../../src/components/text';
import { OuiElevationProvider, useElevation } from '../../../../src/services';

function DemoOverlay({
  label,
  onClose,
}: {
  label: string;
  onClose: () => void;
}) {
  const { style } = useElevation();
  return (
    <OuiPanel
      style={{ ...style, position: 'relative', marginTop: 8 }}
      hasShadow>
      <OuiFlexGroup justifyContent="spaceBetween" alignItems="center">
        <OuiFlexItem grow={false}>
          <OuiText size="s">
            <p>
              {label} &mdash; z-index: <strong>{style.zIndex}</strong>
            </p>
          </OuiText>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiButton size="s" onClick={onClose}>
            Close
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiPanel>
  );
}

export const ElevationUseElevation = () => {
  const [overlays, setOverlays] = useState<string[]>([]);

  const addOverlay = (type: string) => {
    setOverlays((prev) => [...prev, `${type} ${prev.length + 1}`]);
  };

  const removeOverlay = (index: number) => {
    setOverlays((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <OuiElevationProvider>
      <OuiFlexGroup gutterSize="s">
        <OuiFlexItem grow={false}>
          <OuiButton onClick={() => addOverlay('Modal')}>Open Modal</OuiButton>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiButton onClick={() => addOverlay('Popover')}>
            Open Popover
          </OuiButton>
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiButton onClick={() => addOverlay('Tooltip')}>
            Open Tooltip
          </OuiButton>
        </OuiFlexItem>
      </OuiFlexGroup>
      <OuiSpacer />
      {overlays.map((label, i) => (
        <DemoOverlay
          key={`${label}-${i}`}
          label={label}
          onClose={() => removeOverlay(i)}
        />
      ))}
    </OuiElevationProvider>
  );
};

export default ElevationUseElevation;
