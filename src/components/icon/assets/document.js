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
const OuiIconDocument = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.8 0c.274 0 .537.113.726.312l3.2 3.428c.176.186.274.433.274.689V15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V1a1 1 0 0 1 1-1h8.8ZM14 5h-3.5a.5.5 0 0 1-.5-.5V1H2v14h12V5Zm-8.5 7a.5.5 0 1 1 0-1h5a.5.5 0 1 1 0 1h-5Zm0-3a.5.5 0 0 1 0-1h5a.5.5 0 1 1 0 1h-5Z" />
  </svg>
);
export const icon = OuiIconDocument;
