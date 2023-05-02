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
const OuiIconTableDensityNormal = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 3v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1Zm-1 0V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1h14Zm0 1H1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4ZM4.5 6a.5.5 0 0 1 0 1H2.496a.5.5 0 1 1 0-1H4.5Zm5.214 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 7 6 6.776 6 6.5s.128-.5.286-.5h3.428ZM4.5 9a.5.5 0 0 1 0 1H2.496a.5.5 0 1 1 0-1H4.5Zm5.214 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 10 6 9.776 6 9.5s.128-.5.286-.5h3.428ZM4.5 12a.5.5 0 1 1 0 1H2.496a.5.5 0 1 1 0-1H4.5Zm9-6a.5.5 0 1 1 0 1h-2.004a.5.5 0 0 1 0-1H13.5Zm0 3a.5.5 0 1 1 0 1h-2.004a.5.5 0 0 1 0-1H13.5Zm0 3a.5.5 0 1 1 0 1h-2.004a.5.5 0 0 1 0-1H13.5Zm-3.786 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 13 6 12.776 6 12.5s.128-.5.286-.5h3.428Z" />
  </svg>
);
export const icon = OuiIconTableDensityNormal;
