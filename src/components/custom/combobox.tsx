/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

'use client';

import * as React from 'react';
import { Check, ChevronsUpDown, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components';
import { Checkbox } from '@/components';
import { Badge } from '@/components';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '../ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
  content?: React.ReactNode;
  isAction?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  // Single selection props
  value?: string;
  onValueChange?: (value: string) => void;
  // Multi selection props
  multiple?: boolean;
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  maxVisibleItems?: number;
  // Common props
  onActionSelect?: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  disabled?: boolean;
  className?: string;
  size?: 'sm' | 'default' | 'lg';
  renderTrigger?: (
    selectedOptions: ComboboxOption[] | ComboboxOption | undefined
  ) => React.ReactNode;
  popoverClassName?: string;
}

export function Combobox({
  options,
  // Single selection
  value,
  onValueChange,
  // Multi selection
  multiple = false,
  values = [],
  onValuesChange,
  maxVisibleItems = 2,
  // Common props
  onActionSelect,
  placeholder = 'Select option...',
  searchPlaceholder = 'Search...',
  emptyText = 'No option found.',
  disabled = false,
  className,
  size = 'default',
  renderTrigger,
  popoverClassName,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  const regularOptions = options.filter((option) => !option.isAction);
  const actionOptions = options.filter((option) => option.isAction);

  // Handle both single and multi selection
  const selectedOptions = multiple
    ? options.filter(
        (option) => values.includes(option.value) && !option.isAction
      )
    : options.find((option) => option.value === value && !option.isAction);

  const sizeClasses = {
    sm: 'oui:h-8 oui:px-2 oui:text-sm',
    default: 'oui:h-9 oui:px-3',
    lg: 'oui:h-10 oui:px-4',
  };

  const handleSelect = (currentValue: string) => {
    const option = options.find((opt) => opt.value === currentValue);

    if (option?.isAction) {
      onActionSelect?.(currentValue);
      if (!multiple) setOpen(false);
      return;
    }

    if (multiple) {
      const newValues = values.includes(currentValue)
        ? values.filter((v) => v !== currentValue)
        : [...values, currentValue];
      onValuesChange?.(newValues);
    } else {
      const newValue = currentValue === value ? '' : currentValue;
      onValueChange?.(newValue);
      setOpen(false);
    }
  };

  const handleRemoveValue = (valueToRemove: string) => {
    if (multiple) {
      const newValues = values.filter((v) => v !== valueToRemove);
      onValuesChange?.(newValues);
    }
  };

  const renderMultiSelectTrigger = () => {
    const selectedCount = Array.isArray(selectedOptions)
      ? selectedOptions.length
      : 0;

    return (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn(
          'oui:justify-between oui:font-normal',
          sizeClasses[size],
          selectedCount === 0
            ? 'oui:text-muted-foreground'
            : 'oui:text-foreground',
          className
        )}
        disabled={disabled}>
        <div className="oui:flex oui:gap-1 oui:flex-1 oui:min-w-0 oui:items-center oui:overflow-hidden">
          {selectedCount === 0 ? (
            <span>{placeholder}</span>
          ) : (
            <>
              {Array.isArray(selectedOptions) &&
                selectedOptions.slice(0, maxVisibleItems).map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className="oui:text-xs">
                    {option.label}
                    <button
                      className="oui:ml-1 oui:ring-offset-background oui:rounded-full oui:outline-none oui:focus:ring-2 oui:focus:ring-ring oui:focus:ring-offset-2"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          handleRemoveValue(option.value);
                        }
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      onClick={() => handleRemoveValue(option.value)}>
                      <X className="oui:h-3 oui:w-3 oui:text-muted-foreground oui:hover:text-foreground" />
                    </button>
                  </Badge>
                ))}
              {selectedCount > maxVisibleItems && (
                <Badge
                  variant="outline"
                  className="oui:text-xs oui:text-muted-foreground">
                  +{selectedCount - maxVisibleItems} more
                </Badge>
              )}
            </>
          )}
        </div>
        <ChevronsUpDown className="oui:ml-2 oui:h-4 oui:w-4 oui:shrink-0 oui:opacity-50" />
      </Button>
    );
  };

  const renderSingleSelectTrigger = () => {
    const selectedOption = !Array.isArray(selectedOptions)
      ? selectedOptions
      : undefined;

    return (
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className={cn(
          'oui:justify-between oui:font-normal',
          sizeClasses[size],
          selectedOption ? 'oui:text-foreground' : 'oui:text-muted-foreground',
          className
        )}
        disabled={disabled}>
        {selectedOption
          ? selectedOption.content || selectedOption.label
          : placeholder}
        <ChevronsUpDown className="oui:ml-2 oui:h-4 oui:w-4 oui:shrink-0 oui:opacity-50" />
      </Button>
    );
  };

  const defaultTrigger = multiple
    ? renderMultiSelectTrigger()
    : renderSingleSelectTrigger();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {renderTrigger ? renderTrigger(selectedOptions) : defaultTrigger}
      </PopoverTrigger>
      <PopoverContent className={cn('oui:w-[200px] oui:p-0', popoverClassName)}>
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyText}</CommandEmpty>
            {regularOptions.length > 0 && (
              <CommandGroup>
                {regularOptions.map((option) => {
                  const isSelected = multiple
                    ? values.includes(option.value)
                    : value === option.value;

                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      disabled={option.disabled}
                      onSelect={handleSelect}>
                      {multiple ? (
                        <Checkbox
                          checked={isSelected}
                          className="oui:mr-2 oui:h-4 oui:w-4"
                        />
                      ) : (
                        <Check
                          className={cn(
                            'oui:mr-2 oui:h-4 oui:w-4',
                            isSelected ? 'oui:opacity-100' : 'oui:opacity-0'
                          )}
                        />
                      )}
                      <span className="oui:text-foreground">
                        {option.content || option.label}
                      </span>
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            )}
            {actionOptions.length > 0 && regularOptions.length > 0 && (
              <CommandSeparator />
            )}
            {actionOptions.length > 0 && (
              <CommandGroup>
                {actionOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    onSelect={handleSelect}
                    className="oui:text-muted-foreground">
                    {option.content || option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
