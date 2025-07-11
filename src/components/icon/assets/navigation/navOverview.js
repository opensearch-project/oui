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
const OuiIconNavOverview = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.154 1c.467 0 .846.379.846.846v12.308a.846.846 0 0 1-.846.846H1.846A.846.846 0 0 1 1 14.154V1.846C1 1.379 1.379 1 1.846 1h12.308ZM1.846 14.154H8.88V1.846H1.846v12.308Zm7.888 0h4.42V1.846h-4.42v12.308ZM6.836 8.45a.428.428 0 1 1 0 .856H4.005a.428.428 0 1 1 0-.856h2.83Zm0-2.619a.428.428 0 1 1 0 .856H4.005a.428.428 0 0 1 0-.856h2.83Zm0-2.62a.428.428 0 0 1 0 .855H4.005a.428.428 0 1 1 0-.855h2.83Z" />
  </svg>
);
export const icon = OuiIconNavOverview;
