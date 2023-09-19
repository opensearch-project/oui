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
const OuiIconAppAdvancedSettings = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M2.909 26.182h1.939v4.848H2.909z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M4.848 16.62V0H2.91v16.62a3.879 3.879 0 1 0 1.94 0Zm-.97 5.683a1.94 1.94 0 1 1 0-3.879 1.94 1.94 0 0 1 0 3.879Z" />
    <path
      d="M14.545 16.485h1.939V31.03h-1.939z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M16.485 6.924V0h-1.94v6.924a3.879 3.879 0 1 0 1.94 0Zm-.97 5.682a1.94 1.94 0 1 1 0-3.879 1.94 1.94 0 0 1 0 3.88Z" />
    <path
      d="M26.182 26.182h1.939v4.848h-1.939z"
      className="ouiIcon__fillSecondary"
    />
    <path d="M28.121 16.62V0h-1.94v16.62a3.879 3.879 0 1 0 1.94 0Zm-.97 5.683a1.94 1.94 0 1 1 0-3.879 1.94 1.94 0 0 1 0 3.879Z" />
  </svg>
);
export const icon = OuiIconAppAdvancedSettings;
