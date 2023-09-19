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
const OuiIconMenuDown = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6 7.5c0 .276-.216.5-.495.5h-2.01a.503.503 0 0 1-.487-.412L3 7.5c0-.276.216-.5.495-.5h2.01c.243 0 .445.183.487.412L6 7.5ZM3.51 4a.513.513 0 0 1-.502-.412L3 3.5c0-.276.228-.5.51-.5h8.98c.25 0 .459.183.502.412L13 3.5c0 .276-.228.5-.51.5H8.493v7.792l2.06-2.06a.5.5 0 1 1 .707.707L9.14 12.56A1.496 1.496 0 0 1 8.026 13L7.993 13a.501.501 0 0 1-.118-.014 1.493 1.493 0 0 1-.857-.426l-2.122-2.12a.5.5 0 0 1 .708-.708l1.889 1.89V4H3.51ZM13 7.5c0 .276-.216.5-.495.5h-2.01a.503.503 0 0 1-.487-.412L10 7.5c0-.276.216-.5.495-.5h2.01c.243 0 .445.183.487.412L13 7.5Z" />
  </svg>
);
export const icon = OuiIconMenuDown;
