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
const OuiIconCloudDrizzle = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.348 3.761A3.995 3.995 0 0 1 8 7a.5.5 0 0 1-1 0 3 3 0 1 0-4.878 2.34.5.5 0 0 1-.627.779 4 4 0 0 1 3.973-6.84 5.502 5.502 0 0 1 10.096 4.37.5.5 0 1 1-.92-.39 4.5 4.5 0 1 0-8.296-3.497Zm-1.61 4.935a.5.5 0 1 1 .775.633l-1.466 1.792a.5.5 0 1 1-.774-.633l1.466-1.792Zm-3.12 3.647a.5.5 0 0 1 .774.634l-1.505 1.84a.5.5 0 0 1-.774-.634l1.505-1.84Zm7.62-3.647a.5.5 0 0 1 .775.633l-1.466 1.792a.5.5 0 1 1-.774-.633l1.466-1.792Zm-3.12 3.647a.5.5 0 0 1 .774.634l-1.505 1.84a.5.5 0 0 1-.774-.634l1.505-1.84Zm7.62-3.647a.5.5 0 1 1 .775.633l-1.466 1.792a.5.5 0 1 1-.774-.633l1.466-1.792Zm-3.12 3.647a.5.5 0 0 1 .774.634l-1.505 1.84a.5.5 0 0 1-.774-.634l1.505-1.84Z" />
  </svg>
);
export const icon = OuiIconCloudDrizzle;
