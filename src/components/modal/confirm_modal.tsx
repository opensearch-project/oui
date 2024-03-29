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
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classnames from 'classnames';

import { OuiModal, OuiModalProps } from './modal';
import { OuiModalFooter } from './modal_footer';
import { OuiModalHeader } from './modal_header';
import { OuiModalHeaderTitle } from './modal_header_title';
import { OuiModalBody } from './modal_body';

import { ButtonColor, OuiButton, OuiButtonEmpty } from '../button';

import { OuiText } from '../text';

export interface OuiConfirmModalProps
  extends Omit<
    OuiModalProps,
    'children' | 'initialFocus' | 'onClose' | 'title'
  > {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  title?: ReactNode;
  cancelButtonText?: ReactNode;
  confirmButtonText?: ReactNode;
  onCancel: (
    event?:
      | React.KeyboardEvent<HTMLDivElement>
      | React.MouseEvent<HTMLButtonElement>
  ) => void;
  onConfirm?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  confirmButtonDisabled?: boolean;
  className?: string;
  defaultFocusedButton?: typeof CONFIRM_BUTTON | typeof CANCEL_BUTTON;
  buttonColor?: ButtonColor;
  // For docs only, will get passed with ...rest
  /**
   * Sets the max-width of the modal.
   * Set to `true` to use the default (`ouiBreakpoints 'm'`),
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  maxWidth?: boolean | number | string;
  /**
   * Passes `isLoading` prop to the confirm button
   */
  isLoading?: boolean;
}

export const CONFIRM_BUTTON = 'confirm';
export const CANCEL_BUTTON = 'cancel';

export const OuiConfirmModal: FunctionComponent<OuiConfirmModalProps> = ({
  children,
  title,
  onCancel,
  onConfirm,
  cancelButtonText,
  confirmButtonText,
  confirmButtonDisabled,
  className,
  buttonColor = 'primary',
  defaultFocusedButton,
  isLoading,
  ...rest
}) => {
  const [cancelButton, setCancelButton] = useState<
    HTMLButtonElement | HTMLAnchorElement | null
  >(null);
  const [confirmButton, setConfirmButton] = useState<HTMLButtonElement | null>(
    null
  );

  useEffect(() => {
    // We have to do this instead of using `autoFocus` because React's polyfill for auto-focusing
    // elements conflicts with the focus-trap logic we have on OuiModal.
    // Wait a beat for the focus-trap to complete, and then set focus to the right button. Check that
    // the buttons exist first, because it's possible the modal has been closed already.
    requestAnimationFrame(() => {
      if (defaultFocusedButton === CANCEL_BUTTON && cancelButton) {
        cancelButton.focus();
      } else if (defaultFocusedButton === CONFIRM_BUTTON && confirmButton) {
        confirmButton.focus();
      }
    });
  });

  const confirmRef = (node: HTMLButtonElement | null) => setConfirmButton(node);
  const cancelRef = (node: HTMLButtonElement | HTMLAnchorElement | null) =>
    setCancelButton(node);

  const classes = classnames('ouiModal--confirmation', className);

  let modalTitle;

  if (title) {
    modalTitle = (
      <OuiModalHeader>
        <OuiModalHeaderTitle data-test-subj="confirmModalTitleText">
          {title}
        </OuiModalHeaderTitle>
      </OuiModalHeader>
    );
  }

  let message;

  if (typeof children === 'string' && children.length > 0) {
    message = <p>{children}</p>;
  } else {
    message = children;
  }

  return (
    <OuiModal className={classes} onClose={onCancel} {...rest}>
      {modalTitle}

      {message && (
        <OuiModalBody>
          <OuiText data-test-subj="confirmModalBodyText">{message}</OuiText>
        </OuiModalBody>
      )}

      <OuiModalFooter>
        <OuiButtonEmpty
          data-test-subj="confirmModalCancelButton"
          onClick={onCancel}
          buttonRef={cancelRef}>
          {cancelButtonText}
        </OuiButtonEmpty>

        <OuiButton
          data-test-subj="confirmModalConfirmButton"
          onClick={onConfirm}
          isLoading={isLoading}
          fill
          buttonRef={confirmRef}
          color={buttonColor}
          isDisabled={confirmButtonDisabled}>
          {confirmButtonText}
        </OuiButton>
      </OuiModalFooter>
    </OuiModal>
  );
};
