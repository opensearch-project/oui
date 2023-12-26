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

import { OuiCode, OuiSplitButton } from '../../../../src/components';

import SplitButtonBasic from './split_button_basic';
import SplitButton from './split_button';
const splitButtonBasicSource = require('!!raw-loader!./split_button_basic');
const splitButtonBasicHtml = renderToHtml(SplitButtonBasic);
const splitButtonBasicSnippet = `<OuiSplitButton
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

// import SplitButtonComplex from './super_select_complex';
// const splitButtonComplexSource = require('!!raw-loader!./super_select_complex');
// const splitButtonComplexHtml = renderToHtml(SplitButtonComplex);
// const splitButtonComplexSnippet = `<OuiSplitButton
//   options={[
//     {
//       value: 'option_one',
//       inputDisplay: 'Option one',
//       dropdownDisplay: dropdownDisplay,
//     },
//   ]}
//   valueOfSelected={value}
//   onChange={onChange}
//   hasDividers
// />
// `;

// import SplitButtonStates from './super_select_states';
// const splitButtonStatesSource = require('!!raw-loader!./super_select_states');
// const splitButtonStatesHtml = renderToHtml(SplitButtonStates);
// const splitButtonStatesSnippet = `<OuiSplitButton
//   options={[
//     {
//       value: 'option_one',
//       inputDisplay: 'Option one',
//     },
//   ]}
//   valueOfSelected={value}
//   onChange={onChange}
//   compressed={true}
//   fullWidth={true}
//   prepend={prepend}
//   append={append}
// />
// `;

export const SplitButtonExample = {
  title: 'Split Button',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitButtonBasicSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: splitButtonBasicHtml,
        },
      ],
      text: (
        <div>
          <p>
            This is a replacement component for <strong>OuiButton</strong> if
            you need a Button with additional options or modes. Simply pass an
            array of option objects:
          </p>
          <ul>
            <li>
              <OuiCode>value</OuiCode>: for storing unique value of item,{' '}
            </li>
            <li>
              <OuiCode>display</OuiCode>: (optional) what shows for the item in
              the dropdown
            </li>
          </ul>
          <p>
            &hellip; and the component will create a select styled button that
            triggers a popover of selectable items.
          </p>
        </div>
      ),
      props: { OuiSplitButton },
      snippet: splitButtonBasicSnippet,
      demo: <SplitButton />,
    },
    // {
    //   title: 'More complex',
    //   source: [
    //     {
    //       type: GuideSectionTypes.JS,
    //       code: splitButtonComplexSource,
    //     },
    //     {
    //       type: GuideSectionTypes.HTML,
    //       code: splitButtonComplexHtml,
    //     },
    //   ],
    //   text: (
    //     <p>
    //       Both <OuiCode>inputDisplay</OuiCode> and{' '}
    //       <OuiCode>dropdownDisplay</OuiCode> accept React nodes. Therefore you
    //       can pass some descriptions with each option to show in the dropdown.
    //       If your options will most likely be multi-line, add the{' '}
    //       <OuiCode>hasDividers</OuiCode> prop to show borders between options.
    //     </p>
    //   ),
    //   props: {},
    //   snippet: splitButtonComplexSnippet,
    //   demo: <SplitButtonComplex />,
    // },
    // {
    //   title: 'States',
    //   source: [
    //     {
    //       type: GuideSectionTypes.JS,
    //       code: splitButtonStatesSource,
    //     },
    //     {
    //       type: GuideSectionTypes.HTML,
    //       code: splitButtonStatesHtml,
    //     },
    //   ],
    //   text: (
    //     <p>
    //       You can pass the same props as you normally would to{' '}
    //       <strong>OuiSelect</strong> like disabled, isLoading, compressed,
    //       etc&hellip;
    //     </p>
    //   ),
    //   props: { OuiSplitButton },
    //   snippet: splitButtonStatesSnippet,
    //   demo: <SplitButtonStates />,
    // },
  ],
};
