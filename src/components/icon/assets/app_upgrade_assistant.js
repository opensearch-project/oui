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
const OuiIconAppUpgradeAssistant = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M16 21a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M27.42 19.69a12 12 0 0 1-23.11-1l2.27-.45-4.32-4.47L0 19.55l2.39-.47a14 14 0 0 0 27 1.23l-1.97-.62zm2.23-6.77a14 14 0 0 0-27-1.23l1.9.62a12 12 0 0 1 23.11 1l-2.27.45 4.32 4.46L32 12.45l-2.35.47z" />
  </svg>
);
export const icon = OuiIconAppUpgradeAssistant;
