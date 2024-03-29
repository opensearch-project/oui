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
const OuiIconAppPacketbeat = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M16 20a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M8 4a4 4 0 1 0-4 4 4 4 0 0 0 2-.57l5.27 5.27 1.41-1.41L7.43 6A4 4 0 0 0 8 4zM4 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm16.71 6.71L26 7.43A4 4 0 0 0 28 8a4 4 0 1 0-4-4 4 4 0 0 0 .57 2l-5.27 5.27 1.41 1.44zM28 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM11.29 19.29 6 24.57A4 4 0 0 0 4 24a4 4 0 1 0 4 4 4 4 0 0 0-.57-2l5.27-5.27-1.41-1.44zM4 30a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm24-6a4 4 0 0 0-2 .57l-5.27-5.27-1.41 1.41L24.57 26a4 4 0 0 0-.57 2 4 4 0 1 0 4-4zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
  </svg>
);
export const icon = OuiIconAppPacketbeat;
