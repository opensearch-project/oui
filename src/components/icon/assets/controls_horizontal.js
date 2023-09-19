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
const OuiIconControlsHorizontal = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8.05 10a2.5 2.5 0 0 1 4.9 0h1.55a.5.5 0 1 1 0 1h-1.55a2.5 2.5 0 0 1-4.9 0H1.5a.5.5 0 1 1 0-1h6.55Zm-.1-4a2.5 2.5 0 0 1-4.9 0H1.5a.5.5 0 0 1 0-1h1.55a2.5 2.5 0 0 1 4.9 0h6.55a.5.5 0 1 1 0 1H7.95ZM4 5.5a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0Zm8 5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z"
    />
  </svg>
);
export const icon = OuiIconControlsHorizontal;
