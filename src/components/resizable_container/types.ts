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

import { KeyboardEvent, MouseEvent, TouchEvent } from 'react';

export type PanelModeType = 'collapsible' | 'main' | 'custom';

export type PanelPosition = 'first' | 'middle' | 'last';

export type PanelDirection = 'left' | 'right';

export interface OuiResizablePanelController {
  id: string;
  size: number;
  getSizePx: () => number;
  minSize: string[];
  mode?: PanelModeType;
  isCollapsed: boolean;
  prevSize: number;
  position: PanelPosition;
}

export interface OuiResizableButtonController {
  id: string;
  ref: HTMLElement;
  isDisabled: boolean;
  isFocused: boolean;
}

export interface OuiResizableContainerRegistry {
  panels: { [key: string]: OuiResizablePanelController };
  resizers: { [key: string]: OuiResizableButtonController };
}

export type OuiResizableButtonMouseEvent =
  | MouseEvent<HTMLButtonElement>
  | TouchEvent<HTMLButtonElement>;

export type OuiResizableButtonKeyDownEvent = KeyboardEvent<HTMLButtonElement>;

export interface OuiResizableContainerState {
  isDragging: boolean;
  currentResizerPos: number;
  prevPanelId: string | null;
  nextPanelId: string | null;
  containerSize: number;
  isHorizontal?: boolean;
  panels: OuiResizableContainerRegistry['panels'];
  resizers: OuiResizableContainerRegistry['resizers'];
}

export interface ActionToggleOptions {
  direction: PanelDirection;
}

interface ActionReset {
  type: 'OUI_RESIZABLE_RESET';
}

interface ActionInit {
  type: 'OUI_RESIZABLE_CONTAINER_INIT';
  payload: { isHorizontal: boolean };
}

export interface ActionDragStart {
  type: 'OUI_RESIZABLE_DRAG_START';
  payload: { prevPanelId: string; nextPanelId: string; position: number };
}

export interface ActionDragMove {
  type: 'OUI_RESIZABLE_DRAG_MOVE';
  payload: { prevPanelId: string; nextPanelId: string; position: number };
}

export interface ActionKeyMove {
  type: 'OUI_RESIZABLE_KEY_MOVE';
  payload: {
    prevPanelId: string;
    nextPanelId: string;
    direction: 'forward' | 'backward';
  };
}

export interface ActionResize {
  type: 'OUI_RESIZABLE_RESIZE';
  payload: {};
}

export interface ActionToggle {
  type: 'OUI_RESIZABLE_TOGGLE';
  payload: {
    panelId: string;
    options: ActionToggleOptions;
  };
}

interface ActionRegisterPanel {
  type: 'OUI_RESIZABLE_PANEL_REGISTER';
  payload: {
    panel: OuiResizablePanelController;
  };
}

interface ActionDeregisterPanel {
  type: 'OUI_RESIZABLE_PANEL_DEREGISTER';
  payload: {
    panelId: OuiResizablePanelController['id'];
  };
}

interface ActionRegisterResizer {
  type: 'OUI_RESIZABLE_BUTTON_REGISTER';
  payload: {
    resizer: OuiResizableButtonController;
  };
}

interface ActionDeregisterResizer {
  type: 'OUI_RESIZABLE_BUTTON_DEREGISTER';
  payload: {
    resizerId: OuiResizableButtonController['id'];
  };
}

export interface ActionFocus {
  type: 'OUI_RESIZABLE_BUTTON_FOCUS';
  payload: {
    resizerId: OuiResizableButtonController['id'];
  };
}

interface ActionBlur {
  type: 'OUI_RESIZABLE_BUTTON_BLUR';
}
interface ActionOnChange {
  type: 'OUI_RESIZABLE_ONCHANGE';
}

export type OuiResizableContainerAction =
  | ActionReset
  | ActionInit
  | ActionRegisterPanel
  | ActionDeregisterPanel
  | ActionRegisterResizer
  | ActionDeregisterResizer
  | ActionDragStart
  | ActionDragMove
  | ActionKeyMove
  | ActionResize
  | ActionToggle
  | ActionFocus
  | ActionBlur
  | ActionOnChange;

export interface OuiResizableContainerActions {
  reset: () => void;
  initContainer: (isHorizontal: boolean) => void;
  registerPanel: (panel: OuiResizablePanelController) => void;
  deregisterPanel: (panelId: OuiResizablePanelController['id']) => void;
  registerResizer: (resizer: OuiResizableButtonController) => void;
  deregisterResizer: (resizerId: OuiResizableButtonController['id']) => void;
  dragStart: ({
    prevPanelId,
    nextPanelId,
    position,
  }: ActionDragStart['payload']) => void;
  dragMove: ({
    prevPanelId,
    nextPanelId,
    position,
  }: ActionDragMove['payload']) => void;
  keyMove: ({
    prevPanelId,
    nextPanelId,
    direction,
  }: ActionKeyMove['payload']) => void;
  resizerFocus: (resizerId: ActionFocus['payload']['resizerId']) => void;
  resizerBlur: () => void;
  togglePanel: (
    panelId: ActionToggle['payload']['panelId'],
    options: ActionToggle['payload']['options']
  ) => void;
}
