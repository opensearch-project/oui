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
  Fragment,
  FunctionComponent,
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import { OuiI18n } from '../i18n';
import { OuiInnerText } from '../inner_text';
import { OuiLink } from '../link';
import { OuiPopover } from '../popover';
import { OuiIcon } from '../icon';
import { throttle } from '../../services';
import { OuiBreakpointSize, getBreakpoint } from '../../services/breakpoint';

export type OuiBreadcrumbResponsiveMaxCount = {
  /**
   * Any of the following keys are allowed: `'xs' | 's' | 'm' | 'l' | 'xl'`
   * Omitting a key will display all breadcrumbs at that breakpoint
   */
  [key in OuiBreakpointSize]?: number;
};

export type OuiBreadcrumb = CommonProps & {
  /**
   * Visible label of the breadcrumb
   */
  text: ReactNode;
  href?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /**
   * Force a max-width on the breadcrumb text
   */
  truncate?: boolean;
};

export type OuiBreadcrumbsProps = CommonProps & {
  /**
   * Hides extra (above the max) breadcrumbs under a collapsed item as the window gets smaller.
   * Pass a custom #OuiBreadcrumbResponsiveMaxCount object to change the number of breadcrumbs to show at the particular breakpoints.
   * Omitting or passing a `0` value will show all breadcrumbs.
   *
   * Pass `false` to turn this behavior off.
   *
   * Default: `{ xs: 1, s: 2, m: 4 }`
   */
  responsive?: boolean | OuiBreadcrumbResponsiveMaxCount;

  /**
   * Forces all breadcrumbs to single line and
   * truncates each breadcrumb to a particular width,
   * except for the last item
   */
  truncate?: boolean;

  /**
   * Collapses the inner items past the maximum set here
   * into a single ellipses item
   */
  max?: number | null;

  /**
   * The array of individual #OuiBreadcrumb items
   */
  breadcrumbs: OuiBreadcrumb[];
};

const responsiveDefault: OuiBreadcrumbResponsiveMaxCount = {
  xs: 1,
  s: 2,
  m: 4,
};

const limitBreadcrumbs = (
  breadcrumbs: ReactNode[],
  max: number,
  allBreadcrumbs: OuiBreadcrumb[]
) => {
  const breadcrumbsAtStart = [];
  const breadcrumbsAtEnd = [];
  const limit = Math.min(max, breadcrumbs.length);
  const start = Math.floor(limit / 2);
  const overflowBreadcrumbs = allBreadcrumbs.slice(
    start,
    start + breadcrumbs.length - limit
  );

  for (let i = 0; i < limit; i++) {
    // We'll alternate with displaying breadcrumbs at the end and at the start, but be biased
    // towards breadcrumbs the end so that if max is an odd number, we'll have one more
    // breadcrumb visible at the end than at the beginning.
    const isEven = i % 2 === 0;

    // We're picking breadcrumbs from the front AND the back, so we treat each iteration as a
    // half-iteration.
    const normalizedIndex = Math.floor(i * 0.5);
    const indexOfBreadcrumb = isEven
      ? breadcrumbs.length - 1 - normalizedIndex
      : normalizedIndex;
    const breadcrumb = breadcrumbs[indexOfBreadcrumb];

    if (isEven) {
      breadcrumbsAtEnd.unshift(breadcrumb);
    } else {
      breadcrumbsAtStart.push(breadcrumb);
    }
  }

  const OuiBreadcrumbCollapsed = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const ellipsisButton = (
      <OuiI18n
        token="ouiBreadcrumbs.collapsedBadge.ariaLabel"
        default="Show collapsed breadcrumbs">
        {(ariaLabel: string) => (
          <OuiLink
            className="ouiBreadcrumb__collapsedLink"
            color="subdued"
            aria-label={ariaLabel}
            title={ariaLabel}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
            &hellip; <OuiIcon type="arrowDown" size="s" />
          </OuiLink>
        )}
      </OuiI18n>
    );

    return (
      <Fragment>
        <div className="ouiBreadcrumbWrapper ouiBreadcrumbWrapper--collapsed">
          <OuiPopover
            className="ouiBreadcrumb ouiBreadcrumb--collapsed"
            button={ellipsisButton}
            isOpen={isPopoverOpen}
            closePopover={() => setIsPopoverOpen(false)}>
            <OuiBreadcrumbs
              className="ouiBreadcrumbs__inPopover"
              breadcrumbs={overflowBreadcrumbs}
              responsive={false}
              truncate={false}
              max={0}
            />
          </OuiPopover>
        </div>
      </Fragment>
    );
  };

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(<OuiBreadcrumbCollapsed key="collapsed" />);
  }

  return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
};

export const OuiBreadcrumbs: FunctionComponent<OuiBreadcrumbsProps> = ({
  breadcrumbs,
  className,
  responsive = responsiveDefault,
  truncate = true,
  max = 5,
  ...rest
}) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState(
    getBreakpoint(typeof window === 'undefined' ? -Infinity : window.innerWidth)
  );

  const functionToCallOnWindowResize = throttle(() => {
    const newBreakpoint = getBreakpoint(window.innerWidth);
    if (newBreakpoint !== currentBreakpoint) {
      setCurrentBreakpoint(newBreakpoint);
    }
    // reacts every 50ms to resize changes and always gets the final update
  }, 50);

  // Add window resize handlers
  useEffect(() => {
    window.addEventListener('resize', functionToCallOnWindowResize);

    return () => {
      window.removeEventListener('resize', functionToCallOnWindowResize);
    };
  }, [responsive, functionToCallOnWindowResize]);

  const breadcrumbElements = breadcrumbs.map((breadcrumb, index) => {
    const {
      text,
      href,
      onClick,
      truncate,
      className: breadcrumbClassName,
      ...breadcrumbRest
    } = breadcrumb;

    const isLastBreadcrumb = index === breadcrumbs.length - 1;

    const breadcrumbWrapperClasses = classNames('ouiBreadcrumbWrapper', {
      'ouiBreadcrumbWrapper--last': isLastBreadcrumb,
      'ouiBreadcrumbWrapper--truncate': truncate,
    });

    const breadcrumbClasses = classNames('ouiBreadcrumb', breadcrumbClassName, {
      'ouiBreadcrumb--last': isLastBreadcrumb,
      'ouiBreadcrumb--truncate': truncate,
    });

    let link;

    if (!href && !onClick) {
      link = (
        <OuiInnerText>
          {(ref, innerText) => (
            <span ref={ref} className={breadcrumbWrapperClasses}>
              <span
                className={breadcrumbClasses}
                title={innerText}
                aria-current={isLastBreadcrumb ? 'page' : 'false'}
                {...breadcrumbRest}>
                {text}
              </span>
            </span>
          )}
        </OuiInnerText>
      );
    } else {
      link = (
        <OuiInnerText>
          {(ref, innerText) => (
            <span ref={ref} className={breadcrumbWrapperClasses}>
              <OuiLink
                color={isLastBreadcrumb ? 'text' : 'subdued'}
                onClick={onClick}
                href={href}
                className={breadcrumbClasses}
                title={innerText}
                {...breadcrumbRest}>
                {text}
              </OuiLink>
            </span>
          )}
        </OuiInnerText>
      );
    }

    return <Fragment key={index}>{link}</Fragment>;
  });

  // Use the default object if they simply passed `true` for responsive
  const responsiveObject =
    typeof responsive === 'object' ? responsive : responsiveDefault;

  // The max property collapses any breadcrumbs past the max quantity.
  // This is the same behavior we want for responsiveness.
  // So calculate the max value based on the combination of `max` and `responsive`
  let calculatedMax: OuiBreadcrumbsProps['max'] = max;
  // Set the calculated max to the number associated with the currentBreakpoint key if it exists
  if (responsive && responsiveObject[currentBreakpoint as OuiBreakpointSize]) {
    calculatedMax = responsiveObject[currentBreakpoint as OuiBreakpointSize];
  }
  // Final check is to make sure max is used over a larger breakpoint value
  if (max && calculatedMax) {
    calculatedMax = max < calculatedMax ? max : calculatedMax;
  }

  const limitedBreadcrumbs = calculatedMax
    ? limitBreadcrumbs(breadcrumbElements, calculatedMax, breadcrumbs)
    : breadcrumbElements;

  const classes = classNames('ouiBreadcrumbs', className, {
    'ouiBreadcrumbs--truncate': truncate,
  });

  return (
    <nav aria-label="breadcrumb" className={classes} {...rest}>
      {limitedBreadcrumbs}
    </nav>
  );
};
