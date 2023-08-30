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

import { OuiCode, OuiLink, OuiText } from '../../../../src/components';

export default () => (
  <OuiText>
    <p>
      Open the{' '}
      <OuiLink href="https://opensearch.org/" target="_blank">
        OpenSearch website
      </OuiLink>{' '}
      in a new tab. Setting <OuiCode>target=&ldquo;_blank&rdquo;</OuiCode> also
      defaults to <OuiCode>{'external={true}'}</OuiCode>.
    </p>
    <p>
      This{' '}
      <OuiLink href="https://oui.opensearch.org/latest/" external>
        link
      </OuiLink>{' '}
      has the <OuiCode>external</OuiCode> prop set to true.
    </p>
    <p>
      This link is actually a <OuiLink onClick={() => {}}>button</OuiLink> with
      an onClick handler.
    </p>
    <p>
      Here is an example of a{' '}
      <OuiLink
        href="https://oui.opensearch.org/latest/"
        onClick={(e) => {
          e.preventDefault();
        }}>
        link
      </OuiLink>{' '}
      with both an <OuiCode>href</OuiCode> and an <OuiCode>onClick</OuiCode>{' '}
      handler.
    </p>
    <p>Links can be colored as well.</p>
    <ul>
      <li>
        <OuiLink color="subdued" href="https://oui.opensearch.org/latest/">
          subdued
        </OuiLink>
      </li>
      <li>
        <OuiLink color="success" href="https://oui.opensearch.org/latest/">
          success
        </OuiLink>
      </li>
      <li>
        <OuiLink color="accent" href="https://oui.opensearch.org/latest/">
          accent
        </OuiLink>
      </li>
      <li>
        <OuiLink color="danger" href="https://oui.opensearch.org/latest/">
          danger
        </OuiLink>
      </li>
      <li>
        <OuiLink color="warning" href="https://oui.opensearch.org/latest/">
          warning
        </OuiLink>
      </li>
      <li>
        <OuiLink color="text" href="https://oui.opensearch.org/latest/">
          text
        </OuiLink>
      </li>
      <li>
        <span style={{ background: 'black' }}>
          <OuiLink color="ghost" href="https://oui.opensearch.org/latest/">
            ghost
          </OuiLink>
        </span>
      </li>
    </ul>
  </OuiText>
);
