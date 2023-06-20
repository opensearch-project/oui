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
const OuiIconAppAddData = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M32 30H0V3h12.57l3 5H32v22ZM2 28h28V10H14.43l-3-5H2v23Z" />
    <path
      d="M21 18h-4v-4h-2v4h-4v2h4v4h2v-4h4z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconAppAddData;
