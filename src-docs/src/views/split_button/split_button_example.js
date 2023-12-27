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

import SplitButtonStates from './split_button_states';
const splitButtonStatesSource = require('!!raw-loader!./split_button_states');
const splitButtonStatesHtml = renderToHtml(SplitButtonStates);
const splitButtonStatesSnippet = `<OuiSplitButton
  options={[
     'Option one',
  ]}
  onChange={onChange}
  fullWidth={true}
/>
`;

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
            array of options:
          </p>
          <ul>
            <li>
              <OuiCode>string</OuiCode> or <OuiCode>React component</OuiCode>
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
      demo: <SplitButtonBasic />,
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
    {
      title: 'States',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitButtonStatesSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: splitButtonStatesHtml,
        },
      ],
      text: (
        <p>
          You can pass the same props as you normally would to{' '}
          <strong>OuiButton</strong> like filled, small, etc&hellip;
        </p>
      ),
      props: { OuiSplitButton },
      snippet: splitButtonStatesSnippet,
      demo: <SplitButtonStates />,
    },
  ],
};
