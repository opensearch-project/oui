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
const OuiIconLogoAppSearch = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#0080D5"
      d="M19.5.938a7.002 7.002 0 0 0-7 0l-8 4.619A7 7 0 0 0 1 11.62v9.237a7 7 0 0 0 3.5 6.062l7.5 4.33V17.979a7 7 0 0 1 3.5-6.062L27 5.276 19.5.939Z"
    />
    <path
      d="M19.5.938a7.002 7.002 0 0 0-7 0L5 5.277l11 6.35 11-6.35-7.5-4.34Z"
      className="ouiIcon__fillNegative"
    />
    <path
      fill="#FA744E"
      d="m28.435 7.76-10.026 5.79a6.994 6.994 0 0 1 1.59 4.428v13.27l7.5-4.33a7 7 0 0 0 3.5-6.061v-9.238a6.992 6.992 0 0 0-1.586-4.422l-.978.564Z"
    />
  </svg>
);
export const icon = OuiIconLogoAppSearch;
