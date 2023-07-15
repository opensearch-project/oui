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
const OuiIconBranch = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5 10.038a3.49 3.49 0 0 1 2.5-1.05h2a2.5 2.5 0 0 0 2.462-2.061 2 2 0 1 1 1.008.017A3.5 3.5 0 0 1 9.5 9.987h-2a2.5 2.5 0 0 0-2.466 2.085A2 2 0 1 1 4 12.063V3.937a2 2 0 1 1 1 0v6.1ZM4.5 3a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0 12a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm8-9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
  </svg>
);
export const icon = OuiIconBranch;
