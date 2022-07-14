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

import { GuideSection } from '../../components';
import { OuiText, OuiSpacer } from '../../../../src/components';

import TextScaling from './text_scaling';

export default () => (
  <>
    <GuideSection
      wrapText={false}
      text={
        <>
          <OuiText grow={false}>
            <p>
              This demo shows off{' '}
              <Link to="/display/text">
                <strong>OuiText</strong>
              </Link>{' '}
              scaling in both the default and small sizes. The goal is that the
              bottom of every text line should hit one of the 8px or 7px grid
              lines. This is for development only. Do not copy this code into a
              production environment.
            </p>
          </OuiText>
          <OuiSpacer size="xl" />
          <TextScaling />
        </>
      }
    />
  </>
);
