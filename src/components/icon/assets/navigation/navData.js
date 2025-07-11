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
const OuiIconNavData = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.57 1.192c-3.405 0-6.072 1.531-6.072 3.487v6.201c0 1.956 2.666 3.488 6.071 3.488s6.072-1.532 6.072-3.488v-6.2c0-1.956-2.667-3.487-6.072-3.487m0 .775c2.871 0 5.296 1.242 5.296 2.712S10.44 7.393 7.569 7.393 2.272 6.151 2.272 4.68 4.698 1.967 7.57 1.967m5.296 8.913c0 1.471-2.425 2.713-5.296 2.713s-5.297-1.242-5.297-2.712v-1.37c1.033 1.058 2.996 1.757 5.297 1.757s4.264-.699 5.296-1.757zm0-3.099c0 1.47-2.425 2.712-5.296 2.712S2.273 9.251 2.273 7.781V6.409C3.306 7.466 5.269 8.166 7.57 8.166s4.264-.7 5.296-1.757z" />
  </svg>
);
export const icon = OuiIconNavData;
