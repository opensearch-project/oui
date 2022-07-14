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
  OuiColorStops,
  OuiFormRow,
  OuiRange,
  OuiFlexGroup,
  OuiFlexItem,
  OuiButtonEmpty,
  OuiPopover,
} from '../../../../src/components';

import { useColorStopsState } from '../../../../src/services';

export default () => {
  const [standardColorStops, setStandardColorStops] = useColorStopsState(true);
  const [
    randomColorStops,
    setRandomColorStops,
    addRandomColor,
  ] = useColorStopsState(true);
  const [fixedColorStops, setFixedColorStops] = useColorStopsState(true);
  const [steppedColorStops, setSteppedColorStops] = useColorStopsState(true);
  const [value, setValue] = useState(10);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [extendedColorStops, setExtendedColorStops] = useState([
    {
      stop: 100,
      color: '#54B399',
    },
    {
      stop: 250,
      color: '#D36086',
    },
    {
      stop: 350,
      color: '#9170B8',
    },
  ]);

  const handleExtendedChange = (colorStops) => {
    setExtendedColorStops(colorStops);
  };

  const [emptyColorStops, setEmptyColorStops] = useState([]);

  const handleEmptyChange = (colorStops) => {
    setEmptyColorStops(colorStops);
  };

  const onButtonClick = () =>
    setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
  const closePopover = () => setIsPopoverOpen(false);

  const button = (
    <OuiButtonEmpty
      onClick={onButtonClick}
      iconType="controlsVertical"
      aria-label="Open settings"
      color="text"
      size="xs">
      Steps
    </OuiButtonEmpty>
  );

  return (
    <React.Fragment>
      <OuiFormRow label="Empty start">
        <OuiColorStops
          label="Empty start"
          onChange={handleEmptyChange}
          colorStops={emptyColorStops}
          min={0}
          max={100}
        />
      </OuiFormRow>
      <OuiFormRow label="Standard">
        <OuiColorStops
          label="Standard"
          onChange={setStandardColorStops}
          colorStops={standardColorStops}
          min={0}
          max={100}
        />
      </OuiFormRow>
      <OuiFormRow label="Random new color">
        <OuiColorStops
          label="Random new color"
          onChange={setRandomColorStops}
          colorStops={randomColorStops}
          min={0}
          max={100}
          addColor={addRandomColor}
        />
      </OuiFormRow>
      <OuiFormRow label="Extended range">
        <OuiColorStops
          label="Extended range"
          onChange={handleExtendedChange}
          colorStops={extendedColorStops}
          min={100}
          max={400}
        />
      </OuiFormRow>
      <OuiFormRow label="Fixed color segments">
        <OuiColorStops
          label="Fixed color segments"
          onChange={setFixedColorStops}
          colorStops={fixedColorStops}
          min={0}
          max={100}
          stopType="fixed"
        />
      </OuiFormRow>

      <OuiFormRow label="Stepped color segments">
        <OuiFlexGroup alignItems="center" gutterSize="xs">
          <OuiFlexItem>
            <OuiColorStops
              label="Stepped color segments"
              onChange={setSteppedColorStops}
              colorStops={steppedColorStops}
              stepNumber={value}
              min={0}
              max={100}
              stopType="stepped"
            />
          </OuiFlexItem>

          <OuiFlexItem grow={false}>
            <OuiPopover
              panelStyle={{ minWidth: 380 }}
              button={button}
              isOpen={isPopoverOpen}
              closePopover={closePopover}>
              <OuiFormRow label="Number of steps" display="columnCompressed">
                <OuiRange
                  value={value}
                  onChange={(e) => setValue(parseInt(e.target.value))}
                  showInput
                  aria-label="Change the number of steps"
                  min={2}
                  max={20}
                />
              </OuiFormRow>
            </OuiPopover>
          </OuiFlexItem>
        </OuiFlexGroup>
      </OuiFormRow>
    </React.Fragment>
  );
};
