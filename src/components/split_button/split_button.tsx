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

import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';

import { OuiScreenReaderOnly } from '../accessibility';
import {
  OuiSplitButtonControl,
  OuiSplitButtonControlProps,
} from './split_button_control';
import { OuiPopover } from '../popover';
import { OuiContextMenuItem } from '../context_menu';
import { cascadingMenuKeys, keys } from '../../services';
import { OuiI18n } from '../i18n';
import { OuiButtonProps } from '../button';
import { OuiText, OuiTextProps } from '../text';
import { OuiFocusTrap } from '../focus_trap';
import { tabbable } from 'tabbable';

enum ShiftDirection {
  BACK = 'back',
  FORWARD = 'forward',
}

export interface OuiSplitButtonOption {
  display: string | ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
}

export type OuiSplitButtonProps = CommonProps &
  Omit<
    OuiSplitButtonControlProps,
    'onChange' | 'onDropdownClick' | 'options' | 'value'
  > & {
    /**
     * Pass an array of options
     */
    options?: OuiSplitButtonOption[];

    /**
     * Classes for the context menu item
     */
    itemClassName?: string;

    /**
     * optional index of options item to mark with checkmark
     */
    selectedIndex?: number;

    /**
     * Change to `true` if you want horizontal lines between options.
     * This is best used when options are multi-line.
     */
    hasDividers?: boolean;

    /**
     * Applied to the outermost wrapper (popover)
     */
    popoverClassName?: string;

    /**
     * Controls whether the options are shown upon initial render. Default: false
     */
    initiallyOpen?: boolean;

    /**
     * Optional additional props to send to Primary Button
     */
    buttonProps?: OuiButtonProps;

    /**
     * Optional additional props to send to Dropdown Button
     */
    dropdownProps?: OuiButtonProps;

    /**
     * Optional additional props to send to each Option Item, when
     * it is string, rendered with OuiText wrapper
     */
    optionProps?: OuiTextProps;
  };

export const OuiSplitButton = ({
  color = 'primary',
  fullWidth = false,
  disabled,
  options = [],
  selectedIndex,
  initiallyOpen = false,
  hasDividers,
  itemClassName,
  onClick,
  className,
  popoverClassName,
  children,
  dropdownProps,
  optionProps,
  buttonProps,
  ...rest
}: OuiSplitButtonProps) => {
  const itemNodes: Array<HTMLButtonElement | null> = useMemo(() => [], []);
  const [isOpen, setIsOpen] = useState(!!initiallyOpen);
  const [panelEl, setPanelEl] = useState<HTMLElement | null>(null);
  const panelRef = (node: HTMLElement | null) => setPanelEl(node);

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (panelEl && event.key === cascadingMenuKeys.TAB) {
      const tabbableItems = tabbable(panelEl).filter((el) => {
        return (
          Array.from(el.attributes)
            .map((el) => el.name)
            .indexOf('data-focus-guard') < 0
        );
      });
      if (
        tabbableItems.length &&
        tabbableItems[tabbableItems.length - 1] === document.activeElement
      ) {
        setIsOpen(false);
      }
    }
  };

  const focusItemAt = useCallback(
    (index: number) => {
      const targetElement = itemNodes[index];
      if (targetElement != null) {
        targetElement.focus();

        return targetElement.matches(':focus');
      }
    },
    [itemNodes]
  );

  const focusSelected = useCallback(() => {
    requestAnimationFrame(() => {
      const hasFocus = focusItemAt(selectedIndex || 0);
      if (!hasFocus) {
        focusSelected();
      }
    });
  }, [selectedIndex, focusItemAt]);

  useEffect(() => {
    isOpen && requestAnimationFrame(focusSelected);
  }, [isOpen, focusSelected]);

  const onSelectKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === keys.ARROW_UP || event.key === keys.ARROW_DOWN) {
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(true);
    }
  };

  const shiftFocus = (direction: ShiftDirection) => {
    const currentIndex = itemNodes.indexOf(
      document.activeElement as HTMLButtonElement
    );

    setIsOpen(true);

    if (currentIndex === -1) {
      // somehow the select options has lost focus
      focusItemAt(0);
    } else {
      if (direction === ShiftDirection.BACK) {
        focusItemAt(
          currentIndex === 0 ? itemNodes.length - 1 : currentIndex - 1
        );
      } else {
        focusItemAt(
          currentIndex === itemNodes.length - 1 ? 0 : currentIndex + 1
        );
      }
    }
  };

  const onItemKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === keys.ESCAPE) {
      // close the popover and prevent ancestors from handling
      event.preventDefault();
      event.stopPropagation();
      setIsOpen(false);
    } else if (event.key === keys.TAB) {
      event.preventDefault();
      event.stopPropagation();
      shiftFocus(ShiftDirection.FORWARD);
    } else if (event.key === keys.TAB && event.shiftKey) {
      event.preventDefault();
      event.stopPropagation();
      shiftFocus(ShiftDirection.BACK);
    } else if (event.key === keys.ARROW_UP) {
      event.preventDefault();
      event.stopPropagation();
      shiftFocus(ShiftDirection.BACK);
    } else if (event.key === keys.ARROW_DOWN) {
      event.preventDefault();
      event.stopPropagation();
      shiftFocus(ShiftDirection.FORWARD);
    }
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

  const onPrimaryClick = () => {
    onClick?.();
    setIsOpen(false);
  };

  const button = (
    <OuiSplitButtonControl
      color={color}
      onDropdownClick={() => setIsOpen(!isOpen)}
      onClick={onPrimaryClick}
      onKeyDown={onSelectKeyDown}
      className={buttonClasses}
      fullWidth={fullWidth}
      dropdownProps={dropdownProps}
      buttonProps={buttonProps}
      disabled={disabled}
      {...rest}>
      {children}
    </OuiSplitButtonControl>
  );

  const itemIcon = (index: number) => {
    if (selectedIndex === undefined) return;

    if (selectedIndex === index) return 'check';

    return 'empty';
  };

  const items = options.map((option, index) => {
    const isSelected = selectedIndex === index;

    const content =
      typeof option.display === 'string' ? (
        <OuiText textAlign="center" {...optionProps}>
          {option.display}
        </OuiText>
      ) : (
        option.display
      );

    const itemOnClick = () => {
      setIsOpen(false);
      option.onClick?.();
    };

    return (
      <OuiContextMenuItem
        key={`optionItem_${index}`}
        className={itemClasses}
        color={color}
        icon={itemIcon(index)}
        href={option.href}
        target={option.target}
        onClick={itemOnClick}
        onKeyDown={onItemKeyDown}
        layoutAlign="center"
        buttonRef={(node) => (itemNodes[index] = node)}
        role="option"
        id={`splitButtonItem_${index}`}
        aria-selected={isSelected ? 'true' : 'false'}>
        {content}
      </OuiContextMenuItem>
    );
  });

  // return <div>SplitButton</div>;
  return (
    <OuiPopover
      ownFocus={false}
      hasArrow={false}
      anchorPosition="downRight"
      button={button}
      panelRef={panelRef}
      className={popoverClasses}
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      panelPaddingSize="none">
      <OuiScreenReaderOnly>
        <p role="alert">
          <OuiI18n
            token="ouiSplitButton.screenReaderAnnouncement"
            default="You are in a selector of {optionsCount} items and must select a single option.
              Use the up and down keys to navigate or escape to close."
            values={{ optionsCount: options?.length }}
          />
        </p>
      </OuiScreenReaderOnly>
      <OuiFocusTrap clickOutsideDisables={true}>
        <div onKeyDown={onKeyDown}>
          <div
            className="ouiSplitButton__listbox"
            role="listbox"
            aria-activedescendant={`${selectedIndex}`}
            tabIndex={0}>
            {items}
          </div>
        </div>
      </OuiFocusTrap>
    </OuiPopover>
  );
};
