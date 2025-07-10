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
const OuiIconFeatureDashboards = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M6.047 1H2.14A1.14 1.14 0 0 0 1 2.14v5.657a1.14 1.14 0 0 0 1.14 1.14h3.907a1.14 1.14 0 0 0 1.14-1.14V2.14A1.14 1.14 0 0 0 6.046 1Zm.162 6.797a.163.163 0 0 1-.162.162H2.14a.163.163 0 0 1-.163-.162V2.14a.163.163 0 0 1 .163-.163h3.907a.163.163 0 0 1 .162.163v5.657Zm-.162 2.767H2.14A1.14 1.14 0 0 0 1 11.704v2.156A1.14 1.14 0 0 0 2.14 15h3.907a1.14 1.14 0 0 0 1.14-1.14v-2.156a1.14 1.14 0 0 0-1.14-1.14Zm.162 3.296a.163.163 0 0 1-.162.163H2.14a.163.163 0 0 1-.163-.162v-2.158a.163.163 0 0 1 .163-.162h3.907a.163.163 0 0 1 .162.162v2.158ZM13.861 1H9.953a1.14 1.14 0 0 0-1.139 1.14v2.157a1.14 1.14 0 0 0 1.14 1.14h3.906A1.139 1.139 0 0 0 15 4.296V2.14A1.14 1.14 0 0 0 13.86 1Zm.162 3.297a.163.163 0 0 1-.162.162H9.953a.163.163 0 0 1-.162-.162V2.14a.163.163 0 0 1 .162-.163h3.908a.163.163 0 0 1 .162.163v2.157ZM13.774 7.064H9.867a1.14 1.14 0 0 0-1.14 1.14v5.656A1.14 1.14 0 0 0 9.867 15h3.907a1.14 1.14 0 0 0 1.14-1.14V8.204a1.139 1.139 0 0 0-1.14-1.139Zm.163 6.796a.163.163 0 0 1-.163.163H9.867a.163.163 0 0 1-.163-.162V8.203a.163.163 0 0 1 .163-.162h3.907a.163.163 0 0 1 .163.162v5.658Z" />
  </svg>
);
export const icon = OuiIconFeatureDashboards;
