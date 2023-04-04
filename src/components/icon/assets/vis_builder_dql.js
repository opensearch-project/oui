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

const OuiIconVisBuilderDql = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.5 2c0 .022 0 .043-.002.064l1.559 1.04a1 1 0 11-.555.832l-1.559-1.04a.996.996 0 01-.702.07L7.466 4.741A1.001 1.001 0 016.5 6a1 1 0 01-.998-1.064l-1.559-1.04a1 1 0 11.555-.832l1.559 1.04a.996.996 0 01.702-.07l1.775-1.775A1.001 1.001 0 019.5 1a1 1 0 011 1z" />
    <path d="M8.5 6.5h2v8a.5.5 0 001 0V8h2v6.5a.5.5 0 001 0V7.7a.7.7 0 00-.7-.7h-2.3v-.8a.7.7 0 00-.7-.7H8.2a.7.7 0 00-.7.7v1.3h-2v-.3a.7.7 0 00-.7-.7H2.2a.7.7 0 00-.7.7V9a.5.5 0 001 0V7.5h2V9a.5.5 0 001 0v-.5h2V9a.5.5 0 001 0V6.5z" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.6 10a.6.6 0 00-.6.6v3.86a.6.6 0 00.6.6h7.476a.6.6 0 00.6-.6V10.6a.6.6 0 00-.6-.6H1.6zm5.545 3.398v-2.675h.579v2.675c0 .16.13.29.289.29h1.229v.578h-1.23a.868.868 0 01-.867-.868zm-.867.336v-2.071a.868.868 0 00-.868-.868h-.289a.868.868 0 00-.868.868v1.735c0 .48.389.868.868.868h.868c.093 0 .215.051.336.132a1.43 1.43 0 01.173.136l.008.008h.001l.205-.204.204-.205h-.001l-.002-.002-.005-.005-.015-.015a2.046 2.046 0 00-.247-.195 1.486 1.486 0 00-.368-.182zm-1.157-2.36a.29.29 0 00-.29.289v1.735c0 .16.13.29.29.29h.578v-2.025a.29.29 0 00-.289-.29h-.289zm-3.398 2.892v-3.47h1.012c.56 0 1.012.453 1.012 1.011v1.446c0 .56-.453 1.013-1.012 1.013H1.723zm.578-2.892v2.313h.434c.24 0 .434-.194.434-.434v-1.446a.434.434 0 00-.434-.433h-.434z"
    />
  </svg>
);

export const icon = OuiIconVisBuilderDql;
