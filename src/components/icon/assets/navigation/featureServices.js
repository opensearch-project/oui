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
const OuiIconFeatureServices = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      d="M8.274 2.44c3.694 0 6.588 1.663 6.588 3.784v3.365c0 .687-.306 1.325-.841 1.876v.002l-.025.023q-.085.085-.178.169l-.026.024a4.706 4.706 0 0 1-.489.376l-.033.021q-.396.264-.872.48l-.058.025a7.529 7.529 0 0 1-.291.122l-.034.014a8.471 8.471 0 0 1-1.091.343l-.037.009q-.181.043-.367.081l-.101.02q-.152.028-.306.054l-.082.013q-.167.025-.336.046l-.075.009q-.19.023-.384.038l-.139.009a11.294 11.294 0 0 1-.395.021q-.212.009-.427.009a12.235 12.235 0 0 1-.824-.03l-.138-.009a11.294 11.294 0 0 1-.385-.038l-.073-.009a11.294 11.294 0 0 1-.339-.046l-.081-.012q-.155-.025-.309-.056l-.097-.018a10.353 10.353 0 0 1-.369-.082l-.029-.008a9.412 9.412 0 0 1-.314-.082l-.107-.031a8.188 8.188 0 0 1-1.366-.541 5.647 5.647 0 0 1-.567-.331l-.031-.021a4.706 4.706 0 0 1-.488-.376l-.026-.024a4.706 4.706 0 0 1-.174-.165l-.03-.028v-.002c-.536-.55-.84-1.188-.84-1.875V6.224c0-2.121 2.894-3.784 6.588-3.784m5.747 5.662c-1.122 1.148-3.25 1.907-5.747 1.907s-4.626-.76-5.748-1.907v1.487c0 1.595 2.632 2.943 5.748 2.943s5.746-1.348 5.747-2.943zM8.273 3.28c-3.115 0-5.748 1.349-5.748 2.945s2.634 2.942 5.749 2.942 5.746-1.348 5.747-2.943c0-1.596-2.632-2.945-5.747-2.945"
      clipRule="evenodd"
    />
  </svg>
);
export const icon = OuiIconFeatureServices;
