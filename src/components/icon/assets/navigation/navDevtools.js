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
const OuiIconNavDevtools = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.863 8a.412.412 0 0 1-.155.322l-2.745 2.196a.412.412 0 1 1-.514-.644L6.792 8 4.45 6.126a.412.412 0 0 1 .514-.644l2.745 2.196A.412.412 0 0 1 7.863 8Zm3.431 1.784H8.55a.412.412 0 1 0 0 .824h2.745a.411.411 0 1 0 0-.824ZM15 3.06v9.882a.96.96 0 0 1-.96.961H1.96a.961.961 0 0 1-.96-.96V3.058a.96.96 0 0 1 .96-.96h12.08a.96.96 0 0 1 .96.96Zm-.823 0a.137.137 0 0 0-.138-.137H1.961a.137.137 0 0 0-.137.137v9.882a.137.137 0 0 0 .137.137h12.078a.137.137 0 0 0 .138-.137V3.06Z" />
  </svg>
);
export const icon = OuiIconNavDevtools;
