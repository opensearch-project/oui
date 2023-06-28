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
const OuiIconExit = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M12.535 12.493a.47.47 0 0 1 .468.468v2.564a.473.473 0 0 1-.466.475H3V0H12.595a.45.45 0 0 1 .398.463v2.565a.469.469 0 0 1-.468.467h-.065a.468.468 0 0 1-.467-.467V1H4v14h8.01l-.007-2.04c0-.257.21-.467.467-.467h.065Zm-1.096-7.59 2.121 2.122a1.5 1.5 0 0 1 0 2.121l-2.12 2.122a.5.5 0 1 1-.708-.708l2.121-2.12a.5.5 0 0 0 0-.708l-2.121-2.121a.5.5 0 0 1 .707-.707Z"
    />
  </svg>
);
export const icon = OuiIconExit;
