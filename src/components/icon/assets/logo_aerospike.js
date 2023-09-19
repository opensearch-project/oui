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
const OuiIconLogoAerospike = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none">
      <path fill="#C4373A" d="M0 31.806h32V.776H0z" />
      <path
        fill="#FFF"
        d="m19.448 12.508-8.986 3.86 8.986 3.883v-7.743Zm-11.304 4.73-2.094-.863 2.094-.931 17.749-7.741v2.062l-4.654 1.99v9.25l4.654 2.01v1.968L8.143 17.24Z"
      />
    </g>
  </svg>
);
export const icon = OuiIconLogoAerospike;
