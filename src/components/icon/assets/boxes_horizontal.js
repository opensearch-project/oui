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
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M0 6h4v4H0V6zm1 1v2h2V7H1zm5-1h4v4H6V6zm1 1v2h2V7H7zm5-1h4v4h-4V6zm1 3h2V7h-2v2z" />
  </svg>
);

export const icon = OuiIconBoxesHorizontal;
