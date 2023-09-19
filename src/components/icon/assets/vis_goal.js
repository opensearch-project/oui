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
const OuiIconVisGoal = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.725 3.653a6 6 0 0 1 2.847 7.576.5.5 0 0 1-.928-.372 5 5 0 1 0-9.293-.014.5.5 0 0 1-.218.619L1.39 12.47a.5.5 0 0 1-.708-.23A7.99 7.99 0 0 1 0 9a8 8 0 0 1 11.212-7.329.5.5 0 0 1 .234.704l-.721 1.278Zm-.933-.38.5-.889a7 7 0 0 0-8.902 8.93l.886-.511a6 6 0 0 1 7.516-7.53ZM6.73 9.467a1.75 1.75 0 1 1 2.539 0 2 2 0 1 1-2.539 0ZM8 12.013a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm0-3a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
  </svg>
);
export const icon = OuiIconVisGoal;
