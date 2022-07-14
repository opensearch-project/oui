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

import classNames from 'classnames';

import {
  OuiFlexGrid,
  OuiFlexItem,
  OuiIcon,
  OuiPanel,
  OuiSpacer,
  OuiCodeBlock,
  OuiCopy,
} from '../../../../src/components';

const iconColors = [
  'default',
  'inherit',
  'primary',
  'success',
  'accent',
  'warning',
  'danger',
  'text',
  'subdued',
  'ghost',
  '#DA8B45',
  '#DDDDDD',
];

export default () => (
  <>
    <OuiCodeBlock language="html" isCopyable paddingSize="m">
      {'<OuiIcon type="gisApp" color="primary" />'}
    </OuiCodeBlock>
    <OuiSpacer />
    <OuiFlexGrid direction="column" columns={3}>
      {iconColors.map((iconColor) => (
        <OuiFlexItem key={iconColor}>
          <OuiCopy display="block" textToCopy={`color="${iconColor}"`}>
            {(copy) => (
              <OuiPanel
                hasShadow={false}
                hasBorder={false}
                onClick={copy}
                className={classNames({
                  guideDemo__ghostBackground: iconColor === 'ghost',
                })}
                paddingSize="s">
                <OuiIcon type="gisApp" color={iconColor} />
                &emsp; <small>{iconColor}</small>
              </OuiPanel>
            )}
          </OuiCopy>
        </OuiFlexItem>
      ))}
    </OuiFlexGrid>
  </>
);
