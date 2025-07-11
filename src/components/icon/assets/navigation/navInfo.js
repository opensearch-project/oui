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
const OuiIconNavInfo = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.96 11.294a.412.412 0 0 1-.411.412.96.96 0 0 1-.96-.96V8a.137.137 0 0 0-.138-.137.412.412 0 1 1 0-.824.96.96 0 0 1 .96.961v2.745a.137.137 0 0 0 .138.137.412.412 0 0 1 .412.412ZM7.726 5.667a.686.686 0 1 0 0-1.373.686.686 0 0 0 0 1.373ZM15 8a7 7 0 1 1-7-7 7.008 7.008 0 0 1 7 7Zm-.823 0A6.176 6.176 0 1 0 8 14.177 6.183 6.183 0 0 0 14.177 8Z" />
  </svg>
);
export const icon = OuiIconNavInfo;
