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
const OuiIconTokenKeyword = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5.75 7.375a.25.25 0 0 0-.25.25v.75c0 .138.112.25.25.25h3.5a.25.25 0 0 0 .25-.25v-.75a.25.25 0 0 0-.25-.25h-3.5Z" />
    <path
      fillRule="evenodd"
      d="M3 5a1 1 0 0 1 1-1h5.989a1 1 0 0 1 .825.436l2.05 3a1 1 0 0 1 0 1.128l-2.05 3A1 1 0 0 1 9.99 12H4a1 1 0 0 1-1-1V5Zm1.25.75a.5.5 0 0 1 .5-.5h4.745a.5.5 0 0 1 .405.206l1.636 2.25a.5.5 0 0 1 0 .588L9.9 10.544a.5.5 0 0 1-.405.206H4.75a.5.5 0 0 1-.5-.5v-4.5Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconTokenKeyword;
