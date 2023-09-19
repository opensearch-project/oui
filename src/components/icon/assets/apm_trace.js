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
const OuiIconApmTrace = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2Zm.5 2h10a.5.5 0 1 1 0 1h-10a.5.5 0 0 1 0-1Zm1 3h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1 0-1Zm2 3h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1 0-1Zm3 3h5a.5.5 0 1 1 0 1h-5a.5.5 0 1 1 0-1Z" />
  </svg>
);
export const icon = OuiIconApmTrace;
