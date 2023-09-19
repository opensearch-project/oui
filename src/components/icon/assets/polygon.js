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
const OuiIconPolygon = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1 5V1h4v1.3h6V1h4v4h-2.934l-.808 1H12v4h-.76l.8 1H15v4h-4v-1.5H5V15H1v-4h1.5V5H1Zm1-3h2v2H2V2Zm9 10.5v-1.2L9.96 10H8V6h1.973L11 4.728V3.3H5V5H3.5v6H5v1.5h6ZM12 2h2v2h-2V2ZM4 12H2v2h2v-2Zm5-5h2v2H9V7Zm3 5h2v2h-2v-2Z" />
  </svg>
);
export const icon = OuiIconPolygon;
