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
const OuiIconAlert = ({ title, titleId, ...props }) => (
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
      d="M7.59 10.059 7.35 5.18h1.3L8.4 10.06h-.81Zm.394 1.901a.61.61 0 0 1-.448-.186.606.606 0 0 1-.186-.444c0-.174.062-.323.186-.446a.614.614 0 0 1 .448-.184c.169 0 .315.06.44.182.124.122.186.27.186.448a.6.6 0 0 1-.189.446.607.607 0 0 1-.437.184ZM2 14a1 1 0 0 1-.878-1.479l6-11a1 1 0 0 1 1.756 0l6 11A1 1 0 0 1 14 14H2Zm0-1h12L8 2 2 13Z"
    />
  </svg>
);
export const icon = OuiIconAlert;
