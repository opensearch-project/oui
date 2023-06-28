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
const OuiIconFaceNeutral = ({ title, titleId, ...props }) => (
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
      d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1.067A6.933 6.933 0 1 0 8 1.067a6.933 6.933 0 0 0 0 13.866zM5.333 6.4a1.067 1.067 0 1 1 0-2.133 1.067 1.067 0 0 1 0 2.133zm5.334 0a1.067 1.067 0 1 1 0-2.133 1.067 1.067 0 0 1 0 2.133zM3.2 10.667a.533.533 0 0 1 0-1.067h9.6a.533.533 0 1 1 0 1.067H3.2z"
    />
  </svg>
);
export const icon = OuiIconFaceNeutral;
