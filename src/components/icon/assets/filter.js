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
const OuiIconFilter = ({ title, titleId, ...props }) => (
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
      d="m9.759 12.652-1.8 2.25-.78-.625 1.8-2.25A.1.1 0 0 0 9 11.965V8.362a1 1 0 0 1 .232-.64l4.631-5.558A.1.1 0 0 0 13.787 2H2.213a.1.1 0 0 0-.077.164l4.631 5.558a1 1 0 0 1 .232.64v5.853a.1.1 0 0 0 .178.062l.781.625c-.65.812-1.959.353-1.959-.687V8.362L1.368 2.804C.771 2.088 1.281 1 2.214 1h11.573c.932 0 1.442 1.088.845 1.804L10 8.362v3.603a1.1 1.1 0 0 1-.241.687Z"
    />
  </svg>
);
export const icon = OuiIconFilter;
