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
const OuiIconVisMapCoordinate = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.5 15C5.77 15 2 9.97 2 6.595 2 3.507 4.46 1 7.5 1S13 3.507 13 6.595C13 9.97 9.23 15 7.5 15Zm0-1c.286 0 1.48-1.044 2.459-2.35C11.219 9.969 12 8.153 12 6.596 12 4.055 9.983 2 7.5 2S3 4.055 3 6.595c0 1.557.78 3.373 2.041 5.056C6.02 12.956 7.214 14 7.5 14Zm0-4.996a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" />
  </svg>
);
export const icon = OuiIconVisMapCoordinate;
