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
const OuiIconVisBarHorizontalStacked = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.5 0a.5.5 0 0 1 .5.5v14a.5.5 0 1 1-1 0V.5A.5.5 0 0 1 .5 0Zm13 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5H9v3h2.5a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-9a.5.5 0 1 1 0-1H9v-3H2.5a.5.5 0 0 1 0-1H6V6H2.5a.5.5 0 0 1 0-1H10V2H2.5a.5.5 0 0 1 0-1h11Z" />
  </svg>
);
export const icon = OuiIconVisBarHorizontalStacked;
