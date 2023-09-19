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
const OuiIconLogoElasticStack = ({ title, titleId, ...props }) => (
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
        fill="#F04E98"
        d="M32 9V2.5A2.5 2.5 0 0 0 29.5 0h-27A2.5 2.5 0 0 0 0 2.5V9h32Z"
      />
      <path fill="#00BFB3" d="M0 20h32v-8H0z" />
      <path fill="#0080D5" d="M14.5 23H0v6.5A2.5 2.5 0 0 0 2.5 32h12v-9Z" />
      <path fill="#FEC514" d="M17.5 23v9h12a2.5 2.5 0 0 0 2.5-2.5V23H17.5Z" />
    </g>
  </svg>
);
export const icon = OuiIconLogoElasticStack;
