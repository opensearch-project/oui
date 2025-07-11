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
const OuiIconNavExperiments = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="m14.442 13.12-4.049-6.748V2.488h.653a.392.392 0 1 0 0-.784H5.822a.392.392 0 0 0 0 .784h.653v3.884L2.426 13.12a.914.914 0 0 0 .783 1.384h10.45a.914.914 0 0 0 .783-1.384M7.203 6.682a.376.376 0 0 0 .056-.202V2.488h2.35V6.48q0 .109.056.202l2.588 4.315c-.809.207-2.014.196-3.642-.631-1.107-.561-2.155-.837-3.125-.826zm6.568 6.972a.132.132 0 0 1-.113.066H3.209a.132.132 0 0 1-.129-.132q0-.035.018-.065l1.894-3.161c.972-.136 2.069.102 3.261.706 1.226.615 2.249.824 3.082.824.453.003.904-.063 1.336-.196l1.097 1.829a.132.132 0 0 1 .002.13" />
  </svg>
);
export const icon = OuiIconNavExperiments;
