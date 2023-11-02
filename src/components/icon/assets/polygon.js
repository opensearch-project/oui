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
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m1 5v-4h4v1.3h6v-1.3h3.9999v4h-2.9342l-0.8077 1h0.7419v4h-0.7597l0.8 1h2.9599v4h-4v-1.5h-5.9999v1.5h-3.9999v-4h1.5v-6l-1.5002-6e-5zm1-3.0001h2v2h-2v-2zm9 10.5v-1.1996l-1.0402-1.3004h-1.9597v-4h1.9727l1.0273-1.272v-1.4281h-5.9999v1.7h-1.5v6h1.5v1.5001h5.9999zm1.0001-10.5h2v2h-2v-2zm-8.0002 10h-2v2h2v-2zm5.0001-5.0001h2v2h-2v-2zm3.0001 5.0001h2v2h-2v-2z" />
  </svg>
);
export const icon = OuiIconPolygon;
