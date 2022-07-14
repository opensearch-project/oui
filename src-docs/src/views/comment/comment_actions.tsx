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

import React, { Component, HTMLAttributes } from 'react';
import { OuiComment } from '../../../../src/components/comment_list';
import { OuiButtonIcon } from '../../../../src/components/button';
import { OuiText } from '../../../../src/components/text';
import { OuiPopover } from '../../../../src/components/popover';
import {
  OuiContextMenuPanel,
  OuiContextMenuItem,
} from '../../../../src/components/context_menu';
import { CommonProps } from '../../../../src/components/common';

const body = (
  <OuiText size="s">
    <p>
      This comment has custom actions available. See the upper right corner.
    </p>
  </OuiText>
);

export type CustomActionsProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {};

interface CustomActionsState {
  isPopoverOpen: boolean;
}

export default class extends Component<CustomActionsProps, CustomActionsState> {
  state = {
    isPopoverOpen: false,
  };

  togglePopover = () => {
    this.setState((prevState) => ({
      isPopoverOpen: !prevState.isPopoverOpen,
    }));
  };

  closePopover = () => {
    this.setState({
      isPopoverOpen: false,
    });
  };

  render() {
    const { isPopoverOpen } = this.state;
    const customActions = (
      <OuiPopover
        button={
          <OuiButtonIcon
            aria-label="Actions"
            iconType="gear"
            size="s"
            color="text"
            onClick={() => this.togglePopover()}
          />
        }
        isOpen={isPopoverOpen}
        closePopover={() => this.closePopover()}
        panelPaddingSize="none"
        anchorPosition="leftCenter">
        <OuiContextMenuPanel
          items={[
            <OuiContextMenuItem
              key="A"
              icon="pencil"
              onClick={() => {
                this.closePopover();
              }}>
              Edit
            </OuiContextMenuItem>,
            <OuiContextMenuItem
              key="B"
              icon="share"
              onClick={() => {
                this.closePopover();
              }}>
              Share
            </OuiContextMenuItem>,
            <OuiContextMenuItem
              key="C"
              icon="copy"
              onClick={() => {
                this.closePopover();
              }}>
              Copy
            </OuiContextMenuItem>,
          ]}
        />
      </OuiPopover>
    );
    return (
      <div>
        <OuiComment
          username="janed"
          event="added a comment"
          actions={customActions}
          timestamp="Jan 1, 2020">
          {body}
        </OuiComment>
      </div>
    );
  }
}
