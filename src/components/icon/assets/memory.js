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
const OuiIconMemory = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 10h2V6H7zM3 10h2V6H3zM11.025 10h2V6h-2zM3.5 13.75h1v-2.4h-1zM6.175 13.75h1.001v-2.4H6.175zM8.85 13.75h1v-2.4h-1zM11.525 13.75h1v-2.4h-1z" />
    <path d="M0 3v7.05h1v3.698h1v-3.699h12v3.699h1v-3.699h1V3H0Zm1 6h14V4H1v5Z" />
  </svg>
);
export const icon = OuiIconMemory;
