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
const OuiIconWsObservability = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M14.819 9.366v-.003a3.09 3.09 0 0 0-.153-.356L12.16 3.303a.724.724 0 0 0-.151-.22 2.171 2.171 0 0 0-3.073 0 .724.724 0 0 0-.212.511v1.267H7.276V3.594a.724.724 0 0 0-.212-.512 2.172 2.172 0 0 0-3.073 0 .724.724 0 0 0-.15.22L1.333 9.008a2.87 2.87 0 0 0-.153.356v.003a3.138 3.138 0 1 0 6.095 1.047V6.309h1.448v4.104a3.137 3.137 0 1 0 6.095-1.047ZM5.103 4.033a.724.724 0 0 1 .725-.073v3.81a3.132 3.132 0 0 0-2.167-.46l1.442-3.277Zm-.965 8.07a1.69 1.69 0 1 1 0-3.38 1.69 1.69 0 0 1 0 3.38Zm6.034-8.143a.728.728 0 0 1 .725.073l1.44 3.278a3.132 3.132 0 0 0-2.166.46l.001-3.811Zm1.69 8.143a1.69 1.69 0 1 1 0-3.38 1.69 1.69 0 0 1 0 3.38Z" />
  </svg>
);
export const icon = OuiIconWsObservability;
