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
const OuiIconStorage = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <g fillRule="evenodd" transform="translate(0 2)">
      <path
        fillRule="nonzero"
        d="M2 6a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2Zm13 2v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1Zm1-3V2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v3c0 .601.271 1.133.69 1.5C.271 6.867 0 7.399 0 8v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8c0-.601-.271-1.133-.689-1.5.418-.367.689-.899.689-1.5Z"
      />
      <circle cx={4.5} cy={9.5} r={1.5} />
      <circle cx={4.5} cy={3.5} r={1.5} />
      <path d="M12 8h1v3h-1zM10 8h1v3h-1zM12 2h1v3h-1zM10 2h1v3h-1z" />
    </g>
  </svg>
);
export const icon = OuiIconStorage;
