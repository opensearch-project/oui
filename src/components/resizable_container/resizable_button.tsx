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
  ButtonHTMLAttributes,
  MouseEvent,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { OuiI18n } from '../i18n';
import { htmlIdGenerator } from '../../services';
import { useOuiResizableContainerContext } from './context';
import {
  OuiResizableButtonController,
  OuiResizableButtonMouseEvent,
  OuiResizableButtonKeyDownEvent,
} from './types';

interface OuiResizableButtonControls {
  onKeyDown: (eve: OuiResizableButtonKeyDownEvent) => void;
  onMouseDown: (eve: OuiResizableButtonMouseEvent) => void;
  onTouchStart: (eve: OuiResizableButtonMouseEvent) => void;
  onFocus: (id: string) => void;
  onBlur: () => void;
  registration: {
    register: (resizer: OuiResizableButtonController) => void;
    deregister: (resizerId: OuiResizableButtonController['id']) => void;
  };
  isHorizontal: boolean;
}

export interface OuiResizableButtonProps
  extends Omit<
      ButtonHTMLAttributes<HTMLButtonElement>,
      keyof OuiResizableButtonControls
    >,
    CommonProps,
    Partial<OuiResizableButtonControls> {}

const generatePanelId = htmlIdGenerator('resizable-button');

export const OuiResizableButton: FunctionComponent<OuiResizableButtonProps> = ({
  isHorizontal,
  className,
  id,
  registration,
  disabled,
  onFocus,
  onBlur,
  ...rest
}) => {
  const resizerId = useRef(id || generatePanelId());
  const {
    registry: { resizers } = { resizers: {} },
  } = useOuiResizableContainerContext();
  const isDisabled = useMemo(
    () =>
      disabled ||
      (resizers[resizerId.current] && resizers[resizerId.current].isDisabled),
    [resizers, disabled]
  );
  const classes = classNames(
    'ouiResizableButton',
    {
      'ouiResizableButton--vertical': !isHorizontal,
      'ouiResizableButton--horizontal': isHorizontal,
      'ouiResizableButton--disabled': isDisabled,
    },
    className
  );

  const previousRef = useRef<HTMLElement>();
  const onRef = useCallback(
    (ref: HTMLElement | null) => {
      if (!registration) return;
      const id = resizerId.current;
      if (ref) {
        previousRef.current = ref;
        registration.register({
          id,
          ref,
          isFocused: false,
          isDisabled: disabled || false,
        });
      } else {
        if (previousRef.current != null) {
          registration.deregister(id);
          previousRef.current = undefined;
        }
      }
    },
    [registration, disabled]
  );

  const setFocus = (e: MouseEvent<HTMLButtonElement>) =>
    e.currentTarget.focus();

  const handleFocus = () => {
    onFocus && onFocus(resizerId.current);
  };

  return (
    <OuiI18n
      tokens={[
        'ouiResizableButton.horizontalResizerAriaLabel',
        'ouiResizableButton.verticalResizerAriaLabel',
      ]}
      defaults={[
        'Press left or right to adjust panels size',
        'Press up or down to adjust panels size',
      ]}>
      {([horizontalResizerAriaLabel, verticalResizerAriaLabel]: string[]) => (
        <button
          id={resizerId.current}
          ref={onRef}
          aria-label={
            isHorizontal ? horizontalResizerAriaLabel : verticalResizerAriaLabel
          }
          className={classes}
          data-test-subj="ouiResizableButton"
          type="button"
          onClick={setFocus}
          onFocus={handleFocus}
          onBlur={onBlur}
          disabled={isDisabled}
          {...rest}
        />
      )}
    </OuiI18n>
  );
};

export function ouiResizableButtonWithControls(
  controls: OuiResizableButtonControls
) {
  return (props: CommonProps) => (
    <OuiResizableButton {...controls} {...props} />
  );
}
