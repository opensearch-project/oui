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
const OuiIconTimeslider = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M13.923 8A5.93 5.93 0 0 0 8 2.077 5.93 5.93 0 0 0 2.077 8a5.93 5.93 0 0 0 6.296 5.912c.328-.021.625.227.625.556a.504.504 0 0 1-.458.511 7 7 0 1 1 6.43-6.333c-.036.398-.487.58-.817.354a.595.595 0 0 1-.248-.54c.012-.152.018-.305.018-.46zm1.684 3.2-4.32-3.055c-.56-.396-1.287.059-1.287.8v6.108c0 .74.726 1.196 1.287.8l4.32-3.055c.524-.37.524-1.228 0-1.598zM7.462 7.462H4.769a.539.539 0 0 0 0 1.076H8A.539.539 0 0 0 8.538 8V3.692a.539.539 0 0 0-1.076 0v3.77z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconTimeslider;
