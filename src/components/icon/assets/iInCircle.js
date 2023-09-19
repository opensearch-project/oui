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
const OuiIconIInCircle = ({ title, titleId, ...props }) => (
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
      d="M7.5 11.508 7.468 8H6.25V7h2.401l.03 3.508H9.8v1H7.5Zm-.25-6.202a.83.83 0 0 1 .207-.577c.137-.153.334-.229.59-.229.256 0 .454.076.594.23.14.152.209.345.209.576 0 .228-.07.417-.21.568-.14.15-.337.226-.593.226-.256 0-.453-.075-.59-.226a.81.81 0 0 1-.207-.568ZM8 13A5 5 0 1 0 8 3a5 5 0 0 0 0 10Zm0 1A6 6 0 1 1 8 2a6 6 0 0 1 0 12Z"
    />
  </svg>
);
export const icon = OuiIconIInCircle;
