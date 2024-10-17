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
const OuiIconCompass = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 14.667A6.667 6.667 0 1 1 8 1.334a6.667 6.667 0 0 1 0 13.333zm0-1.333A5.333 5.333 0 1 0 8 2.667a5.333 5.333 0 0 0 0 10.667zM11 5 9.333 9.334 5 11l1.667-4.333L11 5zM8 8.667a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333z" />
  </svg>
);
export const icon = OuiIconCompass;
