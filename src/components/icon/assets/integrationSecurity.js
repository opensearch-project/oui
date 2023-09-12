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
const OuiIconIntegrationSecurity = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.282 7.4a4.5 4.5 0 0 1-8.666-.376l.851-.168L.847 5.18l-.848 2.167.897-.176a5.25 5.25 0 0 0 10.125.461l-.739-.233zm.836-2.54A5.25 5.25 0 0 0 .993 4.4l.713.232a4.5 4.5 0 0 1 8.666.375l-.851.169 1.62 1.672.858-2.164-.88.177z" />
    <path
      fillRule="evenodd"
      d="m9.048 3.977-.244 1.952a3.75 3.75 0 0 1-1.84 2.779L6 9.267l-.964-.56a3.75 3.75 0 0 1-1.84-2.778l-.244-1.952.344-.262.454.597.19 1.524a3 3 0 0 0 1.472 2.223L6 8.4l.588-.341A3 3 0 0 0 8.06 5.836l.19-1.524.454-.597.344.262zm-.798.335S7.312 3.6 6 3.6s-2.25.712-2.25.712l-.454-.597h.001v-.001l.003-.002.005-.004.015-.01a2.48 2.48 0 0 1 .204-.135c.132-.082.319-.187.553-.291C4.54 3.064 5.21 2.85 6 2.85s1.459.214 1.923.422a4.779 4.779 0 0 1 .71.393l.047.033.015.01.005.004.002.002.002.001-.454.597z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconIntegrationSecurity;
