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

const OuiIconVisBuilderSavedObject = ({ title, titleId, ...props }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.5 2c0 .022 0 .043-.002.064l1.559 1.04a1 1 0 11-.555.832l-1.559-1.04a.996.996 0 01-.702.07L7.466 4.741A1.001 1.001 0 016.5 6a1 1 0 01-.998-1.064l-1.559-1.04a1 1 0 11.555-.832l1.559 1.04a.996.996 0 01.702-.07l1.775-1.775A1.001 1.001 0 019.5 1a1 1 0 011 1z" />
    <path d="M8.5 13a.5.5 0 01-1 0V8.5h-2V13a.5.5 0 01-1 0V7.5h-2V13a.5.5 0 01-1 0V7.2a.7.7 0 01.7-.7h2.6a.7.7 0 01.7.7v.3h2V6.2a.7.7 0 01.7-.7h2.6a.7.7 0 01.7.7V7h2.3a.7.7 0 01.7.7V13a.5.5 0 01-1 0V8h-2v5a.5.5 0 01-1 0V6.5h-2V13zM.5 14.5A.5.5 0 011 14h14a.5.5 0 010 1H1a.5.5 0 01-.5-.5z" />
  </svg>
);

export const icon = OuiIconVisBuilderSavedObject;
