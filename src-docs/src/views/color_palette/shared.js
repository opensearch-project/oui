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
  OuiFlexItem,
  OuiCopy,
  OuiCode,
  OuiLink,
} from '../../../../src/components';

export const ColorPaletteFlexItem = ({ hexCode, className, ...rest }) => {
  return (
    <OuiFlexItem
      key={hexCode}
      grow={false}
      className={classNames('guideColorPalette__swatch', className)}
      {...rest}>
      <span title={hexCode} style={{ backgroundColor: hexCode }} />
    </OuiFlexItem>
  );
};

export const ColorPaletteCopyCode = ({ textToCopy, code }) => {
  return (
    <span>
      <OuiCopy
        beforeMessage="Click to copy palette config"
        textToCopy={textToCopy || code}>
        {(copy) => (
          <OuiLink onClick={copy}>
            <OuiCode>{code}</OuiCode>
          </OuiLink>
        )}
      </OuiCopy>
    </span>
  );
};
