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

import React, { Component, MouseEventHandler, Ref } from 'react';
import classNames from 'classnames';

import { OuiButton, OuiButtonProps } from '../../button';
import { OuiI18n } from '../../i18n';
import { OuiToolTip, OuiToolTipProps } from '../../tool_tip';
import { CommonProps } from '../../common';

export type OuiSuperUpdateButtonProps = CommonProps &
  Partial<Omit<OuiButtonProps, 'isDisabled' | 'isLoading' | 'onClick'>> & {
    className?: string;
    isDisabled: boolean;
    isLoading: boolean;
    needsUpdate: boolean;
    onClick: MouseEventHandler<HTMLButtonElement>;

    /**
     * Passes props to `OuiToolTip`
     */
    toolTipProps?: OuiToolTipProps;

    /**
     * Show the "Click to apply" tooltip
     */
    showTooltip: boolean;
    compressed?: boolean;
  };

export class OuiSuperUpdateButton extends Component<OuiSuperUpdateButtonProps> {
  static defaultProps = {
    needsUpdate: false,
    isLoading: false,
    isDisabled: false,
    showTooltip: false,
    compressed: false,
  };

  _isMounted = false;
  tooltipTimeout: number | undefined;
  tooltip: OuiToolTip | null = null;

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
  }

  componentDidUpdate() {
    if (
      this.props.showTooltip &&
      this.props.needsUpdate &&
      !this.props.isDisabled &&
      !this.props.isLoading
    ) {
      this.showTooltip();
      this.tooltipTimeout = (setTimeout(() => {
        this.hideTooltip();
      }, 2000) as unknown) as number | undefined;
    }
  }

  setTootipRef: Ref<OuiToolTip> = (node) => {
    this.tooltip = node;
  };

  showTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.showToolTip();
  };

  hideTooltip = () => {
    if (!this._isMounted || !this.tooltip) {
      return;
    }
    this.tooltip.hideToolTip();
  };

  render() {
    const {
      className,
      needsUpdate,
      isLoading,
      isDisabled,
      onClick,
      toolTipProps,
      showTooltip,
      compressed,
      textProps: restTextProps,
      ...rest
    } = this.props;

    const classes = classNames('ouiSuperUpdateButton', className);

    let buttonText = (
      <OuiI18n
        token="ouiSuperUpdateButton.refreshButtonLabel"
        default="Refresh"
      />
    );
    if (needsUpdate || isLoading) {
      buttonText = isLoading ? (
        <OuiI18n
          token="ouiSuperUpdateButton.updatingButtonLabel"
          default="Updating"
        />
      ) : (
        <OuiI18n
          token="ouiSuperUpdateButton.updateButtonLabel"
          default="Update"
        />
      );
    }

    let tooltipContent;
    if (isDisabled) {
      tooltipContent = (
        <OuiI18n
          token="ouiSuperUpdateButton.cannotUpdateTooltip"
          default="Cannot update"
        />
      );
    } else if (needsUpdate && !isLoading) {
      tooltipContent = (
        <OuiI18n
          token="ouiSuperUpdateButton.clickToApplyTooltip"
          default="Click to apply"
        />
      );
    }

    return (
      <OuiToolTip
        ref={this.setTootipRef}
        content={tooltipContent}
        position="bottom"
        {...toolTipProps}>
        <OuiButton
          className={classes}
          color={needsUpdate || isLoading ? 'success' : 'primary'}
          iconType="refresh"
          textProps={{
            ...restTextProps,
            className: classNames(
              'ouiSuperUpdateButton__text',
              restTextProps?.className
            ),
          }}
          isDisabled={isDisabled}
          onClick={onClick}
          isLoading={isLoading}
          size={compressed ? 's' : 'm'}
          {...rest}>
          {buttonText}
        </OuiButton>
      </OuiToolTip>
    );
  }
}
