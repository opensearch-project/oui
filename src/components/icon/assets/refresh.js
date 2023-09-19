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
const OuiIconRefresh = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.228 2.942a.5.5 0 1 1-.538.842A5 5 0 1 0 13 8a.5.5 0 1 1 1 0 6 6 0 1 1-2.772-5.058ZM14 1.5v3A1.5 1.5 0 0 1 12.5 6h-3a.5.5 0 0 1 0-1h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 1 1 1 0Z" />
  </svg>
);
export const icon = OuiIconRefresh;
