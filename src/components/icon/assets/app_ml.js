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
const OuiIconAppMl = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M10 18v.56a1 1 0 0 1-.68.95L3 21.61V10a1 1 0 0 1 .4-.8l3.2-2.4-1.2-1.6-3.2 2.4A3 3 0 0 0 1 10v12a3 3 0 0 0 1.2 2.4l3.2 2.4 1.2-1.6-2.47-1.85 5.82-1.95A3 3 0 0 0 12 18.56V18h-2zM29.8 7.6l-3.2-2.4-1.2 1.6 3.2 2.4a1 1 0 0 1 .4.8v11.61l-6.32-2.11a1 1 0 0 1-.68-.95V18h-2v.56a3 3 0 0 0 2.05 2.85l5.82 1.94-2.47 1.85 1.2 1.6 3.2-2.4A3 3 0 0 0 31 22V10a3 3 0 0 0-1.2-2.4z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M11 6A3 3 0 0 1 8.88.88a3.07 3.07 0 0 1 4.24 0A3 3 0 0 1 11 6zm0-4a1 1 0 1 0-.012 2A1 1 0 0 0 11 2zm0 30a3 3 0 0 1-2.12-5.12 3.07 3.07 0 0 1 4.24 0A3 3 0 0 1 11 32zm0-4a1 1 0 1 0-.012 2A1 1 0 0 0 11 28zm0-12a3 3 0 0 1-2.12-5.12 3.07 3.07 0 0 1 4.24 0A3 3 0 0 1 11 16zm0-4a1 1 0 1 0-.012 2A1 1 0 0 0 11 12zm10-6A3 3 0 0 1 18.88.88a3.07 3.07 0 0 1 4.24 0A3 3 0 0 1 21 6zm0-4a1 1 0 1 0-.012 2A1 1 0 0 0 21 2zm0 30a3 3 0 0 1-2.12-5.12 3.07 3.07 0 0 1 4.24 0A3 3 0 0 1 21 32zm0-4a1 1 0 1 0-.012 2A1 1 0 0 0 21 28zm0-12a3 3 0 0 1-2.12-5.12 3.07 3.07 0 0 1 4.24 0A3 3 0 0 1 21 16zm0-4a1 1 0 1 0-.012 2A1 1 0 0 0 21 12z" />
  </svg>
);
export const icon = OuiIconAppMl;
