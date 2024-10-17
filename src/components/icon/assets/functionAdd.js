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
const OuiIconFunctionAdd = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2.667 2A.667.667 0 0 0 2 2.667v4c0 .368.299.666.667.666h4a.667.667 0 0 0 .666-.666v-4A.667.667 0 0 0 6.667 2h-4zm0 6.667A.667.667 0 0 0 2 9.333v4c0 .369.299.667.667.667h4a.667.667 0 0 0 .666-.667v-4a.667.667 0 0 0-.666-.666h-4zm6.666 0a.667.667 0 0 0-.666.666v4c0 .369.298.667.666.667h4a.667.667 0 0 0 .667-.667v-4a.667.667 0 0 0-.667-.666h-4zm.667 4V10h2.667v2.667H10zM3.333 6V3.333H6V6H3.333zm0 6.667V10H6v2.667H3.333zm7.334-5.334v-2h-2V4h2V2H12v2h2v1.333h-2v2h-1.333z" />
  </svg>
);
export const icon = OuiIconFunctionAdd;
