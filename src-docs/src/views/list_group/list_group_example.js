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
  OuiListGroup,
  OuiListGroupItem,
  OuiPinnableListGroup,
  OuiCode,
} from '../../../../src/components';
import { OuiPinnableListGroupItem } from './props';

import ListGroup from './list_group';
const listGroupSource = require('./list_group?raw');
const listGroupHtml = renderToHtml(ListGroup);

import ListGroupLinks from './list_group_links';
const listGroupLinksSource = require('./list_group_links?raw');
const listGroupLinksHtml = renderToHtml(ListGroupLinks);

import ListGroupLinkActions from './list_group_link_actions';
const listGroupLinkActionsSource = require('./list_group_link_actions?raw');
const listGroupLinkActionsHtml = renderToHtml(ListGroupLinkActions);

import ListGroupExtra from './list_group_extra';
const listGroupExtraSource = require('./list_group_extra?raw');
const listGroupExtraHtml = renderToHtml(ListGroupExtra);

import ListGroupItemColor from './list_group_item_color';
const listGroupItemColorSource = require('./list_group_item_color?raw');
const listGroupItemColorHtml = renderToHtml(ListGroupItemColor);

import PinnableListGroup from './pinnable_list_group';
const pinnableListGroupSource = require('./pinnable_list_group?raw');
const pinnableListGroupHtml = renderToHtml(PinnableListGroup);

export const ListGroupExample = {
  title: 'List group',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            The <strong>OuiListGroup</strong> component is used to present{' '}
            <strong>OuiListGroupItems</strong> in a neatly formatted list. Use
            the <OuiCode>flush</OuiCode> and <OuiCode>bordered</OuiCode>{' '}
            properties for full-width and bordered presentations, respectively.
          </p>
          <p>
            Adjust the <OuiCode>gutterSize</OuiCode> prop to increase or
            decrease the spacing between items.
          </p>
        </>
      ),
      props: { OuiListGroup, OuiListGroupItem },
      demo: <ListGroup />,
      snippet: `<OuiListGroup flush={true} bordered={true}>
  <OuiListGroupItem onClick={handleOnClick} label="Item" />
</OuiListGroup>`,
    },
    {
      title: 'List of links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupLinksSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupLinksHtml,
        },
      ],
      text: (
        <>
          <p>
            Display <strong>OuiListGroupItems</strong> as links by providing an{' '}
            <OuiCode>href</OuiCode> value and change their state with the{' '}
            <OuiCode>isActive</OuiCode> and <OuiCode>isDisabled</OuiCode>{' '}
            properties.
          </p>
          <p>
            As is done in this example, the <strong>OuiListGroup</strong>{' '}
            component can also accept an array of items via the{' '}
            <OuiCode>listItems</OuiCode> property.
          </p>
        </>
      ),
      demo: <ListGroupLinks />,
      snippet: `<OuiListGroup
  listItems={[
    {
      label: 'First link',
      href: '#',
      iconType: 'calendar',
    },
    {
      label: 'Second link',
      href: '#,
      isActive: true,
      iconType: 'clock',
    }]
  }
/>`,
    },
    {
      title: 'Secondary link actions',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupLinkActionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupLinkActionsHtml,
        },
      ],
      text: (
        <p>
          The <OuiCode>extraAction</OuiCode> property adds a secondary icon
          button to any list item. It accepts several properties of its own,
          including <OuiCode>color</OuiCode>, <OuiCode>onClick</OuiCode>,{' '}
          <OuiCode>iconType</OuiCode>, and <OuiCode>alwaysShow</OuiCode>, and
          can be used for actions such as pinning, favoriting, or deleting an
          item.
        </p>
      ),
      demo: <ListGroupLinkActions />,
      snippet: `<OuiListGroupItem
  label="OUI button link"
  extraAction={{
    color: 'primary',
    onClick: this.clicked,
    iconType: 'pin',
    iconSize: 's',
    'aria-label': 'Pin link',
    alwaysShow: pinned,
  }}
/>`,
    },
    {
      title: 'Text wrapping and tooltips',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupExtraSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupExtraHtml,
        },
      ],
      text: (
        <p>
          Optional props <OuiCode>showToolTip</OuiCode> and{' '}
          <OuiCode>wrapLines</OuiCode> can be used to augment the display of
          list items. Use these when lists are inside small containers where it
          is likely that the content will be truncated.
        </p>
      ),
      demo: <ListGroupExtra />,
      snippet: `<OuiListGroup showToolTips>
  <OuiListGroupItem
    wrapText
    label="A very long label"
  />
</OuiListGroup>`,
    },
    {
      title: 'List item color and size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: listGroupItemColorSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: listGroupItemColorHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiListGroupItems</strong> will inherit the color from their
            element type whether it is a <OuiCode>button</OuiCode>,{' '}
            <OuiCode>anchor</OuiCode>, or <OuiCode>span</OuiCode>. You can
            enforce a different color of <OuiCode>primary</OuiCode>,{' '}
            <OuiCode>text</OuiCode>, or <OuiCode>subdued</OuiCode> with the{' '}
            <OuiCode>color</OuiCode> prop. Or provide the prop directly to{' '}
            <strong>OuiListGroup</strong>.
          </p>
          <p>
            They also accept options for text size;{' '}
            <OuiCode language="ts">{"'xs' | 's' | 'm' | 'l'"}</OuiCode>.
          </p>
        </>
      ),
      demo: <ListGroupItemColor />,
      snippet: `<OuiListGroupItem
  label="Primary"
  color="primary"
  size="s"
/>`,
    },
    {
      title: 'Pinnable list group',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pinnableListGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pinnableListGroupHtml,
        },
      ],
      text: (
        <>
          <p>
            <strong>OuiPinnableListGroup</strong> is simply an extra wrapper
            around an{' '}
            <Link to="/display/list-group">
              <strong>OuiListGroup</strong>
            </Link>{' '}
            that provides visual indicators for <strong>pinning</strong>.
          </p>
          <p>
            Pinning is the concept that users can click a pin icon and add it to
            a subset of links (most likely shown in different list group). By
            providing an <OuiCode>onPinClick</OuiCode> handler, the component
            will automatically add the pin action to the item. However, the
            consuming application must manage the <OuiCode>listItems</OuiCode>
            and their <OuiCode>pinned</OuiCode> state.
          </p>
          <p>
            In order to get the full benefit of using{' '}
            <strong>OuiPinnableListGroup</strong>, the component only supports
            providing list items via the <OuiCode>listItem</OuiCode> prop and
            does not support <OuiCode>children</OuiCode>.
          </p>
        </>
      ),
      props: { OuiPinnableListGroup, OuiPinnableListGroupItem },
      demo: <PinnableListGroup />,
      snippet: `<OuiPinnableListGroup
  onPinClick={item => {}}
  listItems={[
    {
      label: 'A link',
      href: '#',
      pinned: true,
      isActive: true,
    },
  ]}
/>`,
    },
  ],
};
