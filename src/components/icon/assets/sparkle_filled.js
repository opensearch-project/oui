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
const OuiIconSparkleFilled = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m7.917 4.25 1.178 2.988 2.988 1.179-2.988 1.178-1.178 2.988-1.179-2.988L3.75 8.417l2.988-1.179L7.917 4.25Z" />
    <path d="M7.917 3.833c.17 0 .325.105.387.264l1.112 2.82 2.82 1.112a.417.417 0 0 1 0 .775l-2.82 1.112-1.112 2.82a.417.417 0 0 1-.775 0l-1.112-2.82-2.82-1.112a.417.417 0 0 1 0-.775l2.82-1.112 1.112-2.82a.417.417 0 0 1 .388-.264Zm0 1.553L7.126 7.39a.417.417 0 0 1-.235.235l-2.005.79 2.005.792a.417.417 0 0 1 .235.234l.79 2.006.792-2.006a.417.417 0 0 1 .234-.234l2.006-.791-2.006-.791a.417.417 0 0 1-.234-.235l-.791-2.005ZM4.167 3l.53 1.136 1.136.53-1.136.531-.53 1.136-.53-1.136-1.137-.53 1.136-.53L4.166 3Z" />
  </svg>
);
export const icon = OuiIconSparkleFilled;
