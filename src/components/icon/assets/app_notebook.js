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

const OuiIconAppNotebook = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M25 2h-5V0h-2v2h-3V0h-2v2h-3V0H8v2H3v26h22V2zm-2 24H5V4h3v2h2V4h3v2h2V4h3v2h2V4h3v22z" />
    <path d="M27 7v23H8v2h21V7z" />
    <path className="ouiIcon__fillSecondary" d="M8 12h12v2H8zM8 17h12v2H8z" />
  </svg>
);

export const icon = OuiIconAppNotebook;
