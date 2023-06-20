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
const OuiIconFilter = ({ title, titleId, ...props }) => (
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
      d="M7.999 15.999a8 8 0 1 1 0-16 8 8 0 0 1 0 16ZM8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14ZM3.5 5h9a.5.5 0 1 1 0 1h-9a.5.5 0 0 1 0-1Zm2 3h5a.5.5 0 1 1 0 1h-5a.5.5 0 0 1 0-1Zm2 3h1a.5.5 0 1 1 0 1h-1a.5.5 0 1 1 0-1Z"
    />
  </svg>
);
export const icon = OuiIconFilter;
