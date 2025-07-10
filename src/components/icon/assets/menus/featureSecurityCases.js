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
const OuiIconFeatureSecurityCases = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.522 3.927H9.171L7.414 2.609a.866.866 0 0 0-.522-.174H4.075a.871.871 0 0 0-.871.871v1.118H2.086a.871.871 0 0 0-.871.87v6.961a.87.87 0 0 0 .871.871h9.502a.816.816 0 0 0 .815-.815v-1.174h1.174a.816.816 0 0 0 .815-.815V4.797a.87.87 0 0 0-.871-.871m-1.865 8.384a.07.07 0 0 1-.069.069H2.086a.122.122 0 0 1-.125-.124V5.294a.122.122 0 0 1 .125-.124h2.817q.041.001.075.024l1.855 1.394a.374.374 0 0 0 .224.074h4.474a.122.122 0 0 1 .124.124zm1.99-1.989a.069.069 0 0 1-.07.069h-1.174V6.786a.87.87 0 0 0-.871-.87H7.182L5.425 4.598a.866.866 0 0 0-.522-.174H3.95v-1.12a.122.122 0 0 1 .124-.123h2.817q.042.001.075.024l1.856 1.393a.376.376 0 0 0 .224.074h4.475a.122.122 0 0 1 .124.124z" />
  </svg>
);
export const icon = OuiIconFeatureSecurityCases;
