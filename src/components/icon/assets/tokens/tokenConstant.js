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
const OuiIconTokenConstant = ({ title, titleId, ...props }) => (
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
      d="m9.414 3.757 2.829 2.829a2 2 0 0 1 0 2.828l-2.829 2.829a2 2 0 0 1-2.828 0L3.757 9.414a2 2 0 0 1 0-2.828l2.829-2.829a2 2 0 0 1 2.828 0Zm-1.747 2.91a1 1 0 0 0-1 1v.666a1 1 0 0 0 1 1h.666a1 1 0 0 0 1-1v-.666a1 1 0 0 0-1-1h-.666Z"
    />
  </svg>
);
export const icon = OuiIconTokenConstant;
