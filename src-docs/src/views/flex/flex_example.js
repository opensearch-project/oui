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

import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

import { GuideSectionTypes } from '../../components';

import {
  OuiCallOut,
  OuiCode,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFlexGrid,
  OuiLink,
} from '../../../../src/components';

import { flexGroupConfig, flexGridConfig } from './playground';

import FlexGroup from './flex_group';
const flexGroupSource = require('./flex_group?raw');

import FlexItem from './flex_item';
const flexItemSource = require('./flex_item?raw');

import FlexGroupWrap from './flex_group_wrap';
const flexGroupWrapSource = require('./flex_group_wrap?raw');

import ComponentSpan from './component_span';
const componentSpanSource = require('./component_span?raw');

import FlexGutter from './flex_gutter';
const flexGutterSource = require('./flex_gutter?raw');

import FlexGrowZero from './flex_grow_zero';
const flexGrowZeroSource = require('./flex_grow_zero?raw');

import FlexGrowNumeric from './flex_grow_numeric';
const flexGrowNumericSource = require('./flex_grow_numeric?raw');

import FlexJustify from './flex_justify';
const flexJustifySource = require('./flex_justify?raw');
import FlexJustifyBetween from './flex_justify_between';
const flexJustifyBetweenSource = require('./flex_justify_between?raw');
import FlexJustifyEvenly from './flex_justify_evenly';
const flexJustifyEvenlySource = require('./flex_justify_evenly?raw');
import FlexAlignCenter from './flex_align_center';
const flexAlignCenterSource = require('./flex_align_center?raw');

import Direction from './direction';
const directionSource = require('./direction?raw');

import FlexGridColumns from './flex_grid_columns';
const flexGridColumnsSource = require('./flex_grid_columns?raw');

import FlexGridColumnFirst from './flex_grid_column_first';
const flexGridColumnFirstSource = require('./flex_grid_column_first?raw');

import FlexNest from './flex_nest';
const flexNestSource = require('./flex_nest?raw');

import FlexItemPanel from './flex_item_panel';
const flexItemPanelSource = require('./flex_item_panel?raw');

import FlexGroupResponsive from './flex_responsive';
const flexGroupResponsiveSource = require('./flex_responsive?raw');

const flexSnippet = `<OuiFlexGroup>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`;

const flexGroupWrap = `<OuiFlexGroup wrap>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`;

const componentSpanSnippet = `<OuiFlexGroup component="span">
  <OuiFlexItem component="span"><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem component="span"><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`;

const flexItemPanelSnippet = `<OuiFlexGroup>
  <OuiFlexItem>
    <OuiPanel><!-- Panel content --></OuiPanel>
  </OuiFlexItem>

  <OuiFlexItem>
    <OuiPanel grow={false}><!-- Panel content --></OuiPanel>
  </OuiFlexItem>
</OuiFlexGroup>`;

const flexGrowZeroSnippet = `<OuiFlexGroup>
  <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`;

const flexGrowNumericSnippet = `<OuiFlexGroup>
  <OuiFlexItem grow={1}><!-- FlexItem with flew-grow 1 --></OuiFlexItem>
  <OuiFlexItem grow={2}><!-- FlexItem with flew-grow 2 --></OuiFlexItem>
  ...
  <OuiFlexItem grow={10}><!-- FlexItem with flew-grow 10 --></OuiFlexItem>
</OuiFlexGroup>`;

const directionSnippet = `<OuiFlexGroup direction="column">
  <OuiFlexItem><!-- FlexItem in column FlexGroup --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem in column FlexGroup --></OuiFlexItem>
</OuiFlexGroup>`;

const flexGridColumnsSnippet = `<OuiFlexGrid columns={3}>
  <OuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </OuiFlexItem>
  <OuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </OuiFlexItem>
  <OuiFlexItem>
    <!-- Item in 3-column FlexGrid-->
  </OuiFlexItem>
</OuiFlexGrid>`;

const flexGridColumnFirstSnippet = `<OuiFlexGrid columns={2} direction="column">
  <OuiFlexItem>
    <!-- Item in FlexGrid-->
  </OuiFlexItem>
  <OuiFlexItem>
    <!-- Item in FlexGrid-->
  </OuiFlexItem>
</OuiFlexGrid>`;

const flexNestSnippet = `<OuiFlexGroup>
  <OuiFlexItem>
    <OuiFlexGroup>
      <OuiFlexItem><!-- FlexGroup inside FlexGroup --></OuiFlexItem>
      <OuiFlexItem><!-- FlexGroup inside FlexGroup --></OuiFlexItem>
    </OuiFlexGroup>
  </OuiFlexItem>
  <OuiFlexItem>
    <OuiFlexGrid>
      <OuiFlexItem><!-- FlexGrid inside FlexGroup --></OuiFlexItem>
      <OuiFlexItem><!-- FlexGrid inside FlexGroup --></OuiFlexItem>
    </OuiFlexGrid>
  </OuiFlexItem>
</OuiFlexGroup>`;

const flexGutterSnippet = `<OuiFlexGroup gutterSize="none">
  <OuiFlexItem><!-- FlexItem without gutter --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem without gutter --></OuiFlexItem>
</OuiFlexGroup>`;

const flexGroupResponsiveSnippet = `<OuiFlexGroup responsive={false}>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`;

export const FlexExample = {
  title: 'Flex',
  intro: (
    <Fragment>
      <OuiCallOut title="Coloring and padding exist for examples only">
        <p>
          Padding and background-color are added to all the{' '}
          <strong>OuiFlexItem</strong> components on this documentation page for
          illustrative purposes only. You will need to add padding through
          additional components or classes if you need it.
        </p>
      </OuiCallOut>
    </Fragment>
  ),
  sections: [
    {
      title: 'Flex group is for a single row layout',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupSource,
        },
      ],
      text: (
        <p>
          <strong>OuiFlexGroup</strong> is useful for setting up layouts for a{' '}
          <strong>single row</strong> of content. By default any{' '}
          <strong>OuiFlexItem</strong> within <strong>OuiFlexGroup</strong> will
          stretch and grow to match their siblings.
        </p>
      ),
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroup />
        </div>
      ),
      playground: flexGroupConfig,
      props: { OuiFlexGroup, OuiFlexItem },
      snippet: flexSnippet,
    },
    {
      title: 'Flex items are also flex',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemSource,
        },
      ],
      text: (
        <>
          <p>
            To allow for continued stretching of nested{' '}
            <strong>OuiFlexGroup</strong>&apos;s and its items, each{' '}
            <strong>OuiFlexItem</strong> also has the property of{' '}
            <OuiCode language="sass">display: flex</OuiCode>. This can cause
            unwanted layouts of your content when there are multiple elements or
            if the element itself also has some specific{' '}
            <OuiCode language="sass">display</OuiCode> property.
          </p>
          <p>
            To alleviate this, the simplest method is to wrap your inner
            children with a simple HTML element like a{' '}
            <OuiCode language="html">{'<div />'}</OuiCode> or{' '}
            <OuiCode language="html">{'<span />'}</OuiCode>.
          </p>
        </>
      ),
      snippet: `<OuiFlexGroup>
  <OuiFlexItem>
    <div>
      <OuiButton>Wrap them</OuiButton>
    </div>
  </OuiFlexItem>
</OuiFlexGroup>`,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexItem />
        </div>
      ),
    },
    {
      title: 'Spans instead of divs',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: componentSpanSource,
        },
      ],
      text: (
        <p>
          Specify <OuiCode>component=&ldquo;span&rdquo;</OuiCode> on{' '}
          <strong>OuiFlexGroup</strong> and/or <strong>OuiFlexItem</strong> to
          change from the default <OuiCode>div</OuiCode>.
        </p>
      ),
      snippet: componentSpanSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <ComponentSpan />
        </div>
      ),
    },
    {
      title: 'Panels grow to fill flex items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexItemPanelSource,
        },
      ],
      text: (
        <p>
          The{' '}
          <Link to="/layout/panel">
            <strong>OuiPanel</strong>
          </Link>{' '}
          component will naturally grow to fill the <strong>OuiFlexItem</strong>{' '}
          which contains it.
        </p>
      ),
      snippet: flexItemPanelSnippet,
      demo: <FlexItemPanel />,
    },
    {
      title: 'Turn off item stretching',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowZeroSource,
        },
      ],
      text: (
        <p>
          Sometimes you do not want a <strong>OuiFlexItem</strong> to grow
          horizontally. It can be turned off for each item individually.
        </p>
      ),
      snippet: flexGrowZeroSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowZero />
        </div>
      ),
    },
    {
      title: 'Proportional widths of items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGrowNumericSource,
        },
      ],
      text: (
        <p>
          You can specify a number between 1 and 10 for each{' '}
          <strong>OuiFlexItem</strong> to take up a proportional percentage of
          the <strong>OuiFlexGroup</strong> it is in.
        </p>
      ),
      snippet: flexGrowNumericSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGrowNumeric />
        </div>
      ),
    },
    {
      title: 'Justify and align',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifySource,
        },
      ],
      text: (
        <p>
          <strong>OuiFlexGroups</strong> have the props{' '}
          <OuiCode>justifyContent</OuiCode> and <OuiCode>alignItems</OuiCode>{' '}
          that accept{' '}
          <OuiLink href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Aligning_Items_in_a_Flex_Container">
            normal flexbox parameters
          </OuiLink>
          . Below are some common scenarios, where you need to separate two
          items, center justify a single one, or center an item vertically. Note
          the usage of <strong>OuiFlexItems</strong> with{' '}
          <OuiCode>grow=false</OuiCode> so that they do not stretch.
        </p>
      ),
      snippet: `<OuiFlexGroup justifyContent="spaceAround">
    <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
  </OuiFlexGroup>`,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustify />
        </div>
      ),
    },
    {
      title: 'Allowing flex items to wrap',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupWrapSource,
        },
      ],
      text: (
        <p>
          You can set <OuiCode>wrap</OuiCode> on <strong>OuiFlexGroup</strong>{' '}
          if it contains <strong>OuiFlexItems</strong> with minimum widths,
          which you want to wrap as the container becomes narrower.
        </p>
      ),
      snippet: flexGroupWrap,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupWrap />
        </div>
      ),
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifyBetweenSource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustifyBetween />
        </div>
      ),
      snippet: `<OuiFlexGroup justifyContent="spaceBetween">
    <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
    <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
  </OuiFlexGroup>`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexJustifyEvenlySource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexJustifyEvenly />
        </div>
      ),
      snippet: `<OuiFlexGroup justifyContent="spaceEvenly">
  <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem grow={false}><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexAlignCenterSource,
        },
      ],
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexAlignCenter />
        </div>
      ),
      snippet: `<OuiFlexGroup alignItems="center">
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
  <OuiFlexItem><!-- FlexItem content --></OuiFlexItem>
</OuiFlexGroup>`,
    },
    {
      title: 'Change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: directionSource,
        },
      ],
      text: (
        <p>
          You can change direction using the <OuiCode>direction</OuiCode> prop.
        </p>
      ),
      snippet: directionSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <Direction />
        </div>
      ),
    },
    {
      title: 'Flex grids are for repeatable items',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnsSource,
        },
      ],
      text: (
        <p>
          <strong>OuiFlexGrid</strong> is a more rigid component that sets
          multiple, wrapping rows of same width items. You can set a{' '}
          <OuiCode>columns</OuiCode> prop to specify anywhere between 1-4
          columns. Any more would likely break on laptop screens.
        </p>
      ),
      props: { OuiFlexGrid },
      playground: flexGridConfig,
      snippet: flexGridColumnsSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumns />
        </div>
      ),
    },

    {
      title: 'Flex grids can change direction',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGridColumnFirstSource,
        },
      ],
      text: (
        <p>
          Adding <OuiCode>direction=&quot;column&quot;</OuiCode> will re-orient
          the flex items so they display top-down <strong>then</strong> left to
          right.
        </p>
      ),
      snippet: flexGridColumnFirstSnippet,
      demo: (
        <div className="guideDemo__highlightGridWrap">
          <FlexGridColumnFirst />
        </div>
      ),
    },
    {
      title: 'Flex grids and flex groups can nest',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexNestSource,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>OuiFlexGroup</strong> and <strong>OuiFlexGrid</strong> can
            nest within themselves indefinitely. For example, here we turn off
            the growth on a <strong>OuiFlexGroup</strong>, then nest a grid
            inside of it.
          </p>
          <OuiCallOut color="warning" title="Flex items are also a flexbox">
            <p>
              To support nested stretching of items,{' '}
              <strong>OuiFlexItem</strong> also has{' '}
              <OuiCode>{'display: flex'}</OuiCode> on it so if your children are
              not behaving correctly, you may want to wrap them in a{' '}
              <OuiCode>{'<div />'}</OuiCode>.
            </p>
          </OuiCallOut>
        </Fragment>
      ),
      snippet: flexNestSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexNest />
        </div>
      ),
    },
    {
      title: 'Gutter sizing',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGutterSource,
        },
      ],
      text: (
        <>
          <p>
            The <OuiCode>gutterSize</OuiCode> prop can be applied to either a{' '}
            <strong>OuiFlexGroup</strong> or a <strong>OuiFlexGrid</strong> to
            adjust the spacing between <strong>OuiFlexItems</strong>.
          </p>
          <OuiCallOut
            color="warning"
            title="Gutters are created with using negative margin">
            <p>
              If the parent container of a flex group or grid doesn&apos;t have
              sufficient padding to account for the negative margins, it may
              cause overflow scrolling.
            </p>
          </OuiCallOut>
        </>
      ),
      snippet: flexGutterSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGutter />
        </div>
      ),
    },
    {
      title: 'Responsive layouts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: flexGroupResponsiveSource,
        },
      ],
      text: (
        <p>
          By default <strong>OuiFlexGroup</strong> is responsive by always
          stacking the items on smaller screens. However, often you only want to
          use groups for alignment and margins, rather than layouts. Simply
          apply the <OuiCode>responsive={'{false}'}</OuiCode> prop to retain a
          single row layout for the group.
        </p>
      ),
      snippet: flexGroupResponsiveSnippet,
      demo: (
        <div className="guideDemo__highlightGrid">
          <FlexGroupResponsive />
        </div>
      ),
    },
  ],
};
