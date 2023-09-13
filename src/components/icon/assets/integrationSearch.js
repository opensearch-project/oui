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
const OuiIconIntegrationSearch = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.282 7.4a4.5 4.5 0 0 1-8.666-.376l.851-.168L.847 5.18l-.848 2.167.897-.176a5.25 5.25 0 0 0 10.125.461l-.739-.233zm.836-2.54A5.25 5.25 0 0 0 .993 4.4l.713.232a4.5 4.5 0 0 1 8.666.375l-.851.169 1.62 1.672.858-2.164-.88.177z" />
    <path d="M9.042 8.132a.378.378 0 1 1-.54.53l-1.355-1.38a.378.378 0 0 1 0-.53 1.63 1.63 0 1 0-1.162.487.378.378 0 1 1 0 .757 2.385 2.385 0 1 1 1.942-.999l1.115 1.135z" />
  </svg>
);
export const icon = OuiIconIntegrationSearch;
