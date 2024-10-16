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
const OuiIconRocket = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3.333 8.667c0-3.392 1.935-6.291 4.667-7.455 2.731 1.164 4.666 4.063 4.666 7.455 0 .548-.05 1.084-.147 1.602l1.294 1.221c.11.104.136.27.064.402l-1.664 3.05a.333.333 0 0 1-.528.076l-1.49-1.49a.667.667 0 0 0-.471-.195H6.276a.667.667 0 0 0-.472.195l-1.49 1.49a.333.333 0 0 1-.528-.076l-1.663-3.05a.333.333 0 0 1 .064-.402l1.293-1.222a8.743 8.743 0 0 1-.147-1.601zm.984 4.464.545-.545A2 2 0 0 1 6.276 12h3.448a2 2 0 0 1 1.414.586l.544.545.655-1.2-.733-.693a1.334 1.334 0 0 1-.396-1.214c.083-.443.125-.897.125-1.357 0-2.58-1.33-4.867-3.333-5.973C5.996 3.8 4.666 6.087 4.666 8.667c0 .46.042.914.125 1.357.083.446-.066.903-.396 1.214l-.733.692.655 1.2zM8 8.667A1.333 1.333 0 1 1 8 6a1.333 1.333 0 0 1 0 2.667z" />
  </svg>
);
export const icon = OuiIconRocket;
