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

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { OuiCode, OuiSuperSelect } from '../../../../src/components';

import SuperSelectBasic from './super_select_basic';
const superSelectBasicSource = require('./super_select_basic?raw');
const superSelectBasicHtml = renderToHtml(SuperSelectBasic);
const superSelectBasicSnippet = `<OuiSuperSelect
  options={[
    {
      value: 'warning',
      inputDisplay: inputDisplay,
    },
  ]}
  valueOfSelected={value}
  onChange={onChange}
/>
`;

import SuperSelectComplex from './super_select_complex';
const superSelectComplexSource = require('./super_select_complex?raw');
const superSelectComplexHtml = renderToHtml(SuperSelectComplex);
const superSelectComplexSnippet = `<OuiSuperSelect
  options={[
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: dropdownDisplay,
    },
  ]}
  valueOfSelected={value}
  onChange={onChange}
  hasDividers
/>
`;

import SuperSelectStates from './super_select_states';
const superSelectStatesSource = require('./super_select_states?raw');
const superSelectStatesHtml = renderToHtml(SuperSelectStates);
const superSelectStatesSnippet = `<OuiSuperSelect
  options={[
    {
      value: 'option_one',
      inputDisplay: 'Option one',
    },
  ]}
  valueOfSelected={value}
  onChange={onChange}
  compressed={true}
  fullWidth={true}
  prepend={prepend}
  append={append}
/>
`;

export const SuperSelectExample = {
  title: 'Super select',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectBasicSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superSelectBasicHtml,
        },
      ],
      text: (
        <div>
          <p>
            This is a simple replacement component for{' '}
            <strong>OuiSelect</strong> if you need more customization in either
            the display of the input or option. Simply pass an array of option
            objects:
          </p>
          <ul>
            <li>
              <OuiCode>value</OuiCode>: for storing unique value of item,{' '}
            </li>
            <li>
              <OuiCode>inputDisplay</OuiCode>: what shows inside the form input
              when selected,{' '}
            </li>
            <li>
              <OuiCode>dropdownDisplay</OuiCode>: (optional) what shows for the
              item in the dropdown
            </li>
          </ul>
          <p>
            &hellip; and the component will create a select styled button that
            triggers a popover of selectable items.
          </p>
        </div>
      ),
      props: { OuiSuperSelect },
      snippet: superSelectBasicSnippet,
      demo: <SuperSelectBasic />,
    },
    {
      title: 'More complex',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superSelectComplexHtml,
        },
      ],
      text: (
        <p>
          Both <OuiCode>inputDisplay</OuiCode> and{' '}
          <OuiCode>dropdownDisplay</OuiCode> accept React nodes. Therefore you
          can pass some descriptions with each option to show in the dropdown.
          If your options will most likely be multi-line, add the{' '}
          <OuiCode>hasDividers</OuiCode> prop to show borders between options.
        </p>
      ),
      props: {},
      snippet: superSelectComplexSnippet,
      demo: <SuperSelectComplex />,
    },
    {
      title: 'States',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: superSelectStatesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: superSelectStatesHtml,
        },
      ],
      text: (
        <p>
          You can pass the same props as you normally would to{' '}
          <strong>OuiSelect</strong> like disabled, isLoading, compressed,
          etc&hellip;
        </p>
      ),
      props: { OuiSuperSelect },
      snippet: superSelectStatesSnippet,
      demo: <SuperSelectStates />,
    },
  ],
};
