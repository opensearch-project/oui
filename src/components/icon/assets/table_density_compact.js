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
const OuiIconTableDensityCompact = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 3v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1Zm-1 0V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v1h14Zm0 1H1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4ZM4.496 7a.5.5 0 0 1 0 1H2.495a.5.5 0 0 1 0-1h2.001Zm5.218 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 8 6 7.776 6 7.5s.128-.5.286-.5h3.428ZM4.496 5a.5.5 0 0 1 0 1H2.495a.5.5 0 0 1 0-1h2.001Zm5.218 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 6 6 5.776 6 5.5s.128-.5.286-.5h3.428ZM4.496 9a.5.5 0 0 1 0 1H2.495a.5.5 0 0 1 0-1h2.001Zm5.218 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 10 6 9.776 6 9.5s.128-.5.286-.5h3.428Zm-5.218 2a.5.5 0 0 1 0 1H2.495a.5.5 0 0 1 0-1h2.001Zm5.218 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 12 6 11.776 6 11.5s.128-.5.286-.5h3.428Zm-5.218 2a.5.5 0 0 1 0 1H2.495a.5.5 0 0 1 0-1h2.001Zm9-6a.5.5 0 0 1 0 1h-2.001a.5.5 0 0 1 0-1h2.001Zm0-2a.5.5 0 0 1 0 1h-2.001a.5.5 0 0 1 0-1h2.001Zm0 4a.5.5 0 0 1 0 1h-2.001a.5.5 0 0 1 0-1h2.001Zm0 2a.5.5 0 0 1 0 1h-2.001a.5.5 0 0 1 0-1h2.001Zm0 2a.5.5 0 0 1 0 1h-2.001a.5.5 0 0 1 0-1h2.001Zm-3.782 0c.158 0 .286.224.286.5s-.128.5-.286.5H6.286C6.128 14 6 13.776 6 13.5s.128-.5.286-.5h3.428Z" />
  </svg>
);
export const icon = OuiIconTableDensityCompact;
