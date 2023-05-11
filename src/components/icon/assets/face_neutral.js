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
const OuiIconFaceNeutral = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="#13252D" fillRule="evenodd">
      <circle cx={5} cy={5} r={1} />
      <circle cx={10} cy={5} r={1} />
      <path
        fillRule="nonzero"
        d="M7.5 14a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13Zm0 1a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      />
      <path fillRule="nonzero" d="M3 10h9a.5.5 0 1 0 0-1H3a.5.5 0 0 0 0 1Z" />
    </g>
  </svg>
);
export const icon = OuiIconFaceNeutral;
