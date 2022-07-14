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
  OuiBadge,
  OuiHighlight,
  OuiSpacer,
  OuiTextColor,
  OuiSwitch,
} from '../../../../src/components';
import { OuiSelectable } from '../../../../src/components/selectable';
import { createDataStore } from '../tables/data_store';

export default () => {
  const [useCustomContent, setUseCustomContent] = useState(false);

  const countries = createDataStore().countries.map((country) => {
    return {
      label: `${country.name}`,
      searchableLabel: `${country.name} ${'I am secondary content, I am!'}`,
      prepend: country.flag,
      append: <OuiBadge>{country.code}</OuiBadge>,
      showIcons: false,
    };
  });

  countries.unshift({
    label: 'Country options',
    isGroupLabel: true,
  });

  const [options, setOptions] = useState(countries);

  const onChange = (options) => {
    setOptions(options);
  };

  const onCustom = (e) => {
    setUseCustomContent(e.currentTarget.checked);
  };

  const renderCountryOption = (option, searchValue) => {
    return (
      <>
        <OuiHighlight search={searchValue}>{option.label}</OuiHighlight>
        <br />
        <OuiTextColor color="subdued">
          <small>
            <OuiHighlight search={searchValue}>
              I am secondary content, I am!
            </OuiHighlight>
          </small>
        </OuiTextColor>
      </>
    );
  };

  let customProps;
  if (useCustomContent) {
    customProps = {
      height: 240,
      renderOption: renderCountryOption,
      listProps: {
        rowHeight: 50,
        showIcons: false,
      },
    };
  }

  return (
    <>
      <OuiSwitch
        label="Custom content"
        checked={useCustomContent}
        onChange={onCustom}
      />

      <OuiSpacer />

      <OuiSelectable
        aria-label="Selectable example with custom list items"
        searchable
        options={options}
        onChange={onChange}
        {...customProps}>
        {(list, search) => (
          <>
            {search}
            {list}
          </>
        )}
      </OuiSelectable>
    </>
  );
};
