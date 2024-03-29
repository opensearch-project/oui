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
const OuiIconMerge = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.352 6H2.5a.5.5 0 0 1 0-1h4.852L5.12 2.721c-.18-.183-.155-.46.055-.616a.551.551 0 0 1 .705.048l3 3.062c.16.164.16.405 0 .57l-3 3.062A.532.532 0 0 1 5.5 9a.54.54 0 0 1-.325-.106c-.21-.157-.235-.433-.055-.616L7.352 6Zm1.296 4H13.5a.5.5 0 0 1 0 1H8.648l2.232 2.278c.18.183.155.46-.055.617A.54.54 0 0 1 10.5 14a.532.532 0 0 1-.38-.153l-3-3.063a.397.397 0 0 1 0-.568l3-3.063a.551.551 0 0 1 .705-.047c.21.156.235.433.055.616L8.648 10Z" />
  </svg>
);
export const icon = OuiIconMerge;
