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

import React, { useState, Fragment } from 'react';

import {
  OuiButton,
  OuiButtonEmpty,
  OuiCodeBlock,
  OuiComboBox,
  OuiExpression,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFlyout,
  OuiFlyoutBody,
  OuiFlyoutFooter,
  OuiFlyoutHeader,
  OuiForm,
  OuiFormRow,
  OuiPopover,
  OuiSpacer,
  OuiTab,
  OuiTabs,
  OuiText,
  OuiTitle,
  OuiSuperSelect,
} from '../../../../src/components';

export default () => {
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [selectedTabId, setSelectedTabId] = useState('1');
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [superSelectvalue, setSuperSelectValue] = useState('option_one');
  const [isExpressionOpen, setIsExpressionOpen] = useState(false);

  const tabs = [
    {
      id: '1',
      name: 'Tab 1',
    },
    {
      id: '2',
      name: 'Tab 2',
    },
  ];

  const closeFlyout = () => setIsFlyoutVisible(false);

  const showFlyout = () => setIsFlyoutVisible(true);

  const closePopover = () => setIsPopoverOpen(false);

  const togglePopover = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);

  const onSelectedTabChanged = (id) => setSelectedTabId(id);

  const renderTabs = tabs.map((tab, index) => (
    <OuiTab
      onClick={() => onSelectedTabChanged(tab.id)}
      isSelected={tab.id === selectedTabId}
      key={index}>
      {tab.name}
    </OuiTab>
  ));

  const superSelectOptions = [
    {
      value: 'option_one',
      inputDisplay: 'Option one',
      dropdownDisplay: (
        <Fragment>
          <strong>Option one</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_two',
      inputDisplay: 'Option two',
      dropdownDisplay: (
        <Fragment>
          <strong>Option two</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
    {
      value: 'option_three',
      inputDisplay: 'Option three',
      dropdownDisplay: (
        <Fragment>
          <strong>Option three</strong>
          <OuiText size="s" color="subdued">
            <p className="ouiTextColor--subdued">
              Has a short description giving more detail to the option.
            </p>
          </OuiText>
        </Fragment>
      ),
    },
  ];

  const onSuperSelectChange = (value) => {
    setSuperSelectValue(value);
  };

  const flyoutContent = (
    <OuiText>
      <p>
        Nulla dolor veniam magna minim sint incididunt esse Lorem aliqua. Lorem
        aliqua et exercitation sint exercitation excepteur esse. Excepteur anim
        velit officia ea cillum reprehenderit laborum tempor deserunt. Aliquip
        aliqua enim eiusmod tempor officia dolore fugiat irure occaecat labore
        exercitation laboris. Labore ad et non velit amet elit. Quis aute anim
        sit adipisicing est ullamco et proident officia.
      </p>

      <p>
        Eiusmod adipisicing veniam ipsum in proident ea ullamco nisi magna
        labore laboris adipisicing. Cupidatat Lorem reprehenderit cillum eiusmod
        aliquip dolore fugiat quis qui quis. Velit Lorem exercitation elit ut
        irure eiusmod aliqua ullamco Lorem incididunt anim sint do enim.
      </p>

      <ul>
        <li>List item one</li>
        <li>List item two</li>
        <li>Dolphins</li>
      </ul>

      <p>
        Ut nulla non minim dolore cillum duis. Eu nostrud incididunt tempor
        officia incididunt adipisicing cupidatat dolor nisi culpa nisi labore
        nulla. Pariatur deserunt pariatur nostrud eiusmod quis sint voluptate
        sunt excepteur tempor aliqua nostrud anim qui. Nisi elit do adipisicing
        laboris. Deserunt cillum velit ut pariatur incididunt sit fugiat ad
        irure et. Quis proident quis esse adipisicing laboris in ea esse ea
        deserunt minim ea excepteur.
      </p>

      <h2>This is Heading Two</h2>

      <ol>
        <li>Number one</li>
        <li>Number two</li>
        <li>Dolphins again</li>
      </ol>

      <p>
        Et aute consectetur nisi ex et mollit eiusmod ipsum dolore ex culpa
        dolore in. Officia magna tempor ullamco quis amet amet. Elit et ex
        veniam aliquip mollit excepteur do do aliqua dolor. Laborum sit est enim
        magna amet.
      </p>

      <p>
        Ut sit voluptate sit sit anim deserunt amet non velit veniam. Nulla sunt
        Lorem aute nisi id sit. Reprehenderit Lorem elit nostrud reprehenderit
        id sit ad ex. Nisi aliqua eiusmod eiusmod elit non. <em>through</em>
      </p>

      <h3>This is Heading Three</h3>

      <p>
        Excepteur esse velit irure tempor. Aliqua pariatur aliqua laborum minim
        sunt. Duis adipisicing tempor ut fugiat proident veniam Lorem commodo ea
        non dolor magna.
      </p>
    </OuiText>
  );

  const htmlCode = `<!--I'm an example of HTML-->
<div>
  asdf
</div>
`;

  let flyout;

  if (isFlyoutVisible) {
    flyout = (
      <OuiFlyout
        ownFocus
        onClose={closeFlyout}
        hideCloseButton
        aria-labelledby="flyoutComplicatedTitle">
        <OuiFlyoutHeader hasBorder>
          <OuiTitle size="m">
            <h2 id="flyoutComplicatedTitle">Flyout header</h2>
          </OuiTitle>
          <OuiSpacer size="s" />
          <OuiText color="subdued">
            <p>
              Put navigation items in the header, and cross tab actions in a
              footer.
            </p>
          </OuiText>
          <OuiTabs style={{ marginBottom: '-25px' }}>{renderTabs}</OuiTabs>
        </OuiFlyoutHeader>
        <OuiFlyoutBody>
          <OuiPopover
            closePopover={closePopover}
            button={
              <OuiButton onClick={togglePopover}>
                Even popovers can be included
              </OuiButton>
            }
            isOpen={isPopoverOpen}>
            <p>
              This is the popover content, notice how it can overflow the
              flyout!
            </p>
          </OuiPopover>
          <OuiSpacer size="m" />
          <OuiForm component="form">
            <OuiFormRow label="A SuperSelect field">
              <OuiSuperSelect
                options={superSelectOptions}
                valueOfSelected={superSelectvalue}
                onChange={(value) => onSuperSelectChange(value)}
                itemLayoutAlign="top"
                hasDividers
              />
            </OuiFormRow>
          </OuiForm>
          <OuiSpacer />
          <OuiPopover
            isOpen={isExpressionOpen}
            closePopover={() => setIsExpressionOpen(false)}
            button={
              <OuiExpression
                description="expression"
                value="configurations"
                onClick={() => setIsExpressionOpen(!isExpressionOpen)}
              />
            }>
            <OuiComboBox
              selectedOptions={[{ label: 'Option one' }]}
              options={[
                { label: 'Option one' },
                { label: 'Option two' },
                { label: 'Option three' },
              ]}
            />
          </OuiPopover>
          <OuiSpacer />
          {flyoutContent}
          <OuiCodeBlock language="html">{htmlCode}</OuiCodeBlock>
        </OuiFlyoutBody>
        <OuiFlyoutFooter>
          <OuiFlexGroup justifyContent="spaceBetween">
            <OuiFlexItem grow={false}>
              <OuiButtonEmpty
                iconType="cross"
                onClick={closeFlyout}
                flush="left">
                Close
              </OuiButtonEmpty>
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButton onClick={closeFlyout} fill>
                Save
              </OuiButton>
            </OuiFlexItem>
          </OuiFlexGroup>
        </OuiFlyoutFooter>
      </OuiFlyout>
    );
  }

  return (
    <div>
      <OuiButton onClick={showFlyout}>Show flyout</OuiButton>

      {flyout}
    </div>
  );
};
