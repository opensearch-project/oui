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
const OuiIconCloudStormy = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.421 4.93a.5.5 0 1 1-.87.49 3 3 0 1 0-4.43 3.918.5.5 0 0 1-.626.78 4 4 0 0 1 3.973-6.84l.032.018V3.28a5.5 5.5 0 1 1 7.003 7.357.5.5 0 1 1-.36-.934 4.5 4.5 0 1 0-5.77-5.923c.42.31.778.701 1.05 1.15h-.002ZM9.6 11c.669.002.794.67.36 1.003l-4.68 3.882c-.457.378-1.053-.26-.643-.689l3.08-3.193A5411.7 5411.7 0 0 1 5.113 12c-.668-.001-.793-.669-.36-1.003l4.68-3.881c.458-.379 1.053.26.643.688l-3.08 3.193L9.6 11Z" />
  </svg>
);
export const icon = OuiIconCloudStormy;
