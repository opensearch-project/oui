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
  OuiButtonGroup,
  OuiSpacer,
  OuiTitle,
} from '../../../../src/components';

import { htmlIdGenerator } from '../../../../src/services';

const idPrefix = htmlIdGenerator()();
const idPrefix3 = htmlIdGenerator()();

export default () => {
  const [toggleIdSelected, setToggleIdSelected] = useState(`${idPrefix}1`);

  const onChange = (optionId) => {
    setToggleIdSelected(optionId);
  };

  const toggleButtons = [
    {
      id: `${idPrefix}0`,
      label: 'Option one',
    },
    {
      id: `${idPrefix}1`,
      label: 'Option two',
    },
    {
      id: `${idPrefix}2`,
      label: 'Option three',
    },
  ];

  const toggleButtonsIcons = [
    {
      id: `${idPrefix3}0`,
      label: 'Align left',
      iconType: 'editorAlignLeft',
    },
    {
      id: `${idPrefix3}1`,
      label: 'Align center',
      iconType: 'editorAlignCenter',
    },
    {
      id: `${idPrefix3}2`,
      label: 'Align right',
      iconType: 'editorAlignRight',
      isDisabled: true,
    },
  ];

  const toggleButtonsIconsMulti = [
    {
      id: `${idPrefix3}3`,
      label: 'Bold',
      name: 'bold',
      iconType: 'editorBold',
    },
    {
      id: `${idPrefix3}4`,
      label: 'Italic',
      name: 'italic',
      iconType: 'editorItalic',
      isDisabled: true,
    },
    {
      id: `${idPrefix3}5`,
      label: 'Underline',
      name: 'underline',
      iconType: 'editorUnderline',
    },
    {
      id: `${idPrefix3}6`,
      label: 'Strikethrough',
      name: 'strikethrough',
      iconType: 'editorStrike',
    },
  ];

  const [toggleIconIdSelected, setToggleIconIdSelected] = useState(
    `${idPrefix3}1`
  );
  const [toggleIconIdToSelectedMap, setToggleIconIdToSelectedMap] = useState(
    {}
  );

  const onChangeIcons = (optionId) => {
    setToggleIconIdSelected(optionId);
  };

  const onChangeIconsMulti = (optionId) => {
    const newToggleIconIdToSelectedMap = {
      ...toggleIconIdToSelectedMap,
      ...{
        [optionId]: !toggleIconIdToSelectedMap[optionId],
      },
    };

    setToggleIconIdToSelectedMap(newToggleIconIdToSelectedMap);
  };

  return (
    <Fragment>
      <OuiButtonGroup
        orientation="vertical"
        legend="This is a vertical group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => onChange(id)}
      />
      &nbsp;&nbsp;
      <OuiButtonGroup
        orientation="vertical"
        legend="Text align"
        options={toggleButtonsIcons}
        idSelected={toggleIconIdSelected}
        onChange={(id) => onChangeIcons(id)}
        isIconOnly
      />
      &nbsp;&nbsp;
      <OuiButtonGroup
        orientation="vertical"
        legend="Text style"
        options={toggleButtonsIconsMulti}
        idToSelectedMap={toggleIconIdToSelectedMap}
        onChange={(id) => onChangeIconsMulti(id)}
        type="multi"
        isIconOnly
      />
      <OuiSpacer />
      <OuiTitle size="xxs">
        <h3>Compressed</h3>
      </OuiTitle>
      <OuiButtonGroup
        buttonSize="compressed"
        orientation="vertical"
        legend="This is a vertical group"
        options={toggleButtons}
        idSelected={toggleIdSelected}
        onChange={(id) => onChange(id)}
      />
      &nbsp;&nbsp;
      <OuiButtonGroup
        buttonSize="compressed"
        orientation="vertical"
        legend="Text align"
        options={toggleButtonsIcons}
        idSelected={toggleIconIdSelected}
        onChange={(id) => onChangeIcons(id)}
        isIconOnly
      />
      &nbsp;&nbsp;
      <OuiButtonGroup
        buttonSize="compressed"
        orientation="vertical"
        legend="Text style"
        options={toggleButtonsIconsMulti}
        idToSelectedMap={toggleIconIdToSelectedMap}
        onChange={(id) => onChangeIconsMulti(id)}
        type="multi"
        isIconOnly
      />
    </Fragment>
  );
};
