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

import {
  OuiToken,
  OuiCodeBlock,
  OuiSplitPanel,
  OuiSpacer,
} from '../../../../src/components';

export default () => (
  <>
    <OuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <OuiSplitPanel.Inner
        className="oui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <OuiToken iconType="tokenStruct" size="xs" color="gray" />
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner paddingSize="none" color="subdued">
        <OuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<OuiToken iconType="tokenStruct" size="xs" color="gray" />'}
        </OuiCodeBlock>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
    <OuiSpacer />
    <OuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <OuiSplitPanel.Inner
        className="oui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <OuiToken iconType="tokenStruct" fill="none" />
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner paddingSize="none" color="subdued">
        <OuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<OuiToken iconType="tokenStruct" fill="none" />'}
        </OuiCodeBlock>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
    <OuiSpacer />
    <OuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <OuiSplitPanel.Inner
        className="oui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <OuiToken
          iconType="tokenStruct"
          size="m"
          shape="circle"
          color="#FF0000"
        />
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner paddingSize="none" color="subdued">
        <OuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {
            '<OuiToken iconType="tokenStruct" size="m" shape="circle" color="#FF0000" />'
          }
        </OuiCodeBlock>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
    <OuiSpacer />
    <OuiSplitPanel.Outer hasShadow={false} hasBorder={true} direction="row">
      <OuiSplitPanel.Inner
        className="oui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <OuiToken
          iconType="faceNeutral"
          size="l"
          color="ouiColorVis7"
          shape="rectangle"
          fill="dark"
        />
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner paddingSize="none" color="subdued">
        <OuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {
            '<OuiToken iconType="faceNeutral" size="l" color="ouiColorVis7" shape="rectangle" fill="dark" />'
          }
        </OuiCodeBlock>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
  </>
);
