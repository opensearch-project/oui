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
const OuiIconLogoNginx = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none" fillRule="evenodd">
      <path fill="#119639" d="m16 0 13.856 8v16L16 32 2.144 24V8z" />
      <path
        fill="#FFF"
        fillRule="nonzero"
        d="M11.17 13.512v8.376a1.607 1.607 0 1 1-3.215 0V9.632c0-1.432 1.731-2.149 2.744-1.136l9.51 9.512V9.632a1.607 1.607 0 0 1 3.215 0v12.256c0 1.432-1.731 2.149-2.744 1.136l-9.51-9.512Z"
      />
    </g>
  </svg>
);
export const icon = OuiIconLogoNginx;
