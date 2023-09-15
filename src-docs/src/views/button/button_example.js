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
  OuiButton,
  OuiButtonEmpty,
  OuiButtonIcon,
  OuiCode,
  OuiButtonGroup,
  OuiCallOut,
  OuiTitle,
} from '../../../../src/components';

import { OuiButtonGroupOptionProps } from '!!prop-loader!../../../../src/components/button/button_group/button_group';

import Guidelines from './guidelines';
import Playground from './playground';

import Button from './button';
const buttonSource = require('./button?raw');
const buttonHtml = renderToHtml(Button);
const buttonSnippet = [
  `<OuiButton><!-- Primary button --></OuiButton>
`,
  `<OuiButton fill><!-- Filled button --></OuiButton>
`,
  `<OuiButton size="s"><!-- Small button --></OuiButton>
`,
  `<OuiButton size="s" fill><!-- Small and filled button --></OuiButton>
`,
];

import ButtonWithIcon from './button_with_icon';
const buttonWithIconSource = require('./button_with_icon?raw');
const buttonWithIconHtml = renderToHtml(Button);
const buttonWithIconSnippet = `<OuiButton iconType={icon}><!-- Button text --></OuiButton>
`;

import ButtonOption from './button_empty';
const buttonOptionSource = require('./button_empty?raw');
const buttonOptionHtml = renderToHtml(ButtonOption);
const buttonOptionSnippet = `<OuiButtonEmpty>
  <!-- Button text -->
</OuiButtonEmpty>`;

import ButtonOptionFlush from './button_empty_flush';
const buttonOptionFlushSource = require('./button_empty_flush?raw');
const buttonOptionFlushHtml = renderToHtml(ButtonOptionFlush);
const buttonOptionFlushSnippet = `<OuiButtonEmpty flush="left"><!-- Button text --></OuiButtonEmpty>
`;

import ButtonIcon from './button_icon';
const buttonIconSource = require('./button_icon?raw');
const buttonIconHtml = renderToHtml(ButtonIcon);
const buttonIconSnippet = [
  `<OuiButtonIcon
  iconType={icon}
/>`,
  `<OuiButtonIcon
  display="fill"
  iconType={icon}
/>`,
  `<OuiButtonIcon
  display="base"
  size="s"
  iconType={icon}
/>`,
];

import ButtonGhost from './button_ghost';
const buttonGhostSource = require('./button_ghost?raw');
const buttonGhostHtml = renderToHtml(ButtonGhost);
const buttonGhostSnippet = `<OuiButton color="ghost">
  <!-- Button text -->
</OuiButton>`;

import ButtonAsLink from './button_as_link';
const buttonAsLinkSource = require('./button_as_link?raw');
const buttonAsLinkHtml = renderToHtml(ButtonAsLink);
const buttonAsLinkSnippet = `<OuiButton href={someUrl}><!-- Button text --></OuiButton>
`;

import ButtonLoading from './button_loading';
const buttonLoadingSource = require('./button_loading?raw');
const buttonLoadingHtml = renderToHtml(ButtonLoading);
const buttonLoadingSnippet = `<OuiButton isLoading={true}>
  <!-- Button text -->
</OuiButton>`;

import ButtonToggle from './button_toggle';
const buttonToggleSource = require('./button_toggle?raw');
const buttonToggleHtml = renderToHtml(ButtonToggle);
const buttonToggleSnippet = [
  `<OuiButton
  iconType={toggleOn ? onIcon : offIcon}
  onClick={onToggleChange}
>
  {toggleOn ? onLabel : offLabel}
</OuiButton>
`,
  `<OuiButton
  isSelected={toggleOn}
  fill={toggleOn}
  onClick={onToggleChange}
  >
  <!-- Button text -->
</OuiButton>`,
  `<OuiButton
  aria-pressed={toggleOn}
  fill={toggleOn}
  onClick={onToggleChange}
>
  <!-- Button text -->
</OuiButton>`,
];

import ButtonGroup from './button_group';
const buttonGroupSource = require('./button_group?raw');
const buttonGroupHtml = renderToHtml(ButtonGroup);

import ButtonGroupIcons from './button_group_icon';
const buttonGroupIconsSource = require('./button_group_icon?raw');
const buttonGroupIconsHtml = renderToHtml(ButtonGroupIcons);

import ButtonGroupCompressed from './button_group_compressed';
const buttonGroupCompressedSource = require('./button_group_compressed?raw');
const buttonGroupCompressedHtml = renderToHtml(ButtonGroupCompressed);
const buttonGroupSnippet = [
  `<OuiButtonGroup
  type="single"
  legend={legend}
  name={name}
  options={[
    {
      id,
      label'
    }
  ]}
  idSelected={idSelected}
  onChange={(optionId) => {}}
/>`,
];
const buttonGroupIconsSnippet = [
  `<OuiButtonGroup
  type="multi"
  isIconOnly
  legend={legend}
  options={[
    {
      id,
      label,
      iconType,
    }
  ]}
  idToSelectedMap={{ optionId: true }}
  onChange={(optionId, optionValue) => {}}
/>`,
];

export const ButtonExample = {
  title: 'Button',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiButton</strong> comes in two styles. The{' '}
          <OuiCode>fill</OuiCode> style should be reserved for the main action
          and limited in number for a single page. Be sure to read the full{' '}
          <Link to="/guidelines/button">button usage guidelines</Link>.
        </p>
      ),
      props: { OuiButton },
      snippet: buttonSnippet,
      demo: <Button />,
      playground: Playground,
    },
    {
      title: 'Buttons can also be links',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonAsLinkSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonAsLinkHtml,
        },
      ],
      text: (
        <p>
          Buttons will use an <OuiCode>{'<a>'}</OuiCode> tag if there is a{' '}
          <OuiCode>href</OuiCode> prop present.
        </p>
      ),
      snippet: buttonAsLinkSnippet,
      demo: <ButtonAsLink />,
    },
    {
      title: 'Button with icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonWithIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonWithIconHtml,
        },
      ],
      text: (
        <p>
          The passed <OuiCode>iconType</OuiCode> must be an acceptable{' '}
          <Link to="/display/icons">
            <strong>OuiIcon</strong>
          </Link>{' '}
          type. It can be flipped{' '}
          {
            // eslint-disable-next-line react/no-unescaped-entities
          }{' '}
          to the opposite side by passing{' '}
          <OuiCode language="js">iconSide=&quot;right&quot;</OuiCode>.
        </p>
      ),
      snippet: buttonWithIconSnippet,
      demo: <ButtonWithIcon />,
    },
    {
      title: 'Loading state',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonLoadingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonLoadingHtml,
        },
      ],
      text: (
        <p>
          Setting the <OuiCode>isLoading</OuiCode> prop to true will add the
          loading spinner or swap the existing icon for the loading spinner and
          set the button to disabled. It is good practice to also rename the
          button to &quot;Loading&hellip;&quot;.
        </p>
      ),
      snippet: buttonLoadingSnippet,
      demo: <ButtonLoading />,
    },
    {
      title: 'Empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonOptionHtml,
        },
      ],
      text: (
        <p>
          <strong>OuiButtonEmpty</strong> is used when you want to make a button
          look like a regular link, but still want to align it to the rest of
          the buttons.
        </p>
      ),
      props: { OuiButtonEmpty },
      snippet: buttonOptionSnippet,
      demo: <ButtonOption />,
    },
    {
      title: 'Flush empty button',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonOptionFlushSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonOptionFlushHtml,
        },
      ],
      text: (
        <p>
          When aligning <strong>OuiButtonEmpty</strong> components to the left
          or the right, you should make sure they&rsquo;re flush with the edge
          of their container, so that they&rsquo;re horizontally aligned with
          the other content in the container.
        </p>
      ),
      props: { OuiButtonEmpty },
      snippet: buttonOptionFlushSnippet,
      demo: <ButtonOptionFlush />,
    },
    {
      title: 'Button icon',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonIconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonIconHtml,
        },
      ],
      text: (
        <>
          <p>
            An <strong>OuiButtonIcon</strong> is a button that only contains an
            icon (no text). Use the <OuiCode>display</OuiCode> and{' '}
            <OuiCode>size</OuiCode> props to match the appearance of your{' '}
            <strong>OuiButtonIcon</strong> to other standard buttons. By default
            they will appear as <OuiCode>xs</OuiCode>, <OuiCode>empty</OuiCode>{' '}
            buttons.
          </p>
          <OuiCallOut
            size="s"
            color="warning"
            iconType="accessibility"
            title={
              <>
                <strong>OuiButtonIcon</strong> requires an{' '}
                <OuiCode>aria-label</OuiCode> to express the meaning to screen
                readers.
              </>
            }
          />
        </>
      ),
      props: { OuiButtonIcon },
      snippet: buttonIconSnippet,
      demo: <ButtonIcon />,
    },
    {
      title: 'Toggle buttons',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonToggleSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonToggleHtml,
        },
      ],
      text: (
        <>
          <p>
            You can create a toggle style button with any button type like the
            standard <strong>OuiButton</strong>, <strong>OuiButtonEmpty</strong>
            , or <strong>OuiButtonIcon</strong>. Use state management to handle
            the visual differences for on and off. Though there are two{' '}
            <strong>exclusive</strong> situations to consider.
          </p>
          <ol>
            <li>
              If your button changes its readable <strong>text</strong>, via
              children or <OuiCode>aria-label</OuiCode>, then there is no
              additional accessibility concern.
            </li>
            <li>
              If your button only changes the <strong>visual</strong>{' '}
              appearance, you must add <OuiCode>aria-pressed</OuiCode> passing a
              boolean for the on and off states. All OUI button types provide a
              helper prop for this called <OuiCode>isSelected</OuiCode>.
            </li>
          </ol>
          <OuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                Do not add <OuiCode>aria-pressed</OuiCode> or{' '}
                <OuiCode>isSelected</OuiCode> if you also change the readable
                text.
              </span>
            }
          />
        </>
      ),
      demo: <ButtonToggle />,
      snippet: buttonToggleSnippet,
      props: { OuiButton, OuiButtonIcon },
    },
    {
      title: 'Button groups',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupHtml,
        },
      ],
      text: (
        <div>
          <p>
            <strong>OuiButtonGroups</strong> utilize the{' '}
            <OuiCode language="js">type=&quot;single&quot;</OuiCode> or{' '}
            <OuiCode language="js">&quot;multi&quot;</OuiCode> prop to determine
            whether multiple or only single selections are allowed per group. If
            you&apos;re just displaying a group of icons, add the prop{' '}
            <OuiCode>isIconOnly</OuiCode>.
          </p>
          <OuiCallOut
            iconType="accessibility"
            color="warning"
            title={
              <span>
                In order for groups to be properly read as groups with a title,
                the <OuiCode>legend</OuiCode> prop is <strong>required</strong>.
                This is only for accessibility, however, so it will be visibly
                hidden.
              </span>
            }
          />
        </div>
      ),
      demo: <ButtonGroup />,
      snippet: buttonGroupSnippet,
      props: { OuiButtonGroup, OuiButtonGroupOptionProps },
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupIconsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupIconsHtml,
        },
      ],
      wrapText: false,
      text: (
        <OuiTitle size="xs">
          <h3>Icons only</h3>
        </OuiTitle>
      ),
      demo: <ButtonGroupIcons />,
      snippet: buttonGroupIconsSnippet,
    },
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGroupCompressedSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGroupCompressedHtml,
        },
      ],
      demo: <ButtonGroupCompressed />,
    },
    {
      title: 'Ghost',
      ghostBackground: true,
      source: [
        {
          type: GuideSectionTypes.JS,
          code: buttonGhostSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: buttonGhostHtml,
        },
      ],
      text: (
        <p>
          For buttons on dark color backgrounds, you can pass{' '}
          <OuiCode language="js">{'color="ghost"'}</OuiCode> to any of the
          button styles on this page. These should be used extremely rarely, and
          are only for placing buttons on top of dark or image-based
          backgrounds. A good example of their use is in the{' '}
          <Link to="/layout/bottom-bar">
            <strong>OuiBottomBar</strong>
          </Link>{' '}
          component.
        </p>
      ),
      snippet: buttonGhostSnippet,
      demo: <ButtonGhost />,
    },
  ],
  guidelines: <Guidelines />,
};
