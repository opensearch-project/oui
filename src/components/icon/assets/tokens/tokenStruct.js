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
const OuiIconTokenStruct = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M4.336 4.667h2.667v2.666H4.336V4.667Zm0 4h2.667v2.666H4.336V8.667Zm4-4h2.667v2.666H8.336V4.667Zm0 4h2.667v2.666H8.336V8.667ZM3.003 3.333v9.334h9.333V3.333H3.003Zm0-1.333h9.333c.737 0 1.334.597 1.334 1.333v9.334c0 .736-.597 1.333-1.334 1.333H3.003a1.333 1.333 0 0 1-1.333-1.333V3.333C1.67 2.597 2.267 2 3.003 2Z"
    />
  </svg>
);
export const icon = OuiIconTokenStruct;
