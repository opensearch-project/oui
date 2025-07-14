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
const OuiIconHistory = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M8 0a7.944 7.944 0 0 0-5.656 2.343.5.5 0 0 0 .707.707A6.954 6.954 0 0 1 8 1c3.859 0 7 3.14 7 7s-3.141 7-7 7c-3.776 0-6.916-3.07-6.998-6.843-.006-.275-.237-.48-.511-.489a.5.5 0 0 0-.489.511C.096 12.492 3.684 16.001 8 16.001c4.411 0 8-3.589 8-8S12.411 0 8 0zm0 3.5a.5.5 0 0 0-.5.5v4c0 .008.004.014.004.022.002.035.012.067.02.101.008.03.012.061.025.088.012.025.031.046.047.07.021.031.041.061.069.086.005.005.007.011.013.016l3.064 2.571a.497.497 0 0 0 .704-.062.499.499 0 0 0-.062-.704L8.498 7.767V4a.5.5 0 0 0-.5-.5zM.5 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 1 0 1h-3A1.5 1.5 0 0 1 0 3.5v-3A.5.5 0 0 1 .5 0z" />
  </svg>
);
export const icon = OuiIconHistory;
