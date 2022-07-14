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
  useState,
  useMemo,
  Fragment,
  ReactChild,
  forwardRef,
} from 'react';
import { OuiLoadingSpinner } from '../loading';
import { OuiButton, OuiButtonEmpty, OuiButtonIcon } from '../button';
import { OuiTitle } from '../title';
import {
  OuiModal,
  OuiModalBody,
  OuiModalFooter,
  OuiModalHeader,
} from '../modal';
import { OuiI18n, useOuiI18n } from '../i18n';
import {
  OuiMarkdownDropHandler,
  OuiMarkdownEditorUiPlugin,
  OuiMarkdownParseError,
} from './markdown_types';
import { OuiPopover, OuiPopoverTitle } from '../popover';
import { OuiText } from '../text';
import { OuiSpacer } from '../spacer';
// @ts-ignore a react svg
import MarkdownLogo from './icons/markdown_logo';
import { OuiHorizontalRule } from '../horizontal_rule';
import { OuiToolTip } from '../tool_tip';

interface OuiMarkdownEditorFooterProps {
  uiPlugins: OuiMarkdownEditorUiPlugin[];
  isUploadingFiles: boolean;
  openFiles: () => void;
  errors: OuiMarkdownParseError[];
  hasUnacceptedItems: boolean;
  dropHandlers: OuiMarkdownDropHandler[];
}

export const OuiMarkdownEditorFooter = forwardRef<
  HTMLDivElement,
  OuiMarkdownEditorFooterProps
>((props, ref) => {
  const {
    uiPlugins,
    isUploadingFiles,
    openFiles,
    errors,
    hasUnacceptedItems,
    dropHandlers,
  } = props;
  const [isShowingHelp, setIsShowingHelp] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  let uploadButton;

  const supportedFileTypes = useMemo(
    () =>
      dropHandlers
        .map(({ supportedFiles }) => supportedFiles.join(', '))
        .sort()
        .join(', '),
    [dropHandlers]
  );

  const ariaLabels = {
    uploadingFiles: useOuiI18n(
      'ouiMarkdownEditorFooter.uploadingFiles',
      'Click to upload files'
    ),
    openUploadModal: useOuiI18n(
      'ouiMarkdownEditorFooter.openUploadModal',
      'Open upload files modal'
    ),
    unsupportedFileType: useOuiI18n(
      'ouiMarkdownEditorFooter.unsupportedFileType',
      'File type not supported'
    ),
    supportedFileTypes: useOuiI18n(
      'ouiMarkdownEditorFooter.supportedFileTypes',
      'Supported files: {supportedFileTypes}',
      { supportedFileTypes }
    ),
    showSyntaxErrors: useOuiI18n(
      'ouiMarkdownEditorFooter.showSyntaxErrors',
      'Show errors'
    ),
    showMarkdownHelp: useOuiI18n(
      'ouiMarkdownEditorFooter.showMarkdownHelp',
      'Show markdown help'
    ),
  };

  if (isUploadingFiles) {
    uploadButton = (
      <OuiButtonIcon
        iconType={OuiLoadingSpinner}
        aria-label={ariaLabels.uploadingFiles}
      />
    );
  } else if (dropHandlers.length > 0 && hasUnacceptedItems) {
    uploadButton = (
      <OuiToolTip content={ariaLabels.supportedFileTypes}>
        <OuiButtonEmpty
          className="ouiMarkdownEditorFooter__uploadError"
          autoFocus
          size="xs"
          iconType="paperClip"
          color="danger"
          aria-label={`${ariaLabels.unsupportedFileType}. ${ariaLabels.supportedFileTypes}. ${ariaLabels.uploadingFiles}`}
          onClick={openFiles}>
          {ariaLabels.unsupportedFileType}
        </OuiButtonEmpty>
      </OuiToolTip>
    );
  } else if (dropHandlers.length > 0) {
    uploadButton = (
      <OuiButtonIcon
        iconType="paperClip"
        color="text"
        aria-label={ariaLabels.openUploadModal}
        onClick={openFiles}
      />
    );
  }

  let errorsButton;
  if (errors && errors.length) {
    errorsButton = (
      <OuiPopover
        button={
          <OuiButtonEmpty
            iconType="crossInACircleFilled"
            size="s"
            color="danger"
            aria-label={ariaLabels.showSyntaxErrors}
            onClick={onButtonClick}>
            {errors.length}
          </OuiButtonEmpty>
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="s"
        anchorPosition="upCenter">
        <div className="ouiMarkdownEditorFooter__popover">
          <OuiPopoverTitle>
            <OuiI18n
              token="ouiMarkdownEditorFooter.errorsTitle"
              default="Errors"
            />
          </OuiPopoverTitle>
          {errors.map((message, idx) => (
            <OuiText size="s" key={idx}>
              {message.toString()}
            </OuiText>
          ))}
        </div>
      </OuiPopover>
    );
  }

  return (
    <div ref={ref} className="ouiMarkdownEditorFooter">
      <div className="ouiMarkdownEditorFooter__actions">
        {uploadButton}
        {errorsButton}
      </div>

      <OuiButtonIcon
        className="ouiMarkdownEditorFooter__help"
        iconType={MarkdownLogo}
        color="text"
        aria-label={ariaLabels.showMarkdownHelp}
        onClick={() => setIsShowingHelp(!isShowingHelp)}
      />
      {isShowingHelp && (
        <OuiModal onClose={() => setIsShowingHelp(false)}>
          <OuiModalHeader>
            <OuiTitle>
              <h3>
                <OuiI18n
                  token="ouiMarkdownEditorFooter.syntaxTitle"
                  default="Syntax help"
                />
              </h3>
            </OuiTitle>
          </OuiModalHeader>
          <OuiModalBody>
            <OuiText>
              <OuiI18n
                tokens={[
                  'ouiMarkdownEditorFooter.descriptionPrefix',
                  'ouiMarkdownEditorFooter.descriptionSuffix',
                ]}
                defaults={[
                  'This editor uses',
                  'You can also utilize these additional syntax plugins to add rich content to your text.',
                ]}>
                {([descriptionPrefix, descriptionSuffix]: ReactChild[]) => (
                  <p>
                    {descriptionPrefix}{' '}
                    <a href="https://github.github.com/gfm/" target="_blank">
                      Github flavored markdown
                    </a>
                    . {descriptionSuffix}
                  </p>
                )}
              </OuiI18n>
            </OuiText>
            <OuiHorizontalRule />
            {uiPlugins
              .filter(({ helpText }) => !!helpText)
              .map(({ name, helpText }) => (
                <Fragment key={name}>
                  <OuiTitle size="xxs">
                    <p>
                      <strong>{name}</strong>
                    </p>
                  </OuiTitle>
                  <OuiSpacer size="s" />
                  {helpText}
                  <OuiSpacer size="l" />
                </Fragment>
              ))}
            <OuiHorizontalRule />
          </OuiModalBody>
          <OuiModalFooter>
            <OuiButton onClick={() => setIsShowingHelp(false)} fill>
              <OuiI18n
                token="ouiMarkdownEditorFooter.closeButton"
                default="Close"
              />
            </OuiButton>
          </OuiModalFooter>
        </OuiModal>
      )}
    </div>
  );
});

OuiMarkdownEditorFooter.displayName = 'OuiMarkdownEditorFooter';
