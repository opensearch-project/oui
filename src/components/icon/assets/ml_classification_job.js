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
const OuiIconMlClassificationJob = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 16v5h2.038a13.179 13.179 0 0 0 0 2H7v5H5v-5H0v-2h5v-5h2zM7 0v5h5v2H7v5H5V7H0V5h5V0h2zm16 0v5h5v2h-5v2.038a13.179 13.179 0 0 0-2 0V7h-5V5h5V0h2z" />
    <path
      d="M22 10c3.073 0 5.877 1.155 8 3.056v3.252A9.82 9.82 0 1 0 16.307 30h-3.251A11.955 11.955 0 0 1 10 22c0-6.627 5.373-12 12-12zm1 8v3h3v2h-3v3h-2v-3h-3v-2h3v-3h2z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconMlClassificationJob;
