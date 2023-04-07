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
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M3.05 12.95a7 7 0 109.9-9.9 7 7 0 00-9.9 9.9zm.707-.707a6 6 0 008.825-8.118L10 6.707V10H6V6h3.293l2.582-2.582a6 6 0 00-8.118 8.825zM9 7v2H7V7h2z"
    />
  </svg>
);

export const icon = OuiIconRadius;
