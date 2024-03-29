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
const OuiIconDocumentEdit = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m8.505 8.995 6.453-6.44-1.5-1.5-6.453 6.44 1.5 1.5ZM12.968.19c.258-.238.657-.26.91 0l1.928 1.929a.642.642 0 0 1 0 .909l-6.78 6.784A.641.641 0 0 1 8.57 10H6.643A.643.643 0 0 1 6 9.357V7.43c0-.17.067-.335.188-.455L12.968.19ZM4.5 13a.5.5 0 1 1 0-1h7a.5.5 0 1 1 0 1h-7Zm4-12a.5.5 0 0 1 0 1H2v13h12V7.5a.5.5 0 1 1 1 0V15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6.5Z" />
  </svg>
);
export const icon = OuiIconDocumentEdit;
