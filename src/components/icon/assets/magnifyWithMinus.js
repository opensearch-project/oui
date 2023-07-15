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
const OuiIconMagnifyWithMinus = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.5 6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1h6Zm.74 4.74c0-.117.04-.225.107-.31A5.478 5.478 0 0 0 12 6.5 5.5 5.5 0 1 0 6.5 12a.5.5 0 1 1 0 1 6.5 6.5 0 1 1 4.936-2.27l4.419 4.418a.5.5 0 0 1-.707.707l-4.768-4.768a.499.499 0 0 1-.14-.347Z" />
  </svg>
);
export const icon = OuiIconMagnifyWithMinus;
