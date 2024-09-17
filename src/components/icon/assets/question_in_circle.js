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
const OuiIconQuestionInCircle = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M7.814 12A.785.785 0 0 1 7 11.185c0-.48.34-.82.815-.82.474 0 .808.34.808.82 0 .475-.334.815-.808.815zM5.9 5.917C5.96 4.77 6.755 4 8.048 4c1.218 0 2.091.759 2.091 1.8 0 .736-.36 1.304-1.03 1.707-.56.33-.717.56-.717 1.022V9.5l-.1.1H7.47l-.1-.1V8.403c-.005-.646.302-1.104.987-1.514.527-.322.709-.59.709-1.047 0-.536-.417-.91-1.051-.91-.652 0-1.064.374-1.112.998l-.1.092H6l-.1-.105z" />
    <path
      fillRule="evenodd"
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12zm0 1A7 7 0 1 0 8 1a7 7 0 0 0 0 14z"
    />
  </svg>
);
export const icon = OuiIconQuestionInCircle;
