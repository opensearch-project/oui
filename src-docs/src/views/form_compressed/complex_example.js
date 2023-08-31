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

import React, { useState } from 'react';

import {
  OuiButtonGroup,
  OuiButtonIcon,
  OuiColorPicker,
  OuiColorPickerSwatch,
  OuiDualRange,
  OuiFieldNumber,
  OuiFieldText,
  OuiFlexGroup,
  OuiFlexItem,
  OuiFormLabel,
  OuiFormRow,
  OuiHorizontalRule,
  OuiIcon,
  OuiPanel,
  OuiRange,
  OuiScreenReaderOnly,
  OuiSelect,
  OuiSpacer,
  OuiSuperSelect,
  OuiToolTip,
} from '../../../../src/components';
import { htmlIdGenerator } from '../../../../src/services';

export default () => {
  const idPrefix = htmlIdGenerator()();
  const idPrefix1 = htmlIdGenerator()();

  const typeStyleToggleButtons = [
    {
      id: `${idPrefix1}3`,
      label: 'Bold',
      name: 'bold',
      iconType: 'editorBold',
    },
    {
      id: `${idPrefix1}4`,
      label: 'Italic',
      name: 'italic',
      iconType: 'editorItalic',
    },
    {
      id: `${idPrefix1}5`,
      label: 'Underline',
      name: 'underline',
      iconType: 'editorUnderline',
    },
    {
      id: `${idPrefix1}6`,
      label: 'Strikethrough',
      name: 'strikethrough',
      iconType: 'editorStrike',
    },
  ];

  const granularityToggleButtons = [
    {
      id: `${idPrefix}3`,
      label: 'fine',
    },
    {
      id: `${idPrefix}4`,
      label: 'rough',
    },
    {
      id: `${idPrefix}5`,
      label: 'coarse',
    },
  ];

  const selectTooltipContent =
    'Otherwise use an OuiToolTip around the label of the form row.';

  const [opacityValue, setOpacityValue] = useState('20');
  const [color, setColor] = useState('#D36086');
  const [popoverSliderValues, setPopoverSliderValues] = useState(16);
  const [dualValue, setDualValue] = useState([5, 10]);
  const [
    typeStyleToggleButtonsIdToSelectedMap,
    setTypeStyleToggleButtonsIdToSelectedMap,
  ] = useState({});
  const [
    granularityToggleButtonsIdSelected,
    setGranularityToggleButtonsIdSelected,
  ] = useState(`${idPrefix}4`);

  const onPopoverSliderValueChange = (e) => {
    setPopoverSliderValues(e.target.value);
  };

  const onColorChange = (value) => {
    setColor(value);
  };

  const onRangeChange = (e) => {
    setOpacityValue(e.target.value);
  };

  const onDualChange = (value) => {
    setDualValue(value);
  };

  const onTypeStyleChange = (optionId) => {
    const newTypeStyleToggleButtonsIdToSelectedMap = {
      ...typeStyleToggleButtonsIdToSelectedMap,
      ...{
        [optionId]: !typeStyleToggleButtonsIdToSelectedMap[optionId],
      },
    };

    setTypeStyleToggleButtonsIdToSelectedMap(
      newTypeStyleToggleButtonsIdToSelectedMap
    );
  };

  const onGranularityChange = (optionId) => {
    setGranularityToggleButtonsIdSelected(optionId);
  };

  return (
    <OuiPanel style={{ maxWidth: 432 }}>
      <OuiFormRow label="Name" display="columnCompressed">
        <OuiFieldText prepend="Label" placeholder="Input" compressed />
      </OuiFormRow>

      <OuiFormRow label="Visibility" display="columnCompressed">
        <OuiDualRange
          value={dualValue}
          onChange={onDualChange}
          min={0}
          max={26}
          compressed
          showInput="inputWithPopover"
          showLabels
          aria-label="OuiDualRange within compressed form"
          prepend="Zoom levels"
        />
      </OuiFormRow>

      <OuiFormRow label="Opacity" display="columnCompressed">
        <OuiRange
          min={0}
          max={100}
          name="range"
          id="range"
          showInput
          compressed
          value={opacityValue}
          onChange={onRangeChange}
          append="%"
        />
      </OuiFormRow>

      <OuiSpacer size="s" />

      <OuiScreenReaderOnly>
        <span id="docsExampleSelectTooltipContent">{selectTooltipContent}</span>
      </OuiScreenReaderOnly>
      <OuiFormRow
        label={
          <OuiToolTip content={selectTooltipContent}>
            <span>
              Label <OuiIcon type="questionInCircle" color="subdued" />
            </span>
          </OuiToolTip>
        }
        display="columnCompressed">
        <OuiSelect
          options={[
            { value: 'option_one', text: 'Option one' },
            { value: 'option_two', text: 'Option two' },
            { value: 'option_three', text: 'Option three' },
          ]}
          compressed
          aria-describedby="docsExampleSelectTooltipContent"
        />
      </OuiFormRow>

      <OuiFormRow label="Granularity" display="columnCompressed">
        <OuiButtonGroup
          legend="Granulariy of zoom levels"
          options={granularityToggleButtons}
          idSelected={granularityToggleButtonsIdSelected}
          onChange={onGranularityChange}
          buttonSize="compressed"
          isFullWidth
        />
      </OuiFormRow>

      <OuiFormRow label="Fill" display="columnCompressed">
        <OuiColorPicker onChange={onColorChange} color={color} compressed />
      </OuiFormRow>

      <OuiFormRow label="Select one" display="columnCompressed">
        <OuiSuperSelect
          options={[
            { value: 'option_one', inputDisplay: 'Option one' },
            { value: 'option_two', inputDisplay: 'Option two' },
            { value: 'option_three', inputDisplay: 'Option three' },
          ]}
          compressed
        />
      </OuiFormRow>

      <OuiFormRow label="With button" display="columnCompressed">
        <OuiFieldNumber
          min={1}
          max={100}
          defaultValue={10}
          compressed
          prepend={[
            <OuiButtonIcon
              iconType="magnet"
              aria-label="Dynamic toggle"
              title="Make dynamic"
            />,
            'opensearch_dashboards_sample_ecommerce_data',
          ]}
          append="px"
        />
      </OuiFormRow>

      <OuiHorizontalRule />

      <OuiFormRow label="Container" display="columnCompressed">
        <OuiFlexGroup gutterSize="s" responsive={false} wrap>
          <OuiFlexItem grow={false}>
            <OuiColorPicker
              onChange={onColorChange}
              color={color}
              button={
                <OuiColorPickerSwatch
                  color={color}
                  aria-label="Container color"
                  title="Container color"
                  style={{ width: 32, height: 32 }}
                />
              }
            />
          </OuiFlexItem>
          <OuiFlexItem>
            <OuiRange
              showInput="inputWithPopover"
              min={0}
              max={240}
              value={popoverSliderValues}
              onChange={onPopoverSliderValueChange}
              compressed
              append="px"
              prepend="Padding"
              aria-label="Container padding in pixels"
            />
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiFormRow>

      <OuiSpacer size="s" />

      <OuiFormRow label="Label" display="columnCompressed">
        <div>
          <OuiSelect
            id="docsExampleLabelFont"
            options={[
              { value: 'inter', text: 'Inter UI' },
              { value: 'roboto', text: 'Roboto' },
              { value: 'comic', text: 'Comic sans' },
            ]}
            compressed
            prepend="Font"
            aria-label="Label font family"
          />
          <OuiSpacer size="xs" />
          <OuiFlexGroup
            gutterSize="s"
            responsive={false}
            wrap
            justifyContent="flexEnd">
            <OuiFlexItem>
              <OuiRange
                showInput="inputWithPopover"
                min={7}
                max={140}
                value={popoverSliderValues}
                onChange={onPopoverSliderValueChange}
                compressed
                append="px"
                aria-label="Label font size in pixels"
              />
            </OuiFlexItem>
            <OuiFlexItem grow={false}>
              <OuiButtonGroup
                legend="Label text style"
                className="oui-displayInlineBlock"
                options={typeStyleToggleButtons}
                idToSelectedMap={typeStyleToggleButtonsIdToSelectedMap}
                onChange={onTypeStyleChange}
                type="multi"
                isIconOnly
                buttonSize="compressed"
              />
            </OuiFlexItem>
          </OuiFlexGroup>
        </div>
      </OuiFormRow>

      <OuiSpacer size="s" />

      <OuiFormLabel htmlFor="docsExampleBorderSize">Border</OuiFormLabel>
      <OuiSpacer size="xs" />
      <OuiFlexGroup gutterSize="s" responsive={false} wrap>
        <OuiFlexItem style={{ flexBasis: 72 }}>
          <OuiRange
            id="docsExampleBorderSize"
            showInput="inputWithPopover"
            min={0}
            max={32}
            value={popoverSliderValues}
            onChange={onPopoverSliderValueChange}
            compressed
            append="px"
          />
        </OuiFlexItem>
        <OuiFlexItem grow={4} style={{ minWidth: 160 }}>
          <OuiSelect
            id="docsExampleBorderStyle"
            options={[
              { value: 'dashed', text: 'Dashed' },
              { value: 'dotted', text: 'Dotted' },
              { value: 'solid', text: 'Solid' },
            ]}
            compressed
            prepend="Style"
            aria-label="Border style"
          />
        </OuiFlexItem>
        <OuiFlexItem grow={false}>
          <OuiColorPicker
            onChange={onColorChange}
            color={color}
            button={
              <OuiColorPickerSwatch
                color={color}
                aria-label="Border color"
                title="Border color"
                style={{ width: 32, height: 32 }}
              />
            }
          />
        </OuiFlexItem>
      </OuiFlexGroup>
    </OuiPanel>
  );
};
