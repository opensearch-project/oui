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
const OuiIconTokenNull = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m5.002 12.412-.962.962a1 1 0 0 1-1.414-1.414l.962-.962a5.333 5.333 0 0 1 7.41-7.41l.962-.962a1 1 0 1 1 1.414 1.414l-.962.962a5.333 5.333 0 0 1-7.41 7.41Zm.966-.966a4 4 0 0 0 5.478-5.478l-5.478 5.478Zm-1.414-1.414 5.478-5.478a4 4 0 0 0-5.478 5.478Z" />
  </svg>
);
export const icon = OuiIconTokenNull;
