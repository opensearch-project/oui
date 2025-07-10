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
const OuiIconWsAnalytics = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1 8.7h4.2v5.6H1V8.7Zm9.8-3.5H15v9.1h-4.2V5.2ZM5.9 1.7h4.2v12.6H5.9V1.7Zm-3.5 8.4v2.8h1.4v-2.8H2.4Zm4.9-7v9.8h1.4V3.1H7.3Zm4.9 3.5v6.3h1.4V6.6h-1.4Z" />
  </svg>
);
export const icon = OuiIconWsAnalytics;
