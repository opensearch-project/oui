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
const OuiIconVisQuerySql = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M10.5 2c0 .022 0 .043-.002.064l1.559 1.04a1 1 0 1 1-.555.832l-1.559-1.04a.996.996 0 0 1-.702.07L7.466 4.741A1.001 1.001 0 0 1 6.5 6a1 1 0 0 1-.998-1.064l-1.559-1.04a1 1 0 1 1 .555-.832l1.559 1.04a.996.996 0 0 1 .702-.07l1.775-1.775A1.001 1.001 0 0 1 9.5 1a1 1 0 0 1 1 1Z" />
    <path d="M8.5 9a.5.5 0 0 1-1 0v-.5h-2V9a.5.5 0 0 1-1 0V7.5h-2V9a.5.5 0 0 1-1 0V7.2a.7.7 0 0 1 .7-.7h2.6a.7.7 0 0 1 .7.7v.3h2V6.2a.7.7 0 0 1 .7-.7h2.6a.7.7 0 0 1 .7.7V7h2.3a.7.7 0 0 1 .7.7v6.8a.5.5 0 0 1-1 0V8h-2v6.5a.5.5 0 0 1-1 0v-8h-2V9Z" />
    <path
      fillRule="evenodd"
      d="M1.6 10a.6.6 0 0 0-.6.6v3.86a.6.6 0 0 0 .6.6h7.476a.6.6 0 0 0 .6-.6V10.6a.6.6 0 0 0-.6-.6H1.6Zm5.618.723v2.675c0 .48.388.868.867.868h1.23v-.579h-1.23a.29.29 0 0 1-.289-.289v-2.675h-.578Zm-5.423 1.084c0-.559.453-1.012 1.012-1.012h1.085v.579H2.807a.434.434 0 1 0 0 .867 1.012 1.012 0 0 1 0 2.025H1.723v-.579h1.084a.434.434 0 1 0 0-.867 1.012 1.012 0 0 1-1.012-1.013Zm4.555-.144v2.071c.148.047.275.12.368.182a2.01 2.01 0 0 1 .247.195l.016.015.005.005.001.001.001.001-.204.205-.205.205v-.001l-.009-.008a1.427 1.427 0 0 0-.173-.136c-.12-.081-.242-.132-.336-.132h-.868a.868.868 0 0 1-.867-.868v-1.735c0-.48.388-.868.867-.868h.29c.479 0 .867.389.867.868Zm-1.446 0c0-.16.13-.29.29-.29h.288c.16 0 .29.13.29.29v2.024h-.579a.29.29 0 0 1-.289-.289v-1.735Z"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconVisQuerySql;
