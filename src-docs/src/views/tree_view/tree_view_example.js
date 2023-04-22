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

import { OuiCode, OuiTreeView } from '../../../../src/components';
import { OuiTreeViewNode } from './tree_view_props';
import TreeView from './tree_view';
import TreeViewCompressed from './compressed';

const treeViewSource = require('./tree_view?raw');
const treeViewHtml = renderToHtml(TreeView);

const treeViewCompressedSource = require('./compressed?raw');
const treeViewCompressedHtml = renderToHtml(TreeViewCompressed);

const treeViewSnippet = [
  `<OuiTreeView
  items={[
    {
      label: 'Item One',
      id: 'item_one',
      icon: <OuiIcon type="arrowRight" />,
      iconWhenExpanded: <OuiIcon type="arrowDown" />,
      isExpanded: true,
      children: [
        {
          label: 'Item A',
          id: 'item_a',
          icon: <OuiIcon type="document" />,
        },
        {
          label: 'Item B',
          id: 'item_b',
          icon: <OuiIcon type="document" />,
        },
      ],
    },
    {
      label: 'Item Two',
      id: 'item_two',
    }
  ]}
  aria-label="Sample Tree View"
/>`,
];

export const TreeViewExample = {
  title: 'Tree view',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treeViewSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treeViewHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiTreeView</strong> allows you to render recursive objects,
            such as a file directory. The <OuiCode>children</OuiCode> prop takes
            an array of <OuiCode>nodes</OuiCode>.
          </p>
          <p>
            Keyboard navigation allows users to navigate and interact with the
            tree using the arrow keys, spacebar, and return.
          </p>
          <p>
            The <OuiCode>icon</OuiCode> prop accepts any{' '}
            <Link to="/display/icons">icon or token</Link>. You can also
            specifiy a different icon for the open state with the{' '}
            <OuiCode>iconWhenExpanded</OuiCode> prop.
          </p>
        </div>
      ),
      components: { OuiTreeView },
      demo: <TreeView />,
      snippet: treeViewSnippet,
      props: { OuiTreeView, OuiTreeViewNode },
    },
    {
      title: 'Optional styling',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: treeViewCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: treeViewCompressedHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiTreeView</strong> supports a compressed mode with the{' '}
            <OuiCode language="js">{'display="compressed"'}</OuiCode> setting.
            When using the compressed version it&apos;s highly recommended to
            use the small size of <strong>OuiIcon</strong> and the extra small
            size of <strong>OuiToken</strong>. This will help prevent awkard
            alignment issues when used alongside the{' '}
            <OuiCode>showExpansionArrows</OuiCode> prop.
          </p>
          <p>
            The <OuiCode>showExpansionArrows</OuiCode> prop provides an
            additional visual indicator. Ideal for when a tree&apos;s items use
            icons that don&apos;t immediately let a user know that there are
            nested nodes that may not be visible.
          </p>
          <p>
            In some cases, you may want to automatically expand all the items
            with children. In those instances, you can use the{' '}
            <OuiCode>expandByDefault</OuiCode> prop, as seen in the example
            below.
          </p>
          <p>
            Lastly, each node can also accept a custom{' '}
            <OuiCode>className</OuiCode> should you need to style them
            individually.
          </p>
        </div>
      ),
      components: { OuiTreeView },
      demo: <TreeViewCompressed />,
      props: { OuiTreeView, OuiTreeViewNode },
    },
  ],
};
