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

const OuiIconFramePrevious = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    fill="none"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M13 2a1 1 0 011 1v10a1 1 0 11-2 0V3a1 1 0 011-1zm-5.146.22l-7.2 4.581a1.425 1.425 0 000 2.398l7.2 4.581c.936.595 2.146-.088 2.146-1.199V3.42c0-1.111-1.21-1.794-2.146-1.199z"
      clipRule="evenodd"
    />
  </svg>
);

export const icon = OuiIconFramePrevious;
