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

import React, { Fragment, useState } from 'react';
import {
  OuiButton,
  OuiCode,
  OuiFlyout,
  OuiFlyoutFooter,
  OuiFlyoutHeader,
  OuiPopover,
  OuiPopoverFooter,
  OuiPopoverTitle,
  OuiSelectable,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';
import { Comparators } from '../../../../src/services/sort';

import { Options } from './data';
import { createDataStore } from '../tables/data_store';

export default () => {
  const countriesStore = createDataStore().countries.map((country) => {
    return {
      id: country.code,
      label: `${country.name}`,
      append: country.flag,
    };
  });

  const [options, setOptions] = useState(Options);
  const [countries, setCountries] = useState(countriesStore);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);

  const onButtonClick = () => {
    setOptions(options.slice().sort(Comparators.property('checked')));
    setIsPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setIsPopoverOpen(false);
  };

  const onChange = (options) => {
    setOptions(options);
  };

  const onFlyoutChange = (options) => {
    setCountries(options);
  };

  const closeFlyout = () => {
    setIsFlyoutVisible(false);
  };

  const showFlyout = () => {
    setIsFlyoutVisible(true);
  };

  const button = (
    <OuiButton iconType="arrowDown" iconSide="right" onClick={onButtonClick}>
      Show popover
    </OuiButton>
  );

  return (
    <Fragment>
      <OuiPopover
        id="popover"
        panelPaddingSize="none"
        button={button}
        isOpen={isPopoverOpen}
        closePopover={closePopover}>
        <OuiSelectable
          searchable
          searchProps={{
            placeholder: 'Filter list',
            compressed: true,
          }}
          options={options}
          onChange={onChange}>
          {(list, search) => (
            <div style={{ width: 240 }}>
              <OuiPopoverTitle paddingSize="s">{search}</OuiPopoverTitle>
              {list}
              <OuiPopoverFooter paddingSize="s">
                <OuiButton size="s" fullWidth>
                  Manage this list
                </OuiButton>
              </OuiPopoverFooter>
            </div>
          )}
        </OuiSelectable>
      </OuiPopover>

      <OuiSpacer />

      <OuiButton onClick={showFlyout}>Show flyout</OuiButton>

      {isFlyoutVisible && (
        <OuiFlyout ownFocus onClose={closeFlyout} aria-labelledby="flyoutTitle">
          <OuiSelectable
            aria-label="Popover example"
            searchable
            options={countries}
            onChange={onFlyoutChange}
            height="full">
            {(list, search) => (
              <Fragment>
                <OuiFlyoutHeader hasBorder>
                  <OuiTitle size="m">
                    <h2 id="flyoutTitle">Be mindful of the flexbox</h2>
                  </OuiTitle>
                  <OuiSpacer />
                  {search}
                </OuiFlyoutHeader>
                <OuiSpacer size="xs" />
                {list}
              </Fragment>
            )}
          </OuiSelectable>
          <OuiSpacer size="xs" />
          <OuiFlyoutFooter>
            <OuiButton fill>Some extra action</OuiButton>
          </OuiFlyoutFooter>
        </OuiFlyout>
      )}

      <OuiSpacer />

      <OuiTitle size="xxs">
        <h4>
          Using <OuiCode language="js">listProps.bordered=true</OuiCode>
        </h4>
      </OuiTitle>

      <OuiSpacer />

      <OuiSelectable
        aria-label="Bordered selectable example"
        options={options}
        onChange={() => {}}
        style={{ width: 300 }}
        listProps={{ bordered: true }}>
        {(list) => list}
      </OuiSelectable>
    </Fragment>
  );
};
