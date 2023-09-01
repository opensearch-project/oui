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
const OuiIconThumbsUp = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M10.509 2.351a.532.532 0 0 0-.845.053l-.231.347-.539 1.078A2.118 2.118 0 0 1 7 5H6a.5.5 0 0 1 0-1h1c.423 0 .81-.238 1-.617l.553-1.106a.5.5 0 0 1 .03-.053l.25-.373a1.532 1.532 0 0 1 2.432-.154c.35.405.527.932.492 1.466l-.008.121a6.358 6.358 0 0 1-.313 1.588L11.393 5h1.773a1.835 1.835 0 0 1 1.6 2.736l-.118.21c.193.67.012 1.401-.491 1.904l-.095.095c.246.99-.25 2.009-1.161 2.434l-.11.33A1.888 1.888 0 0 1 11 14h-.921a5.071 5.071 0 0 1-2.268-.535 7.63 7.63 0 0 1-1.983-1.43l-.182-.181a.5.5 0 0 1 .707-.708l.182.182a6.63 6.63 0 0 0 1.723 1.242 4.07 4.07 0 0 0 1.82.43H11a.887.887 0 0 0 .842-.607l.179-.536a.532.532 0 0 1 .336-.336c.573-.191.892-.802.721-1.382l-.052-.178a.535.535 0 0 1 .135-.53l.289-.288a.934.934 0 0 0 .193-1.04.5.5 0 0 1 .021-.448l.23-.41A.836.836 0 0 0 13.166 6h-1.96a.864.864 0 0 1-.82-1.138l.102-.307c.144-.433.233-.883.263-1.338l.008-.121a1.032 1.032 0 0 0-.25-.745zM4 4.647a.2.2 0 0 0-.2-.2H2.2a.2.2 0 0 0-.2.2v6.706c0 .11.09.2.2.2h1.6a.2.2 0 0 0 .2-.2V4.647zM2 3.5c-.552 0-1 .424-1 .947v7.106c0 .523.448.947 1 .947h2c.552 0 1-.424 1-.947V4.447c0-.523-.448-.947-1-.947H2z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconThumbsUp;
