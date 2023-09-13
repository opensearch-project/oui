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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  OuiCode,
  OuiSelectable,
  OuiSelectableMessage,
  OuiText,
  OuiSpacer,
  OuiSelectableTemplateSitewide,
  OuiCodeBlock,
  OuiAccordion,
} from '../../../../src/components';

import {
  OuiSelectableOptionProps,
  OuiSelectableOptionsList,
  Options,
  MetaData,
} from './props';

import Selectable from './selectable';
const selectableSource = require('./selectable?raw');
const selectableHtml = renderToHtml(Selectable);

import SelectablePopover from './selectable_popover';
const selectablePopoverSource = require('./selectable_popover?raw');
const selectablePopoverHtml = renderToHtml(SelectablePopover);

import SelectableSearch from './selectable_search';
const selectableSearchSource = require('./selectable_search?raw');
const selectableSearchHtml = renderToHtml(SelectableSearch);

import SelectableSingle from './selectable_single';
const selectableSingleSource = require('./selectable_single?raw');
const selectableSingleHtml = renderToHtml(SelectableSingle);

import SelectableExclusion from './selectable_exclusion';
const selectableExclusionSource = require('./selectable_exclusion?raw');
const selectableExclusionHtml = renderToHtml(SelectableExclusion);

import SelectableMessages from './selectable_messages';
const selectableMessagesSource = require('./selectable_messages?raw');
const selectableMessagesHtml = renderToHtml(SelectableMessages);

import SelectableCustomRender from './selectable_custom_render';
const selectableCustomRenderSource = require('./selectable_custom_render?raw');
const selectableCustomRenderHtml = renderToHtml(SelectableCustomRender);

import SearchOption from './sitewide_option';
import Search from './search';
import { OuiCallOut } from '../../../../src/components/call_out';
const searchSource = require('./search?raw');
const searchHtml = renderToHtml(Search);

export const SelectableExample = {
  title: 'Selectable',
  intro: (
    <OuiText>
      <p>
        <strong>OuiSelectable</strong> aims to make the pattern of a selectable
        list (with or without search) consistent across implementations. It is
        the same concept used in{' '}
        <Link to="/forms/combo-box">
          <strong>OuiComboBox</strong>
        </Link>{' '}
        and{' '}
        <Link to="/forms/filter-group">
          <strong>OuiFilterGroup</strong>
        </Link>
        .{' '}
        <strong>
          This is not intended for{' '}
          <Link to="/display/list-group">primary navigation</Link>
        </strong>{' '}
        but can be used to simplify the construction of popover navigational
        menus; i.e. the spaces menu in the{' '}
        <Link to="/layout/header">header</Link>.
      </p>
    </OuiText>
  ),
  sections: [
    {
      title: 'The basics',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            At its simplest, <strong>OuiSelectable</strong> requires an array of{' '}
            <OuiCode>options</OuiCode> and an <OuiCode>onChange</OuiCode>{' '}
            handler which passes back the altered{' '}
            <OuiCode>selectedOptions</OuiCode> array. The{' '}
            <OuiCode>children</OuiCode> is a function that return the{' '}
            <OuiCode>list</OuiCode> and <OuiCode>search</OuiCode> nodes.
          </p>
          <OuiCallOut
            iconType="check"
            title="Selected options are based on the checked = on property">
            <p>
              <strong>OuiSelectable</strong> offers the ability to{' '}
              <strong>exclude</strong> selections. Therefore, the{' '}
              <OuiCode>checked</OuiCode> property is one of{' '}
              <OuiCode>{"undefined | 'on' | 'off'"}</OuiCode>,{' '}
              <OuiCode>{"'on'"}</OuiCode> being the default for selected options
              when <OuiCode>allowExclusions = false</OuiCode>.
            </p>
          </OuiCallOut>
        </Fragment>
      ),
      props: {
        OuiSelectable,
        OuiSelectableOptionProps,
        OuiSelectableOptionsList,
      },
      demo: <Selectable />,
      snippet: `<OuiSelectable
  aria-label="Basic example"
  options={[{ label: '' }, { label: '' }]}
  onChange={newOptions => setOptions(newOptions)}
  listProps={{ bordered: true }}>
  {list => list}
</OuiSelectable>`,
    },
    {
      title: 'Searchable',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSearchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableSearchHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To add a search component to the list, simply add the{' '}
            <OuiCode>searchable</OuiCode> prop. You can optionally pass in a{' '}
            <OuiCode>searchProps</OuiCode> object which will get passed down to
            the actual <strong>OuiFieldSearch</strong> used.
          </p>
          <OuiCallOut
            iconType="search"
            title={
              <>
                The search is performed as a string match against the{' '}
                <OuiCode>option.label</OuiCode> unless a separate{' '}
                <OuiCode>option.searchableLabel</OuiCode> is provided.
              </>
            }
          />
        </Fragment>
      ),
      props: {
        OuiSelectable,
        OuiSelectableOptionProps,
        OuiSelectableOptionsList,
      },
      demo: <SelectableSearch />,
      snippet: `<OuiSelectable
  aria-label="Searchable example"
  searchable
  searchProps={{
    'data-test-subj': dataTestSubj,
  }}
  options={[]}
  onChange={newOptions => setOptions(newOptions)}>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</OuiSelectable>`,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableSingleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableSingleHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Selection can be restricted to a single option at a time with the{' '}
            <OuiCode>singleSelection</OuiCode> prop. Passing{' '}
            <OuiCode>true</OuiCode> allows for 0 or 1 option to be selected,
            while <OuiCode language="js">{'"always"'}</OuiCode> requires 1
            option to be selected at all times. The default value is{' '}
            <OuiCode>false</OuiCode>.
          </p>
        </Fragment>
      ),
      props: { OuiSelectable },
      demo: <SelectableSingle />,
      snippet: `
      <OuiSelectable
  aria-label="Single selection example"
  options={options}
  onChange={newOptions => setOptions(newOptions)}
  singleSelection={true}
  listProps={{ bordered: true }}>
  {list => list}
</OuiSelectable>`,
    },
    {
      title: 'Sizing and containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectablePopoverSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectablePopoverHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component&apos;s children, <OuiCode>list, search</OuiCode>, are
            returned via the <OuiCode>children</OuiCode> function, which means
            you can wrap the indivial elements in anything you want.
          </p>
          <h3>Width and height</h3>
          <p>
            The width has been made to always be 100% of its container,
            including stretching the search input. By default, the height is
            capped at showing up to 7.5 items. It shows half of the last one to
            help indicate that there are more options to scroll to. To stretch
            the box to fill its container, pass &apos;full&apos; to the{' '}
            <OuiCode>height</OuiCode> prop.
          </p>
          <h3>Flexbox</h3>
          <p>
            Be aware that <OuiCode language="sass">display: flex</OuiCode> with
            column layout is applied to the wrapping container. This is so that
            you can opt in to allow the height of the list stretch to fill its
            container. See the flyout example.
          </p>
        </Fragment>
      ),
      props: { OuiSelectable },
      demo: <SelectablePopover />,
    },
    {
      title: 'Options can be excluded',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableExclusionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableExclusionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            Currently, adding <OuiCode>allowExclusions</OuiCode> simply allows
            cycling through the checked options (on {'-> off ->'} undefined).
            Should this be allowed by holding down a modifier key instead?
          </p>
        </Fragment>
      ),
      props: { OuiSelectable },
      demo: <SelectableExclusion />,
      snippet: `<OuiSelectable
  aria-label="Example supporting exclusions"
  allowExclusions
  options={[]}
  onChange={newOptions => setOptions(newOptions)}>
  {list => list}
</OuiSelectable>`,
    },
    {
      title: 'Messages and loading',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableMessagesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableMessagesHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            The component comes with pre-composed messages for loading, empty,
            and no search result states. To display your own messages, pass{' '}
            <OuiCode>loadingMessage</OuiCode>, <OuiCode>emptyMessage</OuiCode>,
            or <OuiCode>noMatchesMessage</OuiCode> respectively. Alternatively,
            you can replace the entire <OuiCode>list</OuiCode> display with your
            own message for any state. In which case, we recommend wrapping your
            custom message in an <strong>OuiSelectableMessage</strong>{' '}
            component.
          </p>
        </Fragment>
      ),
      props: { OuiSelectable, OuiSelectableMessage },
      demo: <SelectableMessages />,
      snippet: [
        `<OuiSelectable
  aria-label="Messaging example"
  options={[]}
  listProps={{ bordered: true }}
  isLoading={isLoading}
  loadingMessage={customLoadingMessage}
  emptyMessage={customEmptyMessage}
  noMatchesMessage={customNoMatchesMessage}>
  {list => list}
</OuiSelectable>`,
        `<OuiSelectable
  aria-label="Messaging example"
  options={[]}
  listProps={{ bordered: true }}
  isLoading={isLoading}>
  {list => isLoading ? <OuiSelectableMessage bordered={true}>No custom tags created</OuiSelectableMessage> : list}
</OuiSelectable>`,
      ],
    },
    {
      title: 'Rendering the options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: selectableCustomRenderSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: selectableCustomRenderHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            There are two object properties you can add to enhance the content
            of you options, <OuiCode>option.prepend</OuiCode> and{' '}
            <OuiCode>option.append</OuiCode>. These will add nodes before and
            after the option label respectively. They will not be included in
            the searchable content as this only matches against the label
            property.
          </p>
          <h3>Selection icons</h3>
          <p>
            You can choose not to display the check and cross icons indicating
            selection by passing{' '}
            <OuiCode language="js">showIcons=false</OuiCode>. This is useful for
            instances that navigate elsewhere on selection or hide their
            selected options from the list.
          </p>
          <h3>Group labels</h3>
          <p>
            An option is allowed to be passed that is just a header for the
            options that follow it. It takes no mouse handlers and renders
            similar to a title. Add one of these by setting the{' '}
            <OuiCode>option.isGroupLabel</OuiCode> to true.{' '}
          </p>
          <h3>Custom content</h3>
          <p>
            While it is best to stick to the{' '}
            <OuiCode>option.label, option.append, option.prepend</OuiCode> and{' '}
            <OuiCode>showIcons</OuiCode> props, you can pass a custom{' '}
            <OuiCode>renderOption</OuiCode> function which will pass back the
            single <OuiCode>option</OuiCode> object and the{' '}
            <OuiCode>searchValue</OuiCode> to use for highlighting.
          </p>
          <p>
            In order for the list to know how to scroll to the selected or
            highlighted option, it must also know the height of the rows. It
            applies this pixel height directly to options. If your custom
            content is taller than the default of <OuiCode>32px</OuiCode> tall,
            you will need to recalculate this height and apply it via{' '}
            <OuiCode>listProps.rowHeight</OuiCode>.
          </p>
          <p>
            <strong>Every row must be the same height.</strong>
          </p>
        </Fragment>
      ),
      demo: <SelectableCustomRender />,
      snippet: `<OuiSelectable
  searchable
  options={[]}
  onChange={newOptions => setOptions(newOptions)}
  height={240}
  renderOption={renderCountryOption}
  listProps={{
    rowHeight: 50,
    showIcons: false,
  }}
>
  {(list, search) => (
    <Fragment>
      {search}
      {list}
    </Fragment>
  )}
</OuiSelectable>`,
    },
    {
      title: 'Sitewide search template',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: searchSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: searchHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            <strong>OuiSelectableTemplateSitewide</strong> is an opinionated
            wrapper around <strong>OuiSelectable</strong> to provide a reusable
            template across the Elastic products that will share the same global
            search capabilities. It creates the search input that triggers a
            popover containing the list of options.
          </p>
          <h3>Search input</h3>
          <p>
            The search ability of OuiSelectable is still hooked up to the
            options provided. It will highlight the portion of the label that
            matches the search string.
          </p>
          <OuiCallOut
            size="s"
            iconType="keyboardShortcut"
            title="The demo showcases the possibility to allow a keyboard shortcut (command + K) to trigger the search input focus, but the template does not come with this ability."
          />
          <h3>Popover</h3>
          <p>
            The popover itself allows you to display a{' '}
            <OuiCode>popoverTitle</OuiCode> node,{' '}
            <OuiCode>popoverFooter</OuiCode> node, or pass any of the{' '}
            <OuiCode>popoverProps</OuiCode> to the{' '}
            <Link to="/layout/popover">
              <strong>OuiPopover</strong>
            </Link>{' '}
            component.
          </p>
          <h3>Options</h3>
          <p>
            The <OuiCode>options</OuiCode> are the most opinionated portion of
            the template. Their display is determined by the props passed in and
            extends the normal <OuiCode>OuiSelectable.option</OuiCode> type. All
            parts are optional with the exception of the label (B).
          </p>

          <SearchOption />
          <OuiSpacer size="xs" />
          <OuiAccordion
            id="optionSnippet"
            buttonContent={<small>Code snippet</small>}>
            <OuiSpacer size="xs" />
            <OuiCodeBlock language="ts" isCopyable paddingSize="s">
              {`const options: OuiSelectableTemplateSitewideOption[] = [
  {
    label: 'Label',
    icon: {
      type: 'logoOpenSearch'
    }
    avatar: {
      name: 'Default',
    },
    meta: [
      {
        text: 'Meta',
        type: 'application',
      },
      {
        text: 'Deployment',
        type: 'deployment',
      },
      {
        text: 'Default display',
      },
    ],
  }
]`}
            </OuiCodeBlock>
          </OuiAccordion>
          <OuiSpacer />
          <ul style={{ listStyleType: 'upper-alpha' }}>
            <li>
              <OuiCode>label</OuiCode> (required): The name of the item itself.
              By default, the search box will only use this to match the search
              term against, but you can supply a separate{' '}
              <OuiCode>searchableLabel</OuiCode> that combines the label and
              meta data to search on.
            </li>
            <li>
              <OuiCode>icon</OuiCode>: Only display the solution or
              application&apos;s logo when the option links to the application
              itself (Dashboard app) and not lower-level items such as
              individual dashboards. Size and color are predetermined but can be
              overridden.
            </li>
            <li>
              <OuiCode>avatar</OuiCode>: Type and size are predetermined but can
              be overridden.
            </li>
            <li>
              <OuiCode>meta</OuiCode>: This bottom line should only contain
              items if the option is a lower-level item (individual dashboard).
              The display of which defaults to simple text, but if you pass one
              of the predetermined <OuiCode>types</OuiCode>, they will be styled
              according to the design pattern.
            </li>
          </ul>
          <OuiCallOut
            size="s"
            iconType="clock"
            title="The demo shows how you can temporarily replace the icon for a subset of options to display a short list of recently viewed options."
          />
          <h3>Selection</h3>
          <p>
            The options themselves are simply rendered as list items with no
            interactive behavior like buttons or links. You must handle the
            interaction when the component passes back the altered array of
            options with the selected option having{' '}
            <OuiCode>{"checked: 'on'"}</OuiCode>.
          </p>
          <h3>Popover toggle and responsiveness</h3>
          <p>
            The default display is to render the search input inline which
            triggers a popover with the results. Or you can decide to trigger
            the whole selectable component from a single button. By passing your
            own button to <OuiCode>popoverButton</OuiCode>, the component will
            use this to trigger the popover, putting the search inside.
          </p>
          <p>
            This is a great way to handle reducing the size of the component for
            smaller screens. The component offers a helper prop called{' '}
            <OuiCode>popoverButtonBreakpoints</OuiCode> which will only render
            the <OuiCode>popoverButton</OuiCode> if the window size matches
            named breakpoint(s).
          </p>
        </Fragment>
      ),
      props: { OuiSelectableTemplateSitewide, Options, MetaData },
      demo: <Search />,
    },
  ],
};
