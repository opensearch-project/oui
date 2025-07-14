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
const OuiIconWsSearch = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M6.951 3.181a3.981 3.981 0 0 1 3.98 3.98l-.006.204a3.981 3.981 0 0 1-3.975 3.776l-.205-.006a3.98 3.98 0 0 1 .205-7.954m0 .798a3.181 3.181 0 1 0 0 6.364 3.181 3.181 0 0 0 0-6.364"
      clipRule="evenodd"
    />
    <path
      d="M6.951 1.192a5.97 5.97 0 0 1 5.97 5.969l-.008.307a5.929 5.929 0 0 1-.659 2.432l1.373 1.371a1.815 1.815 0 0 1-2.566 2.566L9.69 12.466a5.929 5.929 0 0 1-2.74.665l-.307-.008a5.97 5.97 0 0 1 .307-11.93m4.919 9.348a6.024 6.024 0 0 1-1.539 1.54l1.244 1.244a1.089 1.089 0 0 0 1.539-1.54zM6.951 1.99a5.172 5.172 0 1 0 .001 10.344A5.172 5.172 0 0 0 6.951 1.99"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconWsSearch;
