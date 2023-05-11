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
const OuiIconPinFilled = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9 11h4.5a.5.5 0 1 0 0-1h-10a.5.5 0 1 0 0 1H8v4.25c0 .414.224.75.5.75s.5-.336.5-.75V11ZM5 4h7v6H5V4Zm.286-3h6.428C12.424 1 13 1.448 13 2v1c0 .552-.576 1-1.286 1H5.286C4.576 4 4 3.552 4 3V2c0-.552.576-1 1.286-1Z" />
  </svg>
);
export const icon = OuiIconPinFilled;
