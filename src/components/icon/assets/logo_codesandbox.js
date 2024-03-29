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
const OuiIconLogoCodesandbox = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.738 28.044V16.681L3.172 10.919v6.46l5.32 2.67v4.889l6.246 3.106Zm2.344.066 6.357-3.17v-5.002l5.353-2.686V10.87l-11.71 5.854V28.11ZM27.306 8.993l-6.003-3.012-5.286 2.656-5.325-2.659L4.637 9.03l11.317 5.638 11.352-5.675ZM.828 23.744V8.324L15.981.689l15.155 7.604V23.72L15.98 31.28.828 23.743Z" />
  </svg>
);
export const icon = OuiIconLogoCodesandbox;
