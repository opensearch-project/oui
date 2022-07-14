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

const OuiIconTokenException = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.461 7.31h3.055a.74.74 0 01.66 1.074l-2.141 4.211a.74.74 0 11-1.319-.67L9.31 8.79H6.256a.74.74 0 01-.66-1.075l2.19-4.31a.74.74 0 011.319.67L7.461 7.31z" />
  </svg>
);

export const icon = OuiIconTokenException;
