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
const OuiIconAppFilebeat = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M8 18h16v2H8zM8 13h9v2H8zM8 23h16v2H8z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M21.41 0H5a3 3 0 0 0-3 3v26a3 3 0 0 0 3 3h22a3 3 0 0 0 3-3V8.59L21.41 0ZM22 3.41 26.59 8H22V3.41ZM27 30H5a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h15v8h8v19a1 1 0 0 1-1 1Z" />
  </svg>
);
export const icon = OuiIconAppFilebeat;
