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
const OuiIconFeatureSecurityFindings = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.558 7.511V4.824a.404.404 0 1 1 .807 0v2.687a.404.404 0 1 1-.807 0m.403 1.749a.672.672 0 1 0 0 1.344.672.672 0 0 0 0-1.344m6.32-7.126v3.765c0 3.492-1.689 5.607-3.106 6.765-1.528 1.251-3.044 1.673-3.108 1.691a.405.405 0 0 1-.212 0c-.068-.019-1.579-.44-3.108-1.691-1.417-1.159-3.106-3.273-3.106-6.765V2.134a.941.941 0 0 1 .941-.941h10.757a.941.941 0 0 1 .941.941m-.807 0a.135.135 0 0 0-.135-.135H2.583a.135.135 0 0 0-.135.135v3.765c0 2.537.937 4.598 2.786 6.121a8.847 8.847 0 0 0 2.727 1.523 8.847 8.847 0 0 0 2.727-1.523c1.849-1.525 2.786-3.584 2.786-6.121z" />
  </svg>
);
export const icon = OuiIconFeatureSecurityFindings;
