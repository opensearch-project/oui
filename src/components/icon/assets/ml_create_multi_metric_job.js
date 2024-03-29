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
const OuiIconMlCreateMultiMetricJob = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M4 24a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm24 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM4 26a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm24 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM17 9v6h6v2h-6v6h-2v-6H9v-2h6V9h2zM4 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm24 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM4 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M21.078 29.05c.102.677.3 1.322.582 1.92A15.963 15.963 0 0 1 16 32c-1.993 0-3.9-.364-5.66-1.03.281-.598.48-1.243.582-1.92 1.574.614 3.287.95 5.078.95 1.791 0 3.504-.336 5.078-.95zm9.892-18.71A15.963 15.963 0 0 1 32 16c0 1.993-.364 3.9-1.03 5.66a6.948 6.948 0 0 0-1.92-.582c.614-1.574.95-3.287.95-5.078 0-1.791-.336-3.504-.95-5.078a6.948 6.948 0 0 0 1.92-.582zm-29.94 0c.598.281 1.243.48 1.92.582A13.965 13.965 0 0 0 2 16c0 1.791.336 3.504.95 5.078-.677.102-1.322.3-1.92.582A15.964 15.964 0 0 1 0 16c0-1.993.364-3.9 1.03-5.66zM16 0c1.993 0 3.9.364 5.66 1.03a6.948 6.948 0 0 0-.582 1.92A13.965 13.965 0 0 0 16 2c-1.791 0-3.504.336-5.078.95a6.948 6.948 0 0 0-.582-1.92A15.964 15.964 0 0 1 16 0z" />
  </svg>
);
export const icon = OuiIconMlCreateMultiMetricJob;
