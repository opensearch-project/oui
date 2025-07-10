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
const OuiIconFeatureObservabilityWs = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m14.351 8.931-2.489-5.669a.376.376 0 0 0-.075-.109 1.798 1.798 0 0 0-2.541 0 .358.358 0 0 0-.104.254v1.616H6.984V3.407a.358.358 0 0 0-.105-.254 1.798 1.798 0 0 0-2.541 0 .376.376 0 0 0-.074.109l-2.49 5.67a2.755 2.755 0 1 0 5.21 1.242V5.742h2.155v4.433a2.755 2.755 0 1 0 5.211-1.244m-10.12 3.28a2.036 2.036 0 1 1 0-4.072 2.036 2.036 0 0 1 0 4.072m0-4.792c-.383 0-.761.08-1.111.235l1.772-4.037a1.078 1.078 0 0 1 1.374-.049v4.748a2.748 2.748 0 0 0-2.036-.898m5.63-3.849a1.078 1.078 0 0 1 1.374.049l1.773 4.035a2.748 2.748 0 0 0-3.147.664zm2.036 8.64a2.036 2.036 0 1 1 0-4.071 2.036 2.036 0 0 1 0 4.072" />
  </svg>
);
export const icon = OuiIconFeatureObservabilityWs;
