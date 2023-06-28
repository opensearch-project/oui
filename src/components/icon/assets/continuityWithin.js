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
const OuiIconContinuityWithin = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 1 0v-9A.5.5 0 0 0 .5 3zm14.5.5a.5.5 0 0 1 1 0v9a.5.5 0 0 1-1 0v-9zm-4.712 1.547a.5.5 0 0 1 .532.069l3 2.5a.5.5 0 0 1 0 .768l-3 2.5A.5.5 0 0 1 10 10.5V9H6v1.5a.5.5 0 0 1-.82.384l-3-2.5a.5.5 0 0 1 0-.768l3-2.5A.5.5 0 0 1 6 5.5V7h4V5.5a.5.5 0 0 1 .288-.453z" />
  </svg>
);
export const icon = OuiIconContinuityWithin;
