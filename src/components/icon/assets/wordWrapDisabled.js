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
const OuiIconWordWrapDisabled = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14 3.5 12 2v1H2v1h10v1l2-1.5zM12 9V8H2V7h10V6l2 1.5L12 9zm0 3v1l2-1.5-2-1.5v1H2v1h10z" />
  </svg>
);
export const icon = OuiIconWordWrapDisabled;
