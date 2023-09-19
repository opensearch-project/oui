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
const OuiIconGrid = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1 5V1h4v4H1Zm3-1V2H2v2h2Zm2 1V1h4v4H6Zm3-1V2H7v2h2Zm2 1V1h4v4h-4Zm1-1h2V2h-2v2ZM1 10V6h4v4H1Zm3-1V7H2v2h2Zm2 1V6h4v4H6Zm3-1V7H7v2h2Zm2 1V6h4v4h-4Zm3-1V7h-2v2h2ZM1 15v-4h4v4H1Zm1-1h2v-2H2v2Zm4 1v-4h4v4H6Zm1-1h2v-2H7v2Zm4 1v-4h4v4h-4Zm1-1h2v-2h-2v2Z" />
  </svg>
);
export const icon = OuiIconGrid;
