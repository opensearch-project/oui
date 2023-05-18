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
const OuiIconAggregate = ({ title, titleId, ...props }) => (
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
      d="M2.5 2a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1zm0-1a1.5 1.5 0 0 1 1.415 1h1.908a1.5 1.5 0 0 1 1.393.943L8.839 7H12.5a.5.5 0 0 1 0 1H8.839l-1.623 4.057A1.5 1.5 0 0 1 5.823 13H3.915a1.5 1.5 0 1 1 0-1h1.908a.5.5 0 0 0 .464-.314L7.761 8H3.915a1.5 1.5 0 1 1 0-1H7.76L6.287 3.314A.5.5 0 0 0 5.823 3H3.915A1.5 1.5 0 1 1 2.5 1zm0 11a.5.5 0 1 1 0 1 .5.5 0 0 1 0-1zM3 7.5a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0zm9.354-3.354a.5.5 0 0 0-.708.708L13.793 7a.707.707 0 0 1 0 1l-2.147 2.146a.5.5 0 0 0 .708.708L14.5 8.707a1.707 1.707 0 0 0 0-2.414l-2.146-2.147z"
    />
  </svg>
);
export const icon = OuiIconAggregate;
