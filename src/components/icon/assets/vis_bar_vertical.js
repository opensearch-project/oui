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
const OuiIconVisBarVertical = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10 7.5v6a.5.5 0 1 1-1 0V8H6v5.5a.5.5 0 1 1-1 0V3H2v10.5a.5.5 0 1 1-1 0v-11a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V7h3V4.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v9a.5.5 0 1 1-1 0V5h-3v2.5ZM.5 16a.5.5 0 1 1 0-1h14a.5.5 0 1 1 0 1H.5Z" />
  </svg>
);
export const icon = OuiIconVisBarVertical;
