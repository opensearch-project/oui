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
const OuiIconFeatureMaps = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M.801 10.134a.382.382 0 0 1 .27-.349L4.09 8.736l.083-.02c.194-.03.392.065.466.235.085.194-.023.413-.241.489l-2.028.704 5.667 2.054 5.596-2.073-2.017-.684-.076-.035c-.167-.094-.242-.282-.17-.452.074-.17.27-.267.465-.238l.083.02 3.01 1.022c.162.055.27.193.273.347a.378.378 0 0 1-.261.353l-6.737 2.496a.473.473 0 0 1-.322.002l-6.816-2.47a.38.38 0 0 1-.264-.352Z" />
    <path d="M.832 12.102c.077-.168.276-.26.47-.228l.083.021 6.652 2.411 6.577-2.436.082-.022c.194-.034.393.057.472.225.079.169.01.359-.153.457l-.075.036-6.737 2.496a.473.473 0 0 1-.322.002l-6.816-2.47-.075-.035c-.165-.098-.235-.287-.158-.457ZM7.124 4.796a.878.878 0 1 1 1.755 0 .878.878 0 0 1-1.755 0Zm-3.01 0a3.887 3.887 0 1 1 7.775 0c0 3.687-3.55 5.757-3.7 5.844a.376.376 0 0 1-.375 0c-.15-.087-3.7-2.157-3.7-5.844Zm.753 0c0 2.791 2.433 4.608 3.135 5.073.7-.465 3.134-2.281 3.134-5.073a3.135 3.135 0 0 0-6.27 0Z" />
  </svg>
);
export const icon = OuiIconFeatureMaps;
