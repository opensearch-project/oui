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

import React, { createElement } from 'react';
// Importing seemingly unused types from `unified` because the definitions
// are exported for two versions of TypeScript (3.4, 4.0) and implicit
// imports during oui.d.ts generation default to the incorrect version (3.4).
// Explicit imports here resolve the version mismatch.
import {
  Plugin,
  PluggableList,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Attacher,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Pluggable,
  // @ts-ignore See above comment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  Settings,
} from 'unified';
import { Options as Remark2RehypeOptions, Handler } from 'mdast-util-to-hast';
import all from 'mdast-util-to-hast/lib/all';
import rehype2react from 'rehype-react';
import markdown from 'remark-parse';
import emoji from 'remark-emoji';
import remark2rehype from 'remark-rehype';
import highlight from './remark/remark_prismjs';
import * as MarkdownTooltip from './markdown_tooltip';
import * as MarkdownCheckbox from './markdown_checkbox';
import { markdownLinkValidator } from './markdown_link_validator';
import { OuiMarkdownEditorUiPlugin } from './../markdown_types';
import { OuiLink } from '../../link';
import { OuiCodeBlock, OuiCode } from '../../code';

export const getDefaultOuiMarkdownParsingPlugins = (): PluggableList => [
  [markdown, {}],
  [highlight, {}],
  [emoji, { emoticon: false }],
  [MarkdownTooltip.parser, {}],
  [MarkdownCheckbox.parser, {}],
  [markdownLinkValidator, {}],
];

export const defaultParsingPlugins = getDefaultOuiMarkdownParsingPlugins();

const unknownHandler: Handler = (h, node) => {
  return h(node, node.type, node, all(h, node));
};

export interface Rehype2ReactOptions {
  components: { [key: string]: React.ComponentType<any> };
  [key: string]: any;
}

export const getDefaultOuiMarkdownProcessingPlugins = (): [
  [Plugin, Remark2RehypeOptions], // first is well known
  [typeof rehype2react, Rehype2ReactOptions], // second is well known
  ...PluggableList // any additional are generic
] => [
  [
    remark2rehype,
    {
      allowDangerousHtml: true,
      unknownHandler,
      handlers: {}, // intentionally empty, allows plugins to extend if they need to
    },
  ],
  [
    rehype2react,
    {
      createElement: createElement,
      components: {
        a: OuiLink,
        code: (props: any) =>
          // If there are linebreaks use codeblock, otherwise code
          /\r|\n/.exec(props.children) ? (
            <OuiCodeBlock fontSize="m" paddingSize="s" {...props} />
          ) : (
            <OuiCode {...props} />
          ),
        tooltipPlugin: MarkdownTooltip.renderer,
        checkboxPlugin: MarkdownCheckbox.renderer,
      },
    },
  ],
];

export const defaultProcessingPlugins = getDefaultOuiMarkdownProcessingPlugins();

export const getDefaultOuiMarkdownUiPlugins = (): OuiMarkdownEditorUiPlugin[] => {
  const array = [MarkdownTooltip.plugin];
  // @ts-ignore __originatedFromOui is a custom property
  array.__originatedFromOui = true;
  return array;
};

export const defaultUiPlugins = getDefaultOuiMarkdownUiPlugins();
