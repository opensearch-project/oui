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

import { Link } from 'react-router-dom';
import { OuiText } from '../../../../src/components/text';

export const NotFoundView = () => (
  <div className="guideContentPage">
    <div className="guideContentPage__content">
      <OuiText>
        <h1 className="guideTitle">404</h1>

        <p className="guideText">
          You visited a page which doesn&rsquo;t exist, causing <em>this</em>{' '}
          page to exist. This page thanks you for summoning it into existence
          from the raw fabric of reality, but it thinks you may find another
          page more interesting. Might it suggest the{' '}
          {
            <Link className="guideLink" to="/">
              home page
            </Link>
          }
          ?
        </p>
      </OuiText>
    </div>
  </div>
);
