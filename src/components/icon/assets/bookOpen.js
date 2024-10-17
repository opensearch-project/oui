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
const OuiIconBookOpen = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.667 14v1.333H7.333V14H2a.667.667 0 0 1-.667-.667V2.666C1.333 2.298 1.632 2 2 2h4a2.66 2.66 0 0 1 2 .902A2.66 2.66 0 0 1 10 2h4c.368 0 .667.298.667.666v10.667A.667.667 0 0 1 14 14H8.667zm4.666-1.333V3.333H10c-.736 0-1.333.597-1.333 1.334v8h4.666zm-6 0v-8c0-.737-.597-1.334-1.333-1.334H2.667v9.334h4.667z" />
  </svg>
);
export const icon = OuiIconBookOpen;
