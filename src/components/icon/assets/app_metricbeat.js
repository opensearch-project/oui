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
const OuiIconAppMetricbeat = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16a16 16 0 0 1-16 16Zm0-30C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14A14 14 0 0 0 16 2Z" />
    <path
      d="M28 16h-2c0-5.523-4.477-10-10-10S6 10.477 6 16H4C4 9.373 9.373 4 16 4s12 5.373 12 12Z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M21.71 11.71 20.3 10.3 18 12.57a4 4 0 0 0-2-.57 4 4 0 1 0 4 4 4 4 0 0 0-.57-2l2.28-2.29ZM16 18a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
  </svg>
);
export const icon = OuiIconAppMetricbeat;
