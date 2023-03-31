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
const OuiIconGrabHorizontal = ({ title, titleId, ...props }) => (
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
      d="M6 2.5c0-.276.232-.5.5-.5.276 0 .5.229.5.5v11c0 .276-.232.5-.5.5a.503.503 0 0 1-.5-.5v-11Zm3 0c0-.276.232-.5.5-.5.276 0 .5.229.5.5v11c0 .276-.232.5-.5.5a.503.503 0 0 1-.5-.5v-11Z"
    />
  </svg>
);
export const icon = OuiIconGrabHorizontal;
