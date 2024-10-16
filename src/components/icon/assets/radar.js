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
const OuiIconRadar = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m8.338 2.416-.682 1.18c-1.94-.585-3.676-.3-4.275.737-.784 1.36.527 3.769 3.12 5.265 2.591 1.496 5.333 1.428 6.118.069.598-1.037-.022-2.683-1.5-4.07l.683-1.182c2.055 1.806 2.975 4.18 1.972 5.918-1.24 2.148-4.793 2.237-7.94.42C2.685 8.935.986 5.815 2.226 3.667c1.003-1.738 3.52-2.128 6.11-1.252zm2.252-1.234 1.154.666-3.333 5.774-1.155-.667 3.334-5.773zm-6.102 12.15h6.846v1.334H3.345a.669.669 0 0 1-.676-.615.663.663 0 0 1 .087-.385l1.5-2.598 1.155.667-.923 1.598z" />
  </svg>
);
export const icon = OuiIconRadar;
