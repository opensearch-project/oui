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
const OuiIconMlCreatePopulationJob = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 0c5.523 0 10 4.477 10 10s-4.477 10-10 10S6 15.523 6 10 10.477 0 16 0zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
    <path
      d="M8.4 19.288c.492.402 1.015.766 1.566 1.087L7.26 23.682a4 4 0 1 1-1.437-1.243l2.578-3.151zm15.2 0 2.577 3.15a4 4 0 1 1-1.437 1.243l-2.706-3.306a12.032 12.032 0 0 0 1.565-1.087zM4 24a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm24 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 6v3h3v2h-3v3h-2v-3h-3V9h3V6h2z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconMlCreatePopulationJob;
