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
import { Link } from 'react-router-dom';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiContextMenu,
  OuiContextMenuItem,
  OuiContextMenuPanel,
} from '../../../../src/components';

import ContextMenu from './context_menu';
const contextMenuSource = require('./context_menu?raw');
const contextMenuHtml = renderToHtml(ContextMenu);
const contextMenuSnippet = `<OuiContextMenu
  initialPanelId={0}
  panels={[
    {
      id: 0,
      title: 'This is a context menu',
      items: [
        {
          name: 'Handle an onClick',
          icon: <OuiIcon type="search" size="m" />,
          onClick: () => {
            closePopover();
          },
        },
      ]
    }
  ]}
/>`;

import SinglePanel from './single_panel';
const singlePanelSource = require('./single_panel?raw');
const singlePanelHtml = renderToHtml(SinglePanel);
const singlePanelSnippet = `<OuiContextMenuPanel
  items={[
    <OuiContextMenuItem
      key=""
      onClick={}>
      This is a context menu item
    </OuiContextMenuItem>
  ]}
/>`;

import Small from './small';
const smallSizeSource = require('./small?raw');
const smallSizeHtml = renderToHtml(SinglePanel);
const smallSnippet = `<OuiContextMenuPanel
  size="s"
  items={items}
/>`;

import ContentPanel from './content_panel';
const contentPanelSource = require('./content_panel?raw');
const contentPanelHtml = renderToHtml(ContentPanel);
const contentPanelSnippet = `<OuiContextMenuPanel>
  <!-- React element as child -->
</OuiContextMenuPanel>
`;

import ContextMenuWithContent from './context_menu_with_content';
const contextMenuWithContentSource = require('./context_menu_with_content?raw');
const contextMenuWithContentHtml = renderToHtml(ContextMenuWithContent);

export const ContextMenuExample = {
  title: 'Context menu',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextMenuSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextMenuHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiContextMenu</strong> is a nested menu system useful for
          navigating complicated trees. It lives within an{' '}
          <Link to="/layout/popover">
            <strong>OuiPopover</strong>
          </Link>{' '}
          which itself can be wrapped around any component (like a button in
          this example).
        </p>
      ),
      props: { OuiContextMenu, OuiContextMenuPanel, OuiContextMenuItem },
      snippet: contextMenuSnippet,
      demo: <ContextMenu />,
    },
    {
      title: 'Sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: smallSizeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: smallSizeHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiContextMenu</strong> supports a small and medium{' '}
          <OuiCode>size</OuiCode>. The default size is medium,{' '}
          <OuiCode>m</OuiCode>, and should be used for most menus and major
          actions such as top application menus. Use the smaller size,{' '}
          <OuiCode>s</OuiCode>, for a more compressed version containing minor
          actions or repeated menus like in <strong>OuiTable</strong>{' '}
          pagination.
        </p>
      ),
      snippet: smallSnippet,
      demo: <Small />,
    },
    {
      title: 'With single panel',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singlePanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singlePanelHtml,
        },
      ],
      text: (
        <p>
          Use <strong>OuiContextMenuPanel</strong> for simple, non-nested
          context menus. The below pagination example has no nesting and no
          title.
        </p>
      ),
      snippet: singlePanelSnippet,
      demo: <SinglePanel />,
    },
    {
      title: 'Displaying custom elements',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contentPanelSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contentPanelHtml,
        },
      ],
      text: (
        <p>
          If you have custom content to show instead of a list of options, you
          can pass a React element as a child to{' '}
          <strong>OuiContextMenuPanel</strong>.
        </p>
      ),
      snippet: contentPanelSnippet,
      demo: <ContentPanel />,
    },
    {
      title: 'Using panels with mixed items & content',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: contextMenuWithContentSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: contextMenuWithContentHtml,
        },
      ],
      text: (
        <div>
          <p>
            Context menu panels can be passed React elements through the{' '}
            <OuiCode>content</OuiCode> prop instead of <OuiCode>items</OuiCode>.
            The panel will display your custom content without modification.
          </p>
          <p>
            If your panel contents have different widths or you need to ensure
            that a specific context menu panel has a certain width, add{' '}
            <OuiCode language="ts">width: [number of pixels]</OuiCode> to the
            panel tree.
          </p>
          <p>
            You can add separator lines in the <OuiCode>items</OuiCode> prop if
            you define an item as{' '}
            <OuiCode language="ts">{'{isSeparator: true}'}</OuiCode>. This will
            pass the rest of its fields as props to a{' '}
            <Link to="/layout/horizontal-rule">
              <strong>OuiHorizontalRule</strong>
            </Link>{' '}
            component.
          </p>
        </div>
      ),
      demo: <ContextMenuWithContent />,
    },
  ],
};
