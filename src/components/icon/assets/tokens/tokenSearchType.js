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
const OuiIconTokenSearchType = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.27 7.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0ZM8.77 7.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
    <path
      fillRule="evenodd"
      d="M11.702 10.682a4.501 4.501 0 0 1-5.796.482L4.28 12.789a.75.75 0 0 1-1.06-1.06L4.847 10.1a4.501 4.501 0 1 1 6.855.581Zm-5.304-1.06a3 3 0 1 0 4.243-4.243A3 3 0 0 0 6.398 9.62Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconTokenSearchType;
