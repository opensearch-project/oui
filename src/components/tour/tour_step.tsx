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
  FunctionComponent,
  ReactElement,
  ReactNode,
} from 'react';
import classNames from 'classnames';

import { CommonProps, NoArgCallback } from '../common';

import { OuiBeacon } from '../beacon';
import { OuiButtonEmpty, OuiButtonEmptyProps } from '../button';
import { OuiFlexGroup, OuiFlexItem } from '../flex';
import { OuiI18n } from '../i18n';
import {
  OuiPopover,
  OuiPopoverFooter,
  OuiPopoverProps,
  OuiPopoverTitle,
} from '../popover';
import { OuiTitle } from '../title';

import { OuiTourStepIndicator, OuiTourStepStatus } from './tour_step_indicator';
import { htmlIdGenerator } from '../../services';

type PopoverOverrides = 'button' | 'closePopover';

type OuiPopoverPartials = Partial<Pick<OuiPopoverProps, PopoverOverrides>>;

export interface OuiTourStepProps
  extends CommonProps,
    Omit<OuiPopoverProps, PopoverOverrides>,
    OuiPopoverPartials {
  /**
   * Element to which the tour step popover attaches when open
   */
  children: ReactElement;

  /**
   * Contents of the tour step popover
   */
  content: ReactNode;

  /**
   * Step will display if set to `true`
   */
  isStepOpen?: boolean;

  /**
   * Sets the min-width of the tour popover,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  minWidth?: boolean | number | string;

  /**
   * Function to call for 'Skip tour' and 'End tour' actions
   */
  onFinish: NoArgCallback<void>;

  /**
   * The number of the step within the parent tour. 1-based indexing.
   */
  step: number;

  /**
   * The total number of steps in the tour
   */
  stepsTotal: number;

  /**
   * Optional, standard DOM `style` attribute. Passed to the OuiPopover panel.
   */
  style?: CSSProperties;

  /**
   * Smaller title text that appears atop each step in the tour. The subtitle gets wrapped in the appropriate heading level.
   */
  subtitle: ReactNode;

  /**
   * Larger title text specific to this step. The title gets wrapped in the appropriate heading level.
   */
  title: ReactNode;

  /**
   * Extra visual indication of step location
   */
  decoration?: 'none' | 'beacon';

  /**
   * Element to replace the 'Skip tour' link in the footer
   */
  footerAction?: ReactElement;
}

export const OuiTourStep: FunctionComponent<OuiTourStepProps> = ({
  anchorPosition = 'leftUp',
  children,
  className,
  closePopover = () => {},
  content,
  isStepOpen = false,
  minWidth = true,
  onFinish,
  step = 1,
  stepsTotal,
  style,
  subtitle,
  title,
  decoration = 'beacon',
  footerAction,
  ...rest
}) => {
  const generatedId = htmlIdGenerator();
  const titleId = generatedId();
  if (step === 0) {
    console.warn(
      'OuiTourStep `step` should 1-based indexing. Please update to eliminate 0 indexes.'
    );
  }
  let newStyle;

  let widthClassName;
  if (minWidth === true) {
    widthClassName = 'ouiTour--minWidth-default';
  } else if (minWidth !== false) {
    const value = typeof minWidth === 'number' ? `${minWidth}px` : minWidth;
    newStyle = { ...style, minWidth: value };
  }

  const classes = classNames('ouiTour', widthClassName, className);

  const finishButtonProps: OuiButtonEmptyProps = {
    color: 'text',
    flush: 'right',
    size: 'xs',
  };

  const footer = (
    <OuiFlexGroup
      responsive={false}
      justifyContent={stepsTotal > 1 ? 'spaceBetween' : 'flexEnd'}>
      {stepsTotal > 1 && (
        <OuiFlexItem grow={false}>
          <ul className="ouiTourFooter__stepList">
            {[...Array(stepsTotal).keys()].map((_, i) => {
              let status: OuiTourStepStatus = 'complete';
              if (step === i + 1) {
                status = 'active';
              } else if (step <= i) {
                status = 'incomplete';
              }
              return (
                <OuiTourStepIndicator key={i} number={i + 1} status={status} />
              );
            })}
          </ul>
        </OuiFlexItem>
      )}

      {footerAction ? (
        <OuiFlexItem grow={false}>{footerAction}</OuiFlexItem>
      ) : (
        <OuiFlexItem grow={false}>
          <OuiI18n
            tokens={[
              'ouiTourStep.endTour',
              'ouiTourStep.skipTour',
              'ouiTourStep.closeTour',
            ]}
            defaults={['End tour', 'Skip tour', 'Close tour']}>
            {([endTour, skipTour, closeTour]: string[]) => {
              let content = closeTour;
              if (stepsTotal > 1) {
                content = stepsTotal === step ? endTour : skipTour;
              }
              return (
                <OuiButtonEmpty onClick={onFinish} {...finishButtonProps}>
                  {content}
                </OuiButtonEmpty>
              );
            }}
          </OuiI18n>
        </OuiFlexItem>
      )}
    </OuiFlexGroup>
  );

  const hasBeacon = decoration === 'beacon';

  return (
    <OuiPopover
      anchorPosition={anchorPosition}
      button={children}
      closePopover={closePopover}
      isOpen={isStepOpen}
      ownFocus={false}
      panelClassName={classes}
      panelStyle={newStyle || style}
      offset={hasBeacon ? 10 : 0}
      aria-labelledby={titleId}
      arrowChildren={hasBeacon && <OuiBeacon className="ouiTour__beacon" />}
      {...rest}>
      <OuiPopoverTitle className="ouiTourHeader" id={titleId}>
        <OuiTitle size="xxxs" className="ouiTourHeader__subtitle">
          <h1>{subtitle}</h1>
        </OuiTitle>
        <OuiTitle size="xxs" className="ouiTourHeader__title">
          <h2>{title}</h2>
        </OuiTitle>
      </OuiPopoverTitle>
      <div className="ouiTour__content">{content}</div>
      <OuiPopoverFooter className="ouiTourFooter">{footer}</OuiPopoverFooter>
    </OuiPopover>
  );
};
