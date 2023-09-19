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
const OuiIconSecuritySignal = ({ title, titleId, ...props }) => (
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
      d="M11.875 3.418a6 6 0 1 0 .707.707l-2.46 2.46-1.156 1.156a1 1 0 1 1-.707-.707l.757-.757a2 2 0 0 0-2.43 3.137.5.5 0 1 1-.707.707 3 3 0 0 1 3.86-4.567l.714-.714A4 4 0 1 0 8 12a.5.5 0 1 1 0 1 5 5 0 1 1 3.164-8.871l.71-.71zm.709-.709a7 7 0 1 0 .707.707l.366-.366a.5.5 0 1 0-.707-.707l-.366.366z"
    />
  </svg>
);
export const icon = OuiIconSecuritySignal;
