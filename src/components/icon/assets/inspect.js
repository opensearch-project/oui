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
const OuiIconInspect = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M15.363 14.658a.5.5 0 1 1-.713.7l-2.97-3.023a.5.5 0 0 1 .001-.7A3.9 3.9 0 1 0 8.9 12.8a.5.5 0 1 1 0 .999 4.9 4.9 0 1 1 3.821-1.833l2.642 2.691ZM3.094 13a.5.5 0 1 1 0 1H2.5A2.5 2.5 0 0 1 0 11.5v-9A2.5 2.5 0 0 1 2.5 0h9A2.5 2.5 0 0 1 14 2.5v.599a.5.5 0 1 1-1 0V2.5A1.5 1.5 0 0 0 11.5 1h-9A1.5 1.5 0 0 0 1 2.5v9A1.5 1.5 0 0 0 2.5 13h.594ZM2.5 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-4 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-2 1a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1Zm0 3a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm6-6a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm2 0a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Zm-8 8a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" />
  </svg>
);
export const icon = OuiIconInspect;
