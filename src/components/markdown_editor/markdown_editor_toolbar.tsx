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
  HTMLAttributes,
  MouseEventHandler,
  useContext,
  forwardRef,
  Ref,
} from 'react';
import { CommonProps } from '../common';
import { OuiButtonEmpty, OuiButtonIcon } from '../button';
import { OuiI18n } from '../i18n';
import { OuiToolTip } from '../tool_tip';
import { MARKDOWN_MODE, MODE_VIEWING } from './markdown_modes';
import { OuiMarkdownEditorUiPlugin } from './markdown_types';
import { OuiMarkdownContext } from './markdown_context';
import MarkdownActions from './markdown_actions';
// @ts-ignore a react svg
import MarkdownCheckmarkIcon from './icons/markdown_checkmark';

export type OuiMarkdownEditorToolbarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    selectedNode?: null | any;
    markdownActions: MarkdownActions;
    viewMode: MARKDOWN_MODE;
    onClickPreview: MouseEventHandler<HTMLButtonElement>;
    uiPlugins: OuiMarkdownEditorUiPlugin[];
  };

const boldItalicButtons = [
  {
    id: 'mdBold',
    label: 'Bold',
    name: 'bold',
    iconType: 'editorBold',
  },
  {
    id: 'mdItalic',
    label: 'Italic',
    name: 'italic',
    iconType: 'editorItalic',
  },
];

const listButtons = [
  {
    id: 'mdUl',
    label: 'Unordered list',
    name: 'ul',
    iconType: 'editorUnorderedList',
  },
  {
    id: 'mdOl',
    label: 'Ordered list',
    name: 'ol',
    iconType: 'editorOrderedList',
  },
  {
    id: 'mdTl',
    label: 'Task list',
    name: 'tl',
    iconType: MarkdownCheckmarkIcon,
  },
];

const quoteCodeLinkButtons = [
  {
    id: 'mdQuote',
    label: 'Quote',
    name: 'quote',
    iconType: 'quote',
  },
  {
    id: 'mdCode',
    label: 'Code',
    name: 'code',
    iconType: 'editorCodeBlock',
  },
  {
    id: 'mdLink',
    label: 'Link',
    name: 'link',
    iconType: 'editorLink',
  },
];

export const OuiMarkdownEditorToolbar = forwardRef<
  HTMLDivElement,
  OuiMarkdownEditorToolbarProps
>(
  (
    { markdownActions, viewMode, onClickPreview, uiPlugins, selectedNode },
    ref: Ref<HTMLDivElement>
  ) => {
    const { openPluginEditor } = useContext(OuiMarkdownContext);

    const handleMdButtonClick = (mdButtonId: string) => {
      const actionResult = markdownActions.do(mdButtonId);
      if (actionResult !== true) openPluginEditor(actionResult);
    };

    const isPreviewing = viewMode === MODE_VIEWING;

    return (
      <div ref={ref} className="ouiMarkdownEditorToolbar">
        <div className="ouiMarkdownEditorToolbar__buttons">
          {boldItalicButtons.map((item) => (
            <OuiToolTip key={item.id} content={item.label} delay="long">
              <OuiButtonIcon
                color="text"
                onClick={() => handleMdButtonClick(item.id)}
                iconType={item.iconType}
                aria-label={item.label}
                isDisabled={isPreviewing}
              />
            </OuiToolTip>
          ))}
          <span className="ouiMarkdownEditorToolbar__divider" />
          {listButtons.map((item) => (
            <OuiToolTip key={item.id} content={item.label} delay="long">
              <OuiButtonIcon
                color="text"
                onClick={() => handleMdButtonClick(item.id)}
                iconType={item.iconType}
                aria-label={item.label}
                isDisabled={isPreviewing}
              />
            </OuiToolTip>
          ))}
          <span className="ouiMarkdownEditorToolbar__divider" />
          {quoteCodeLinkButtons.map((item) => (
            <OuiToolTip key={item.id} content={item.label} delay="long">
              <OuiButtonIcon
                color="text"
                onClick={() => handleMdButtonClick(item.id)}
                iconType={item.iconType}
                aria-label={item.label}
                isDisabled={isPreviewing}
              />
            </OuiToolTip>
          ))}

          {uiPlugins.length > 0 ? (
            <>
              <span className="ouiMarkdownEditorToolbar__divider" />
              {uiPlugins.map(({ name, button }) => {
                const isSelectedNodeType =
                  selectedNode && selectedNode.type === name;
                return (
                  <OuiToolTip key={name} content={button.label} delay="long">
                    <OuiButtonIcon
                      color="text"
                      {...(isSelectedNodeType
                        ? {
                            style: { background: 'rgba(0, 0, 0, 0.15)' },
                          }
                        : null)}
                      onClick={() => handleMdButtonClick(name)}
                      iconType={button.iconType}
                      aria-label={button.label}
                      isDisabled={isPreviewing}
                    />
                  </OuiToolTip>
                );
              })}
            </>
          ) : null}
        </div>

        {isPreviewing ? (
          <OuiButtonEmpty
            iconType="editorCodeBlock"
            color="text"
            size="s"
            onClick={onClickPreview}>
            <OuiI18n token="ouiMarkdownEditorToolbar.editor" default="Editor" />
          </OuiButtonEmpty>
        ) : (
          <OuiButtonEmpty
            iconType="eye"
            color="text"
            size="s"
            onClick={onClickPreview}>
            <OuiI18n
              token="ouiMarkdownEditorToolbar.previewMarkdown"
              default="Preview"
            />
          </OuiButtonEmpty>
        )}
      </div>
    );
  }
);

OuiMarkdownEditorToolbar.displayName = 'OuiMarkdownEditorToolbar';
