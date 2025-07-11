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
const OuiIconNavIntegrations = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.742 10.734a.407.407 0 0 0-.393-.024 1.495 1.495 0 1 1 0-2.701.408.408 0 0 0 .582-.369v-2.9a.95.95 0 0 0-.95-.95h-2.617A2.317 2.317 0 0 0 9.87 1.206 2.31 2.31 0 0 0 6.817 3.79H4.199a.951.951 0 0 0-.95.95v2.345a2.31 2.31 0 1 0 0 4.547v2.346a.95.95 0 0 0 .95.95h9.781a.95.95 0 0 0 .951-.95v-2.9a.407.407 0 0 0-.19-.344Zm-.626 3.244a.136.136 0 0 1-.136.136H4.2a.136.136 0 0 1-.137-.136v-2.9a.407.407 0 0 0-.582-.368 1.494 1.494 0 1 1 0-2.701.408.408 0 0 0 .582-.369v-2.9a.136.136 0 0 1 .136-.136h3.172a.408.408 0 0 0 .368-.582 1.511 1.511 0 0 1 .051-1.37 1.494 1.494 0 0 1 2.654 1.37.407.407 0 0 0 .364.582h3.172a.136.136 0 0 1 .136.136v2.346a2.31 2.31 0 1 0 0 4.547v2.345Z" />
  </svg>
);
export const icon = OuiIconNavIntegrations;
