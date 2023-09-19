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
const OuiIconTokenIP = ({ title, titleId, ...props }) => (
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
      d="M11 3a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6Zm-1 2H8v6h1V9.014h1c.298-.013 2 0 2-2.018 0-1.74-1.314-1.952-1.825-1.987L10 5ZM6 5H5v6h1V5Zm4 .984c.667 0 1 .336 1 1.008C11 7.664 10.667 8 10 8H9V5.984Z"
    />
  </svg>
);
export const icon = OuiIconTokenIP;
