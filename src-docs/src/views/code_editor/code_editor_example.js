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

import { OuiCode, OuiLink, OuiCallOut } from '../../../../src/components';

export const CodeEditorExample = {
  title: 'Code editor',
  sections: [
    {
      text: (
        <>
          <OuiCallOut iconType="alert" color="danger" title="Deprecated">
            <p>
              The <strong>OuiCodeEditor</strong>, a wrapper of{' '}
              <OuiCode>react-ace</OuiCode>, has been deprecated and will be
              removed in a{' '}
              <OuiLink href="https://github.com/elastic/eui/issues/1469">
                future release
              </OuiLink>
              .
              <br />
              If you are a OpenSearch Dashboards developer, we recommend using
              the{' '}
              <OuiLink href="https://github.com/opensearch-project/OpenSearch-Dashboards/tree/main/packages/osd-monaco">
                <OuiCode>@osd/monaco</OuiCode> package
              </OuiLink>{' '}
              within the OpenSearch Dashboards codebase.
            </p>
          </OuiCallOut>
        </>
      ),
    },
  ],
};
