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
const OuiIconVisPie = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.5 9a.5.5 0 0 1-.5-.5V3.023A5.5 5.5 0 1 0 11.978 9H6.5ZM7 8h5.5a.5.5 0 0 1 .5.5A6.5 6.5 0 1 1 6.5 2a.5.5 0 0 1 .5.5V8Zm2-6.972V6h4.972C13.696 3.552 11.448 1.304 9 1.028ZM14.5 7h-6a.5.5 0 0 1-.5-.5v-6a.5.5 0 0 1 .5-.5C11.853 0 15 3.147 15 6.5a.5.5 0 0 1-.5.5ZM6.146 8.854a.5.5 0 1 1 .708-.708l4 4a.5.5 0 0 1-.708.708l-4-4Z" />
  </svg>
);
export const icon = OuiIconVisPie;
