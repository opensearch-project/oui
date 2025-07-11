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
const OuiIconNavQuerySets = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.57 6.001H2.356a.982.982 0 0 0-.981.983v6.728a.982.982 0 0 0 .981.981H13.57a.982.982 0 0 0 .982-.981V6.983a.982.982 0 0 0-.982-.981m.141 7.71a.141.141 0 0 1-.141.14H2.356a.141.141 0 0 1-.139-.141V6.984a.141.141 0 0 1 .139-.141H13.57a.141.141 0 0 1 .141.141zM2.495 4.179a.421.421 0 0 1 .421-.421h10.093a.421.421 0 1 1 0 .841H2.917a.421.421 0 0 1-.421-.421m1.122-2.243a.421.421 0 0 1 .421-.421h7.849a.421.421 0 0 1 0 .841H4.039a.421.421 0 0 1-.421-.421" />
  </svg>
);
export const icon = OuiIconNavQuerySets;
