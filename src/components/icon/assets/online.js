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
const OuiIconOnline = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-1a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm3.189-3.64a.5.5 0 0 1-.721.692A3.408 3.408 0 0 0 8 9c-.937 0-1.813.378-2.453 1.037a.5.5 0 0 1-.717-.697A4.408 4.408 0 0 1 8 8c1.22 0 2.361.497 3.189 1.36Zm2.02-2.14a.5.5 0 1 1-.721.693A6.2 6.2 0 0 0 8 6a6.199 6.199 0 0 0-4.46 1.885.5.5 0 0 1-.718-.697A7.199 7.199 0 0 1 8 5a7.2 7.2 0 0 1 5.21 2.22Zm2.02-2.138a.5.5 0 0 1-.721.692A8.99 8.99 0 0 0 8 3a8.99 8.99 0 0 0-6.469 2.734.5.5 0 1 1-.717-.697A9.99 9.99 0 0 1 8 2a9.99 9.99 0 0 1 7.23 3.082Z" />
  </svg>
);
export const icon = OuiIconOnline;
