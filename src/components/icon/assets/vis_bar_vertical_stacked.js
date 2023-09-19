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
const OuiIconVisBarVerticalStacked = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.5 15a.5.5 0 1 1 0 1H.5a.5.5 0 1 1 0-1h14Zm-9-13a.5.5 0 0 1 .5.5L5.999 7H9V4.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v9a.5.5 0 1 1-1 0V7h-3v6.5a.5.5 0 0 1-.41.492L9.5 14a.5.5 0 0 1-.5-.5V10H6v3.5a.5.5 0 0 1-.992.09L5 13.5V6H2v7.5a.5.5 0 1 1-1 0v-11a.5.5 0 0 1 .5-.5h4Z" />
  </svg>
);
export const icon = OuiIconVisBarVerticalStacked;
