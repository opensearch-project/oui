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
const OuiIconFaceHappy = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Zm0-1.067A6.933 6.933 0 1 0 8 1.067a6.933 6.933 0 0 0 0 13.866ZM5.333 6.4a1.067 1.067 0 1 1 0-2.133 1.067 1.067 0 0 1 0 2.133Zm5.334 0a1.067 1.067 0 1 1 0-2.133 1.067 1.067 0 0 1 0 2.133ZM2.739 8.802a.533.533 0 0 1 .922-.537C4.815 10.245 6.249 11.2 8 11.2c1.75 0 3.185-.956 4.34-2.935a.533.533 0 0 1 .92.537c-1.333 2.287-3.1 3.465-5.26 3.465-2.16 0-3.927-1.178-5.26-3.465Z" />
  </svg>
);
export const icon = OuiIconFaceHappy;
