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

import { OuiKeyboardAccessible, OuiText } from '../../../../src/components';

// For custom components, we just need to make sure they delegate props to their rendered root
// element, e.g. onClick, tabIndex, and role.
const CustomComponent = ({ children, ...rest }) => (
  <div {...rest}>{children}</div>
);

export default () => (
  <div>
    <OuiText>
      <OuiKeyboardAccessible>
        <div onClick={() => window.alert('Div clicked')}>Click this div</div>
      </OuiKeyboardAccessible>

      <OuiKeyboardAccessible>
        <a
          className="ouiLink"
          onClick={() => window.alert('Anchor tag clicked')}>
          Click this anchor tag
        </a>
      </OuiKeyboardAccessible>

      <OuiKeyboardAccessible>
        <CustomComponent
          onClick={() => window.alert('Custom component clicked')}>
          Click this custom component
        </CustomComponent>
      </OuiKeyboardAccessible>

      <OuiKeyboardAccessible>
        <div
          onClick={() => window.alert('Outer OuiKeyboardAccessible clicked')}>
          This OuiKeyboardAccessible contains another
          OuiKeyboardAccessible&nbsp;
          <OuiKeyboardAccessible>
            <a
              className="ouiLink"
              onClick={() =>
                window.alert('Inner OuiKeyboardAccessible clicked')
              }>
              Clicking this inner one should call both onClick handlers
            </a>
          </OuiKeyboardAccessible>
        </div>
      </OuiKeyboardAccessible>
    </OuiText>
  </div>
);
