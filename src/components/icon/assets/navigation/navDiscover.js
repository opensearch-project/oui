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
const OuiIconNavDiscover = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 .8A7.2 7.2 0 1 0 15.2 8 7.209 7.209 0 0 0 8 .8Zm0 13.553A6.353 6.353 0 1 1 14.355 8 6.36 6.36 0 0 1 8 14.353Zm3.2-10.12L6.682 6.492a.424.424 0 0 0-.19.19l-2.259 4.517a.423.423 0 0 0 .569.568L9.319 9.51a.424.424 0 0 0 .19-.19L11.77 4.8a.423.423 0 0 0-.57-.568Zm-2.385 4.58L5.56 10.442l1.623-3.255 3.255-1.623-1.623 3.25Z" />
  </svg>
);
export const icon = OuiIconNavDiscover;
