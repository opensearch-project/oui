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
const OuiIconTokenModule = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m8 2 5.196 3v.178l-.866.468V5.5L8 3 3.67 5.5v5L8 13l4.33-2.5V5.77l.866-.474V11L8 14l-5.196-3V5L8 2Z" />
    <path d="M5.243 4.429 9.597 7.04 8 7.928 3.743 5.563a.5.5 0 1 0-.486.874L7.5 8.794V13.5h1V8.794l4.243-2.357a.508.508 0 0 0 .06-.04l.392-.202V5.047l-.917.505a.573.573 0 0 0-.02.01l-.106.06-.191.105-1.355.753-4.849-2.909-.514.858Z" />
  </svg>
);
export const icon = OuiIconTokenModule;
