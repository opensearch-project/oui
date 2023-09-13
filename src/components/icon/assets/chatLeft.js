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
const OuiIconChatLeft = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M4.46 14.923A1 1 0 0 1 3.846 14v-1.619H3a2 2 0 0 1-2-2v-7.38a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v7.38a2 2 0 0 1-2 2H7.91L5.55 14.712a1 1 0 0 1-1.089.211zm.386-2.542a1 1 0 0 0-1-1H3a1 1 0 0 1-1-1v-7.38a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v7.38a1 1 0 0 1-1 1H7.91a1 1 0 0 0-.702.289L4.846 14v-1.619z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconChatLeft;
