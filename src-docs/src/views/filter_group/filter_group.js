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
  OuiPopover,
  OuiFilterGroup,
  OuiFilterButton,
  OuiIcon,
  OuiSpacer,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFilterOn, setIsFilterOn] = useState(false);
  const [isOnFilterOn, setIsOnFilterOn] = useState(false);
  const [isOffFilterOn, setIsOffFilterOn] = useState(false);

  const toggleFilter = () => {
    setIsFilterOn(!isFilterOn);
  };

  const toggleOnFilter = () => {
    setIsOnFilterOn(!isOnFilterOn);
    setIsOffFilterOn(isOffFilterOn && !isOnFilterOn ? false : isOffFilterOn);
  };

  const toggleOffFilter = () => {
    setIsOffFilterOn(!isOffFilterOn);
    setIsOnFilterOn(isOnFilterOn && !isOffFilterOn ? false : isOnFilterOn);
  };

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const button = (
    <OuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={12}
      hasActiveFilters={true}
      numActiveFilters={2}>
      Composers
    </OuiFilterButton>
  );

  return (
    <OuiFilterGroup fullWidth={true}>
      <OuiFilterButton
        grow={false}
        hasActiveFilters={isFilterOn}
        onClick={toggleFilter}>
        Filter
      </OuiFilterButton>
      <OuiFilterButton
        withNext
        grow={false}
        hasActiveFilters={isOnFilterOn}
        onClick={toggleOnFilter}>
        On
      </OuiFilterButton>
      <OuiFilterButton
        grow={false}
        hasActiveFilters={isOffFilterOn}
        onClick={toggleOffFilter}>
        Off
      </OuiFilterButton>
      <OuiPopover
        id="popover"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none">
        <div className="ouiFilterSelect__note">
          <div className="ouiFilterSelect__noteContent">
            <OuiIcon type="minusInCircle" />
            <OuiSpacer size="xs" />
            <p>No filters found</p>
          </div>
        </div>
      </OuiPopover>
      <OuiFilterButton
        numFilters={12}
        hasActiveFilters={isFilterOn}
        onClick={toggleFilter}>
        Filter with a very long name
      </OuiFilterButton>
    </OuiFilterGroup>
  );
};
