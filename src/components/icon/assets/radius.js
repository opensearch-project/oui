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
const OuiIconRadius = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M3.05 12.95a7 7 0 1 0 9.9-9.9 7 7 0 0 0-9.9 9.9Zm.707-.707a6 6 0 0 0 8.825-8.118L10 6.707V10H6V6h3.293l2.582-2.582a6 6 0 0 0-8.118 8.825ZM9 7v2H7V7h2Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconRadius;
