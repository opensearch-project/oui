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
const OuiIconWsAnalytics = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M4.329 9.433c.221 0 .4.18.4.4v4.668a.4.4 0 0 1-.4.4H1.53a.401.401 0 0 1-.402-.4V9.833c0-.22.18-.4.402-.4h2.798ZM1.933 14.1h1.994v-3.868H1.933v3.868ZM9.428 1.1c.222 0 .401.18.401.4v13c0 .22-.18.4-.4.4H6.63a.402.402 0 0 1-.402-.4v-13c0-.22.18-.4.402-.4h2.798Zm-2.395 13h1.993V1.9H7.033v12.2ZM14.528 4.663c.221 0 .4.18.4.4V14.5c0 .22-.179.4-.4.4H11.73a.402.402 0 0 1-.402-.4V5.063c0-.22.18-.4.402-.4h2.798Zm-2.396 9.438h1.994V5.464h-1.994V14.1Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconWsAnalytics;
