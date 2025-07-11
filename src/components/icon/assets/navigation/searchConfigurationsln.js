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
const OuiIconSearchConfigurationsln = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M9.362 1.104a.373.373 0 0 1 .708.232L5.686 14.711a.373.373 0 0 1-.708-.232zM2.469 9.317a.348.348 0 0 1 .348.348v2.886a.117.117 0 0 0 .117.116h1.395a.349.349 0 1 1 0 .698H2.934a.815.815 0 0 1-.814-.814V9.665a.348.348 0 0 1 .348-.348M12.706 10.805a.348.348 0 0 1 .348.349v1.397a.815.815 0 0 1-.814.814H7.4a.349.349 0 0 1 0-.698h1.862l.015.002h1.552l.015-.002h1.396a.117.117 0 0 0 .117-.116v-1.398a.348.348 0 0 1 .348-.348M13.884 6.592a.424.424 0 0 1 .303.712l-.002.003-3.256 3.256a.424.424 0 0 1-.6 0L8.934 9.167l-.002-.002a.424.424 0 0 1 .534-.648l.065.049.002.002 1.096 1.096 2.958-2.958.002-.001.065-.05a.424.424 0 0 1 .231-.064M4.621 5.299a.367.367 0 0 1 .261.615l-.002.002-1.297 1.296L4.88 8.508a.365.365 0 1 1-.518.517L3.066 7.729 1.769 9.026l-.003.001a.366.366 0 0 1-.517-.517l.002-.002 1.296-1.297-1.295-1.296-.001-.002a.367.367 0 0 1 .461-.56l.056.042.002.002 1.296 1.296 1.296-1.296.002-.002a.376.376 0 0 1 .256-.098M12.24 2.43a.814.814 0 0 1 .814.814v2.885a.348.348 0 1 1-.697 0V3.244a.117.117 0 0 0-.117-.117h-1.396a.348.348 0 0 1 0-.697zM7.773 2.43a.349.349 0 1 1 0 .697H6.494v.003H4.07v-.003H2.934a.117.117 0 0 0-.116.117V4.64a.348.348 0 1 1-.698 0V3.244a.815.815 0 0 1 .814-.814z" />
  </svg>
);
export const icon = OuiIconSearchConfigurationsln;
