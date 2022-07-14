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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { FunctionComponent, ReactNode, HTMLAttributes } from 'react';
import classnames from 'classnames';

import { keys } from '../../services';

import { OuiButtonIcon } from '../button';

import { OuiFocusTrap } from '../focus_trap';
import { OuiOverlayMask } from '../overlay_mask';
import { OuiI18n } from '../i18n';

export interface OuiModalProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  onClose: (
    event?:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  /**
   * Sets the max-width of the modal.
   * Set to `true` to use the default (`ouiBreakpoints 'm'`),
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
  /**
   * Specifies what element should initially have focus.
   * Can be a DOM node, or a selector string (which will be passed to document.querySelector() to find the DOM node), or a function that returns a DOM node.
   */
  initialFocus?: HTMLElement | (() => HTMLElement) | string;
}

export const OuiModal: FunctionComponent<OuiModalProps> = ({
  className,
  children,
  initialFocus,
  onClose,
  maxWidth = true,
  style,
  ...rest
}) => {
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === keys.ESCAPE) {
      event.preventDefault();
      event.stopPropagation();
      onClose(event);
    }
  };

  let newStyle;
  let widthClassName;
  if (maxWidth === true) {
    widthClassName = 'ouiModal--maxWidth-default';
  } else if (maxWidth !== false) {
    const value = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
    newStyle = { ...style, maxWidth: value };
  }

  const classes = classnames('ouiModal', widthClassName, className);

  return (
    <OuiOverlayMask>
      <OuiFocusTrap initialFocus={initialFocus}>
        {
          // Create a child div instead of applying these props directly to FocusTrap, or else
          // fallbackFocus won't work.
        }
        <div
          className={classes}
          onKeyDown={onKeyDown}
          tabIndex={0}
          style={newStyle || style}
          {...rest}>
          <OuiI18n
            token="ouiModal.closeModal"
            default="Closes this modal window">
            {(closeModal: string) => (
              <OuiButtonIcon
                iconType="cross"
                onClick={onClose}
                className="ouiModal__closeIcon"
                color="text"
                aria-label={closeModal}
              />
            )}
          </OuiI18n>
          <div className="ouiModal__flex">{children}</div>
        </div>
      </OuiFocusTrap>
    </OuiOverlayMask>
  );
};
