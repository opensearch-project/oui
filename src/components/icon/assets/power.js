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
const OuiIconPower = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 0a.5.5 0 0 1 .5.5v5a.5.5 0 0 1-1 0v-5A.5.5 0 0 1 8 0z" />
    <path d="M10.55.932a.5.5 0 0 1 .663-.246C13.849 1.896 16 4.437 16 7.809 16 12.32 12.43 16 8 16s-8-3.68-8-8.191C0 4.436 2.17 1.896 4.79.686a.5.5 0 0 1 .42.908C2.86 2.68 1 4.908 1 7.808 1 11.792 4.146 15 8 15s7-3.208 7-7.192c0-2.901-1.845-5.13-4.204-6.213a.5.5 0 0 1-.246-.663z" />
  </svg>
);
export const icon = OuiIconPower;
