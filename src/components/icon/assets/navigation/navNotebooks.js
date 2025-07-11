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
const OuiIconNavNotebooks = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3.736 1.529h8.723a1.92 1.92 0 0 1 1.918 1.918v8.665a1.92 1.92 0 0 1-1.918 1.918H3.736a.386.386 0 0 1-.384-.383v-1.663h-.639a.384.384 0 1 1 0-.767h.64V8.164h-.64a.384.384 0 0 1 0-.767h.64V4.343h-.64a.384.384 0 0 1 0-.767h.64V1.913a.386.386 0 0 1 .383-.384m.384.767v1.28h.639a.384.384 0 1 1 0 .767h-.64v3.054h.64a.384.384 0 0 1 0 .767h-.64v3.054h.64a.384.384 0 0 1 0 .767h-.64v1.279h8.339a1.151 1.151 0 0 0 1.151-1.151V3.448a1.151 1.151 0 0 0-1.15-1.151z" />
    <path d="M11.61 7.738a.386.386 0 0 1-.383.384H7.134a.384.384 0 0 1 0-.767h4.092a.386.386 0 0 1 .383.383M11.226 9.4H7.134a.384.384 0 0 0 0 .767h4.092a.384.384 0 1 0 0-.767M11.611 5.707a.386.386 0 0 1-.384.384H7.136a.384.384 0 0 1 0-.767h4.091a.386.386 0 0 1 .384.383" />
  </svg>
);
export const icon = OuiIconNavNotebooks;
