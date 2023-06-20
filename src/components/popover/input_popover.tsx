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

import React, {
  FunctionComponent,
  HTMLAttributes,
  useState,
  useEffect,
  useCallback,
} from 'react';
import classnames from 'classnames';
import { tabbable } from 'tabbable';

import { CommonProps } from '../common';
import { OuiFocusTrap } from '../focus_trap';
import { OuiPopover, OuiPopoverProps } from './popover';
import { OuiResizeObserver } from '../observer/resize_observer';
import { cascadingMenuKeys } from '../../services';

export interface _OuiInputPopoverProps
  extends Omit<OuiPopoverProps, 'button' | 'buttonRef'> {
  disableFocusTrap?: boolean;
  fullWidth?: boolean;
  input: OuiPopoverProps['button'];
  inputRef?: OuiPopoverProps['buttonRef'];
  onPanelResize?: (width?: number) => void;
}

export type OuiInputPopoverProps = CommonProps &
  HTMLAttributes<HTMLDivElement> &
  _OuiInputPopoverProps;

export const OuiInputPopover: FunctionComponent<OuiInputPopoverProps> = ({
  children,
  className,
  disableFocusTrap = false,
  input,
  fullWidth = false,
  onPanelResize,
  ...props
}) => {
  const [inputEl, setInputEl] = useState<HTMLElement | null>(null);
  const [inputElWidth, setInputElWidth] = useState<number>();
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);

  const inputRef = (node: HTMLElement | null) => setInputEl(node);
  const panelRef = (node: HTMLElement | null) => setPanelEl(node);

  const setPanelWidth = useCallback(
    (width?: number) => {
      if (panelEl && (!!inputElWidth || !!width)) {
        const newWidth = !!width ? width : inputElWidth;
        panelEl.style.width = `${newWidth}px`;
        if (onPanelResize) {
          onPanelResize(newWidth);
        }
      }
    },
    [panelEl, inputElWidth, onPanelResize]
  );
  const onResize = useCallback(() => {
    if (inputEl) {
      const width = inputEl.getBoundingClientRect().width;
      setInputElWidth(width);
      setPanelWidth(width);
    }
  }, [inputEl, setPanelWidth]);
  useEffect(() => {
    onResize();
  }, [onResize]);
  useEffect(() => {
    setPanelWidth();
  }, [setPanelWidth]);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (panelEl && event.key === cascadingMenuKeys.TAB) {
      const tabbableItems = tabbable(panelEl).filter((el) => {
        return (
          Array.from(el.attributes)
            .map((el) => el.name)
            .indexOf('data-focus-guard') < 0
        );
      });
      if (
        disableFocusTrap ||
        (tabbableItems.length &&
          tabbableItems[tabbableItems.length - 1] === document.activeElement)
      ) {
        props.closePopover();
      }
    }
  };

  const classes = classnames(
    'ouiInputPopover',
    {
      'ouiInputPopover--fullWidth': fullWidth,
    },
    className
  );

  return (
    <OuiPopover
      ownFocus={false}
      button={
        <OuiResizeObserver onResize={onResize}>
          {(resizeRef) => <div ref={resizeRef}>{input}</div>}
        </OuiResizeObserver>
      }
      buttonRef={inputRef}
      panelRef={panelRef}
      className={classes}
      {...props}>
      <OuiFocusTrap clickOutsideDisables={true} disabled={disableFocusTrap}>
        <div onKeyDown={onKeyDown}>{children}</div>
      </OuiFocusTrap>
    </OuiPopover>
  );
};

OuiInputPopover.defaultProps = {
  anchorPosition: 'downLeft',
  attachToAnchor: true,
  display: 'block',
  panelPaddingSize: 's',
};
