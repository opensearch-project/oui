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
const OuiIconNavThreatIntel = ({ title, titleId, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    viewBox="0 0 16 16"
    aria-labelledby={titleId}
    {...props}>
    {title ? <title id={titleId}>{title}</title> : null}
    <path d="M3.987 11.853a.481.481 0 0 1 .598-.097c.2.116.285.355.216.567l.003.002-.016.027-.027.06-1 1.736a.08.08 0 0 0 .006.055c.01.018.029.029.048.035h7.399a.48.48 0 0 1 0 .96H2.88a.475.475 0 0 1-.11-.012l-.022-.006a.474.474 0 0 1-.058-.02l-.058-.029-.04-.025a.485.485 0 0 1-.174-.238l-.022-.103v-.079a.48.48 0 0 1 .063-.204l1.52-2.634.007.005Zm.42-10c1.051-.199 2.265-.095 3.252.192v.005a.474.474 0 0 1-.26.91v.001c-1.023-.283-1.901-.326-2.721-.186-.87.148-1.596.54-1.976 1.197-.497.862-.303 2.004.324 3.09.634 1.099 1.742 2.202 3.198 3.043 1.456.84 2.965 1.249 4.233 1.249l.233-.005c1.156-.048 2.139-.454 2.606-1.262.379-.657.356-1.481.05-2.308-.288-.774-.834-1.576-1.581-2.315a.491.491 0 1 1 .742-.63c.898.876 1.433 1.757 1.77 2.719.378 1.086.349 2.137-.156 3.012-.624 1.08-1.844 1.668-3.366 1.735-1.522.067-3.314-.392-5.008-1.37-1.693-.978-2.987-2.3-3.69-3.651-.702-1.353-.803-2.705-.18-3.785.506-.874 1.4-1.425 2.53-1.64Zm6.5-.812a.48.48 0 1 1 .83.482l-3.322 5.73a.48.48 0 0 1-.83-.481l3.321-5.73Z" />
  </svg>
);
export const icon = OuiIconNavThreatIntel;
