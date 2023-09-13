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
const OuiIconChatRight = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M11.54 14.923a1 1 0 0 0 .614-.923v-1.619H13a2 2 0 0 0 2-2v-7.38a2 2 0 0 0-2-2H3a2 2 0 0 0-2 2v7.38a2 2 0 0 0 2 2h5.09l2.362 2.331a1 1 0 0 0 1.088.211zm-.386-2.542a1 1 0 0 1 1-1H13a1 1 0 0 0 1-1v-7.38a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v7.38a1 1 0 0 0 1 1h5.09a1 1 0 0 1 .702.289L11.154 14v-1.619z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconChatRight;
