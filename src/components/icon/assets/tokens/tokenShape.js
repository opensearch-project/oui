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
const OuiIconTokenShape = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M13 10v3h-3v-1H6v1H3v-3h1V6H3V3h3v1h4V3h3v3h-1v4h1Zm-8 1H4v1h1v-1Zm7 0h-1v1h1v-1ZM5 4H4v1h1V4Zm7 0h-1v1h1V4Zm-1 2h-1V5H6v1H5v4h1v1h4v-1h1V6Z"
    />
  </svg>
);
export const icon = OuiIconTokenShape;
