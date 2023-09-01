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
const OuiIconUndeploy = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M4.18 7c-.473 0-.88.294-.972.703l-1.189 5.25a.776.776 0 0 0-.019.172c0 .483.444.875.99.875H14.01c.065 0 .13-.006.194-.017.537-.095.885-.556.778-1.03l-1.19-5.25C13.7 7.294 13.293 7 12.822 7H4.18ZM6 6v1h5V6h1.825c.946 0 1.76.606 1.946 1.447l1.19 5.4c.215.975-.482 1.923-1.556 2.118a2.175 2.175 0 0 1-.39.035H2.985C1.888 15 1 14.194 1 13.2c0-.118.013-.237.039-.353l1.19-5.4C2.414 6.606 3.229 6 4.174 6H6Z" />
    <path
      fillRule="evenodd"
      d="M5.477 2.618a.5.5 0 0 1 .705.059L8.55 5.476l2.368-2.799a.5.5 0 0 1 .764.646L9.205 6.25l2.477 2.927a.5.5 0 1 1-.764.646L8.55 7.024 6.182 9.823a.5.5 0 1 1-.764-.646L7.895 6.25 5.418 3.323a.5.5 0 0 1 .059-.705z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconUndeploy;
