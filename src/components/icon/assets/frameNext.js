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
const OuiIconFrameNext = ({ title, titleId, ...props }) => (
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
      d="M3 2a1 1 0 0 0-1 1v10a1 1 0 1 0 2 0V3a1 1 0 0 0-1-1zm5.146.22 7.2 4.581a1.425 1.425 0 0 1 0 2.398l-7.2 4.581C7.21 14.375 6 13.692 6 12.581V3.42c0-1.112 1.21-1.795 2.146-1.2z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconFrameNext;
