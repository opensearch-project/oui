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
const OuiIconNavServiceMap = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M6.256 1.922A3.27 3.27 0 0 1 9.124 6.76l1.6 1.222a2.414 2.414 0 1 1-.533.746L8.575 7.495a3.258 3.258 0 0 1-3.179.85l-.662 1.706c.556.405.919 1.06.919 1.8a2.227 2.227 0 1 1-1.756-2.176l.657-1.692a3.27 3.27 0 0 1 1.702-6.06Zm-2.83 8.618a1.311 1.311 0 1 0 .001 2.622 1.311 1.311 0 0 0-.001-2.622Zm8.96-2.307a1.497 1.497 0 1 0 .002 2.995 1.497 1.497 0 0 0-.002-2.995ZM6.256 2.84a2.353 2.353 0 1 0 0 4.706 2.353 2.353 0 0 0 0-4.706Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconNavServiceMap;
