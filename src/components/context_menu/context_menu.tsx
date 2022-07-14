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
  Component,
  HTMLAttributes,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, ExclusiveUnion, keysOf } from '../common';
import {
  OuiContextMenuPanel,
  OuiContextMenuPanelTransitionDirection,
  OuiContextMenuPanelTransitionType,
} from './context_menu_panel';
import {
  OuiContextMenuItem,
  OuiContextMenuItemProps,
} from './context_menu_item';
import { OuiHorizontalRule, OuiHorizontalRuleProps } from '../horizontal_rule';

export type OuiContextMenuPanelId = string | number;

export type OuiContextMenuPanelItemDescriptorEntry = Omit<
  OuiContextMenuItemProps,
  'hasPanel'
> & {
  name: React.ReactNode;
  key?: string;
  panel?: OuiContextMenuPanelId;
};

export interface OuiContextMenuPanelItemSeparator
  extends OuiHorizontalRuleProps {
  isSeparator: true;
  key?: string;
}

export type OuiContextMenuPanelItemDescriptor = ExclusiveUnion<
  OuiContextMenuPanelItemDescriptorEntry,
  OuiContextMenuPanelItemSeparator
>;

export interface OuiContextMenuPanelDescriptor {
  id: OuiContextMenuPanelId;
  title?: ReactNode;
  items?: OuiContextMenuPanelItemDescriptor[];
  content?: ReactNode;
  width?: number;
  initialFocusedItemIndex?: number;
  /**
   * Alters the size of the items and the title
   */
  size?: keyof typeof sizeToClassNameMap;
}

const sizeToClassNameMap = {
  s: 'ouiContextMenu--small',
  m: null,
};

export const SIZES = keysOf(sizeToClassNameMap);

export type OuiContextMenuProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
    panels?: OuiContextMenuPanelDescriptor[];
    initialPanelId?: OuiContextMenuPanelId;
    /**
     * Alters the size of the items and the title
     */
    size?: keyof typeof sizeToClassNameMap;
  };

const isItemSeparator = (
  item: OuiContextMenuPanelItemDescriptor
): item is OuiContextMenuPanelItemSeparator =>
  (item as OuiContextMenuPanelItemSeparator).isSeparator === true;

function mapIdsToPanels(panels: OuiContextMenuPanelDescriptor[]) {
  const map: { [id: string]: OuiContextMenuPanelDescriptor } = {};

  panels.forEach((panel) => {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels: OuiContextMenuPanelDescriptor[]) {
  const idToPreviousPanelIdMap: { [panel: string]: OuiContextMenuPanelId } = {};

  panels.forEach((panel) => {
    if (Array.isArray(panel.items)) {
      panel.items.forEach((item) => {
        if (isItemSeparator(item)) return;
        const isCloseable = item.panel !== undefined;
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel!] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

function mapPanelItemsToPanels(panels: OuiContextMenuPanelDescriptor[]) {
  const idAndItemIndexToPanelIdMap: {
    [id: string]: { [index: string]: OuiContextMenuPanelId };
  } = {};

  panels.forEach((panel) => {
    idAndItemIndexToPanelIdMap[panel.id] = {};

    if (panel.items) {
      panel.items.forEach((item, index) => {
        if (isItemSeparator(item)) return;
        if (item.panel) {
          idAndItemIndexToPanelIdMap[panel.id][index] = item.panel;
        }
      });
    }
  });

  return idAndItemIndexToPanelIdMap;
}

interface State {
  prevProps: {
    panels?: OuiContextMenuPanelDescriptor[];
  };
  idToPanelMap: { [id: string]: OuiContextMenuPanelDescriptor };
  idToPreviousPanelIdMap: { [panel: string]: OuiContextMenuPanelId };
  idAndItemIndexToPanelIdMap: {
    [id: string]: { [index: string]: OuiContextMenuPanelId };
  };
  idToRenderedItemsMap: { [id: string]: ReactElement[] };

  height?: number;
  outgoingPanelId?: OuiContextMenuPanelId;
  incomingPanelId?: OuiContextMenuPanelId;
  transitionDirection?: OuiContextMenuPanelTransitionDirection;
  isOutgoingPanelVisible: boolean;
  focusedItemIndex?: number;
  isUsingKeyboardToNavigate: boolean;
}

export class OuiContextMenu extends Component<OuiContextMenuProps, State> {
  static defaultProps: Partial<OuiContextMenuProps> = {
    panels: [],
    size: 'm',
  };

  static getDerivedStateFromProps(
    nextProps: OuiContextMenuProps,
    prevState: State
  ): Partial<State> | null {
    const { panels } = nextProps;

    if (panels && prevState.prevProps.panels !== panels) {
      return {
        prevProps: { panels },
        idToPanelMap: mapIdsToPanels(panels),
        idToPreviousPanelIdMap: mapIdsToPreviousPanels(panels),
        idAndItemIndexToPanelIdMap: mapPanelItemsToPanels(panels),
      };
    }

    return null;
  }

  constructor(props: OuiContextMenuProps) {
    super(props);

    this.state = {
      prevProps: {},
      idToPanelMap: {},
      idToPreviousPanelIdMap: {},
      idAndItemIndexToPanelIdMap: {},
      idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),

      height: undefined,
      outgoingPanelId: undefined,
      incomingPanelId: props.initialPanelId,
      transitionDirection: undefined,
      isOutgoingPanelVisible: false,
      focusedItemIndex: undefined,
      isUsingKeyboardToNavigate: false,
    };
  }

  componentDidUpdate(prevProps: OuiContextMenuProps) {
    if (prevProps.panels !== this.props.panels) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        idToRenderedItemsMap: this.mapIdsToRenderedItems(this.props.panels),
      });
    }
  }

  hasPreviousPanel = (panelId: OuiContextMenuPanelId) => {
    const previousPanelId = this.state.idToPreviousPanelIdMap[panelId];
    return typeof previousPanelId !== 'undefined';
  };

  showPanel(
    panelId: OuiContextMenuPanelId,
    direction?: OuiContextMenuPanelTransitionDirection
  ) {
    this.setState({
      outgoingPanelId: this.state.incomingPanelId,
      incomingPanelId: panelId,
      transitionDirection: direction,
      isOutgoingPanelVisible: true,
    });
  }

  showNextPanel = (itemIndex?: number) => {
    if (itemIndex == null) {
      return;
    }

    const nextPanelId = this.state.idAndItemIndexToPanelIdMap[
      this.state.incomingPanelId!
    ][itemIndex];

    if (nextPanelId) {
      if (this.state.isUsingKeyboardToNavigate) {
        this.setState(({ idToPanelMap }) => ({
          focusedItemIndex:
            idToPanelMap[nextPanelId].initialFocusedItemIndex ?? 0,
        }));
      }

      this.showPanel(nextPanelId, 'next');
    }
  };

  showPreviousPanel = () => {
    // If there's a previous panel, then we can close the current panel to go back to it.
    if (this.hasPreviousPanel(this.state.incomingPanelId!)) {
      const previousPanelId = this.state.idToPreviousPanelIdMap[
        this.state.incomingPanelId!
      ];

      // Set focus on the item which shows the panel we're leaving.
      const previousPanel = this.state.idToPanelMap[previousPanelId];
      const focusedItemIndex = previousPanel.items!.findIndex(
        (item) =>
          !isItemSeparator(item) && item.panel === this.state.incomingPanelId
      );

      if (focusedItemIndex !== -1) {
        this.setState({
          focusedItemIndex,
        });
      }

      this.showPanel(previousPanelId, 'previous');
    }
  };

  onIncomingPanelHeightChange = (height: number) => {
    this.setState(({ height: prevHeight }) => {
      if (height === prevHeight) {
        return null;
      }

      return { height };
    });
  };

  onOutGoingPanelTransitionComplete = () => {
    this.setState({
      isOutgoingPanelVisible: false,
    });
  };

  onUseKeyboardToNavigate = () => {
    if (!this.state.isUsingKeyboardToNavigate) {
      this.setState({
        isUsingKeyboardToNavigate: true,
      });
    }
  };

  mapIdsToRenderedItems = (panels: OuiContextMenuPanelDescriptor[] = []) => {
    const idToRenderedItemsMap: { [id: string]: ReactElement[] } = {};

    // Pre-rendering the items lets us check reference equality inside of OuiContextMenuPanel.
    panels.forEach((panel) => {
      idToRenderedItemsMap[panel.id] = this.renderItems(panel.items);
    });

    return idToRenderedItemsMap;
  };

  renderItems(items: OuiContextMenuPanelItemDescriptor[] = []) {
    return items.map((item, index) => {
      if (isItemSeparator(item)) {
        const { isSeparator: omit, key = index, ...rest } = item;
        return <OuiHorizontalRule key={key} margin="none" {...rest} />;
      }

      const {
        panel,
        name,
        key,
        icon,
        onClick,
        toolTipTitle,
        toolTipContent,
        ...rest
      } = item;

      const onClickHandler = panel
        ? (event: React.MouseEvent) => {
            if (onClick && event) {
              event.persist();
            }
            // This component is commonly wrapped in a OuiOutsideClickDetector, which means we'll
            // need to wait for that logic to complete before re-rendering the DOM via showPanel.
            window.requestAnimationFrame(() => {
              if (onClick) {
                onClick(event);
              }
              this.showNextPanel(index);
            });
          }
        : onClick;

      return (
        <OuiContextMenuItem
          key={key || (typeof name === 'string' ? name : undefined) || index}
          icon={icon}
          onClick={onClickHandler}
          hasPanel={Boolean(panel)}
          toolTipTitle={toolTipTitle}
          toolTipContent={toolTipContent}
          {...rest}>
          {name}
        </OuiContextMenuItem>
      );
    });
  }

  renderPanel(
    panelId: OuiContextMenuPanelId,
    transitionType: OuiContextMenuPanelTransitionType
  ) {
    const panel = this.state.idToPanelMap[panelId];

    if (!panel) {
      return;
    }

    // As above, we need to wait for OuiOutsideClickDetector to complete its logic before
    // re-rendering via showPanel.
    let onClose;
    if (this.hasPreviousPanel(panelId)) {
      onClose = () => window.requestAnimationFrame(this.showPreviousPanel);
    }

    return (
      <OuiContextMenuPanel
        key={panelId}
        size={this.props.size}
        className="ouiContextMenu__panel"
        onHeightChange={
          transitionType === 'in' ? this.onIncomingPanelHeightChange : undefined
        }
        onTransitionComplete={
          transitionType === 'out'
            ? this.onOutGoingPanelTransitionComplete
            : undefined
        }
        title={panel.title}
        onClose={onClose}
        transitionType={
          this.state.isOutgoingPanelVisible ? transitionType : undefined
        }
        transitionDirection={
          this.state.isOutgoingPanelVisible
            ? this.state.transitionDirection
            : undefined
        }
        hasFocus={transitionType === 'in'}
        items={this.state.idToRenderedItemsMap[panelId]}
        initialFocusedItemIndex={
          this.state.isUsingKeyboardToNavigate
            ? this.state.focusedItemIndex
            : panel.initialFocusedItemIndex
        }
        onUseKeyboardToNavigate={this.onUseKeyboardToNavigate}
        showNextPanel={this.showNextPanel}
        showPreviousPanel={this.showPreviousPanel}>
        {panel.content}
      </OuiContextMenuPanel>
    );
  }

  render() {
    const { panels, className, initialPanelId, size, ...rest } = this.props;

    const incomingPanel = this.renderPanel(this.state.incomingPanelId!, 'in');
    let outgoingPanel;

    if (this.state.isOutgoingPanelVisible) {
      outgoingPanel = this.renderPanel(this.state.outgoingPanelId!, 'out');
    }

    const width =
      this.state.idToPanelMap[this.state.incomingPanelId!] &&
      this.state.idToPanelMap[this.state.incomingPanelId!].width
        ? this.state.idToPanelMap[this.state.incomingPanelId!].width
        : undefined;

    const classes = classNames(
      'ouiContextMenu',
      size && sizeToClassNameMap[size],
      className
    );

    return (
      <div
        className={classes}
        style={{ height: this.state.height, width: width }}
        {...rest}>
        {outgoingPanel}
        {incomingPanel}
      </div>
    );
  }
}
