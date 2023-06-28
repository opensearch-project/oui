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
const OuiIconTokenElement = ({ title, titleId, ...props }) => (
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
      d="m7.39 9.736-1.041.94L3.258 8l3.09-2.677 1.041.94-2.032 1.722v.03l2.032 1.721Zm2.777.94-1.04-.94 2.032-1.721v-.03L9.126 6.264l1.04-.94L13.259 8l-3.091 2.677Z"
    />
  </svg>
);
export const icon = OuiIconTokenElement;
