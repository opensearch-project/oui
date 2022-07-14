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

const OuiIconAppAuditbeat = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path className="ouiIcon__fillSecondary" d="M15 0h2v32h-2z" />
    <path d="M0 32h13v-2H2V2h11V0H0zM19 0v2h11v28H19v2h13V0z" />
  </svg>
);

export const icon = OuiIconAppAuditbeat;
