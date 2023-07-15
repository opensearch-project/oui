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
const OuiIconEditorDistributeHorizontal = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7 2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2ZM1.5 1a.5.5 0 0 1 .5.5v13a.5.5 0 1 1-1 0v-13a.5.5 0 0 1 .5-.5Zm13 0a.5.5 0 0 1 .5.5v13a.5.5 0 1 1-1 0v-13a.5.5 0 0 1 .5-.5Z" />
  </svg>
);
export const icon = OuiIconEditorDistributeHorizontal;
