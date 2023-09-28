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
  createElement,
  HTMLAttributes,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
  useCallback,
  useRef,
  forwardRef,
} from 'react';

import unified, { PluggableList, Processor } from 'unified';
import { VFileMessage } from 'vfile-message';
import classNames from 'classnames';

import { CommonProps, OneOf } from '../common';
import MarkdownActions, { insertText } from './markdown_actions';
import { OuiMarkdownEditorToolbar } from './markdown_editor_toolbar';
import { OuiMarkdownEditorTextArea } from './markdown_editor_text_area';
import { OuiMarkdownFormat } from './markdown_format';
import { OuiMarkdownEditorDropZone } from './markdown_editor_drop_zone';
import { htmlIdGenerator } from '../../services/';

import { MARKDOWN_MODE, MODE_EDITING, MODE_VIEWING } from './markdown_modes';
import {
  OuiMarkdownAstNode,
  OuiMarkdownDropHandler,
  OuiMarkdownEditorUiPlugin,
  OuiMarkdownParseError,
  OuiMarkdownStringTagConfig,
} from './markdown_types';

import { OuiModal } from '../modal';
import { ContextShape, OuiMarkdownContext } from './markdown_context';
import * as MarkdownTooltip from './plugins/markdown_tooltip';
import {
  defaultParsingPlugins,
  defaultProcessingPlugins,
  defaultUiPlugins,
} from './plugins/markdown_default_plugins';

import { OuiResizeObserver } from '../observer/resize_observer';

type CommonMarkdownEditorProps = Omit<
  HTMLAttributes<HTMLDivElement>,
  'onChange'
> &
  CommonProps & {
    /** aria-label OR aria-labelledby must be set */
    'aria-label'?: string;

    /** aria-label OR aria-labelledby must be set */
    'aria-labelledby'?: string;

    /** ID of an element describing the text editor, useful for associating error messages */
    'aria-describedby'?: string;

    /** a unique ID to attach to the textarea. If one isn't provided, a random one
     * will be generated */
    editorId?: string;

    /** A markdown content */
    value: string;

    /** callback function when markdown content is modified */
    onChange: (value: string) => void;

    /**
     * Sets the `height` in pixels of the editor/preview area or pass `full` to allow
     * the OuiMarkdownEditor to fill the height of its container.
     * When in `full` mode the vertical resize is not allowed.
     */
    height?: number | 'full';

    /**
     * Sets the `max-height` in pixels of the editor/preview area.
     * It has no effect when the `height` is set to `full`.
     */
    maxHeight?: number;

    /**
     * Automatically adjusts the preview height to fit all the content and avoid a scrollbar.
     */
    autoExpandPreview?: boolean;

    /** plugins to identify new syntax and parse it into an AST node */
    parsingPluginList?: PluggableList;

    /** plugins to process the markdown AST nodes into a React nodes */
    processingPluginList?: PluggableList;

    /** defines UI for plugins' buttons in the toolbar as well as any modals or extra UI that provides content to the editor */
    uiPlugins?: OuiMarkdownEditorUiPlugin[];

    /** errors to bubble up */
    errors?: OuiMarkdownParseError[];

    /** callback triggered when parsing results are available */
    onParse?: (
      error: OuiMarkdownParseError | null,
      data: {
        messages: VFileMessage[];
        ast: OuiMarkdownAstNode;
      }
    ) => void;

    /** initial display mode for the editor */
    initialViewMode?: MARKDOWN_MODE;

    /** array defining any drag&drop handlers */
    dropHandlers?: OuiMarkdownDropHandler[];
  };

export type OuiMarkdownEditorProps = OneOf<
  CommonMarkdownEditorProps,
  'aria-label' | 'aria-labelledby'
>;

// TODO I wanted to use the useCombinedRefs
// but I can't because it's not allowed to use react hooks
// inside a callback.
const mergeRefs = (...refs: any[]) => {
  const filteredRefs = refs.filter(Boolean);
  if (!filteredRefs.length) return null;
  if (filteredRefs.length === 0) return filteredRefs[0];
  return (inst: any) => {
    for (const ref of filteredRefs) {
      if (typeof ref === 'function') {
        ref(inst);
      } else if (ref) {
        ref.current = inst;
      }
    }
  };
};

interface OuiMarkdownEditorRef {
  textarea: HTMLTextAreaElement | null;
  replaceNode: ContextShape['replaceNode'];
}

function isNewLine(char: string | undefined): boolean {
  if (char == null) return true;
  return !!char.match(/[\r\n]/);
}
function padWithNewlinesIfNeeded(textarea: HTMLTextAreaElement, text: string) {
  const selectionStart = textarea.selectionStart;
  const selectionEnd = textarea.selectionEnd;

  // block parsing requires two leading new lines and none trailing, but we add an extra trailing line for readability
  const isPrevNewLine = isNewLine(textarea.value[selectionStart - 1]);
  const isPrevPrevNewLine = isNewLine(textarea.value[selectionStart - 2]);
  const isNextNewLine = isNewLine(textarea.value[selectionEnd]);

  // pad text with newlines as needed
  text = `${isPrevNewLine ? '' : '\n'}${isPrevPrevNewLine ? '' : '\n'}${text}${
    isNextNewLine ? '' : '\n'
  }`;
  return text;
}

export const OuiMarkdownEditor = forwardRef<
  OuiMarkdownEditorRef,
  OuiMarkdownEditorProps
>(
  (
    {
      className,
      editorId: _editorId,
      value,
      onChange,
      height = 250,
      maxHeight = 500,
      autoExpandPreview = true,
      parsingPluginList = defaultParsingPlugins,
      processingPluginList = defaultProcessingPlugins,
      uiPlugins = defaultUiPlugins,
      onParse,
      errors = [],
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      'aria-describedby': ariaDescribedBy,
      initialViewMode = MODE_EDITING,
      dropHandlers = [],
      ...rest
    },
    ref
  ) => {
    const [viewMode, setViewMode] = useState<MARKDOWN_MODE>(initialViewMode);
    const editorId = useMemo(() => _editorId || htmlIdGenerator()(), [
      _editorId,
    ]);

    const [pluginEditorPlugin, setPluginEditorPlugin] = useState<
      OuiMarkdownEditorUiPlugin | undefined
    >(undefined);

    const toolbarPlugins = [...uiPlugins];
    // @ts-ignore __originatedFromOui is a custom property
    if (!uiPlugins.__originatedFromOui) {
      toolbarPlugins.unshift(MarkdownTooltip.plugin);
      console.warn(
        'Deprecation warning: uiPlugins passed to OuiMarkdownEditor does not include the tooltip plugin, which has been added for you. This automatic inclusion has been deprecated and will be removed in the future, see https://github.com/elastic/eui/pull/4383'
      );
    }

    const markdownActions = useMemo(
      () => new MarkdownActions(editorId, toolbarPlugins),
      // toolbarPlugins _is_ accounted for
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [editorId, toolbarPlugins.map(({ name }) => name).join(',')]
    );

    const parser = useMemo(() => {
      const Compiler = (tree: any) => {
        return tree;
      };

      function identityCompiler(this: Processor) {
        this.Compiler = Compiler;
      }
      return unified().use(parsingPluginList).use(identityCompiler);
    }, [parsingPluginList]);

    const [parsed, parseError] = useMemo<
      [any | null, OuiMarkdownParseError | null]
    >(() => {
      try {
        const parsed = parser.processSync(value);
        return [parsed, null];
      } catch (e) {
        return [null, e as OuiMarkdownParseError];
      }
    }, [parser, value]);

    const isPreviewing = viewMode === MODE_VIEWING;
    const isEditing = viewMode === MODE_EDITING;

    const replaceNode = useCallback(
      (position, next) => {
        const leading = value.substr(0, position.start.offset);
        const trailing = value.substr(position.end.offset);
        onChange(`${leading}${next}${trailing}`);
      },
      [value, onChange]
    );

    const contextValue = useMemo<ContextShape>(
      () => ({
        openPluginEditor: (plugin: OuiMarkdownEditorUiPlugin) =>
          setPluginEditorPlugin(() => plugin),
        replaceNode,
      }),
      [replaceNode]
    );

    const [selectedNode, setSelectedNode] = useState<OuiMarkdownAstNode>();

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
      if (textareaRef == null) return;
      if (parsed == null) return;

      const getCursorNode = () => {
        const { selectionStart } = textareaRef.current!;

        let node: OuiMarkdownAstNode = parsed.result ?? parsed.contents;

        outer: while (true) {
          if (node.children) {
            for (let i = 0; i < node.children.length; i++) {
              const child = node.children[i];
              if (
                child.position.start.offset < selectionStart &&
                selectionStart < child.position.end.offset
              ) {
                if (child.type === 'text') break outer; // don't dive into `text` nodes
                node = child;
                continue outer;
              }
            }
          }
          break;
        }

        setSelectedNode(node);
      };

      const textarea = textareaRef.current!;

      textarea.addEventListener('keyup', getCursorNode);
      textarea.addEventListener('mouseup', getCursorNode);

      return () => {
        textarea.removeEventListener('keyup', getCursorNode);
        textarea.removeEventListener('mouseup', getCursorNode);
      };
    }, [parsed]);

    useEffect(() => {
      if (onParse) {
        const messages = parsed ? parsed.messages : [];
        const ast = parsed ? parsed.result ?? parsed.contents : null;
        onParse(parseError, { messages, ast });
      }
    }, [onParse, parsed, parseError]);

    useImperativeHandle(
      ref,
      () => ({ textarea: textareaRef.current, replaceNode }),
      [replaceNode]
    );

    const textarea = textareaRef.current;
    const previewRef = useRef<HTMLDivElement>(null);
    const editorToolbarRef = useRef<HTMLDivElement>(null);
    const [hasUnacceptedItems, setHasUnacceptedItems] = React.useState(false);
    const [currentHeight, setCurrentHeight] = useState(height);
    const [editorFooterHeight, setEditorFooterHeight] = useState(0);
    const [editorToolbarHeight, setEditorToolbarHeight] = useState(0);

    const classes = classNames(
      'ouiMarkdownEditor',
      { 'ouiMarkdownEditor--fullHeight': height === 'full' },
      {
        'ouiMarkdownEditor--isPreviewing': isPreviewing,
      },
      className
    );

    const onResize = () => {
      if (textarea && isEditing && height !== 'full') {
        const resizedTextareaHeight =
          textarea.offsetHeight + editorFooterHeight;

        setCurrentHeight(resizedTextareaHeight);
      }
    };

    useEffect(() => {
      setEditorToolbarHeight(editorToolbarRef.current!.offsetHeight);
    }, [setEditorToolbarHeight]);

    useEffect(() => {
      if (isPreviewing && autoExpandPreview && height !== 'full') {
        if (previewRef.current!.scrollHeight > currentHeight) {
          // scrollHeight does not include the border or margin
          // so we ask for the computed value for those,
          // which is always in pixels because getComputedValue
          // returns the resolved values
          const elementComputedStyle = window.getComputedStyle(
            previewRef.current!
          );
          const borderWidth =
            parseFloat(elementComputedStyle.borderTopWidth) +
            parseFloat(elementComputedStyle.borderBottomWidth);
          const marginWidth =
            parseFloat(elementComputedStyle.marginTop) +
            parseFloat(elementComputedStyle.marginBottom);

          // then add an extra pixel for safety and because the scrollHeight value is rounded
          const extraHeight = borderWidth + marginWidth + 1;

          setCurrentHeight(previewRef.current!.scrollHeight + extraHeight);
        }
      }
    }, [currentHeight, isPreviewing, height, autoExpandPreview]);

    const previewHeight =
      height === 'full'
        ? `calc(100% - ${editorFooterHeight}px)`
        : currentHeight;

    const textAreaHeight =
      height === 'full' ? '100%' : `calc(${height - editorFooterHeight}px)`;

    const textAreaMaxHeight =
      height !== 'full' ? `${maxHeight - editorFooterHeight}px` : '';

    // safari needs this calc when the height is set to full
    const editorToggleContainerHeight = `calc(100% - ${editorToolbarHeight}px)`;

    return (
      <OuiMarkdownContext.Provider value={contextValue}>
        <div className={classes} {...rest}>
          <OuiMarkdownEditorToolbar
            ref={editorToolbarRef}
            selectedNode={selectedNode}
            markdownActions={markdownActions}
            onClickPreview={() =>
              setViewMode(isPreviewing ? MODE_EDITING : MODE_VIEWING)
            }
            viewMode={viewMode}
            uiPlugins={toolbarPlugins}
          />

          {isPreviewing && (
            <div
              ref={previewRef}
              className="ouiMarkdownEditorPreview"
              style={{ height: previewHeight }}>
              <OuiMarkdownFormat
                parsingPluginList={parsingPluginList}
                processingPluginList={processingPluginList}>
                {value}
              </OuiMarkdownFormat>
            </div>
          )}
          {/* Toggle the editor's display instead of unmounting to retain its undo/redo history */}
          <div
            className="ouiMarkdownEditor__toggleContainer"
            style={{
              height: editorToggleContainerHeight,
            }}>
            <OuiMarkdownEditorDropZone
              setEditorFooterHeight={setEditorFooterHeight}
              isEditing={isEditing}
              dropHandlers={dropHandlers}
              insertText={(
                text: string,
                config: OuiMarkdownStringTagConfig
              ) => {
                if (config.block) {
                  text = padWithNewlinesIfNeeded(textareaRef.current!, text);
                }

                const originalSelectionStart = textareaRef.current!
                  .selectionStart;
                const newSelectionPoint = originalSelectionStart + text.length;

                insertText(textareaRef.current!, {
                  text,
                  selectionStart: newSelectionPoint,
                  selectionEnd: newSelectionPoint,
                });
              }}
              uiPlugins={toolbarPlugins}
              errors={errors}
              hasUnacceptedItems={hasUnacceptedItems}
              setHasUnacceptedItems={setHasUnacceptedItems}>
              <OuiResizeObserver onResize={onResize}>
                {(resizeRef) => {
                  return (
                    <OuiMarkdownEditorTextArea
                      height={textAreaHeight}
                      maxHeight={textAreaMaxHeight}
                      ref={mergeRefs(textareaRef, resizeRef)}
                      id={editorId}
                      onChange={(e) => onChange(e.target.value)}
                      value={value}
                      onFocus={() => setHasUnacceptedItems(false)}
                      {...{
                        'aria-label': ariaLabel,
                        'aria-labelledby': ariaLabelledBy,
                        'aria-describedby': ariaDescribedBy,
                      }}
                    />
                  );
                }}
              </OuiResizeObserver>
            </OuiMarkdownEditorDropZone>

            {pluginEditorPlugin && (
              <OuiModal onClose={() => setPluginEditorPlugin(undefined)}>
                {createElement(pluginEditorPlugin.editor!, {
                  node:
                    selectedNode &&
                    selectedNode.type === pluginEditorPlugin.name
                      ? selectedNode
                      : null,
                  onCancel: () => setPluginEditorPlugin(undefined),
                  onSave: (markdown, config) => {
                    if (
                      selectedNode &&
                      selectedNode.type === pluginEditorPlugin.name
                    ) {
                      // modifying an existing node
                      textareaRef.current!.setSelectionRange(
                        selectedNode.position.start.offset,
                        selectedNode.position.end.offset
                      );
                    } else {
                      // creating a new node
                      if (config.block) {
                        // inject newlines if needed
                        markdown = padWithNewlinesIfNeeded(
                          textareaRef.current!,
                          markdown
                        );
                      }
                    }
                    insertText(textareaRef.current!, {
                      text: markdown,
                      selectionStart: undefined,
                      selectionEnd: undefined,
                    });
                    setPluginEditorPlugin(undefined);
                  },
                })}
              </OuiModal>
            )}
          </div>
        </div>
      </OuiMarkdownContext.Provider>
    );
  }
);
OuiMarkdownEditor.displayName = 'OuiMarkdownEditor';
