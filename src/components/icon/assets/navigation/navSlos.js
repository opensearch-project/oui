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
const OuiIconNavSlos = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M8.16 2.805a4.138 4.138 0 0 1 5.849 5.825l-5.227 5.244c-.41.41-1.063.431-1.497.062l-.074-.068-5.22-5.238a4.14 4.14 0 0 1 5.85-5.825l.16.137.159-.137Zm-.975.576a3.278 3.278 0 0 0-4.251.137l-.004.004-.104.098-.004.004a3.277 3.277 0 0 0-.106 4.523l.004.004.098.103L8 13.436l3.747-3.748.171-.172L9.192 6.79l-.172.172-.715.715A1.78 1.78 0 0 1 5.788 5.16l1.608-1.61-.211-.169Zm5.993.243a3.277 3.277 0 0 0-4.4-.212l-.123.106-.004.004-.104.098-2.149 2.15a.918.918 0 0 0-.07 1.217l.003.006.005.004.052.06.01.01a.918.918 0 0 0 1.217.07l.006-.004.004-.005.06-.052.005-.004 1.196-1.197a.432.432 0 0 1 .611 0l3.032 3.031.649-.648a3.277 3.277 0 0 0 0-4.634Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconNavSlos;
