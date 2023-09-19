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
const OuiIconCheckInCircleEmpty = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m6.91 9.8 4.74-4.657a.5.5 0 1 1 .7.714l-5.09 5a.5.5 0 0 1-.701 0L3.649 8a.5.5 0 1 1 .701-.714L6.91 9.8z" />
    <path
      fillRule="evenodd"
      d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16zm0-1A7 7 0 1 1 8 1a7 7 0 0 1 0 14z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconCheckInCircleEmpty;
