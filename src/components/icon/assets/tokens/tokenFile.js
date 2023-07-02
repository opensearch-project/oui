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
const OuiIconTokenFile = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.867 2.667H4a.667.667 0 0 0-.667.666v9.334c0 .368.299.666.667.666h8a.667.667 0 0 0 .667-.666V5.619a.669.669 0 0 0-.183-.459l-2.133-2.285a.668.668 0 0 0-.484-.208m1.466 4V12H4.667V4h4v2.333c0 .184.149.334.333.334h2.333Z" />
  </svg>
);
export const icon = OuiIconTokenFile;
