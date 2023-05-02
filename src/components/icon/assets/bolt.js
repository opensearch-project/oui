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
const OuiIconBolt = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.04 13.274a.5.5 0 1 0 .892.453l3.014-5.931a.5.5 0 0 0-.445-.727H5.316L8.03 1.727a.5.5 0 1 0-.892-.453L4.055 7.343a.5.5 0 0 0 .446.726h5.185L7.04 13.274Z" />
  </svg>
);
export const icon = OuiIconBolt;
