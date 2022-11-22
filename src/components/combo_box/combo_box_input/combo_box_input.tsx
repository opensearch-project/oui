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

/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, {
  ChangeEventHandler,
  Component,
  FocusEventHandler,
  RefCallback,
} from 'react';
import classNames from 'classnames';
import AutosizeInput from 'react-input-autosize';

import { OuiScreenReaderOnly } from '../../accessibility';
import {
  OuiFormControlLayout,
  OuiFormControlLayoutProps,
} from '../../form/form_control_layout';
import { OuiIcon } from '../../icon';
import { OuiComboBoxPill } from './combo_box_pill';
import { htmlIdGenerator } from '../../../services';
import { OuiFormControlLayoutIconsProps } from '../../form/form_control_layout/form_control_layout_icons';
import {
  OuiComboBoxOptionOption,
  OuiComboBoxSingleSelectionShape,
  OptionHandler,
  UpdatePositionHandler,
} from '../types';
import { CommonProps } from '../../common';

export interface OuiComboBoxInputProps<T> extends CommonProps {
  autoSizeInputRef?: RefCallback<AutosizeInput & HTMLInputElement>;
  compressed: boolean;
  focusedOptionId?: string;
  fullWidth?: boolean;
  hasSelectedOptions: boolean;
  id?: string;
  inputRef?: RefCallback<HTMLInputElement>;
  isDisabled?: boolean;
  isListOpen: boolean;
  noIcon: boolean;
  onBlur?: FocusEventHandler<HTMLInputElement>;
  onChange?: (searchValue: string) => void;
  onClear?: () => void;
  onClick?: () => void;
  onCloseListClick: () => void;
  onFocus: FocusEventHandler<HTMLInputElement>;
  onOpenListClick: () => void;
  onRemoveOption?: OptionHandler<T>;
  placeholder?: string;
  rootId: ReturnType<typeof htmlIdGenerator>;
  searchIcon?: boolean;
  searchValue: string;
  selectedOptions?: Array<OuiComboBoxOptionOption<T>>;
  singleSelection?: boolean | OuiComboBoxSingleSelectionShape;
  toggleButtonRef?: RefCallback<HTMLButtonElement | HTMLSpanElement>;
  updatePosition: UpdatePositionHandler;
  value?: string;
  prepend?: OuiFormControlLayoutProps['prepend'];
  append?: OuiFormControlLayoutProps['append'];
  isLoading?: boolean;
  autoFocus?: boolean;
}

interface OuiComboBoxInputState {
  hasFocus: boolean;
}

export class OuiComboBoxInput<T> extends Component<
  OuiComboBoxInputProps<T>,
  OuiComboBoxInputState
> {
  state: OuiComboBoxInputState = {
    hasFocus: false,
  };

  updatePosition = () => {
    // Wait a beat for the DOM to update, since we depend on DOM elements' bounds.
    requestAnimationFrame(() => {
      this.props.updatePosition();
    });
  };

  onFocus: FocusEventHandler<HTMLInputElement> = (event) => {
    this.props.onFocus(event);
    this.setState({
      hasFocus: true,
    });
  };

  onBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }
    this.setState({
      hasFocus: false,
    });
  };

  componentDidUpdate(prevProps: OuiComboBoxInputProps<T>) {
    const { searchValue } = prevProps;

    // We need to update the position of everything if the user enters enough input to change
    // the size of the input.
    if (searchValue !== this.props.searchValue) {
      this.updatePosition();
    }
  }

  inputOnChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const { onChange, searchValue } = this.props;
    if (onChange) {
      onChange(event.target.value as typeof searchValue);
    }
  };

  inputRefCallback = (ref: HTMLInputElement & AutosizeInput) => {
    const { autoSizeInputRef } = this.props;
    if (autoSizeInputRef) {
      autoSizeInputRef(ref);
    }
  };

  render() {
    const {
      compressed,
      focusedOptionId,
      fullWidth,
      hasSelectedOptions,
      id,
      inputRef,
      isDisabled,
      isListOpen,
      noIcon,
      onClear,
      onClick,
      onCloseListClick,
      onOpenListClick,
      onRemoveOption,
      placeholder,
      rootId,
      searchIcon: searchIconProp,
      searchValue,
      selectedOptions,
      singleSelection: singleSelectionProp,
      toggleButtonRef,
      value,
      prepend,
      append,
      isLoading,
      autoFocus,
    } = this.props;

    const singleSelection = Boolean(singleSelectionProp);
    const asPlainText =
      (singleSelectionProp &&
        typeof singleSelectionProp === 'object' &&
        singleSelectionProp.asPlainText) ||
      false;

    const pills = selectedOptions
      ? selectedOptions.map((option) => {
          const { key, label, color, onClick, ...rest } = option;
          const pillOnClose =
            isDisabled || singleSelection || onClick
              ? undefined
              : onRemoveOption;
          return (
            <OuiComboBoxPill
              option={option}
              onClose={pillOnClose}
              key={key ?? label.toLowerCase()}
              color={color}
              onClick={onClick}
              onClickAriaLabel={onClick ? 'Change' : undefined}
              asPlainText={asPlainText}
              {...rest}>
              {label}
            </OuiComboBoxPill>
          );
        })
      : null;

    let removeOptionMessage;
    let removeOptionMessageId;

    if (this.state.hasFocus) {
      const readPlaceholder = placeholder ? `${placeholder}.` : '';
      const removeOptionMessageContent =
        `Combo box. Selected. ${
          searchValue ? `${searchValue}. Selected. ` : ''
        }${
          selectedOptions && selectedOptions.length > 0
            ? `${value}. Press Backspace to delete ${
                selectedOptions[selectedOptions.length - 1].label
              }. `
            : ''
        }Combo box input. ${readPlaceholder} Type some text or, to display a list of choices, press Down Arrow. ` +
        'To exit the list of choices, press Escape.';

      removeOptionMessageId = htmlIdGenerator()();

      // aria-live="assertive" will read this message aloud immediately once it enters the DOM.
      // We'll render to the DOM when the input gains focus and remove it when the input loses focus.
      // We'll use aria-hidden to prevent default aria information from being read by the screen
      // reader.
      removeOptionMessage = (
        <OuiScreenReaderOnly>
          <span aria-live="assertive" id={removeOptionMessageId}>
            {removeOptionMessageContent}
          </span>
        </OuiScreenReaderOnly>
      );
    }

    let placeholderMessage;

    if (
      placeholder &&
      selectedOptions &&
      !selectedOptions.length &&
      !searchValue
    ) {
      placeholderMessage = (
        <p className="ouiComboBoxPlaceholder">{placeholder}</p>
      );
    }

    const clickProps: OuiFormControlLayoutIconsProps = {};
    if (!isDisabled && onClear && hasSelectedOptions) {
      clickProps.clear = {
        'data-test-subj': 'comboBoxClearButton',
        onClick: onClear,
      };
    }

    let icon: OuiFormControlLayoutIconsProps['icon'];
    if (!noIcon) {
      icon = {
        'aria-label': isListOpen
          ? 'Close list of options'
          : 'Open list of options',
        'data-test-subj': 'comboBoxToggleListButton',
        disabled: isDisabled,
        onClick: isListOpen && !isDisabled ? onCloseListClick : onOpenListClick,
        ref: toggleButtonRef,
        side: 'right',
        type: 'arrowDown',
      };
    }

    let searchIcon;
    if (!!searchIconProp) {
      const searchIconClasses = classNames(
        'ouiComboBoxPill',
        'ouiComboBoxSearchIcon'
      );

      searchIcon = (
        <OuiIcon
          type="search"
          size={compressed ? 's' : 'm'}
          className={searchIconClasses}
        />
      );
    }

    const wrapClasses = classNames('ouiComboBox__inputWrap', {
      'ouiComboBox__inputWrap--compressed': compressed,
      'ouiComboBox__inputWrap--fullWidth': fullWidth,
      'ouiComboBox__inputWrap--noWrap': singleSelection,
      'ouiComboBox__inputWrap-isLoading': isLoading,
      'ouiComboBox__inputWrap-isClearable': onClear,
      'ouiComboBox__inputWrap--inGroup': prepend || append,
    });

    return (
      <OuiFormControlLayout
        icon={icon}
        {...clickProps}
        isLoading={isLoading}
        compressed={compressed}
        fullWidth={fullWidth}
        prepend={prepend}
        append={append}>
        <div
          className={wrapClasses}
          data-test-subj="comboBoxInput"
          onClick={onClick}
          tabIndex={-1} // becomes onBlur event's relatedTarget, otherwise relatedTarget is null when clicking on this div
        >
          {searchIcon}
          {!singleSelection || !searchValue ? pills : null}
          {placeholderMessage}
          <AutosizeInput
            aria-activedescendant={focusedOptionId}
            aria-controls={isListOpen ? rootId('listbox') : ''}
            className="ouiComboBox__input"
            data-test-subj="comboBoxSearchInput"
            disabled={isDisabled}
            id={id}
            inputRef={inputRef}
            onBlur={this.onBlur}
            onChange={this.inputOnChange}
            onFocus={this.onFocus}
            ref={this.inputRefCallback}
            role="textbox"
            style={{ fontSize: 14 }}
            value={searchValue}
            autoFocus={autoFocus}
          />
          {removeOptionMessage}
        </div>
      </OuiFormControlLayout>
    );
  }
}
