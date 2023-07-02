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
const OuiIconTokenFlattened = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3.25 3a.25.25 0 0 0-.25.25v2c0 .138.112.25.25.25h9.5a.25.25 0 0 0 .25-.25v-2a.25.25 0 0 0-.25-.25h-9.5zm0 3.75A.25.25 0 0 0 3 7v2c0 .138.112.25.25.25H5.5A.25.25 0 0 0 5.75 9V7a.25.25 0 0 0-.25-.25H3.25zm-.25 4a.25.25 0 0 1 .25-.25H5.5a.25.25 0 0 1 .25.25v2a.25.25 0 0 1-.25.25H3.25a.25.25 0 0 1-.25-.25v-2zm3.31-.727c-.082-.073-.082-.224 0-.296l3.054-2.683a.17.17 0 0 1 .19-.026c.064.032.104.1.104.174v1.341l3.161-.016c.1 0 .18.086.18.192v2.3c0 .105-.08.191-.18.191l-3.161.017v1.341c0 .074-.04.142-.103.174a.17.17 0 0 1-.19-.025L6.31 10.023z" />
  </svg>
);
export const icon = OuiIconTokenFlattened;
