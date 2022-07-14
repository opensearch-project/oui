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
  CSSProperties,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  FunctionComponent,
  HTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { useOuiResizableContainerContext } from './context';
import { htmlIdGenerator } from '../../services';
import { OuiPanel } from '../panel';
import {
  PanelPaddingSize,
  panelPaddingValues,
  _OuiPanelProps,
} from '../panel/panel';
import { useOuiI18n } from '../i18n';
import {
  OuiResizablePanelController,
  ActionToggleOptions,
  PanelModeType,
  PanelPosition,
} from './types';
import { OuiResizableCollapseButton } from './resizable_collapse_button';

export interface ToggleOptions {
  'data-test-subj'?: string;
  className?: string;
  /**
   * Position of the toggle button.
   * Enums based on the `direction` of the OuiResizableContainer
   */
  position?: 'top' | 'middle' | 'bottom' | 'left' | 'right';
}

export type ModeOptions =
  | PanelModeType
  | [PanelModeType, Partial<ToggleOptions>];

export type ToggleCollapseCallback = (
  panelId: OuiResizablePanelController['id'],
  options: ActionToggleOptions
) => void;

const defaultToggleOptions = {
  className: null,
  'data-test-subj': undefined,
  position: 'middle',
};

export const getModeType = (mode?: ModeOptions) =>
  typeof mode === 'object' ? mode[0] : mode;
export const getToggleOptions = (mode?: ModeOptions) =>
  typeof mode === 'object'
    ? { ...defaultToggleOptions, ...mode[1] }
    : defaultToggleOptions;

export interface OuiResizablePanelControls {
  isHorizontal: boolean;
  registration: {
    register: (panel: OuiResizablePanelController) => void;
    deregister: (panelId: OuiResizablePanelController['id']) => void;
  };
  /**
   * #ToggleCollapseCallback
   */
  onToggleCollapsed?: ToggleCollapseCallback;
  onToggleCollapsedInternal: ToggleCollapseCallback;
}

const paddingSizeToClassNameMap = {
  none: null,
  s: 'ouiResizablePanel--paddingSmall',
  m: 'ouiResizablePanel--paddingMedium',
  l: 'ouiResizablePanel--paddingLarge',
};
export interface OuiResizablePanelProps
  extends _OuiPanelProps,
    CommonProps,
    Partial<OuiResizablePanelControls> {
  /**
   * Specify a desired minimum panel size in pixels or percents,
   * for example "300px" or "30%"
   * The actual minimum size will be calculated,
   * using the larger of this prop and the panelProps.paddingSize
   */
  minSize?: string;
  /**
   * Specify id of panel if you want to track panel size in "onPanelWidthChange" callback
   */
  id?: string;
  /**
   * Initial size of the panel in percents
   * Specify this prop if you don't need to handle the panel size from outside
   */
  initialSize?: number;
  /**
   * Size of the panel in percents.
   * Specify this prop if you want to control the size from outside, the panel will ignore the "initialSize"
   */
  size?: number;
  /**
   * Add Oui scroll and overflow for the panel
   */
  scrollable?: boolean;
  /*
   * For use with collapsible panels.
   * Specify either `'collapsible'`, `'main'`, or `'custom'`.
   * `'collapsible'` also accepts an array where
   * the second item is attributes for the toggle button:
   * `['collapsible', {'data-test-subj'?: string, className?: string;}]
   */
  mode?: ModeOptions;

  /**
   * ReactNode to render as this component's content
   */
  children: ReactNode;
  /**
   * Custom CSS properties applied to the wrapping `.ouiResizablePanel` div
   */
  style?: CSSProperties;
  /**
   * Props to add to the wrapping `.ouiResizablePanel` div
   */
  wrapperProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * Padding to add directly to the wrapping `.ouiResizablePanel` div
   * Gives space around the actual panel.
   */
  wrapperPadding?: PanelPaddingSize;
}

const getPosition = (ref: HTMLDivElement) => {
  let position: PanelPosition = 'middle';
  if (ref.matches(':first-of-type')) {
    position = 'first';
  } else if (ref.matches(':last-of-type')) {
    position = 'last';
  }
  return position;
};

const generatePanelId = htmlIdGenerator('resizable-panel');

export const OuiResizablePanel: FunctionComponent<OuiResizablePanelProps> = ({
  children,
  className,
  id,
  isHorizontal,
  size,
  initialSize,
  minSize = '0px', // Actual minSize is calculated in `./helpers.ts`
  scrollable = true,
  style = {},
  mode,
  registration,
  onToggleCollapsed,
  onToggleCollapsedInternal,
  wrapperProps,
  hasShadow = false,
  borderRadius = 'none',
  color = 'transparent',
  paddingSize = 'm',
  wrapperPadding = 'none',
  ...rest
}) => {
  const {
    registry: { panels, resizers } = {
      panels: {},
      resizers: {},
    },
  } = useOuiResizableContainerContext();
  const divRef = useRef<HTMLDivElement>(null);
  const panelId = useRef(id || generatePanelId());
  const resizerIds = useRef<string[]>([]);
  const modeType = useMemo(() => getModeType(mode), [mode]);
  const toggleOpts = useMemo(() => getToggleOptions(mode), [mode]);
  const innerSize = useMemo(
    () =>
      (panels[panelId.current] && panels[panelId.current].size) ??
      (initialSize || 0),
    [panels, initialSize]
  );
  const isCollapsed = useMemo(
    () =>
      (panels[panelId.current] && panels[panelId.current].isCollapsed) || false,
    [panels]
  );
  const position = useMemo(
    () =>
      (panels[panelId.current] && panels[panelId.current].position) || 'middle',
    [panels]
  );
  const isCollapsible = useMemo(() => modeType === 'collapsible', [modeType]);
  const direction = useMemo(() => {
    let direction = null;
    if (position === 'middle' && (isCollapsible || isCollapsed)) {
      const ids = Object.keys(panels);
      const index = ids.indexOf(panelId.current);
      const prevPanel = panels[ids[index - 1]];
      const nextPanel = panels[ids[index + 1]];
      const prevPanelMode = prevPanel ? getModeType(prevPanel.mode) : null;
      const nextPanelMode = nextPanel ? getModeType(nextPanel.mode) : null;
      // Intentional, preferential order
      if (prevPanelMode === 'main') {
        direction = 'right';
      } else if (nextPanelMode === 'main') {
        direction = 'left';
      } else if (prevPanelMode && prevPanelMode !== 'collapsible') {
        direction = 'right';
      } else if (nextPanelMode && nextPanelMode !== 'collapsible') {
        direction = 'left';
      } else if (prevPanel && nextPanel) {
        direction = prevPanel.size > nextPanel.size ? 'right' : 'left';
      } else if (prevPanel) {
        direction = 'right';
      } else if (nextPanel) {
        direction = 'left';
      }
    }
    return direction;
  }, [isCollapsed, isCollapsible, position, panels]);

  const padding = useMemo(() => {
    return `${panelPaddingValues[paddingSize] * 2}px`;
  }, [paddingSize]);

  const classes = classNames(
    'ouiResizablePanel',
    paddingSizeToClassNameMap[wrapperPadding],
    {
      'ouiResizablePanel--collapsible': isCollapsible,
      'ouiResizablePanel-isCollapsed': isCollapsed,
    },
    `ouiResizablePanel--${position}`,
    wrapperProps && wrapperProps.className
  );

  const panelClasses = classNames(
    'ouiResizablePanel__content',
    {
      'ouiResizablePanel__content--scrollable': scrollable,
    },
    className
  );

  let dimensions;

  if (size) {
    dimensions = {
      width: isHorizontal ? `${size}%` : '100%',
      height: isHorizontal ? 'auto' : `${size}%`,
    };
  } else {
    dimensions = {
      width: isHorizontal ? `${innerSize}%` : '100%',
      height: isHorizontal ? 'auto' : `${innerSize}%`,
    };
  }

  const styles = {
    ...style,
    ...dimensions,
  };

  useEffect(() => {
    if (!registration) return;
    const id = panelId.current;
    const initSize = size ?? (initialSize || 0);
    resizerIds.current = [
      divRef.current!.previousElementSibling
        ? divRef.current!.previousElementSibling.id
        : '',
      divRef.current!.nextElementSibling
        ? divRef.current!.nextElementSibling!.id
        : '',
    ];
    registration.register({
      id,
      size: initSize,
      prevSize: initSize,
      getSizePx() {
        return isHorizontal
          ? divRef.current!.getBoundingClientRect().width
          : divRef.current!.getBoundingClientRect().height;
      },
      minSize: [minSize, padding],
      mode: modeType,
      isCollapsed: false,
      position: getPosition(divRef.current!),
    });
    return () => {
      registration.deregister(id);
    };
  }, [
    initialSize,
    isHorizontal,
    minSize,
    size,
    registration,
    modeType,
    padding,
  ]);

  const onClickCollapse = (options: ActionToggleOptions) => {
    onToggleCollapsedInternal &&
      onToggleCollapsedInternal(panelId.current, options);
    onToggleCollapsed && onToggleCollapsed(panelId.current, options);
  };

  const collapseRight = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickCollapse({ direction: 'right' });
    if (e.detail) e.currentTarget.blur();
  };

  const collapseLeft = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClickCollapse({ direction: 'left' });
    if (e.detail) e.currentTarget.blur();
  };

  const toggleButtonAriaLabel = useOuiI18n(
    'ouiResizablePanel.toggleButtonAriaLabel',
    'Press to toggle this panel'
  );

  const hasLeftToggle =
    (isCollapsible || isCollapsed) &&
    (position === 'last' || (position === 'middle' && direction === 'right'));

  const hasRightToggle =
    (isCollapsible || isCollapsed) &&
    (position === 'first' || (position === 'middle' && direction === 'left'));

  const hasVisibleToggle =
    (modeType === 'custom' && isCollapsed) || isCollapsible;

  let theToggle;
  let theResizer;
  if ((isCollapsible || modeType === 'custom') && hasLeftToggle) {
    theResizer = resizers[resizerIds.current[0]];
    theToggle = (
      <OuiResizableCollapseButton
        externalPosition="before"
        direction={isHorizontal ? 'horizontal' : 'vertical'}
        isVisible={
          theResizer && (theResizer.isFocused || theResizer.isDisabled)
        }
        isCollapsed={theResizer && theResizer.isDisabled}
        internalPosition={toggleOpts.position as ToggleOptions['position']}
        data-test-subj={toggleOpts['data-test-subj']}
        aria-label={toggleButtonAriaLabel}
        onClick={collapseRight}
      />
    );
  } else if ((isCollapsible || modeType === 'custom') && hasRightToggle) {
    theResizer = resizers[resizerIds.current[1]];
    theToggle = (
      <OuiResizableCollapseButton
        externalPosition="after"
        direction={isHorizontal ? 'horizontal' : 'vertical'}
        isVisible={
          theResizer && (theResizer.isFocused || theResizer.isDisabled)
        }
        isCollapsed={theResizer && theResizer.isDisabled}
        internalPosition={toggleOpts.position as ToggleOptions['position']}
        data-test-subj={toggleOpts['data-test-subj']}
        aria-label={toggleButtonAriaLabel}
        onClick={collapseLeft}
      />
    );
  }

  return (
    <div
      {...wrapperProps}
      id={panelId.current}
      ref={divRef}
      style={styles}
      className={classes}>
      {/* The toggle is displayed on either side for tab order */}
      {hasVisibleToggle && hasLeftToggle && theToggle}
      <OuiPanel
        className={panelClasses}
        hasShadow={hasShadow}
        borderRadius={borderRadius}
        color={color}
        paddingSize={isCollapsed ? 'none' : paddingSize}
        {...rest}>
        {children}
      </OuiPanel>
      {/* The toggle is displayed on either side for tab order */}
      {hasVisibleToggle && hasRightToggle && theToggle}
    </div>
  );
};

export function ouiResizablePanelWithControls(
  controls: OuiResizablePanelControls
) {
  return (props: OuiResizablePanelProps) => (
    <OuiResizablePanel {...controls} {...props} />
  );
}
