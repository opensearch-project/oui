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
const OuiIconIntegrationObservability = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.282 7.4a4.5 4.5 0 0 1-8.666-.376l.851-.168L.847 5.18l-.848 2.167.897-.176a5.25 5.25 0 0 0 10.125.461l-.739-.233zm.836-2.54A5.25 5.25 0 0 0 .993 4.4l.713.232a4.5 4.5 0 0 1 8.666.375l-.851.169 1.62 1.672.858-2.164-.88.177z" />
    <path
      fillRule="evenodd"
      d="M3.42 5.93c.914-2.328 4.246-2.328 5.16 0-.914 2.328-4.246 2.328-5.16 0zm5.934-.063c-1.06-3.244-5.649-3.244-6.709 0a.202.202 0 0 0 0 .125c1.06 3.245 5.65 3.245 6.71 0a.202.202 0 0 0 0-.125z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M6 5.55a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75zm-1.125.375a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconIntegrationObservability;
