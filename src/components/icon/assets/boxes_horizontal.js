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
const OuiIconBoxesHorizontal = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M0 6h4v4H0V6Zm1 1v2h2V7H1Zm5-1h4v4H6V6Zm1 1v2h2V7H7Zm5-1h4v4h-4V6Zm1 3h2V7h-2v2Z" />
  </svg>
);
export const icon = OuiIconBoxesHorizontal;
