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
const OuiIconMlDataVisualizer = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 20v10h10v2H0V20h2zm30 0v12H20v-2h10V20h2zM12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16zm0 2a6 6 0 1 0 0 12 6 6 0 0 0 0-12zm0-6v2H2v10H0V0h12zm20 0v12h-2V2H20V0h12z" />
    <path
      d="M21.997 12.251c-.017.689-.104 1.36-.253 2.006a6 6 0 1 1-7.487 7.487c-.646.15-1.317.236-2.006.253a8 8 0 1 0 9.746-9.746z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconMlDataVisualizer;
