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
  OuiFlexGrid,
  OuiFlexItem,
  OuiIcon,
  OuiPanel,
  OuiCopy,
} from '../../../../src/components';

const iconTypes = [
  'editorAlignCenter',
  'editorAlignLeft',
  'editorAlignRight',
  'editorBold',
  'editorCodeBlock',
  'editorComment',
  'editorDistributeHorizontal',
  'editorDistributeVertical',
  'editorHeading',
  'editorItalic',
  'editorItemAlignBottom',
  'editorItemAlignCenter',
  'editorItemAlignLeft',
  'editorItemAlignMiddle',
  'editorItemAlignRight',
  'editorItemAlignTop',
  'editorLink',
  'editorOrderedList',
  'editorPositionBottomLeft',
  'editorPositionBottomRight',
  'editorPositionTopLeft',
  'editorPositionTopRight',
  'editorRedo',
  'editorStrike',
  'editorTable',
  'editorUnderline',
  'editorUndo',
  'editorUnorderedList',
];

export default () => (
  <OuiFlexGrid direction="column" columns={3}>
    {iconTypes.map((iconType) => (
      <OuiFlexItem key={iconType}>
        <OuiCopy
          display="block"
          textToCopy={iconType}
          afterMessage={`${iconType} copied`}>
          {(copy) => (
            <OuiPanel
              hasShadow={false}
              hasBorder={false}
              onClick={copy}
              paddingSize="s">
              <OuiIcon className="oui-alignMiddle" type={iconType} /> &emsp;{' '}
              <small>{iconType}</small>
            </OuiPanel>
          )}
        </OuiCopy>
      </OuiFlexItem>
    ))}
  </OuiFlexGrid>
);
