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
const OuiIconAppDashboard = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M29 9H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3ZM3 2a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h26a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H3Z" />
    <path
      d="M12 20H3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3Zm-9-7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3Z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M12 31H3a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3Zm-9-7a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1H3Z" />
    <path
      d="M29 31h-9a3 3 0 0 1-3-3V14a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3Zm-9-18a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V14a1 1 0 0 0-1-1h-9Z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconAppDashboard;
