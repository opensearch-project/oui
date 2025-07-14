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
const OuiIconNavModels = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M12.232 2.107a1.754 1.754 0 0 1 .367 3.468v5.055a1.754 1.754 0 1 1-.811.019V5.557a1.882 1.882 0 0 1-.367-.141L9.387 8.038a1.754 1.754 0 1 1-2.895.07L4.379 5.477q-.151.064-.314.099v5.057a1.754 1.754 0 1 1-.811.018V5.559a1.753 1.753 0 1 1 1.779-.565l2.05 2.552a1.741 1.741 0 0 1 1.69-.04l2.036-2.622a1.741 1.741 0 0 1-.331-1.023c0-.969.787-1.753 1.755-1.753m-8.538 9.296a.943.943 0 1 0 0 1.886.943.943 0 0 0 0-1.886m8.538 0a.943.943 0 1 0 0 1.887.943.943 0 0 0 0-1.887M7.964 8.119a.943.943 0 1 0 0 1.886.943.943 0 0 0 0-1.886m4.269-5.2a.943.943 0 1 0 0 1.887.943.943 0 0 0 0-1.887m-8.538 0a.943.943 0 0 0-.199 1.864h.397a.943.943 0 0 0-.199-1.864"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconNavModels;
