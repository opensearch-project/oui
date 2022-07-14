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

import React from 'react';
import { OuiLink } from '../../../../src/components';

const urls = [
  'https://elastic.co',
  '//elastic.co',
  'relative/url/somewhere',
  'http://username:password@example.com/',
  // eslint-disable-next-line no-script-url
  'javascript:alert()',
];

export const LinkValidation = () => {
  return (
    <>
      {urls.map((url) => (
        <div key={url}>
          <OuiLink color="success" href={url}>
            {url}
          </OuiLink>
        </div>
      ))}
    </>
  );
};
