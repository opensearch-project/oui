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
const OuiIconNavAlerting = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.195 4.508a.374.374 0 0 1-.501-.16 5.976 5.976 0 0 0-2.127-2.344.373.373 0 0 1 .397-.631 6.776 6.776 0 0 1 2.391 2.632.374.374 0 0 1-.16.503M2.87 4.348a5.976 5.976 0 0 1 2.127-2.344.374.374 0 0 0-.397-.631 6.776 6.776 0 0 0-2.39 2.632.374.374 0 1 0 .66.344m11.135 6.855a.872.872 0 0 1-.746 1.31h-2.644a2.364 2.364 0 0 1-4.665 0H3.305a.872.872 0 0 1-.749-1.31c.571-.986.875-2.383.875-4.04a4.852 4.852 0 0 1 9.704 0c0 1.679.295 3.04.875 4.04zm-4.15 1.31H6.709a1.617 1.617 0 0 0 3.146 0m3.511-.934c-.649-1.12-.979-2.603-.979-4.416a4.105 4.105 0 0 0-8.211 0c0 1.814-.329 3.297-.977 4.416a.122.122 0 0 0 0 .125.122.122 0 0 0 .105.062h9.954a.122.122 0 0 0 .106-.062.122.122 0 0 0 0-.125" />
  </svg>
);
export const icon = OuiIconNavAlerting;
