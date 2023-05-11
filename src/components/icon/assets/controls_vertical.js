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
const OuiIconControlsVertical = ({ title, titleId, ...props }) => (
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
      d="M10 7.95a2.5 2.5 0 0 1 0-4.9V1.5a.5.5 0 1 1 1 0v1.55a2.5 2.5 0 0 1 0 4.9v6.55a.5.5 0 1 1-1 0V7.95Zm-4 .1a2.5 2.5 0 0 1 0 4.9v1.55a.5.5 0 1 1-1 0v-1.55a2.5 2.5 0 0 1 0-4.9V1.5a.5.5 0 0 1 1 0v6.55ZM5.5 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm5-8a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z"
    />
  </svg>
);
export const icon = OuiIconControlsVertical;
