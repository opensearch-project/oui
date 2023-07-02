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
const OuiIconFolderCheck = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M6 2H1v11h6.1c.07.348.177.682.316 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.25a.75.75 0 0 1 .75.75v1.125c0 .069.056.125.125.125H13a1 1 0 0 1 1 1v3.416a4.962 4.962 0 0 0-1-.316V4H7.125A1.125 1.125 0 0 1 6 2.875V2zm10 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-1.646-1.354a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 2.146-2.147a.5.5 0 0 1 .708 0z"
    />
  </svg>
);
export const icon = OuiIconFolderCheck;
