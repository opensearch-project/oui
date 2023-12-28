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

import React, { useEffect, useState } from 'react';
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
     * Pass an array of options : string or ReactNode
     */
    options?: OuiSplitButtonOption[];

    /**
     * optional index of options item to mark with checkmark
     */
    selectedIndex?: string;

    /**
     * Classes for the context menu item
     */
    itemClassName?: string;

    /**
     * You must pass an `onChange` function to handle selection of an option item
     */
    onChange?: (index: number) => void;

    /**
     * You must pass `onClick` function to handle click of the Primary button
     */
    onClick?: () => void;

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

export const OuiSplitButton = ({
  fullWidth,
  options = [],
  selectedIndex,
  hasDividers,
  itemClassName,
  onChange,
  onClick,
  isOpen: propIsOpen,
  className,
  popoverClassName,
  children,
  ...rest
}: OuiSplitButtonProps) => {
  const itemNodes: Array<HTMLButtonElement | null> = [];
  const [isOpen, setIsOpen] = useState(propIsOpen || false);

  let selectedIndexInt: number | undefined = Number(selectedIndex);
  console.log('selectedIndex', { selectedIndex, selectedIndexInt });
  if (Number.isNaN(selectedIndexInt)) selectedIndexInt = undefined;

  const openPopover = () => {
    setIsOpen(true);

    const focusSelected = () => {
      requestAnimationFrame(() => {
        if (selectedIndexInt != null) {
          focusItemAt(selectedIndexInt);
        } else {
          focusSelected();
        }
      });
    };

    requestAnimationFrame(focusSelected);
  };

  useEffect(() => {
    if (isOpen) {
      openPopover();
    }
  });

  const setItemNode = (node: HTMLButtonElement | null, index: number) => {
    itemNodes[index] = node;
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  const itemClicked = (index: number) => {
    setIsOpen(false);
    if (onChange) {
      console.log('calling onchange', index);
      onChange(index);
    }
  };

  const onSelectKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === keys.ARROW_UP || event.key === keys.ARROW_DOWN) {
      event.preventDefault();
      event.stopPropagation();
      openPopover();
    }
  };

  const onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case keys.ESCAPE:
        // close the popover and prevent ancestors from handling
        event.preventDefault();
        event.stopPropagation();
        closePopover();
        break;

      case keys.TAB:
        // no-op
        event.preventDefault();
        event.stopPropagation();
        break;

      case keys.ARROW_UP:
        event.preventDefault();
        event.stopPropagation();
        shiftFocus(ShiftDirection.BACK);
        break;

      case keys.ARROW_DOWN:
        event.preventDefault();
        event.stopPropagation();
        shiftFocus(ShiftDirection.FORWARD);
        break;
    }
  };

  const focusItemAt = (index: number) => {
    const targetElement = itemNodes[index];
    if (targetElement != null) {
      targetElement.focus();
    }
  };

  const shiftFocus = (direction: ShiftDirection) => {
    const currentIndex = itemNodes.indexOf(
      document.activeElement as HTMLButtonElement
    );
    let targetElementIndex: number;

    if (currentIndex === -1) {
      // somehow the select options has lost focus
      targetElementIndex = 0;
    } else {
      if (direction === ShiftDirection.BACK) {
        targetElementIndex =
          currentIndex === 0 ? itemNodes.length - 1 : currentIndex - 1;
      } else {
        targetElementIndex =
          currentIndex === itemNodes.length - 1 ? 0 : currentIndex + 1;
      }
    }

    focusItemAt(targetElementIndex);
  };

  const popoverClasses = classNames('ouiSplitButton', popoverClassName);

  const buttonClasses = classNames(
    {
      'ouiSplitButton--isOpen__button': isOpen,
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
      onDropdownClick={isOpen ? closePopover : openPopover}
      onClick={onClick}
      onKeyDown={onSelectKeyDown}
      className={buttonClasses}
      fullWidth={fullWidth}
      // compressed={compressed}
      {...rest}>
      {children}
    </OuiSplitButtonControl>
  );

  const items = options.map((option, index) => {
    const isSelected = selectedIndexInt === index;

    return (
      <OuiContextMenuItem
        key={index}
        className={itemClasses}
        icon={isSelected ? 'check' : 'empty'}
        onClick={() => itemClicked(index)}
        onKeyDown={onItemKeyDown}
        layoutAlign="center"
        buttonRef={(node) => setItemNode(node, index)}
        role="option"
        id={`splitButtonItem_${index}`}
        aria-selected={isSelected ? 'true' : 'false'}>
        {option}
      </OuiContextMenuItem>
    );
  });

  // return <div>SplitButton</div>;
  return (
    <OuiInputPopover
      className={popoverClasses}
      input={button}
      isOpen={isOpen || isOpen}
      closePopover={closePopover}
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
};
