/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

import { OuiCode } from '../../../../src/components/code';
import { OuiSpacer } from '../../../../src/components/spacer';
import { OuiText } from '../../../../src/components/text';

export const ElevationLocal = () => (
  <div>
    <OuiText>
      <p>
        Local elevation uses <OuiCode>isolation: isolate</OuiCode> to create a
        contained stacking context. Within-component z-index values (1–3) stay
        below 90 to avoid conflicts with the overlay system.
      </p>
    </OuiText>
    <OuiSpacer />
    {/* Container with isolation: isolate — simulates ouiLocalElevation mixin */}
    <div
      style={{
        isolation: 'isolate',
        position: 'relative',
        height: 200,
        padding: 16,
      }}>
      <div
        style={{
          position: 'absolute',
          top: 16,
          left: 16,
          zIndex: 1,
          width: 200,
          padding: 16,
          background: '#E8F0FE',
          borderRadius: 4,
          border: '1px solid #B4D0FE',
        }}>
        <OuiText size="s">
          <p>
            <strong>z-index: 1</strong>
            <br />
            Base layer
          </p>
        </OuiText>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 60,
          zIndex: 2,
          width: 200,
          padding: 16,
          background: '#D4E4FE',
          borderRadius: 4,
          border: '1px solid #93B8FD',
        }}>
        <OuiText size="s">
          <p>
            <strong>z-index: 2</strong>
            <br />
            Middle layer
          </p>
        </OuiText>
      </div>
      <div
        style={{
          position: 'absolute',
          top: 64,
          left: 104,
          zIndex: 3,
          width: 200,
          padding: 16,
          background: '#C0D8FE',
          borderRadius: 4,
          border: '1px solid #6F9CFD',
        }}>
        <OuiText size="s">
          <p>
            <strong>z-index: 3</strong>
            <br />
            Top layer
          </p>
        </OuiText>
      </div>
    </div>
  </div>
);

export default ElevationLocal;
