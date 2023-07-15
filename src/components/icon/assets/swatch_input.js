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

import * as React from 'react';
const OuiIconSwatchInput = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <rect width={12} height={12} x={2} y={2} rx={3} />
    <rect
      width={11}
      height={11}
      x={2.5}
      y={2.5}
      className="ouiSwatchInput__stroke"
      rx={2}
    />
  </svg>
);
export const icon = OuiIconSwatchInput;
