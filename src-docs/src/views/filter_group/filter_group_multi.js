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
  OuiPopoverTitle,
  OuiFieldSearch,
  OuiFilterSelectItem,
  OuiLoadingChart,
  OuiSpacer,
  OuiIcon,
  OuiFilterGroup,
  OuiFilterButton,
} from '../../../../src/components';

export default () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const onButtonClick = () => {
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const [items, setItems] = useState([
    { name: 'Johann Sebastian Bach', checked: 'on' },
    { name: 'Wolfgang Amadeus Mozart', checked: 'on' },
    { name: 'Antonín Dvořák', checked: 'off' },
    { name: 'Dmitri Shostakovich' },
    { name: 'Felix Mendelssohn-Bartholdy' },
    { name: 'Franz Liszt' },
    { name: 'Franz Schubert' },
    { name: 'Frédéric Chopin' },
    { name: 'Georg Friedrich Händel' },
    { name: 'Giuseppe Verdi' },
    { name: 'Gustav Mahler' },
    { name: 'Igor Stravinsky' },
    { name: 'Johannes Brahms' },
    { name: 'Joseph Haydn' },
    { name: 'Ludwig van Beethoven' },
    { name: 'Piotr Illitch Tchaïkovsky' },
    { name: 'Robert Schumann' },
    { name: 'Sergej S. Prokofiew' },
    { name: 'Wolfgang Amadeus Mozart' },
  ]);

  function updateItem(index) {
    if (!items[index]) {
      return;
    }

    const newItems = [...items];

    switch (newItems[index].checked) {
      case 'on':
        newItems[index].checked = 'off';
        break;

      case 'off':
        newItems[index].checked = undefined;
        break;

      default:
        newItems[index].checked = 'on';
    }

    setItems(newItems);
  }

  const button = (
    <OuiFilterButton
      iconType="arrowDown"
      onClick={onButtonClick}
      isSelected={isPopoverOpen}
      numFilters={items.length}
      hasActiveFilters={!!items.find((item) => item.checked === 'on')}
      numActiveFilters={items.filter((item) => item.checked === 'on').length}>
      Composers
    </OuiFilterButton>
  );

  return (
    <OuiFilterGroup>
      <OuiPopover
        id="popoverExampleMultiSelect"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        panelPaddingSize="none">
        <OuiPopoverTitle paddingSize="s">
          <OuiFieldSearch compressed />
        </OuiPopoverTitle>
        <div className="ouiFilterSelect__items">
          {items.map((item, index) => (
            <OuiFilterSelectItem
              checked={item.checked}
              key={index}
              onClick={() => updateItem(index)}>
              {item.name}
            </OuiFilterSelectItem>
          ))}
          {/*
              Use when loading items initially
            */}
          <div className="ouiFilterSelect__note">
            <div className="ouiFilterSelect__noteContent">
              <OuiLoadingChart size="m" />
              <OuiSpacer size="xs" />
              <p>Loading filters</p>
            </div>
          </div>
          {/*
              Use when no results are returned
            */}
          <div className="ouiFilterSelect__note">
            <div className="ouiFilterSelect__noteContent">
              <OuiIcon type="minusInCircle" />
              <OuiSpacer size="xs" />
              <p>No filters found</p>
            </div>
          </div>
        </div>
      </OuiPopover>
    </OuiFilterGroup>
  );
};
