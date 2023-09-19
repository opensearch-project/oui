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
const OuiIconLogstashQueue = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.339 15.464H4.77a3.248 3.248 0 0 1-3.245-3.244V4.549H0v-1h2.526v8.67a2.247 2.247 0 0 0 2.245 2.245h6.568a2.247 2.247 0 0 0 2.244-2.244V3.549h2.455v1h-1.455v7.67a3.247 3.247 0 0 1-3.244 3.245Zm.513-5.962v1.095l-3.848 1.72-3.85-1.72V9.502l3.85 1.72 3.848-1.72Zm0-4.251v1.095l-3.848 1.72-3.85-1.72V5.25l3.85 1.72 3.848-1.72Zm0-4.251v1.095l-3.848 1.72-3.85-1.72V1l3.85 1.72L11.852 1Z" />
  </svg>
);
export const icon = OuiIconLogstashQueue;
