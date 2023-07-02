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
const OuiIconTokenJoin = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M7.5 4.5v1.025c0 1.269-1.185 1.908-2.112 1.737a.75.75 0 1 0 0 1.475c.927-.17 2.112.47 2.112 1.739v1.023h4v-1.005a2.5 2.5 0 0 1 0-4.988V4.5h-4ZM13 4a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1.525c0 .172-.172.293-.341.262a2.25 2.25 0 1 0 0 4.426c.17-.031.341.09.341.262V12a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V9.004a.16.16 0 0 0-.04-.105c-.109-.125-.594-.16-.732-.068a1 1 0 1 1 0-1.662c.138.092.623.057.732-.068a.16.16 0 0 0 .04-.105V4Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconTokenJoin;
