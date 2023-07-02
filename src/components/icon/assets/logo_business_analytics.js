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
const OuiIconLogoBusinessAnalytics = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none" fillRule="evenodd">
      <path
        fill="#00BFB3"
        d="M0 22c0 5.522 4.478 10 10 10V12C4.478 12 0 16.478 0 22"
      />
      <path
        d="M10 12v10h10c0-5.522-4.478-10-10-10"
        className="ouiIcon__fillNegative"
      />
      <path
        fill="#F04E98"
        d="M10 0v9c7.168 0 13 5.832 13 13h9C32 9.85 22.15 0 10 0"
      />
    </g>
  </svg>
);
export const icon = OuiIconLogoBusinessAnalytics;
