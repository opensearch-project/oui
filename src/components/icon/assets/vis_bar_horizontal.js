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

const OuiIconVisBarHorizontal = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 10h-6a.5.5 0 010-1H8V6H2.5a.5.5 0 010-1H13V2H2.5a.5.5 0 010-1h11a.5.5 0 01.5.5v4a.5.5 0 01-.5.5H9v3h2.5a.5.5 0 01.5.5v4a.5.5 0 01-.5.5h-9a.5.5 0 110-1H11v-3H8.5zM0 .5a.5.5 0 111 0v14a.5.5 0 11-1 0V.5z" />
  </svg>
);

export const icon = OuiIconVisBarHorizontal;
