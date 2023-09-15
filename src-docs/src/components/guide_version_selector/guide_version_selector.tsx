import React, {
  FunctionComponent,
  useState,
  useEffect,
  useMemo,
  useCallback,
  SyntheticEvent,
} from 'react';

import { OuiFlexGroup, OuiFlexItem } from '../../../../src/components/flex';
import { OuiBadge } from '../../../../src/components/badge';
import {
  OuiContextMenuPanel,
  OuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { OuiButton } from '../../../../src/components/button';
import { OuiPopover } from '../../../../src/components/popover';

export type GuideVersionSelectorProps = {
  selected: string;
};

export const GuideVersionSelector: FunctionComponent<GuideVersionSelectorProps> = ({
  selected,
}) => {
  const isLocalDev = ['localhost', '127.0.0.1'].includes(
    window.location.hostname
  );

  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(selected);
  const [options, setOptions] = useState<string[]>([selected]);

  const onButtonClick = () => {
    setPopoverOpen(!isPopoverOpen);
  };

  const closePopover = () => {
    setPopoverOpen(false);
  };

  const onChange = useCallback(
    (value: string) => (e: SyntheticEvent) => {
      e.preventDefault();

      closePopover();
      setSelectedOption(value);
      window.location.href = `/${value}`;
    },
    []
  );

  useEffect(() => {
    if (isLocalDev) {
      return;
    }

    fetch('/versions.json')
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response.text());
        }

        return response.json();
      })
      .then((branches: string[]) => {
        setOptions(branches);
      })
      .catch(console.error);
  }, [isLocalDev]);

  const items = useMemo(
    () =>
      options.map((option, i) => (
        <OuiContextMenuItem
          key={option}
          icon={option === selectedOption ? 'check' : 'empty'}
          href={`/${option}`}
          onClick={onChange(option)}>
          <OuiFlexGroup direction="row" wrap={false}>
            <OuiFlexItem>v{option}</OuiFlexItem>
            {i === 0 && (
              <OuiFlexItem>
                <OuiBadge>Latest</OuiBadge>
              </OuiFlexItem>
            )}
          </OuiFlexGroup>
        </OuiContextMenuItem>
      )),
    [onChange, options, selectedOption]
  );

  const button = (
    <OuiButton
      size="s"
      iconType="arrowDown"
      iconSide="right"
      color="ghost"
      minWidth={0}
      onClick={onButtonClick}>
      v{selectedOption}
    </OuiButton>
  );

  return (
    <OuiPopover
      repositionOnScroll
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      panelPaddingSize="none"
      anchorPosition="downRight">
      <OuiContextMenuPanel size="s" items={items} />
    </OuiPopover>
  );
};
