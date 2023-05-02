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
const OuiIconAppEms = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 22h3v2H1V1h23v5h-2V3H3z" className="ouiIcon__fillSecondary" />
    <path d="M15.228 29c1.492-1.678 1.353-2.859.009-5.654-.049-.1-.049-.1-.097-.203-1.369-2.855-1.626-4.491-.325-6.582 2.796-4.498 9.514-2.642 14.185 2.317V10H10v19h5.228Zm2.47 0H29v-6.983c-3.88-5.406-10.376-7.795-12.487-4.4-.83 1.336-.669 2.37.43 4.662l.097.2c1.352 2.814 1.731 4.63.659 6.521ZM31 8v23H8V8h23Z" />
  </svg>
);
export const icon = OuiIconAppEms;
