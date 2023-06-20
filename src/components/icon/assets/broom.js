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
const OuiIconBroom = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m3.732 13.096-.197-.197 2.83-2.828.706.707-2.829 2.828.708.708 2.828-2.828a1 1 0 0 0 0-1.414L5.658 7.95a.993.993 0 0 0-.708-.293.994.994 0 0 0-.708.293l-2.828 2.829.707.707 2.829-2.83.707.708-2.829 2.829.904.903Zm1.218-6.44c.512 0 1.023.196 1.414.587l2.121 2.12a2 2 0 0 1 0 2.83L4.95 15.728 0 10.778l3.535-3.535a1.993 1.993 0 0 1 1.415-.586ZM14.02 1l.708.707-6.95 6.95-.707-.707L14.021 1Z" />
  </svg>
);
export const icon = OuiIconBroom;
