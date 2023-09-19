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
const OuiIconLogoWindows = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fill="#00ADEF"
      d="m0 4.51 12.977-1.768.006 12.518-12.971.074L0 4.51Zm12.97 12.192.011 12.529-12.97-1.784-.002-10.829 12.962.084Zm1.574-14.19L31.751 0v15.1l-17.207.137V2.511Zm17.21 14.308-.003 15.033-17.207-2.429-.024-12.632 17.235.028Z"
    />
  </svg>
);
export const icon = OuiIconLogoWindows;
