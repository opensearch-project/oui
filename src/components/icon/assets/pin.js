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
const OuiIconPin = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8 11h4.5a.5.5 0 1 0 0-1h-10a.5.5 0 0 0 0 1H7v4.25c0 .414.224.75.5.75s.5-.336.5-.75V11ZM4 4h1v6H4V4Zm6 0h1v6h-1V4ZM4.286 2C4.08 2 4 2.063 4 2v1c0-.063.08 0 .286 0h6.428C10.92 3 11 2.937 11 3V2c0 .063-.08 0-.286 0H4.286Zm0-1h6.428C11.424 1 12 1.448 12 2v1c0 .552-.576 1-1.286 1H4.286C3.576 4 3 3.552 3 3V2c0-.552.576-1 1.286-1Z"
    />
  </svg>
);
export const icon = OuiIconPin;
