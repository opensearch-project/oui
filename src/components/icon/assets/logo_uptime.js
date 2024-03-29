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
const OuiIconLogoUptime = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#3EBEB0"
      d="M19 15c0 7.062-4.888 12.969-11.46 14.563A15.914 15.914 0 0 0 16 32c8.836 0 16-7.163 16-16v-3l-6.5-6-6.5 6v2Z"
    />
    <path
      fill="#07C"
      d="M6.833 26.646a11.954 11.954 0 0 0 8.544-7.834A12.43 12.43 0 0 1 13 11.5V.292C5.6 1.696 0 8.19 0 16.002c0 4.358 1.75 8.306 4.577 11.192l2.256-.547Z"
    />
    <path
      d="M30.362 23.02c-1.494.63-3.137.98-4.861.98a12.443 12.443 0 0 1-7.852-2.78 15.042 15.042 0 0 1-10.11 8.343A15.91 15.91 0 0 0 16.002 32c6.314 0 11.758-3.669 14.36-8.98"
      className="ouiIcon__fillNegative"
    />
  </svg>
);
export const icon = OuiIconLogoUptime;
