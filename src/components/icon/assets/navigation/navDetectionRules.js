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
const OuiIconNavDetectionRules = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M13.688 2.574v6.768a.913.913 0 0 1-.911.911H5.389l.896.896a.39.39 0 0 1-.273.676.395.395 0 0 1-.28-.124L4.17 10.139a.391.391 0 0 1 0-.552l1.562-1.562a.391.391 0 0 1 .552.552l-.895.896h7.387a.132.132 0 0 0 .13-.131V2.574a.132.132 0 0 0-.13-.131H5.487a.132.132 0 0 0-.13.131v.52a.391.391 0 0 1-.781 0v-.52a.913.913 0 0 1 .911-.911h7.289a.913.913 0 0 1 .911.911m-3.514 9.501a.39.39 0 0 0-.391.391v.521a.132.132 0 0 1-.13.13h-7.29a.132.132 0 0 1-.13-.13V6.218a.132.132 0 0 1 .13-.13H9.75l-.896.895a.391.391 0 1 0 .552.552l1.562-1.562a.391.391 0 0 0 0-.552L9.407 3.859a.391.391 0 0 0-.552.552l.895.896H2.363a.913.913 0 0 0-.911.911v6.769a.913.913 0 0 0 .911.911h7.289a.913.913 0 0 0 .911-.911v-.521a.391.391 0 0 0-.391-.391" />
  </svg>
);
export const icon = OuiIconNavDetectionRules;
