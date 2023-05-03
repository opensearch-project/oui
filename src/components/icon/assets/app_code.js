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
const OuiIconAppCode = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m11.276 29 .594 2H0l7.621-14.29.811 2.73L3.333 29h7.943ZM28.92 31l-4.987-16.598A16 16 0 0 0 8.688 3l1.8 6H8.4L6 1h2.607a18 18 0 0 1 17.241 12.828L31 31h-2.08Z" />
    <path
      d="M12.037 14.02 16.492 29h6.827l-2.333-7.849a10 10 0 0 0-8.949-7.13ZM9.35 12h2.05a12 12 0 0 1 11.503 8.581L26 31H15L9.35 12Z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconAppCode;
