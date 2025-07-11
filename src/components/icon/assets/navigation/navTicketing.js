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
const OuiIconNavTicketing = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.04 4.569h-2.334V2.235a.96.96 0 0 0-.96-.96H1.96a.96.96 0 0 0-.961.96v8.785a.412.412 0 0 0 .67.32l2.604-2.105h.02v2.334a.96.96 0 0 0 .96.96h6.472l2.603 2.105a.412.412 0 0 0 .671-.32V5.529a.96.96 0 0 0-.96-.96ZM4.127 8.412a.412.412 0 0 0-.259.09l-2.045 1.655V2.235a.137.137 0 0 1 .137-.137h8.784a.137.137 0 0 1 .137.137v6.04a.137.137 0 0 1-.137.137H4.128Zm10.049 5.039-2.046-1.654a.412.412 0 0 0-.259-.091H5.255a.137.137 0 0 1-.137-.137V9.235h5.627a.96.96 0 0 0 .96-.96V5.391h2.334a.137.137 0 0 1 .138.137v7.922Z" />
  </svg>
);
export const icon = OuiIconNavTicketing;
