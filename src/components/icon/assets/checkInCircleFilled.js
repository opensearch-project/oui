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

const OuiIconCheckInCircleFilled = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M8 16A8 8 0 118 0a8 8 0 010 16zm3.65-10.857L6.91 9.8 4.35 7.286a.5.5 0 00-.7.714l2.909 2.857a.5.5 0 00.7 0l5.091-5a.5.5 0 10-.7-.714z"
    />
  </svg>
);

export const icon = OuiIconCheckInCircleFilled;
