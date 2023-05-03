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
const OuiIconFolderExclamation = ({ title, titleId, ...props }) => (
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
      d="m1 9.5.826-3.717A1 1 0 0 1 2.802 5H13V4H7.125A1.125 1.125 0 0 1 6 2.875V2H1v7.5zm.247 3.5H7.1c.07.348.177.682.316 1H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.25a.75.75 0 0 1 .75.75v1.125c0 .069.056.125.125.125H13a1 1 0 0 1 1 1v1h.753a1 1 0 0 1 .977 1.217l-.447 2.011a5.015 5.015 0 0 0-.887-.618L14.753 6H2.803l-1.556 7zM16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0zm-4 .5a.577.577 0 0 1-.57-.495l-.29-2.015a.867.867 0 1 1 1.718 0l-.288 2.015a.577.577 0 0 1-.57.495zm0 2.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </svg>
);
export const icon = OuiIconFolderExclamation;
