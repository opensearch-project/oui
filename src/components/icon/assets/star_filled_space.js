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
const OuiIconStarFilledSpace = ({ title, titleId, ...props }) => (
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
      d="M6 2a.86.86 0 0 0-.792.511l-1.33 2.924-3.128.446c-.71.102-1.001.976-.496 1.487l2.313 2.336-.563 3.268A.877.877 0 0 0 2.864 14c.142 0 .289-.036.429-.116L6 12.342l2.707 1.542c.14.08.287.116.43.116a.877.877 0 0 0 .859-1.027l-.563-3.269 2.313-2.336c.505-.511.214-1.385-.496-1.487l-3.128-.446-1.33-2.923A.86.86 0 0 0 6 2"
    />
  </svg>
);
export const icon = OuiIconStarFilledSpace;
