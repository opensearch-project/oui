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
const OuiIconSymlink = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M10.8 0H2a1 1 0 0 0-1 1v8l1-1V1h8v3.5a.5.5 0 0 0 .5.5H14v10H2v-1a3.5 3.5 0 0 1 3.5-3.5H8V13l3-3-3-3v2.5H5.5A4.5 4.5 0 0 0 1 14v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4.429c0-.256-.098-.503-.274-.689l-3.2-3.428A1.002 1.002 0 0 0 10.8 0Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconSymlink;
