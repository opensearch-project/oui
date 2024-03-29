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
const OuiIconAppSavedObjects = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M20.38 7.001 17 9.619V0h-2v9.619l-3.37-2.618-1.25 1.513L16 12.878l5.63-4.364z"
      className="ouiIcon__fillSecondary"
    />
    <path d="m21.06.165-1.11 1.61 9.25 5.983L16 16.29 2.8 7.758l9.25-5.983-1.1-1.61L0 7.234v13.653l16 10.337 16-10.337V7.234L21.06.164ZM2 9.57l13 8.407v10.279L2 19.84V9.57Zm15 18.676V17.978l13-8.407V19.85l-13 8.397Z" />
  </svg>
);
export const icon = OuiIconAppSavedObjects;
