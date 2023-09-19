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
const OuiIconAppIndexRollup = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M32 26v-2h-2.1a5 5 0 0 0-.73-1.75l1.49-1.49-1.41-1.41-1.49 1.49A5 5 0 0 0 26 20.1V18h-2v2.1a5 5 0 0 0-1.75.73l-1.49-1.49-1.41 1.41 1.49 1.49A5 5 0 0 0 20.1 24H18v2h2.1a5 5 0 0 0 .73 1.75l-1.49 1.49 1.41 1.41 1.49-1.49a5 5 0 0 0 1.76.74V32h2v-2.1a5 5 0 0 0 1.75-.73l1.49 1.49 1.41-1.41-1.49-1.49A5 5 0 0 0 29.9 26H32Zm-7 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
    <path d="M25.71 24.29a1 1 0 0 0-1.09-.21 1.15 1.15 0 0 0-.33.21.93.93 0 0 0-.21.33 1 1 0 0 0 1.3 1.3 1.15 1.15 0 0 0 .33-.21 1 1 0 0 0 .21-1.09.94.94 0 0 0-.21-.33Z" />
    <path
      d="M5 6h16v2H5zM5 12h16v2H5zM5 18h10v2H5zM5 24h8v2H5z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M16 32H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h20a3 3 0 0 1 3 3v13h-2V3a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v26a1 1 0 0 0 1 1h13v2Z" />
  </svg>
);
export const icon = OuiIconAppIndexRollup;
