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
const OuiIconWsEssentials = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.143 5.945a5.118 5.118 0 0 1-1.966 4.046 1.09 1.09 0 0 0-.426.859v.359a.837.837 0 0 1-.838.837H6.085a.837.837 0 0 1-.837-.837v-.36a1.076 1.076 0 0 0-.419-.85 5.12 5.12 0 0 1-1.973-4.022C2.84 3.19 5.092.87 7.876.802a5.144 5.144 0 0 1 5.267 5.143Zm-.718 0A4.425 4.425 0 0 0 7.892 1.52C5.497 1.58 3.56 3.573 3.573 5.97a4.406 4.406 0 0 0 1.699 3.462 1.79 1.79 0 0 1 .694 1.418v.359a.12.12 0 0 0 .12.12h3.827a.12.12 0 0 0 .12-.12v-.36a1.804 1.804 0 0 1 .7-1.421 4.4 4.4 0 0 0 1.692-3.483Zm-1.2-.538A3.324 3.324 0 0 0 8.537 2.72a.36.36 0 0 0-.12.708c1.04.175 1.922 1.058 2.098 2.099a.36.36 0 0 0 .708-.12ZM10.751 13.264a.359.359 0 0 1-.359.36H5.607a.359.359 0 1 1 0-.719h4.785a.359.359 0 0 1 .36.36ZM9.986 14.841a.359.359 0 0 1-.36.359H6.374a.359.359 0 1 1 0-.718h3.254a.359.359 0 0 1 .359.36Z" />
  </svg>
);
export const icon = OuiIconWsEssentials;
