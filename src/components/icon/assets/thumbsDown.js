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
const OuiIconThumbsDown = ({ title, titleId, ...props }) => (
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
      d="M10.509 13.649a.532.532 0 0 1-.845-.053l-.231-.347-.539-1.078A2.118 2.118 0 0 0 7 11H6a.5.5 0 0 0 0 1h1c.423 0 .81.24 1 .618l.553 1.106a.5.5 0 0 0 .03.053l.25.373c.56.842 1.77.918 2.432.154.35-.405.527-.932.492-1.466l-.008-.121a6.358 6.358 0 0 0-.313-1.588L11.393 11h1.773a1.835 1.835 0 0 0 1.6-2.736l-.118-.21a1.934 1.934 0 0 0-.491-1.904l-.095-.095A2.123 2.123 0 0 0 12.9 3.62l-.11-.33A1.887 1.887 0 0 0 11 2h-.921a5.07 5.07 0 0 0-2.268.535 7.63 7.63 0 0 0-1.983 1.43l-.182.181a.5.5 0 1 0 .707.707l.182-.181A6.631 6.631 0 0 1 8.258 3.43a4.07 4.07 0 0 1 1.82-.43H11c.382 0 .721.244.842.607l.179.536a.531.531 0 0 0 .336.336c.573.191.892.802.721 1.382l-.052.178a.535.535 0 0 0 .135.53l.289.288c.273.273.35.687.193 1.04a.5.5 0 0 0 .021.448l.23.41A.836.836 0 0 1 13.166 10h-1.96a.864.864 0 0 0-.82 1.138l.102.307c.144.433.233.883.263 1.338l.008.121c.018.272-.072.54-.25.745zM4 4.647a.2.2 0 0 0-.2-.2H2.2a.2.2 0 0 0-.2.2v6.706c0 .11.09.2.2.2h1.6a.2.2 0 0 0 .2-.2V4.647zM2 3.5c-.552 0-1 .424-1 .947v7.106c0 .523.448.947 1 .947h2c.552 0 1-.424 1-.947V4.447c0-.523-.448-.947-1-.947H2z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconThumbsDown;
