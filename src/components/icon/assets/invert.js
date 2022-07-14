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

const OuiIconInvert = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 13.25a5.25 5.25 0 100-10.5 5.25 5.25 0 000 10.5zM8 14A6 6 0 118 2a6 6 0 010 12z" />
    <path d="M8 2a6 6 0 100 12V2z" />
  </svg>
);

export const icon = OuiIconInvert;
