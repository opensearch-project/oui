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
const OuiIconNavJudgements = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m14.973 8.367-2.037-5.09a.382.382 0 0 0-.436-.232l-4.118.915V2.4a.382.382 0 0 0-.764 0v1.73l-4.283.955a.382.382 0 0 0-.271.23l-2.037 5.092a.388.388 0 0 0-.027.138c0 1.391 1.483 1.91 2.418 1.91s2.418-.519 2.418-1.91a.388.388 0 0 0-.027-.142L3.939 5.73l3.68-.818v8.306H6.472a.382.382 0 1 0 0 .764h3.054a.382.382 0 1 0 0-.764H8.382V4.742l3.577-.794-1.768 4.42a.39.39 0 0 0-.027.141c0 1.391 1.483 1.91 2.418 1.91S15 9.9 15 8.508a.388.388 0 0 0-.027-.142ZM3.418 11.691a2.347 2.347 0 0 1-1.112-.29c-.342-.2-.519-.457-.54-.788l1.654-4.13 1.655 4.13c-.062.877-1.238 1.078-1.657 1.078Zm9.164-2.037a2.347 2.347 0 0 1-1.113-.29c-.341-.199-.518-.457-.54-.787l1.655-4.13 1.654 4.13c-.061.877-1.237 1.077-1.656 1.077Z" />
  </svg>
);
export const icon = OuiIconNavJudgements;
