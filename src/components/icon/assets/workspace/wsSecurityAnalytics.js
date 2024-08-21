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
const OuiIconWsSecurityAnalytics = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m8 .5 5.602 1.245c.312.07.534.346.534.666V9.22a4.09 4.09 0 0 1-1.821 3.403L8 15.5l-4.315-2.877A4.09 4.09 0 0 1 1.864 9.22V2.41c0-.319.222-.596.534-.665L8 .5Zm0 1.397-4.773 1.06V9.22c0 .912.456 1.763 1.215 2.269L8 13.86l3.558-2.372a2.727 2.727 0 0 0 1.215-2.27V2.959L8 1.896ZM8 4.59a1.364 1.364 0 0 1 .683 2.544l-.001 2.91H7.318v-2.91A1.363 1.363 0 0 1 8 4.592Z" />
  </svg>
);
export const icon = OuiIconWsSecurityAnalytics;
