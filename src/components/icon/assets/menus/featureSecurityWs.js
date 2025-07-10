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
const OuiIconFeatureSecurityWs = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.306 1.5H2.694a.929.929 0 0 0-.928.929v3.714c0 3.445 1.666 5.531 3.064 6.675 1.507 1.234 3.002 1.65 3.065 1.668a.399.399 0 0 0 .21 0c.063-.017 1.558-.434 3.066-1.668 1.398-1.144 3.064-3.23 3.064-6.675V2.429a.928.928 0 0 0-.929-.929ZM10.69 12.182A8.7 8.7 0 0 1 8 13.685a8.685 8.685 0 0 1-2.69-1.503 7.503 7.503 0 0 1-1.695-1.953L8 7.16l4.386 3.07a7.501 7.501 0 0 1-1.696 1.954Zm2.749-6.04c0 1.244-.228 2.372-.682 3.375l-4.529-3.17a.398.398 0 0 0-.456 0l-4.529 3.17c-.453-1.003-.681-2.13-.681-3.374V2.429a.133.133 0 0 1 .132-.133h10.612a.133.133 0 0 1 .133.133v3.714Z" />
  </svg>
);
export const icon = OuiIconFeatureSecurityWs;
