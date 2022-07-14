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

const OuiIconLogoMetrics = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none" fillRule="evenodd">
      <path
        fill="#F04E98"
        d="M2 32h28V20l-6.465-6.465a5 5 0 00-7.07 0L2 28v4z"
      />
      <path
        className="ouiIcon__fillNegative"
        d="M16.465 13.535l-3.536 3.536a9.965 9.965 0 007.07 2.93 9.965 9.965 0 007.072-2.93l-3.536-3.536a5 5 0 00-7.07 0"
      />
      <path
        fill="#FEC514"
        d="M14.343 11.414A7.951 7.951 0 0120 9.071c2.137 0 4.146.832 5.657 2.343l3.207 3.207A9.955 9.955 0 0030 10.001c0-5.524-4.477-10-10-10-5.522 0-10 4.476-10 10 0 1.667.414 3.237 1.137 4.62l3.206-3.207z"
      />
    </g>
  </svg>
);

export const icon = OuiIconLogoMetrics;
