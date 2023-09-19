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
const OuiIconCrossInACircleFilled = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m8.746 8 3.1-3.1a.527.527 0 1 0-.746-.746L8 7.254l-3.1-3.1a.527.527 0 1 0-.746.746l3.1 3.1-3.1 3.1a.527.527 0 1 0 .746.746l3.1-3.1 3.1 3.1a.527.527 0 1 0 .746-.746L8.746 8ZM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16Z" />
  </svg>
);
export const icon = OuiIconCrossInACircleFilled;
