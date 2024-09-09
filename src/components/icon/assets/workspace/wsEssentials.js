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

import * as React from "react";
const OuiIconWsEssentials = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.552 11.929h.734V8.357h1.428v3.572h.734c.094-.859.532-1.567 1.243-2.341.08-.088.594-.62.655-.695a4.286 4.286 0 1 0-6.693-.001c.061.076.576.609.655.695.712.775 1.15 1.483 1.244 2.342Zm.02 1.428v.714h2.857v-.714H6.57ZM3.538 9.785a5.714 5.714 0 1 1 8.922.002c-.444.552-1.604 1.427-1.604 2.499v1.785c0 .79-.64 1.429-1.428 1.429H6.57c-.789 0-1.428-.64-1.428-1.429v-1.785c0-1.072-1.161-1.948-1.604-2.5Z" />
  </svg>
);
export const icon = OuiIconWsEssentials;
