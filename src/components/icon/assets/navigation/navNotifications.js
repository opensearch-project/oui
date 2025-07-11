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
const OuiIconNavNotifications = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.4 2.8H1.6a.4.4 0 0 0-.4.4v9.067a.933.933 0 0 0 .933.933h11.733a.934.934 0 0 0 .933-.933V3.2a.4.4 0 0 0-.4-.4ZM8 8.524 2.626 3.6h10.744L8 8.524ZM6.243 8l-4.245 3.89V4.11L6.244 8Zm.592.543.897.818a.4.4 0 0 0 .54 0l.893-.818L13.37 12.4H2.628l4.208-3.857ZM9.755 8l4.244-3.89v7.78L9.755 8Z" />
  </svg>
);
export const icon = OuiIconNavNotifications;
