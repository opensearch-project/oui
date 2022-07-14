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

import React, { Component, HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { CommonProps, keysOf } from '../common';

import { OuiIcon } from '../icon';
import { OuiLoadingSpinner } from '../loading';
import { OuiResizeObserver } from '../observer/resize_observer';
import { OuiI18n } from '../i18n';
import { htmlIdGenerator } from '../../services';

const paddingSizeToClassNameMap = {
  none: '',
  xs: 'ouiAccordion__padding--xs',
  s: 'ouiAccordion__padding--s',
  m: 'ouiAccordion__padding--m',
  l: 'ouiAccordion__padding--l',
  xl: 'ouiAccordion__padding--xl',
};

export const PADDING_SIZES = keysOf(paddingSizeToClassNameMap);
export type OuiAccordionSize = keyof typeof paddingSizeToClassNameMap;

export type OuiAccordionProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'id'> & {
    id: string;
    /**
     * Class that will apply to the trigger for the accordion.
     */
    buttonClassName?: string;
    /**
     * Apply more props to the triggering button
     */
    buttonProps?: CommonProps & HTMLAttributes<HTMLButtonElement>;
    /**
     * Class that will apply to the trigger content for the accordion.
     */
    buttonContentClassName?: string;
    /**
     * The content of the clickable trigger
     */
    buttonContent?: ReactNode;
    /**
     * Will appear right aligned against the button. Useful for separate actions like deletions.
     */
    extraAction?: ReactNode;
    /**
     * The accordion will start in the open state.
     */
    initialIsOpen: boolean;
    /**
     * Optional callback method called on open and close with a single `isOpen` parameter
     */
    onToggle?: (isOpen: boolean) => void;
    /**
     * The padding around the exposed accordion content.
     */
    paddingSize?: OuiAccordionSize;
    /**
     * Placement of the arrow indicator, or 'none' to hide it.
     */
    arrowDisplay?: 'left' | 'right' | 'none';
    /**
     * Control the opening of accordion via prop
     */
    forceState?: 'closed' | 'open';
    /**
     * Change `extraAction` and children into a loading spinner
     */
    isLoading?: boolean;
    /**
     * Choose whether the loading message replaces the content. Customize the message by passing a node
     */
    isLoadingMessage?: boolean | ReactNode;
  };

export class OuiAccordion extends Component<
  OuiAccordionProps,
  { isOpen: boolean }
> {
  static defaultProps = {
    initialIsOpen: false,
    paddingSize: 'none',
    arrowDisplay: 'left',
    isLoading: false,
    isLoadingMessage: false,
  };

  childContent: HTMLDivElement | null = null;
  childWrapper: HTMLDivElement | null = null;

  state = {
    isOpen: this.props.forceState
      ? this.props.forceState === 'open'
      : this.props.initialIsOpen,
  };

  setChildContentHeight = () => {
    const { forceState } = this.props;
    requestAnimationFrame(() => {
      const height =
        this.childContent &&
        (forceState ? forceState === 'open' : this.state.isOpen)
          ? this.childContent.clientHeight
          : 0;
      this.childWrapper &&
        this.childWrapper.setAttribute('style', `height: ${height}px`);
    });
  };

  componentDidMount() {
    this.setChildContentHeight();
  }

  componentDidUpdate() {
    this.setChildContentHeight();
  }

  onToggle = () => {
    const { forceState } = this.props;
    if (forceState) {
      this.props.onToggle &&
        this.props.onToggle(forceState === 'open' ? false : true);
    } else {
      this.setState(
        (prevState) => ({
          isOpen: !prevState.isOpen,
        }),
        () => {
          if (this.state.isOpen && this.childWrapper) {
            this.childWrapper.focus();
          }
          this.props.onToggle && this.props.onToggle(this.state.isOpen);
        }
      );
    }
  };

  setChildContentRef = (node: HTMLDivElement | null) => {
    this.childContent = node;
  };

  render() {
    const {
      children,
      buttonContent,
      className,
      id,
      buttonClassName,
      buttonContentClassName,
      extraAction,
      paddingSize,
      initialIsOpen,
      arrowDisplay,
      forceState,
      isLoading,
      isLoadingMessage,
      buttonProps,
      ...rest
    } = this.props;

    const isOpen = forceState ? forceState === 'open' : this.state.isOpen;

    const classes = classNames(
      'ouiAccordion',
      {
        'ouiAccordion-isOpen': isOpen,
      },
      className
    );

    const paddingClass = paddingSize
      ? classNames(paddingSizeToClassNameMap[paddingSize])
      : undefined;

    const childrenClasses = classNames(paddingClass, {
      'ouiAccordion__children-isLoading': isLoading,
    });

    const buttonClasses = classNames(
      'ouiAccordion__button',
      {
        ouiAccordion__buttonReverse: !extraAction && arrowDisplay === 'right',
      },
      buttonClassName,
      buttonProps?.className
    );

    const iconClasses = classNames('ouiAccordion__icon', {
      'ouiAccordion__icon-isOpen': isOpen,
    });

    const iconWrapperClasses = classNames('ouiAccordion__iconWrapper', {
      ouiAccordion__iconButton: extraAction && arrowDisplay === 'right',
    });

    let baseIcon;
    if (arrowDisplay !== 'none') {
      baseIcon = <OuiIcon className={iconClasses} type="arrowRight" size="m" />;
    }

    let icon;
    let iconButton;
    const buttonId = buttonProps?.id ?? htmlIdGenerator()();
    if (extraAction && arrowDisplay === 'right') {
      iconButton = (
        <button
          aria-controls={id}
          aria-expanded={isOpen}
          aria-labelledby={buttonId}
          tabIndex={-1}
          className={iconWrapperClasses}
          onClick={this.onToggle}>
          {baseIcon}
        </button>
      );
    } else if (arrowDisplay !== 'none') {
      icon = <span className={iconWrapperClasses}>{baseIcon}</span>;
    }

    let optionalAction = null;

    if (extraAction && !isLoading) {
      optionalAction = (
        <div className="ouiAccordion__optionalAction">{extraAction}</div>
      );
    } else if (isLoading) {
      optionalAction = (
        <div className="ouiAccordion__optionalAction">
          <OuiLoadingSpinner />
        </div>
      );
    }

    let childrenContent: any;
    if (isLoading && isLoadingMessage) {
      childrenContent = (
        <>
          <OuiLoadingSpinner className="ouiAccordion__spinner" />
          <span>
            {isLoadingMessage && isLoadingMessage !== true ? (
              isLoadingMessage
            ) : (
              <OuiI18n token="ouiAccordion.isLoading" default="Loading" />
            )}
          </span>
        </>
      );
    } else {
      childrenContent = children;
    }

    return (
      <div className={classes} {...rest}>
        <div className="ouiAccordion__triggerWrapper">
          <button
            {...buttonProps}
            id={buttonId}
            aria-controls={id}
            aria-expanded={isOpen}
            onClick={this.onToggle}
            className={buttonClasses}
            type="button">
            {icon}
            <span
              className={classNames(
                'ouiIEFlexWrapFix',
                buttonContentClassName
              )}>
              {buttonContent}
            </span>
          </button>
          {optionalAction}
          {iconButton}
        </div>

        <div
          className="ouiAccordion__childWrapper"
          ref={(node) => {
            this.childWrapper = node;
          }}
          tabIndex={-1}
          role="region"
          aria-labelledby={buttonId}
          id={id}>
          <OuiResizeObserver onResize={this.setChildContentHeight}>
            {(resizeRef) => (
              <div
                ref={(ref) => {
                  this.setChildContentRef(ref);
                  resizeRef(ref);
                }}>
                <div className={childrenClasses}>{childrenContent}</div>
              </div>
            )}
          </OuiResizeObserver>
        </div>
      </div>
    );
  }
}
