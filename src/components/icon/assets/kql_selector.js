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
const OuiIconKqlSelector = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1A5 5 0 1 1 5 3a5 5 0 0 1 0 10Zm6-1a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 1a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z" />
  </svg>
);
export const icon = OuiIconKqlSelector;
