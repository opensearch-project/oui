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
const OuiIconStopSlash = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      id="stop_slash-a"
      d="M12.259 3.034A1.001 1.001 0 0 0 12 3H4a1 1 0 0 0-1 1v8c0 .09.012.176.034.259l9.225-9.225Zm.707.707-9.225 9.225c.083.022.17.034.259.034h8a1 1 0 0 0 1-1V4c0-.09-.012-.176-.034-.259ZM4 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z"
    />
  </svg>
);
export const icon = OuiIconStopSlash;
