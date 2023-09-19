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
const OuiIconKqlField = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={10}
    viewBox="0 0 16 10"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 9a5 5 0 1 1 0-8 5 5 0 1 1 0 8Zm.75-.692a4 4 0 1 0 0-6.615A4.981 4.981 0 0 1 10 5a4.981 4.981 0 0 1-1.25 3.308ZM4.133 8V5.559h2.496v-.625H4.133V2.996h2.719v-.633H3.43V8h.703Z" />
  </svg>
);
export const icon = OuiIconKqlField;
