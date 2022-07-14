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

const OuiIconLogoObservability = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10 32H7.238C3.793 32 1 28.865 1 24.998V15h9v17z" fill="#F04E98" />
    <path className="ouiIcon__fillNegative" d="M10 32h9V8h-9z" />
    <path
      d="M31 32h-9V0l1.973.024C27.866.072 31 3.731 31 8.228V32z"
      fill="#07C"
    />
  </svg>
);

export const icon = OuiIconLogoObservability;
