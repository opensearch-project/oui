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
const OuiIconTokenPackage = ({ title, titleId, ...props }) => (
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
      d="m8.049 3.785 3.852 1.006-4.049 1.103L4 4.791l3.951-1.006a.19.19 0 0 1 .098 0Zm.073 2.654 4.545-1.306v5.45l-.131.184-4.414 1.455V6.439Zm-4.789 4.145V5.188L7.498 6.41v5.81l-4.034-1.453-.13-.183Z"
    />
  </svg>
);
export const icon = OuiIconTokenPackage;
