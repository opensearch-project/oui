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
  OuiLink,
  OuiCode,
  OuiComboBox,
  OuiText,
} from '../../../../src/components';

import { OuiComboBoxOptionOption } from '!!prop-loader!../../../../src/components/combo_box/types';

import ComboBox from './combo_box';
const comboBoxSource = require('./combo_box?raw');
const comboBoxHtml = renderToHtml(ComboBox);
const comboBoxSnippet = `<OuiComboBox
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
    },
  ]}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
  clearOnBlur={true}
/>`;

import Containers from './containers';
const containersSource = require('./containers?raw');
const containersHtml = renderToHtml(Containers);

import Colors from './colors';
const colorsSource = require('./colors?raw');
const colorsHtml = renderToHtml(Colors);
const colorsSnippet = `<OuiComboBox
  placeholder="Select or create options"
  options={[
    {
      label: 'Titan',
      color: "#ff0000",
    },
  ]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import RenderOption from './render_option';
const renderOptionSource = require('./render_option?raw');
const renderOptionHtml = renderToHtml(RenderOption);
const renderOptionSnippet = `<OuiComboBox
  placeholder="Select or create options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  renderOption={renderOption}
/>`;

import Groups from './groups';
const groupsSource = require('./groups?raw');
const groupsHtml = renderToHtml(Groups);
const groupsSnippet = `<OuiComboBox
  placeholder="These options are grouped"
  options={[colorGroup, soundGroup]}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
/>`;

import SingleSelection from './single_selection';
const singleSelectionSource = require('./single_selection?raw');
const singleSelectionHtml = renderToHtml(SingleSelection);
const singleSelectionSnippet = `<OuiComboBox
  placeholder="Select a single option"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;

import SingleSelectionCustomOptions from './single_selection_custom_options';
const singleSelectionCustomOptionsSource = require('./single_selection_custom_options?raw');
const singleSelectionCustomOptionsHtml = renderToHtml(
  SingleSelectionCustomOptions
);
const singleSelectionCustomOptionsSnippet = `<OuiComboBox
  placeholder="Select a single option"
  singleSelection={{ asPlainText: true }}
  options={options}
  selectedOptions={selectedOptions}
  onCreateOption={onCreateOption}
  onChange={onChange}
/>`;

import DisallowCustomOptions from './disallow_custom_options';
const disallowCustomOptionsSource = require('./disallow_custom_options?raw');
const disallowCustomOptionsHtml = renderToHtml(DisallowCustomOptions);
const disallowCustomOptionsSnippet = `<OuiComboBox
  placeholder="Select one or more options"
  options={options}
  onChange={onChange}
  onSearchChange={onSearchChange}
/>`;

import CustomOptionsOnly from './custom_options_only';
const customOptionsOnlySource = require('./custom_options_only?raw');
const customOptionsOnlyHtml = renderToHtml(CustomOptionsOnly);
const customOptionsOnlySnippet = `<OuiComboBox
  noSuggestions
  placeholder="Create some tags (letters only)"
  selectedOptions={selectedOptions}
  onCreateOption={onCreateOption}
  onChange={onChange}
  onSearchChange={onSearchChange}
  isInvalid={isInvalid}
/>`;

import Async from './async';
const asyncSource = require('./async?raw');
const asyncHtml = renderToHtml(Async);
const asyncSnippet = `<OuiComboBox
  placeholder="Search asynchronously"
  async
  options={options}
  selectedOptions={selectedOptions}
  isLoading={isLoading}
  onChange={onChange}
  onSearchChange={onSearchChange}
  onCreateOption={onCreateOption}
/>`;

import Virtualized from './virtualized';
const virtualizedSource = require('./virtualized?raw');
const virtualizedHtml = renderToHtml(Virtualized);
const virtualizedSnippet = `<OuiComboBox
  placeholder="Select one or more options"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
/>`;

import Disabled from './disabled';
const disabledSource = require('./disabled?raw');
const disabledHtml = renderToHtml(Disabled);
const disabledSnippet = `<OuiComboBox
  placeholder="Select or create options"
  options={options}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isDisabled
/>`;

import Delimiter from './combo_box_delimiter';
const delimiterSource = require('./combo_box_delimiter?raw');
const delimiterHtml = renderToHtml(Delimiter);
const delimiterSnippet = `<OuiComboBox
  placeholder="Select or create options"
  options={options}
  delimiter=","
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import WithIcon from './combo_box_icon';
const withIconSource = require('./combo_box_icon?raw');
const withIconHtml = renderToHtml(WithIcon);
const withIconSnippet = `<OuiComboBox
  placeholder="Select or create options"
  options={options}
  icon={true}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import StartingWith from './startingWith';
const startingWithSource = require('./startingWith?raw');
const startingWithHtml = renderToHtml(StartingWith);
const startingWithSnippet = `<OuiComboBox
  placeholder="Select or create options"
  sortMatchesBy="startsWith"
  options={options}
  selectedOptions={selectedOptions}
  onChange={onChange}
  onCreateOption={onCreateOption}
  isClearable={true}
/>`;

import DuplicateOptions from './combo_box_duplicates';
const duplicateOptionsSource = require('./combo_box_duplicates?raw');
const duplicateOptionsHtml = renderToHtml(DuplicateOptions);
const duplicateOptionsSnippet = `const options = [{
  label: 'Label',
  key: 'label1',
},
{
  label: 'Label',
  key: 'Label2',
}]`;

import ClearOnBlur from './clear_on_blur';
const clearOnBlurSource = require('./clear_on_blur?raw');
const clearOnBlurSourceOptionsHtml = renderToHtml(ClearOnBlur);
const clearOnBlurSnippet = `<OuiComboBox
  placeholder="Select one or more options"
  options={options}
  onChange={onChange}
  clearOnBlur={true}
/>`;

import ComboBoxDefaultIcon from './combo_box_default_icon';
const comboBoxDefaultIconSource = require('./combo_box_default_icon?raw');
const comboBoxDefaultIconSourceOptionsHtml = renderToHtml(ComboBoxDefaultIcon);
const comboBoxDefaultIconSnippet = `<OuiComboBox
  placeholder="Select one or more options"
  options={options}
  onChange={onChange}
  onSearchChange={onSearchChange}
  icon={true}
/>`;

import ComboBoxCustomIcon from './combo_box_custom_icon';
const comboBoxCustomIconSource = require('./combo_box_custom_icon?raw');
const comboBoxCustomIconSourceOptionsHtml = renderToHtml(ComboBoxCustomIcon);
const comboBoxCustomIconSnippet = `<OuiComboBox
  placeholder="Select one or more options"
  options={options}
  onChange={onChange}
  onSearchChange={onSearchChange}
  icon="menu"
/>`;

export const ComboBoxExample = {
  title: 'Combo box',
  intro: (
    <Fragment>
      <OuiText>
        <p>
          Use a <strong>OuiComboBox</strong> when the input has so many options
          that the user needs to be able to search them, the user needs to be
          able to select multiple options, and/or the user should have the
          ability to specify a custom value in addition to selecting from a
          predetermined list.
        </p>
      </OuiText>
    </Fragment>
  ),
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: comboBoxSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: comboBoxHtml,
        },
      ],
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: comboBoxSnippet,
      demo: <ComboBox />,
    },
    {
      title: 'Disabled',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: disabledSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: disabledHtml,
        },
      ],
      text: (
        <p>
          Set the prop <OuiCode>isDisabled</OuiCode> to make the combo box
          disabled.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: disabledSnippet,
      demo: <Disabled />,
    },
    {
      title: 'Virtualized',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: virtualizedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: virtualizedHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiComboBoxList</strong> uses{' '}
          <OuiLink href="https://github.com/bvaughn/react-window">
            react-window
          </OuiLink>{' '}
          to only render visible options to be super fast no matter how many
          options there are.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: virtualizedSnippet,
      demo: <Virtualized />,
    },
    {
      title: 'Containers',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: containersSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: containersHtml,
        },
      ],
      text: (
        <p>
          This example demonstrates how the combo box works within containers.
          Because this component uses portals, it&rsquo;s important that it
          works within other portal-using components.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      demo: <Containers />,
    },
    {
      title: 'Pill colors',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: colorsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: colorsHtml,
        },
      ],
      text: (
        <p>
          Useful for visualization or tagging systems. You can also pass a color
          in your option list. The color can be a hex value (like{' '}
          <OuiCode>#000</OuiCode>) or any other named color value accepted by
          the{' '}
          <Link to="/display/badge">
            <strong>OuiBadge</strong>
          </Link>{' '}
          component.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: colorsSnippet,
      demo: <Colors />,
    },
    {
      title: 'Option rendering',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: renderOptionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: renderOptionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can provide a <OuiCode>renderOption</OuiCode> prop which will
            accept <OuiCode>option</OuiCode> and <OuiCode>searchValue</OuiCode>{' '}
            arguments. Use the <OuiCode>value</OuiCode> prop of the{' '}
            <OuiCode>option</OuiCode> object to store metadata about the option
            for use in this callback.
          </p>

          <p>
            <strong>Note:</strong> virtualization (above) requires that each
            option have the same height. Ensure that you render the options so
            that wrapping text is truncated instead of causing the height of the
            option to change.
          </p>
        </Fragment>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: renderOptionSnippet,
      demo: <RenderOption />,
    },
    {
      title: 'Groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: groupsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: groupsHtml,
        },
      ],
      text: (
        <p>
          You can group options together. The groups <em>won&rsquo;t</em> match
          against the search value.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: groupsSnippet,
      demo: <Groups />,
    },
    {
      title: 'Single selection',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singleSelectionHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            To only allow the user to select a single option, provide the{' '}
            <OuiCode>singleSelection</OuiCode> prop. You may want to render the
            selected option as plain text instead of pill form. To do this, pass{' '}
            <OuiCode language="js">
              {'singleSelection={{ asPlainText: true }}'}
            </OuiCode>
          </p>
          <p>
            <strong>Note:</strong> <OuiCode>append</OuiCode> and{' '}
            <OuiCode>prepend</OuiCode> props only work if
            <OuiCode>singleSelection</OuiCode> prop is not set to{' '}
            <OuiCode>false</OuiCode> to avoid multilines that makes combobox
            height greater than that of <OuiCode>append</OuiCode> and{' '}
            <OuiCode>prepend</OuiCode>.
          </p>
        </Fragment>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: singleSelectionSnippet,
      demo: <SingleSelection />,
    },
    {
      title: 'Single selection with custom options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: singleSelectionCustomOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: singleSelectionCustomOptionsHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            You can allow the user to select a single option and also allow the
            creation of custom options. To do that, use the{' '}
            <OuiCode>singleSelection</OuiCode> in conjunction with the{' '}
            <OuiCode>onCreateOption</OuiCode> prop.
          </p>
          <p>
            <strong>Note:</strong> Creating custom options might not be obvious
            to the user, so provide help text explaining that this option is
            available. You can also customize the custom option text by passing
            a text to <OuiCode>customOptionText</OuiCode> prop.
          </p>
        </Fragment>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: singleSelectionCustomOptionsSnippet,
      demo: <SingleSelectionCustomOptions />,
    },
    {
      title: 'Disallowing custom options',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: disallowCustomOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: disallowCustomOptionsHtml,
        },
      ],
      text: (
        <p>
          Leave out the <OuiCode>onCreateOption</OuiCode> prop to disallow the
          creation of custom options.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: disallowCustomOptionsSnippet,
      demo: <DisallowCustomOptions />,
    },
    {
      title: 'Custom options only, with validation',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: customOptionsOnlySource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: customOptionsOnlyHtml,
        },
      ],
      text: (
        <p>
          Alternatively, provide the <OuiCode>noSuggestions</OuiCode> prop to
          hide the suggestions list and <em>only</em> allow the creation of
          custom options.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: customOptionsOnlySnippet,
      demo: <CustomOptionsOnly />,
    },
    {
      title: 'Async',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: asyncSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: asyncHtml,
        },
      ],
      text: (
        <p>
          Use the <OuiCode>onSearchChange</OuiCode> code to handle searches
          asynchronously. Use the
          <OuiCode>isLoading</OuiCode> prop to let the user know that something
          async is happening.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: asyncSnippet,
      demo: <Async />,
    },
    {
      title: 'With delimiter',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: delimiterSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: delimiterHtml,
        },
      ],
      text: (
        <p>
          Pass a unique character to the <OuiCode>delimiter</OuiCode> prop to
          aid in option creation. This is best used when knowing that content
          may be pasted from elsewhere such as a comma separated list.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: delimiterSnippet,
      demo: <Delimiter />,
    },
    {
      title: 'With icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: withIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: withIconHtml,
        },
      ],
      text: (
        <p>
          Pass an <OuiCode>IconType</OuiCode> string to show the icon in the
          combo box, or set it to <OuiCode>true</OuiCode> to show the search
          icon.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: withIconSnippet,
      demo: <WithIcon />,
    },
    {
      title: 'Sorting matches',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: startingWithSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: startingWithHtml,
        },
      ],
      text: (
        <p>
          By default, the matched options will keep their original sort order.
          If you would like to prioritize those options that{' '}
          <strong>start with</strong> the searched string, pass{' '}
          <OuiCode language="js">sortMatchesBy=&quot;startsWith&quot;</OuiCode>
          to display those options at the top of the list.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: startingWithSnippet,
      demo: <StartingWith />,
    },
    {
      title: 'Duplicate labels',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: duplicateOptionsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: duplicateOptionsHtml,
        },
      ],
      text: (
        <p>
          In general, it is not recommended to use duplicate labels on the
          options because the user has no way to distinguish between them. If
          you need duplicate labels, you will need to add a unique{' '}
          <OuiCode language="js">key</OuiCode> for each option.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      demo: <DuplicateOptions />,
      snippet: duplicateOptionsSnippet,
    },
    {
      title: 'Clear on blur',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: clearOnBlurSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: clearOnBlurSourceOptionsHtml,
        },
      ],
      text: (
        <p>
          Set the prop <OuiCode>clearOnBlur</OuiCode> to make the combo box
          input text clear when user focuses out of text box.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: clearOnBlurSnippet,
      demo: <ClearOnBlur />,
    },
    {
      title: 'Combox box default icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: comboBoxDefaultIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: comboBoxDefaultIconSourceOptionsHtml,
        },
      ],
      text: (
        <p>
          Set the prop <OuiCode>icon</OuiCode> to make the combo box input text
          appear with a default search icon.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: comboBoxDefaultIconSnippet,
      demo: <ComboBoxDefaultIcon />,
    },
    {
      title: 'Combox box custom icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: comboBoxCustomIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: comboBoxCustomIconSourceOptionsHtml,
        },
      ],
      text: (
        <p>
          Set the prop <OuiCode>icon</OuiCode> with a valid IconType to make the
          combo box input text appear with an given icon type.
        </p>
      ),
      props: { OuiComboBox, OuiComboBoxOptionOption },
      snippet: comboBoxCustomIconSnippet,
      demo: <ComboBoxCustomIcon />,
    },
  ],
};
