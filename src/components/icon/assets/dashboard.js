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
const OuiIconDashboard = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.333 14a.667.667 0 0 1-.666-.667V8c0-.368.298-.667.666-.667h4c.368 0 .667.299.667.667v5.333a.667.667 0 0 1-.667.667h-4ZM2.667 8.667A.667.667 0 0 1 2 8V2.667C2 2.298 2.298 2 2.667 2h4c.368 0 .666.298.666.667V8a.667.667 0 0 1-.666.667h-4ZM6 7.333v-4H3.333v4H6ZM2.667 14A.667.667 0 0 1 2 13.333v-2.666c0-.368.298-.667.667-.667h4c.368 0 .666.299.666.667v2.666a.667.667 0 0 1-.666.667h-4Zm.666-1.333H6v-1.334H3.333v1.334Zm6.667 0h2.667v-4H10v4Zm-1.333-10c0-.369.298-.667.666-.667h4c.368 0 .667.298.667.667v2.666a.667.667 0 0 1-.667.667h-4a.667.667 0 0 1-.666-.667V2.667ZM10 3.333v1.334h2.667V3.333H10Z" />
  </svg>
);
export const icon = OuiIconDashboard;
