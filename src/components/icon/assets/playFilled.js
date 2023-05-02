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
const OuiIconPlayFilled = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m12.345 6.801-7.2-4.581C4.21 1.625 3 2.308 3 3.419v9.162c0 1.111 1.21 1.794 2.146 1.199l7.2-4.581a1.425 1.425 0 0 0 0-2.398z" />
  </svg>
);
export const icon = OuiIconPlayFilled;
