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
const OuiIconAnomalyDetection = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    viewBox="0 0 14 14"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M12 1H2a1 1 0 0 0-1 1v2.5a.5.5 0 1 1-1 0V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v2.5a.5.5 0 1 1-1 0V2a1 1 0 0 0-1-1ZM.5 9a.5.5 0 0 1 .5.5V12a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9.5a.5.5 0 1 1 1 0V12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V9.5A.5.5 0 0 1 .5 9Z" />
    <path d="M9.482 3.968a.5.5 0 0 0-.964 0L7.362 8.606l-.915-1.83A.5.5 0 0 0 6 6.5H.5a.5.5 0 0 0 0 1h5.191l1.362 2.724a.5.5 0 0 0 .93-.092L9 6l1.018 4.132a.5.5 0 0 0 .93.092L12.308 7.5H13.5a.5.5 0 1 0 0-1H12a.5.5 0 0 0-.447.276l-.915 1.83-1.156-4.638Z" />
  </svg>
);
export const icon = OuiIconAnomalyDetection;
