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
const OuiIconVisMetric = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.532 7.34a2.161 2.161 0 1 1 2.936 0 2.746 2.746 0 1 1-2.936 0ZM2 0h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2Zm0 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2Zm6 5.915a1.161 1.161 0 1 0 0-2.322 1.161 1.161 0 0 0 0 2.322Zm0 4.492a1.746 1.746 0 1 0 0-3.492 1.746 1.746 0 0 0 0 3.492Z" />
  </svg>
);
export const icon = OuiIconVisMetric;
