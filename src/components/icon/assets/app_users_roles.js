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
const OuiIconAppUsersRoles = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="0 0 32 32"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M19.307 3.21a2.91 2.91 0 1 0-.223 1.94 11.636 11.636 0 0 1 8.232 7.049l1.775-.698a13.576 13.576 0 0 0-9.784-8.291zm-2.822 1.638a.97.97 0 1 1 0-1.939.97.97 0 0 1 0 1.94zm-4.267.805-.717-1.774a13.576 13.576 0 0 0-8.291 9.784 2.91 2.91 0 1 0 1.94.223 11.636 11.636 0 0 1 7.068-8.233zm-8.34 11.802a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94zm12.607 8.727a2.91 2.91 0 0 0-2.599 1.62 11.636 11.636 0 0 1-8.233-7.05l-1.774.717a13.576 13.576 0 0 0 9.813 8.291 2.91 2.91 0 1 0 2.793-3.578zm0 3.879a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94zM32 16.485a2.91 2.91 0 1 0-4.199 2.599 11.636 11.636 0 0 1-7.05 8.232l.718 1.775a13.576 13.576 0 0 0 8.291-9.813A2.91 2.91 0 0 0 32 16.485zm-2.91.97a.97.97 0 1 1 0-1.94.97.97 0 0 1 0 1.94z" />
    <path
      d="M19.19 16.35a3.879 3.879 0 1 0-5.42 0 4.848 4.848 0 0 0-2.134 4.014v1.939h9.697v-1.94a4.848 4.848 0 0 0-2.143-4.014Zm-4.645-2.774a1.94 1.94 0 1 1 3.88 0 1.94 1.94 0 0 1-3.88 0Zm-.97 6.788a2.91 2.91 0 1 1 5.819 0h-5.818Z"
      className="ouiIcon__fillSecondary"
    />
  </svg>
);
export const icon = OuiIconAppUsersRoles;
