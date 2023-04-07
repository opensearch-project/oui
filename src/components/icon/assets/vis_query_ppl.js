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

const OuiIconVisQueryPpl = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.5 2a.98.98 0 01-.002.064l1.559 1.04a1 1 0 11-.554.832l-1.56-1.04a.996.996 0 01-.702.07L7.466 4.741A1.001 1.001 0 016.5 6a1 1 0 01-.998-1.064l-1.558-1.04a1 1 0 11.555-.832l1.558 1.04a.996.996 0 01.702-.07l1.775-1.775A1.001 1.001 0 019.5 1a1 1 0 011 1z" />
    <path d="M8.5 9a.5.5 0 01-1 0v-.5h-2V9a.5.5 0 01-1 0V7.5h-2V9a.5.5 0 01-1 0V7.2a.7.7 0 01.7-.7h2.6a.7.7 0 01.7.7v.3h2V6.2a.7.7 0 01.7-.7h2.6a.7.7 0 01.7.7V7h2.3a.7.7 0 01.7.7v6.8a.5.5 0 01-1 0V8h-2v6.5a.5.5 0 01-1 0v-8h-2V9z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.6 10a.6.6 0 00-.6.6v3.86a.6.6 0 00.6.6h7.476a.6.6 0 00.6-.6V10.6a.6.6 0 00-.6-.6H1.6zm5.184.723h.578v2.964H8.88v.579H6.784v-3.543zm-2.53.072H5.41c.48 0 .868.389.868.868v.65c0 .48-.389.868-.868.868h-.578v1.157h-.579v-3.543zm.578 1.808h.578c.16 0 .29-.13.29-.29v-.65a.29.29 0 00-.29-.29h-.578v1.23zm-3.109 1.735v-3.543H2.88c.479 0 .867.389.867.868v.65c0 .48-.388.868-.867.868H2.3v1.157h-.578zm.578-1.735h.579c.16 0 .289-.13.289-.29v-.65a.29.29 0 00-.29-.29h-.578v1.23z"
    />
  </svg>
);

export const icon = OuiIconVisQueryPpl;
