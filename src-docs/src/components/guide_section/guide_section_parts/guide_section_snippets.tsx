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

import React, { FunctionComponent } from 'react';
import { OuiCodeBlock } from '../../../../../src/components/code';
import { OuiSpacer } from '../../../../../src/components/spacer';

export type GuideSectionSnippets = {
  snippets: string | string[];
};

export const GuideSectionSnippets: FunctionComponent<GuideSectionSnippets> = ({
  snippets,
}) => {
  let snippetCode;
  if (typeof snippets === 'string') {
    snippetCode = (
      <OuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
        {snippets}
      </OuiCodeBlock>
    );
  } else {
    snippetCode = snippets.map((snip, index) => (
      <React.Fragment key={`snippet${index}`}>
        <OuiCodeBlock language="html" fontSize="m" paddingSize="m" isCopyable>
          {snip}
        </OuiCodeBlock>
        {index < snippets.length - 1 && <OuiSpacer size="xs" />}
      </React.Fragment>
    ));
  }

  return <React.Fragment>{snippetCode}</React.Fragment>;
};
