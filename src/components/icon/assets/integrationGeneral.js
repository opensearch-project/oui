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
const OuiIconIntegrationGeneral = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 12 12"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M5.095 2.903a.525.525 0 0 1 .472-.278l1.05.016a.525.525 0 0 1 .462.292l.42.844.742-.063a.525.525 0 0 1 .486.239l.53.822a.525.525 0 0 1-.015.59l-.39.546.415.548c.129.17.142.402.032.586l-.5.838a.525.525 0 0 1-.482.255l-.785-.048-.483.989a.525.525 0 0 1-.472.294H5.495a.525.525 0 0 1-.471-.294L4.57 8.15l-.84.076a.525.525 0 0 1-.493-.246l-.531-.855a.525.525 0 0 1 .03-.597l.48-.625-.386-.539a.525.525 0 0 1-.014-.59l.53-.822a.525.525 0 0 1 .485-.239l.797.068.467-.879Zm.598.474-.472.888a.525.525 0 0 1-.508.277l-.81-.069-.374.58.394.55a.525.525 0 0 1-.01.625l-.488.634.376.606.856-.078a.525.525 0 0 1 .52.292l.459.941h.8l.488-.997a.525.525 0 0 1 .503-.293l.798.048.352-.59-.424-.56a.525.525 0 0 1-.008-.622l.399-.556-.374-.58-.76.064a.525.525 0 0 1-.515-.29l-.427-.858-.775-.012Z"
      clipRule="evenodd"
    />
    <path d="M10.282 7.4a4.5 4.5 0 0 1-8.666-.376l.851-.168L.847 5.18l-.848 2.167.897-.176a5.25 5.25 0 0 0 10.125.461l-.739-.233zm.836-2.54A5.25 5.25 0 0 0 .993 4.4l.713.232a4.5 4.5 0 0 1 8.666.375l-.851.169 1.62 1.672.858-2.164-.88.177z" />
    <path
      fillRule="evenodd"
      d="M6 5.625a.375.375 0 1 0 0 .75.375.375 0 0 0 0-.75zM4.875 6a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconIntegrationGeneral;
