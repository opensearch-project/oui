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
const OuiIconIndexSettings = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M5 5h5.999V4H5v1ZM3 5h1V4H3v1Zm0 3h1V7H3v1Zm6.022-1-.15.333-.737-.078-.467-.05-.33.342A5.13 5.13 0 0 0 6.948 8H5V7h4.022Zm-3.005 3L6 10.056l.306.411.399.533H5v-1h1.017ZM3 11h1v-1H3v1Z" />
    <path d="m13 7.05-.162-.359-.2-.447-.47-.11A5.019 5.019 0 0 0 12 6.098V2H2v11h4.36c.157.354.355.69.59 1H1V1h12v6.05Z" />
    <path d="M11.004 7c.322 0 .646.036.966.109l.595 1.293 1.465-.152c.457.462.786 1.016.969 1.61l-.87 1.14.871 1.141a3.94 3.94 0 0 1-.387.859 4.058 4.058 0 0 1-.583.75l-1.465-.152-.594 1.292a4.37 4.37 0 0 1-1.941.001l-.594-1.293-1.466.152a3.954 3.954 0 0 1-.969-1.61l.87-1.14L7 9.86a3.947 3.947 0 0 1 .97-1.61l1.466.152.593-1.292a4.37 4.37 0 0 1 .975-.11ZM11 12a1 1 0 1 0 .002-1.998A1 1 0 0 0 11 12Z" />
  </svg>
);
export const icon = OuiIconIndexSettings;
