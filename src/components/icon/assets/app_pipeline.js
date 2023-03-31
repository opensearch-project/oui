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
const OuiIconAppPipeline = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M29 12a3 3 0 0 0-3 3h-4a3 3 0 0 0-3-3h-6a3 3 0 0 0-3 3H6a3 3 0 0 0-3-3H0v14h3a3 3 0 0 0 3-3h4a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3h4a3 3 0 0 0 3 3h3V12h-3ZM3 24H2V14h1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1Zm17-3v2a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1v-2H6v-4h6v-2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2h6v4h-6Zm10 3h-1a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h1v10Z" />
    <path d="M22 6H10v2h5v2h2V8h5z" className="ouiIcon__fillSecondary" />
  </svg>
);
export const icon = OuiIconAppPipeline;
