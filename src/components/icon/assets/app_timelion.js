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
const OuiIconAppTimelion = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4 4v20.34L16 32l12-7.64V4H4Zm22 2v4h-4a3 3 0 0 0-3 3v5h-6v-5a3 3 0 0 0-3-3H6V6h20Zm-7.87 14L16 22.52 13.87 20h4.26ZM6 12h4a1 1 0 0 1 1 1v6.7l3.69 4.37-2.58 3.06L6 23.24V12Zm7.81 16.22 2.19-2.6 2.19 2.6L16 29.61l-2.19-1.39Zm6.08-1.09-2.58-3.06L21 19.7V13a1 1 0 0 1 1-1h4v11.24l-6.11 3.89Z" />
    <path d="M4 0h24v2H4z" className="ouiIcon__fillSecondary" />
  </svg>
);
export const icon = OuiIconAppTimelion;
