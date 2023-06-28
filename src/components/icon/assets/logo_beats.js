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
const OuiIconLogoBeats = ({ title, titleId, ...props }) => (
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
      d="M15 20H4V0h11c5.522 0 10 4.478 10 10s-4.478 10-10 10"
    />
    <path
      fill="#00C2B3"
      d="M26.702 15.624C24.6 19.979 20.152 23 15 23H4v9h15c5.522 0 10-4.478 10-10a9.952 9.952 0 0 0-2.298-6.376"
    />
    <path
      d="M24.338 13.554A9.942 9.942 0 0 0 19 12H4v8h11c4.27 0 7.903-2.68 9.338-6.446"
      className="ouiIcon__fillNegative"
    />
  </svg>
);
export const icon = OuiIconLogoBeats;
