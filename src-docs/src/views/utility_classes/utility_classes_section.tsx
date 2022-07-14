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

import React, { FunctionComponent, ReactNode } from 'react';
import { OuiCode, OuiCodeBlock } from '../../../../src/components/code';
import { OuiCopy } from '../../../../src/components/copy';
import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiText } from '../../../../src/components/text';
import { OuiSplitPanel } from '../../../../src/components/panel';
import { GuideSectionExample } from '../../components/guide_section/guide_section_parts/guide_section_example';

export const LANGUAGES = ['javascript', 'html'] as const;

type UtilityClassesSection = {
  code: string;
  description?: ReactNode;
  example?: GuideSectionExample['example'];
  snippet?: GuideSectionExample['tabContent'];
};

export const UtilityClassesSection: FunctionComponent<UtilityClassesSection> = ({
  code,
  description,
  example,
  snippet,
}) => {
  return (
    <OuiFlexGroup>
      <OuiFlexItem>
        <OuiText size="s">
          <h3>
            <OuiCopy textToCopy={code}>
              {(copy) => (
                <button onClick={copy}>
                  <OuiCode language="html" className="oui-textInheritColor">
                    {code}
                  </OuiCode>
                </button>
              )}
            </OuiCopy>
          </h3>
          {description}
        </OuiText>
      </OuiFlexItem>
      <OuiFlexItem>
        <OuiSplitPanel.Outer style={{ overflow: 'hidden' }}>
          <OuiSplitPanel.Inner>{example}</OuiSplitPanel.Inner>
          <OuiSplitPanel.Inner color="subdued">
            {snippet && (
              <OuiCodeBlock
                isCopyable={true}
                paddingSize="none"
                transparentBackground={true}
                language="html">
                {snippet}
              </OuiCodeBlock>
            )}
          </OuiSplitPanel.Inner>
        </OuiSplitPanel.Outer>
      </OuiFlexItem>
    </OuiFlexGroup>
  );
};
