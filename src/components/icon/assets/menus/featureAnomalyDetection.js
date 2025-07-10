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
const OuiIconFeatureAnomalyDetection = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M1.93 9.469a.386.386 0 0 1 .385.385v3.178a.128.128 0 0 0 .128.128h1.538q.014.001.039.007h3.277a.376.376 0 0 1 .068-.007h2.051l.023.003h1.697l.023-.003h1.538a.128.128 0 0 0 .128-.128v-2.358a.386.386 0 1 1 .77 0v2.358a.898.898 0 0 1-.897.898H2.442a.898.898 0 0 1-.897-.898V9.854a.386.386 0 0 1 .384-.385" />
    <path d="M9.29 4.742a.433.433 0 0 1 .415.315l.994 3.991.788-1.574a.433.433 0 0 1 .385-.237h1.29a.431.431 0 1 1 0 .86h-1.026l-1.17 2.344a.431.431 0 0 1-.663.136.433.433 0 0 1-.137-.216l-.875-3.555-.876 3.555a.43.43 0 0 1-.8.08L6.443 8.097H1.976a.431.431 0 1 1 0-.86h4.733a.433.433 0 0 1 .384.237l.788 1.575.994-3.991a.433.433 0 0 1 .415-.316" />
    <path d="M12.696 1.882a.898.898 0 0 1 .897.898v2.358a.385.385 0 1 1-.77 0V2.78a.127.127 0 0 0-.128-.128h-.714v.001H9.384v-.001H6.365v.003H3.694v-.003H2.442a.128.128 0 0 0-.127.128v2.358a.386.386 0 1 1-.769 0V2.78a.898.898 0 0 1 .897-.898z" />
  </svg>
);
export const icon = OuiIconFeatureAnomalyDetection;
