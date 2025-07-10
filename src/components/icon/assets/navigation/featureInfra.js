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
const OuiIconFeatureInfra = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.572 6.036H6.43a.393.393 0 0 0-.393.393v3.142a.393.393 0 0 0 .393.393h3.142a.393.393 0 0 0 .392-.393V6.429a.393.393 0 0 0-.392-.393Zm-.393 3.142H6.823V6.822h2.356v2.356Zm5.63 0h-1.18V6.822h1.18a.393.393 0 0 0 0-.786h-1.18V3.287a.917.917 0 0 0-.915-.916h-2.75V1.193a.393.393 0 0 0-.785 0V2.37H6.823V1.193a.393.393 0 0 0-.786 0V2.37H3.288a.916.916 0 0 0-.916.916v2.75H1.194a.393.393 0 0 0 0 .785h1.178v2.356H1.194a.393.393 0 0 0 0 .786h1.178v2.749a.916.916 0 0 0 .916.916h2.75v1.178a.393.393 0 1 0 .785 0V13.63h2.356v1.178a.393.393 0 1 0 .785 0V13.63h2.75a.916.916 0 0 0 .916-.916v-2.75h1.178a.393.393 0 0 0 0-.785Zm-1.965 3.535a.13.13 0 0 1-.13.13H3.287a.13.13 0 0 1-.13-.13V3.287a.13.13 0 0 1 .13-.13h9.425a.131.131 0 0 1 .131.13v9.426Z" />
  </svg>
);
export const icon = OuiIconFeatureInfra;
