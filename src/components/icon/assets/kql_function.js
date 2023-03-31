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
const OuiIconKqlFunction = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 7H3v2h4v2l3-3-3-3v2ZM6 6V5a1 1 0 0 1 1.707-.707l3 3a1 1 0 0 1 0 1.414l-3 3A1 1 0 0 1 6 11v-1H3a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h3Zm7.5-3a.5.5 0 0 1 .5.5v9a.5.5 0 1 1-1 0v-9a.5.5 0 0 1 .5-.5Z" />
  </svg>
);
export const icon = OuiIconKqlFunction;
