/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
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
      display: 'Option 1',
      href: '#"
    },
    {
      display: 'Option2',
      onClick: () => console.log('Option 2 clicked')
    },
  ]}
  onClick={() => console.log("Primary clicked")}
>Basic Split Button</OuiSplitButton>
`;

import SplitButtonComplex from './split_button_complex';
const splitButtonComplexSource = require('!!raw-loader!./split_button_complex');
const splitButtonComplexHtml = renderToHtml(SplitButtonComplex);
const splitButtonComplexSnippet = `<OuiSplitButton
  options={[
    {
      display: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText isDisabled size="s" color="subdued">
            Has a short description giving more detail to the option.
          </OuiText>
        </Fragment>
      ),
      onClick: () => console.log('Option one clicked'),
    },
    {
      display: (
        <Fragment>
          <strong>Option two</strong>
          <OuiText size="s" color="subdued">
            Has a short description giving more detail to the option.
          </OuiText>
        </Fragment>
      ),
      onClick: () => console.log('Option 2 clicked'),
    },
    {
      display: 'Just some Text',
      onClick: () => console.log('Option 3 Clicked'),
    },
  ]},
  hasDividers
  selectedIndex={1}
>
  Complex Selections
</OuiSplitButton>
`;

import SplitButtonStates from './split_button_states';
const splitButtonStatesSource = require('!!raw-loader!./split_button_states');
const splitButtonStatesHtml = renderToHtml(SplitButtonStates);
const splitButtonStatesSnippet = `<OuiSplitButton
  options={[{ display: 'Option one' }]}
  fill
  size="s"
/>
`;

import SplitButtonChangeDemo from './split_button_change_demo';
const splitButtonChangeDemoSource = require('!!raw-loader!./split_button_change_demo');
const splitButtonChangeDemoHtml = renderToHtml(SplitButtonChangeDemo);
const splitButtonChangeDemoSnippet = `export default () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const options = [
    {
      display: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText disabled size="s" color="subdued">
            Has a short description giving more detail to the option.
          </OuiText>
        </Fragment>
      ),
      button: 'Option one',
      onClick: () => setSelectedIndex(0),
      onButtonClick: () => console.log('Option one clicked'),
    },
    {
      display: (
        <Fragment>
          <strong>Option two</strong>
          <OuiText size="s" color="subdued">
            Has a short description giving more detail to the option.
          </OuiText>
        </Fragment>
      ),
      button: 'Option two',
      onClick: () => setSelectedIndex(1),
      onButtonClick: () => console.log('Option two clicked'),
    },
    {
      display: 'Just some Text',
      button: 'Option three',
      onClick: () => setSelectedIndex(2),
      onButtonClick: () => console.log('Option three clicked'),
    },
  ];

  return (
    <OuiSplitButton
      options={options}
      selectedIndex={selectedIndex}
      onClick={options[selectedIndex].onButtonClick}
      hasDividers>
      {options[selectedIndex].button}
    </OuiSplitButton>
  );
};
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
              <OuiCode>display</OuiCode>: string or ReactNode - what shows for
              the item in the dropdown
            </li>
            <li>
              <OuiCode>onClick</OuiCode>: (optional) handler to call when this
              item is clicked
            </li>
            <li>
              <OuiCode>href</OuiCode>: (optional) URL to follow when this item
              is clicked
            </li>
            <li>
              <OuiCode>target</OuiCode>: (optional) along with href, browser
              target to apply to link
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
    {
      title: 'More complex',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitButtonComplexSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: splitButtonComplexHtml,
        },
      ],
      text: (
        <p>
          <OuiCode>options</OuiCode> accept React nodes. Therefore you can pass
          some descriptions with each option to show in the dropdown. If your
          options will most likely be multi-line, add the{' '}
          <OuiCode>hasDividers</OuiCode> prop to show borders between options.
        </p>
      ),
      props: {},
      snippet: splitButtonComplexSnippet,
      demo: <SplitButtonComplex />,
    },
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
          <strong>OuiButton</strong> like fill, size, etc&hellip;
        </p>
      ),
      props: { OuiSplitButton },
      snippet: splitButtonStatesSnippet,
      demo: <SplitButtonStates />,
    },
    {
      title: 'Change Primary Button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: splitButtonChangeDemoSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: splitButtonChangeDemoHtml,
        },
      ],
      text: (
        <p>
          A special interaction between option-items and the Primary button can
          be achieved through use of the `selectedIndex` and option-item&rsquo;s
          `onClick`. In this way, the user &ldquo;selects&rdquo; the primary
          action from the options, then clicks the Primary button to execute
          that action.
        </p>
      ),
      props: { OuiSplitButton },
      snippet: splitButtonChangeDemoSnippet,
      demo: <SplitButtonChangeDemo />,
    },
  ],
};
