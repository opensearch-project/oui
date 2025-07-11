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
const OuiIconNavManage = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M10.315 5.032a2.11 2.11 0 0 0 2.064-1.678h1.833a.425.425 0 0 0 .3-.723.425.425 0 0 0-.3-.124h-1.83a2.11 2.11 0 0 0-4.136 0H1.79a.424.424 0 0 0 0 .847h6.46a2.11 2.11 0 0 0 2.066 1.678Zm0-.88a1.23 1.23 0 1 1 0-2.46 1.23 1.23 0 0 1 0 2.46ZM5.912 10.129A2.11 2.11 0 0 0 7.98 8.443l6.233-.007a.425.425 0 0 0 .3-.722.425.425 0 0 0-.3-.124l-6.233.006a2.11 2.11 0 0 0-4.133 0L1.79 7.59a.423.423 0 0 0 0 .846l2.057.007a2.11 2.11 0 0 0 2.066 1.686Zm0-.88a1.23 1.23 0 1 1 0-2.46 1.23 1.23 0 0 1 0 2.46ZM10.311 15.187a2.11 2.11 0 0 0 2.068-1.694l1.833.026a.425.425 0 0 0 .3-.723.425.425 0 0 0-.3-.124l-1.836-.027a2.11 2.11 0 0 0-4.13 0l-6.457.027a.424.424 0 0 0 0 .847l6.454-.026a2.11 2.11 0 0 0 2.068 1.694Zm0-.88a1.23 1.23 0 1 1 0-2.46 1.23 1.23 0 0 1 0 2.46Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconNavManage;
