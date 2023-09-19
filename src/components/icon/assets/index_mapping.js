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
const OuiIconIndexMapping = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 8H4.915a1.5 1.5 0 1 1 0-1H8V2.5A1.5 1.5 0 0 1 9.5 1h2.585a1.5 1.5 0 1 1 0 1H9.5a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h2.585a1.5 1.5 0 1 1 0 1H9.5A1.5 1.5 0 0 1 8 12.5V8ZM3.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0 12a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm10-6a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z" />
  </svg>
);
export const icon = OuiIconIndexMapping;
