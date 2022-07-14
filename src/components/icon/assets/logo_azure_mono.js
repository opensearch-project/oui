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

const OuiIconLogoAzureMono = ({ title, titleId, ...props }) => (
  <svg
    width={32}
    height={32}
    viewBox="0 0 32 32"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M17.448 4l-9.414 8.01L0 26.157h7.243L17.448 4zM18.7 5.874l-4.018 11.11 7.704 9.497L7.441 29h24.494L18.7 5.874z" />
  </svg>
);

export const icon = OuiIconLogoAzureMono;
