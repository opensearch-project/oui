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
const OuiIconNavReports = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.58 9.902a.408.408 0 0 1-.407.408H5.826a.408.408 0 0 1 0-.816h4.347a.408.408 0 0 1 .408.408Zm-.407-2.581H5.826a.408.408 0 0 0 0 .815h4.347a.408.408 0 0 0 0-.815Zm3.668-4.483v11.411a.951.951 0 0 1-.95.951H3.108a.95.95 0 0 1-.95-.95V2.837a.95.95 0 0 1 .95-.951h2.525a3.118 3.118 0 0 1 4.732 0h2.524a.95.95 0 0 1 .951.95Zm-8.15 1.087v.135h4.618v-.135a2.31 2.31 0 1 0-4.619 0Zm7.335-1.087a.136.136 0 0 0-.136-.136h-2.015c.165.386.25.802.25 1.223v.543a.408.408 0 0 1-.408.408H5.283a.408.408 0 0 1-.408-.408v-.543c0-.42.085-.837.25-1.223H3.108a.136.136 0 0 0-.136.136v11.411a.136.136 0 0 0 .136.136h9.781a.136.136 0 0 0 .136-.136V2.838Z" />
  </svg>
);
export const icon = OuiIconNavReports;
