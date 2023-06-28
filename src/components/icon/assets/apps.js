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
const OuiIconApps = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 4V2h2v2H2Zm5 0V2h2v2H7Zm5 0V2h2v2h-2ZM2 9V7h2v2H2Zm5 0V7h2v2H7Zm5 0V7h2v2h-2ZM2 14v-2h2v2H2Zm5 0v-2h2v2H7Zm5 0v-2h2v2h-2Z" />
  </svg>
);
export const icon = OuiIconApps;
