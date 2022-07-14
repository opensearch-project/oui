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

const OuiIconMlRegressionJob = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M24 0a8 8 0 11-4.906 14.32l-4.774 4.774a8 8 0 11-1.414-1.414l4.774-4.774A8 8 0 0124 0zM8 18a6 6 0 100 12 6 6 0 000-12zM24 2a6 6 0 100 12 6 6 0 000-12z" />
    <path
      className="ouiIcon__fillSecondary"
      d="M32 20v12H20V20h12zm-2 2h-8v8h8v-8zM12 0v12H0V0h12zm-2 2H2v8h8V2z"
    />
  </svg>
);

export const icon = OuiIconMlRegressionJob;
