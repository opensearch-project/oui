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
const OuiIconFeatureGetStarted = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.499 15.09a.41.41 0 0 1-.41.41H6.909a.41.41 0 0 1 0-.818H9.09a.409.409 0 0 1 .409.409Zm-1.5-7.772a.682.682 0 1 0 0-1.363.682.682 0 0 0 0 1.363Zm6.386 3.096-.843 3.79a.955.955 0 0 1-1.52.546l-1.896-1.432H5.873L3.976 14.75a.954.954 0 0 1-1.523-.545l-.84-3.791a.959.959 0 0 1 .198-.818l1.977-2.37c.061-.86.256-1.704.578-2.503C5.233 2.549 6.788 1.186 7.416.7a.955.955 0 0 1 1.17 0c.628.486 2.181 1.85 3.05 4.023.321.799.516 1.643.578 2.503l1.977 2.37a.958.958 0 0 1 .194.818ZM5.971 12.5h4.055c1.495-2.622 1.781-5.136.848-7.474-.815-2.045-2.342-3.332-2.79-3.681a.136.136 0 0 0-.17 0c-.449.347-1.977 1.636-2.79 3.681-.934 2.338-.648 4.852.847 7.474Zm-.768.3c-.818-1.465-1.288-2.904-1.406-4.308L2.44 10.119a.136.136 0 0 0-.028.117l.843 3.793a.136.136 0 0 0 .218.077l.01-.007L5.202 12.8Zm8.357-2.68-1.356-1.628c-.117 1.404-.586 2.843-1.406 4.308l1.72 1.295.01.008a.138.138 0 0 0 .13.022.136.136 0 0 0 .087-.099l.844-3.79a.138.138 0 0 0-.031-.117h.002Z" />
  </svg>
);
export const icon = OuiIconFeatureGetStarted;
