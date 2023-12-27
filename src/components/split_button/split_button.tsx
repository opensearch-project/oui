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

import React, { Component } from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { OuiScreenReaderOnly } from '../accessibility';
import {
  OuiSplitButtonControl,
  OuiSplitButtonControlProps,
  OuiSplitButtonOption,
} from './split_button_control';
import { OuiInputPopover } from '../popover';
import {
  OuiContextMenuItem,
  OuiContextMenuItemLayoutAlignment,
} from '../context_menu';
import { keys } from '../../services';
import { OuiI18n } from '../i18n';

enum ShiftDirection {
  BACK = 'back',
  FORWARD = 'forward',
}

export type OuiSplitButtonProps = CommonProps &
  Omit<
    OuiSplitButtonControlProps,
    'onChange' | 'onClick' | 'options' | 'value'
  > & {
    /**
     * Pass an array of options that must at least include:
     * `value`: storing unique value of item,
     * `inputDisplay`: what shows inside the form input when selected
     * `dropdownDisplay` (optional): what shows for the item in the dropdown
     */
    options: OuiSplitButtonOption[];

    selectedIndex?: string;

    /**
     * Classes for the context menu item
     */
    itemClassName?: string;

    /**
     * You must pass an `onChange` function to handle the update of the value
     */
    onChange?: (index: number) => void;

    /**
     * Change to `true` if you want horizontal lines between options.
     * This is best used when options are multi-line.
     */
    hasDividers?: boolean;

    /**
     * Change `OuiContextMenuItem` layout position of icon
     */
    itemLayoutAlign?: OuiContextMenuItemLayoutAlignment;

    /**
     * Applied to the outermost wrapper (popover)
     */
    popoverClassName?: string;

    /**
     * Controls whether the options are shown. Default: false
     */
    isOpen?: boolean;
  };

export class OuiSplitButton extends Component<OuiSplitButtonProps> {
  static defaultProps = {
    hasDividers: false,
    fullWidth: false,
    compressed: false,
    isInvalid: false,
    isLoading: false,
  };

  private itemNodes: Array<HTMLButtonElement | null> = [];
  private _isMounted: boolean = false;

  state = {
    isPopoverOpen: this.props.isOpen || false,
  };

  componentDidMount() {
    this._isMounted = true;
    if (this.props.isOpen) {
      this.openPopover();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  setItemNode = (node: HTMLButtonElement | null, index: number) => {
    this.itemNodes[index] = node;
  };

  openPopover = () => {
    this.setState({
      isPopoverOpen: true,
    });

    const focusSelected = () => {
      const selectedIndex = this.props.selectedIndex
        ? parseInt(this.props.selectedIndex)
        : null;
      requestAnimationFrame(() => {
        if (!this._isMounted) {
          return;
        }

        if (selectedIndex != null) {
          this.focusItemAt(selectedIndex);
        } else {
          focusSelected();
        }
      });
    };

    requestAnimationFrame(focusSelected);
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  itemClicked = (index: number) => {
    this.setState({
      isPopoverOpen: false,
    });
    if (this.props.onChange) {
      this.props.onChange(index);
    }
  };

  onSelectKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === keys.ARROW_UP || event.key === keys.ARROW_DOWN) {
      event.preventDefault();
      event.stopPropagation();
      this.openPopover();
    }
  };

  onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        // close the popover and prevent ancestors from handling
        event.preventDefault();
        event.stopPropagation();
        this.closePopover();
        break;

      case keys.TAB:
        // no-op
        event.preventDefault();
        event.stopPropagation();
        break;

      case keys.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        this.shiftFocus(ShiftDirection.BACK);
        break;

      case keys.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        this.shiftFocus(ShiftDirection.FORWARD);
        break;
    }
  };

  focusItemAt(index: number) {
    const targetElement = this.itemNodes[index];
    if (targetElement != null) {
      targetElement.focus();
    }
  }

  shiftFocus(direction: ShiftDirection) {
    const currentIndex = this.itemNodes.indexOf(
      document.activeElement as HTMLButtonElement
    );
    let targetElementIndex: number;

    if (currentIndex === -1) {
      // somehow the select options has lost focus
      targetElementIndex = 0;
    } else {
      if (direction === ShiftDirection.BACK) {
        targetElementIndex =
          currentIndex === 0 ? this.itemNodes.length - 1 : currentIndex - 1;
      } else {
        targetElementIndex =
          currentIndex === this.itemNodes.length - 1 ? 0 : currentIndex + 1;
      }
    }

    this.focusItemAt(targetElementIndex);
  }

  render() {
    const {
      className,
      options,
      selectedIndex,
      onChange,
      isOpen,
      isInvalid,
      hasDividers,
      itemClassName,
      itemLayoutAlign,
      fullWidth,
      popoverClassName,
      compressed,
      ...rest
    } = this.props;

    const popoverClasses = classNames('ouiSplitButton', popoverClassName);

    const buttonClasses = classNames(
      {
        'ouiSplitButton--isOpen__button': this.state.isPopoverOpen,
      },
      className
    );

    const itemClasses = classNames(
      'ouiSplitButton__item',
      {
        'ouiSplitButton__item--hasDividers': hasDividers,
      },
      itemClassName
    );

    const button = (
      <OuiSplitButtonControl
        options={options}
        selectedIndex={selectedIndex}
        onClick={
          this.state.isPopoverOpen ? this.closePopover : this.openPopover
        }
        onKeyDown={this.onSelectKeyDown}
        className={buttonClasses}
        fullWidth={fullWidth}
        isInvalid={isInvalid}
        compressed={compressed}
        {...rest}
      />
    );

    const items = options.map((option, index) => {
      const isSelected =
        this.props.selectedIndex &&
        parseInt(this.props.selectedIndex) === index;

      return (
        <OuiContextMenuItem
          key={index}
          className={itemClasses}
          icon={isSelected ? 'check' : 'empty'}
          onClick={() => this.itemClicked(index)}
          onKeyDown={this.onItemKeyDown}
          layoutAlign={itemLayoutAlign}
          buttonRef={(node) => this.setItemNode(node, index)}
          role="option"
          id={`splitButtonItem_${index}`}
          aria-selected={isSelected ? 'true' : 'false'}>
          {option}
        </OuiContextMenuItem>
      );
    });

    return (
      <OuiInputPopover
        className={popoverClasses}
        input={button}
        isOpen={isOpen || this.state.isPopoverOpen}
        closePopover={this.closePopover}
        panelPaddingSize="none"
        fullWidth={fullWidth}>
        <OuiScreenReaderOnly>
          <p role="alert">
            <OuiI18n
              token="ouiSplitButton.screenReaderAnnouncement"
              default="You are in a form selector of {optionsCount} items and must select a single option.
              Use the up and down keys to navigate or escape to close."
              values={{ optionsCount: options.length }}
            />
          </p>
        </OuiScreenReaderOnly>
        <div
          className="ouiSplitButton__listbox"
          role="listbox"
          aria-activedescendant={`${selectedIndex}`}
          tabIndex={0}>
          {items}
        </div>
      </OuiInputPopover>
    );
  }
}
