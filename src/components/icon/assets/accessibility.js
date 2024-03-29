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
const OuiIconAccessibility = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0Zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm3.974 4.342a.5.5 0 0 1-.233.596l-.083.036L9 6.86v2.559l.974 2.923a.5.5 0 0 1-.233.596l-.083.036a.5.5 0 0 1-.596-.233l-.036-.083-1-3L8 9.5l-.026.158-1 3a.5.5 0 0 1-.97-.228l.022-.088L7 9.416V6.86l-2.658-.886a.5.5 0 0 1 .228-.97l.088.022L7.583 6h.833l2.926-.974a.5.5 0 0 1 .632.316ZM8 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z" />
  </svg>
);
export const icon = OuiIconAccessibility;
