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
const OuiIconTokenMethod = ({ title, titleId, ...props }) => (
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
      d="M3.333 11.027V5.05h2.059v1.136h.063c.25-.747.891-1.214 1.728-1.214.848 0 1.524.483 1.65 1.214h.063c.204-.731.927-1.214 1.822-1.214 1.155 0 1.949.798 1.949 2.023v4.03h-2.169V7.542c0-.521-.29-.84-.738-.84s-.723.319-.723.84v3.486H6.963V7.54c0-.521-.29-.84-.739-.84-.447 0-.722.319-.722.84v3.486H3.333Z"
    />
  </svg>
);
export const icon = OuiIconTokenMethod;
