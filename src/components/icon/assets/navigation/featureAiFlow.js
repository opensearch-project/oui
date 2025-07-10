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
const OuiIconFeatureAiFlow = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M11.169 6.985h2.984a.87.87 0 0 0 .87-.871V3.13a.87.87 0 0 0-.871-.87h-2.984a.87.87 0 0 0-.87.87v1.119H9.179a1.368 1.368 0 0 0-1.367 1.368V7.73H5.575v-.621a.87.87 0 0 0-.869-.87H2.715a.87.87 0 0 0-.87.871v1.989a.87.87 0 0 0 .87.871h1.991a.87.87 0 0 0 .87-.871v-.621h2.238v2.113a1.368 1.368 0 0 0 1.367 1.368h1.12v1.118a.87.87 0 0 0 .87.871h2.984a.87.87 0 0 0 .87-.871v-2.984a.871.871 0 0 0-.871-.87H11.17a.87.87 0 0 0-.87.871v1.118H9.179a.621.621 0 0 1-.621-.621V5.618a.621.621 0 0 1 .621-.621h1.12v1.118a.87.87 0 0 0 .87.871M4.828 9.098a.122.122 0 0 1-.124.124H2.715a.122.122 0 0 1-.124-.124V7.11a.122.122 0 0 1 .124-.124h1.991a.122.122 0 0 1 .124.124zm6.216.995a.122.122 0 0 1 .124-.125h2.984a.122.122 0 0 1 .123.125v2.984a.122.122 0 0 1-.124.123h-2.984a.122.122 0 0 1-.123-.124zm0-6.962a.122.122 0 0 1 .124-.124h2.984a.122.122 0 0 1 .123.124v2.984a.122.122 0 0 1-.124.124h-2.984a.122.122 0 0 1-.123-.124z" />
  </svg>
);
export const icon = OuiIconFeatureAiFlow;
