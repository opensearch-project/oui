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
const OuiIconLogoCode = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M9.75 12 16 32h10l-3.4-10.88A13 13 0 0 0 10.19 12h-.44Z"
      className="ouiIcon__fillNegative"
    />
    <path
      fill="#22A7F3"
      d="M25.725 11.93A17 17 0 0 0 9.5 0H6l3.75 12h.44a13 13 0 0 1 12.41 9.12L26 32h6l-6.275-20.07Z"
    />
    <path fill="#0377CA" d="M7.91 16.175 0 32h12.855z" />
  </svg>
);
export const icon = OuiIconLogoCode;
