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
const OuiIconRedeploy = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4.18 7c-.473 0-.88.294-.972.703l-1.189 5.25a.776.776 0 0 0-.019.172c0 .483.444.875.99.875H14.01c.065 0 .13-.006.194-.017.537-.095.885-.556.778-1.03l-1.19-5.25C13.7 7.294 13.293 7 12.822 7H4.18ZM5 6v1h7V6h.825c.946 0 1.76.606 1.946 1.447l1.19 5.4c.215.975-.482 1.923-1.556 2.118a2.175 2.175 0 0 1-.39.035H2.985C1.888 15 1 14.194 1 13.2c0-.118.013-.237.039-.353l1.19-5.4C2.414 6.606 3.229 6 4.174 6H5Z" />
    <path d="M5.99 1.399a.5.5 0 0 0-.98.202l2.058 9.945c.327 1.582 2.58 1.6 2.933.023l1.845-8.274L12.6 4.3a.5.5 0 0 0 .8-.6l-1.5-2a.5.5 0 0 0-.7-.1l-2 1.5a.5.5 0 1 0 .6.8l1.065-.799-1.84 8.25c-.118.526-.869.52-.978-.008L5.99 1.4z" />
  </svg>
);
export const icon = OuiIconRedeploy;
