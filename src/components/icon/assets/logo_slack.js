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
const OuiIconLogoSlack = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none">
      <path
        fill="#E01E5A"
        d="M6.813 20.18a3.337 3.337 0 0 1-3.33 3.33 3.337 3.337 0 0 1-3.328-3.33 3.337 3.337 0 0 1 3.329-3.329h3.329v3.33zm1.677 0a3.337 3.337 0 0 1 3.33-3.329 3.337 3.337 0 0 1 3.328 3.33v8.335a3.337 3.337 0 0 1-3.329 3.329 3.337 3.337 0 0 1-3.329-3.33V20.18z"
      />
      <path
        fill="#36C5F0"
        d="M11.82 6.813a3.337 3.337 0 0 1-3.33-3.33A3.337 3.337 0 0 1 11.82.156a3.337 3.337 0 0 1 3.328 3.329v3.329H11.82zm0 1.677a3.337 3.337 0 0 1 3.328 3.33 3.337 3.337 0 0 1-3.329 3.328H3.484a3.337 3.337 0 0 1-3.33-3.329 3.337 3.337 0 0 1 3.33-3.329h8.335z"
      />
      <path
        fill="#2EB67D"
        d="M25.187 11.82a3.337 3.337 0 0 1 3.329-3.33 3.337 3.337 0 0 1 3.329 3.33 3.337 3.337 0 0 1-3.33 3.328h-3.328V11.82zm-1.678 0a3.337 3.337 0 0 1-3.329 3.328 3.337 3.337 0 0 1-3.329-3.329V3.484a3.337 3.337 0 0 1 3.33-3.33 3.337 3.337 0 0 1 3.328 3.33v8.335z"
      />
      <path
        fill="#ECB22E"
        d="M20.18 25.187a3.337 3.337 0 0 1 3.33 3.329 3.337 3.337 0 0 1-3.33 3.329 3.337 3.337 0 0 1-3.329-3.33v-3.328h3.33zm0-1.678a3.337 3.337 0 0 1-3.329-3.329 3.337 3.337 0 0 1 3.33-3.329h8.335a3.337 3.337 0 0 1 3.329 3.33 3.337 3.337 0 0 1-3.33 3.328H20.18z"
      />
    </g>
  </svg>
);
export const icon = OuiIconLogoSlack;
