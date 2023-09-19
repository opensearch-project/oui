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
const OuiIconPagesSelect = ({ title, titleId, ...props }) => (
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
      d="M3 1a1 1 0 0 1 1-1h8a1 1 0 0 1 .707.293l2 2A1 1 0 0 1 15 3v5a4.995 4.995 0 0 0-1-.584V4h-2a1 1 0 0 1-1-1V1H4v12h3.1c.07.348.177.682.316 1H4a1 1 0 0 1-1-1V1zm5 14H2V2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h7a5.029 5.029 0 0 1-1-1zm8-3a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-1.646-1.354a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 0 1-.708 0l-1-1a.5.5 0 0 1 .708-.708l.646.647 2.146-2.147a.5.5 0 0 1 .708 0z"
    />
  </svg>
);
export const icon = OuiIconPagesSelect;
