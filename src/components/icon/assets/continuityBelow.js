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
const OuiIconContinuityBelow = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0V9H5v1.5a.5.5 0 0 1-.82.384l-3-2.5a.5.5 0 0 1 0-.768l3-2.5A.5.5 0 0 1 5 5.5V7h6V3.5a.5.5 0 0 1 .5-.5zm3 0a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-1 0v-9a.5.5 0 0 1 .5-.5z" />
  </svg>
);
export const icon = OuiIconContinuityBelow;
