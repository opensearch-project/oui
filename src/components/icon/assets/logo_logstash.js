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
const OuiIconLogoLogstash = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path fill="#3EBEB0" d="M19 32h11V20H19z" />
    <path fill="#FEC514" d="M4 0H3v20h13v-8C16 5.373 10.627 0 4 0" />
    <path
      d="M3 20c0 6.627 5.373 12 12 12h1V20H3Z"
      className="ouiIcon__fillNegative"
    />
  </svg>
);
export const icon = OuiIconLogoLogstash;
