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
const OuiIconEditorUnderline = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5 3.536V7.8c0 1.628 1.224 2.6 3 2.6 1.783 0 3-.972 3-2.6V3.536c0-.357.167-.536.5-.536.333 0 .5.179.5.536v4.318c0 2.093-1.665 3.546-4 3.546S4 9.893 4 7.8V3.536C4 3.179 4.167 3 4.5 3c.333 0 .5.179.5.536ZM2.5 13h11a.5.5 0 1 1 0 1h-11a.5.5 0 1 1 0-1Z" />
  </svg>
);
export const icon = OuiIconEditorUnderline;
