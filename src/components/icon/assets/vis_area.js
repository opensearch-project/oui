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
const OuiIconVisArea = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3 13h10V9.913l-2.571-2.826L8.56 8.753a.5.5 0 0 1-.728-.067L4.448 4.317 3 6.191V13Zm5.295-5.35 1.837-1.64a.5.5 0 0 1 .703.037l3.035 3.336a.5.5 0 0 1 .13.337v3.78a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V6.02a.5.5 0 0 1 .104-.305l1.947-2.52a.5.5 0 0 1 .791-.001L8.295 7.65ZM1 15h13.5a.5.5 0 1 1 0 1H.5a.5.5 0 0 1-.5-.5v-14a.5.5 0 0 1 1 0V15Z" />
  </svg>
);
export const icon = OuiIconVisArea;
