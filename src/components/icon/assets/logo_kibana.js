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
const OuiIconLogoKibana = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fill="none" fillRule="evenodd">
      <path fill="#F04E98" d="M4 0v28.789L28.935.017z" />
      <path
        d="M4 12v16.789l11.906-13.738A24.721 24.721 0 0 0 4 12"
        className="ouiIcon__fillNegative"
      />
      <path
        fill="#00BFB3"
        d="M18.479 16.664 6.268 30.754l-1.074 1.237h23.192c-1.252-6.292-4.883-11.719-9.907-15.327"
      />
    </g>
  </svg>
);
export const icon = OuiIconLogoKibana;
