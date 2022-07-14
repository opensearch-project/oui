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
  OuiFlexGroup,
  OuiFlexItem,
  OuiIcon,
  OuiText,
  OuiSpacer,
  OuiButton,
  OuiSplitPanel,
  OuiCodeBlock,
} from '../../../../src/components';

import reactSvg from '../../images/custom.svg';

export default () => (
  <div>
    <OuiSplitPanel.Outer hasShadow={false} direction="row">
      <OuiSplitPanel.Inner
        className="oui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <OuiIcon
          type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
          size="xl"
          title="My SVG logo"
        />
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner paddingSize="s" color="subdued">
        <OuiCodeBlock
          className="oui-textBreakWord"
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {
            '<OuiIcon type="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg" size="xl" title="My SVG logo" />'
          }
        </OuiCodeBlock>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>
    <OuiSpacer />
    <OuiSplitPanel.Outer hasShadow={false} direction="row">
      <OuiSplitPanel.Inner
        className="oui-textCenter"
        grow={false}
        style={{ minWidth: 96 }}>
        <OuiIcon type={reactSvg} size="xl" title="Custom SVG icon" />
      </OuiSplitPanel.Inner>
      <OuiSplitPanel.Inner paddingSize="s" color="subdued">
        <OuiCodeBlock
          language="html"
          isCopyable
          transparentBackground
          paddingSize="m">
          {'<OuiIcon type={reactSvg} size="xl" title="Custom SVG icon" />'}
        </OuiCodeBlock>
      </OuiSplitPanel.Inner>
    </OuiSplitPanel.Outer>

    <OuiSpacer />

    <OuiText>
      <p>
        Any component that utlizes <strong>OuiIcon</strong> can use custom SVGs
        as well.
      </p>
    </OuiText>

    <OuiSpacer />

    <OuiFlexGroup>
      <OuiFlexItem grow={false}>
        <OuiButton
          iconType="https://upload.wikimedia.org/wikipedia/commons/0/02/SVG_logo.svg"
          title="Another SVG Logo">
          http://some.svg
        </OuiButton>
      </OuiFlexItem>
      <OuiFlexItem grow={false}>
        <OuiButton iconType={reactSvg}>{'{reactSvg}'}</OuiButton>
      </OuiFlexItem>
    </OuiFlexGroup>
  </div>
);
