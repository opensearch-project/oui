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
const OuiIconTokenKey = ({ title, titleId, ...props }) => (
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
      d="M12.667 6.542A3.208 3.208 0 0 1 8.86 9.694l-.438.492a.437.437 0 0 1-.327.147h-.678v.73a.437.437 0 0 1-.438.437H6.25v.73a.437.437 0 0 1-.438.437H3.772a.437.437 0 0 1-.438-.438v-1.423c0-.116.046-.227.128-.31l2.95-2.949a3.208 3.208 0 0 1 3.047-4.214 3.202 3.202 0 0 1 3.209 3.209Zm-3.209-.875a.875.875 0 1 0 1.75 0 .875.875 0 0 0-1.75 0Z"
    />
  </svg>
);
export const icon = OuiIconTokenKey;
