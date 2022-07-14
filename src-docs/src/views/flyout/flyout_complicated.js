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
        Far out in the uncharted backwaters of the unfashionable end of the
        western spiral arm of the Galaxy lies a small unregarded yellow sun.
      </p>

      <p>
        Orbiting this at a distance of roughly ninety-two million miles is an
        utterly insignificant little blue green planet whose ape- descended life
        forms are so amazingly primitive that they still think digital watches
        are a pretty neat idea.
      </p>

      <ul>
        <li>List item one</li>
        <li>List item two</li>
        <li>Dolphins</li>
      </ul>

      <p>
        This planet has - or rather had - a problem, which was this: most of the
        people living on it were unhappy for pretty much of the time. Many
        solutions were suggested for this problem, but most of these were
        largely concerned with the movements of small green pieces of paper,
        which is odd because on the whole it was not the small green pieces of
        paper that were unhappy.
      </p>

      <h2>This is Heading Two</h2>

      <ol>
        <li>Number one</li>
        <li>Number two</li>
        <li>Dolphins again</li>
      </ol>

      <p>
        But the dog wasn&rsquo;t lazy, it was just practicing mindfulness, so it
        had a greater sense of life-satisfaction than that fox with all its
        silly jumping.
      </p>

      <p>
        And from the fox&rsquo;s perspective, life was full of hoops to jump{' '}
        <em>through</em>, low-hanging fruit to jump <em>for</em>, and dead car
        batteries to jump-<em>start</em>.
      </p>

      <h3>This is Heading Three</h3>

      <p>
        So it thought the dog was making a poor life choice by focusing so much
        on mindfulness. What if its car broke down?
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
