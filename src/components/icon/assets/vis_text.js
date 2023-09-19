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
const OuiIconVisText = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8.5 5v6h2a.5.5 0 1 1 0 1h-5a.5.5 0 1 1 0-1h2V5H5v.5a.5.5 0 0 1-1 0v-1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.51l-.021 1a.5.5 0 1 1-1-.02l.01-.49H8.5ZM1 15h1.5a.5.5 0 1 1 0 1h-2a.5.5 0 0 1-.5-.5v-1.996a.5.5 0 0 1 1 0V15ZM1 1v1.497a.5.5 0 1 1-1 0V.5A.5.5 0 0 1 .5 0h2a.5.5 0 0 1 0 1H1Zm14 0h-1.495a.5.5 0 0 1 0-1H15.5a.5.5 0 0 1 .5.5v2a.5.5 0 1 1-1 0V1Zm0 14v-1.5a.5.5 0 1 1 1 0v2a.5.5 0 0 1-.5.5h-2a.5.5 0 1 1 0-1H15ZM0 6.5a.5.5 0 0 1 1 0v3a.5.5 0 0 1-1 0v-3ZM9.5 0a.5.5 0 0 1 0 1h-3a.5.5 0 0 1 0-1h3ZM15 6.5a.5.5 0 1 1 1 0v3a.5.5 0 1 1-1 0v-3ZM9.5 15a.5.5 0 1 1 0 1h-3a.5.5 0 1 1 0-1h3Z" />
  </svg>
);
export const icon = OuiIconVisText;
