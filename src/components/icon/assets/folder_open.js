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
const OuiIconFolderOpen = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m1 9.5.826-3.717A1 1 0 0 1 2.802 5H13V4H7.125A1.125 1.125 0 0 1 6 2.875V2H1v7.5zm.247 3.5h11.95l1.556-7H2.803l-1.556 7zM13 14H1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h5.25a.75.75 0 0 1 .75.75v1.125c0 .069.056.125.125.125H13a1 1 0 0 1 1 1v1h.753a1 1 0 0 1 .977 1.217l-1.556 7a1 1 0 0 1-.976.783H13z" />
  </svg>
);
export const icon = OuiIconFolderOpen;
