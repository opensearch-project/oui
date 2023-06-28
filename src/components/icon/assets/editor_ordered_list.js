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
const OuiIconEditorOrderedList = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 8v1h1v1H1V9h1V8H1V7h3v1H3Zm1 4v2H1v-1h1v-1H1v-1h3v1ZM3 5h1v1H1V5h1V4H1V3h2v2Zm2.5-1h8a.5.5 0 1 1 0 1h-8a.5.5 0 0 1 0-1Zm0 4h8a.5.5 0 1 1 0 1h-8a.5.5 0 0 1 0-1Zm0 4h8a.5.5 0 1 1 0 1h-8a.5.5 0 1 1 0-1Z" />
  </svg>
);
export const icon = OuiIconEditorOrderedList;
