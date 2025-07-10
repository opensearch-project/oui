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
const OuiIconFeatureUi = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.747 2.226H2.378a.904.904 0 0 0-.904.904v9.302a.904.904 0 0 0 .904.904h11.368a.904.904 0 0 0 .904-.904V3.13a.904.904 0 0 0-.904-.904m-11.368.775h11.368a.129.129 0 0 1 .129.13v2.712H2.249V3.13A.129.129 0 0 1 2.378 3m-.129 9.431V6.616h3.876v5.943H2.379a.129.129 0 0 1-.13-.129m11.497.129H6.899V6.617h6.976v5.814a.129.129 0 0 1-.129.129" />
  </svg>
);
export const icon = OuiIconFeatureUi;
