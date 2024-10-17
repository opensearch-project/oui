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
const OuiIconLineChart = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3.333 2v10.667H14V14H2V2h1.334zm10.195 2.195.943.943-3.805 3.805-2-2-2.862 2.862-.942-.943 3.804-3.805 2 2 2.862-2.862z" />
  </svg>
);
export const icon = OuiIconLineChart;
