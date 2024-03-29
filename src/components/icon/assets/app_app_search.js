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
const OuiIconAppAppSearch = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M15.5 11.915 27 5.279 19.5.938a7.002 7.002 0 0 0-7 0l-8 4.62A7 7 0 0 0 1 11.62v9.237a7 7 0 0 0 3.5 6.061l7.5 4.33V17.98a7 7 0 0 1 3.5-6.063ZM10 27.785v-9.808a9 9 0 0 1 4.5-7.793l8.503-4.91L18.5 2.672a5.003 5.003 0 0 0-5 0l-8 4.619A5 5 0 0 0 3 11.62v9.238a5 5 0 0 0 2.5 4.33l4.5 2.598Z"
    />
    <path
      fillRule="evenodd"
      d="M18.409 13.55a7.089 7.089 0 0 1 1.035 1.711A6.93 6.93 0 0 1 20 17.98v13.27l7.5-4.33a7 7 0 0 0 3.5-6.061v-9.239a6.992 6.992 0 0 0-1.587-4.421L18.409 13.55Zm2.777.705A8.933 8.933 0 0 1 22 17.979v9.807l4.5-2.598a5 5 0 0 0 2.5-4.33V11.62c0-.588-.106-1.161-.303-1.7l-7.511 4.335Z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconAppAppSearch;
