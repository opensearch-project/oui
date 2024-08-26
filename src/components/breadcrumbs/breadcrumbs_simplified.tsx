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

import React, {
  Fragment,
  FunctionComponent,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { OuiI18n } from '../i18n';
import { OuiInnerText } from '../inner_text';
import { OuiLink } from '../link';
import { OuiPopover } from '../popover';
import { OuiIcon } from '../icon';
import { throttle } from '../../services';
import { OuiBreakpointSize, getBreakpoint } from '../../services/breakpoint';
import {
  OuiBreadcrumbResponsiveMaxCount,
  OuiBreadcrumb,
  OuiBreadcrumbsProps,
} from './breadcrumbs';

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
        token="ouiBreadcrumbsSimplified.collapsedBadge.ariaLabel"
        default="Show collapsed breadcrumbs">
        {(ariaLabel: string) => (
          <OuiLink
            className="ouiSimplifiedBreadcrumb__collapsedLink"
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
        <div className="ouiSimplifiedBreadcrumbWrapper ouiSimplifiedBreadcrumbWrapper--collapsed">
          <OuiPopover
            className="ouiSimplifiedBreadcrumb ouiSimplifiedBreadcrumb--collapsed"
            button={ellipsisButton}
            isOpen={isPopoverOpen}
            closePopover={() => setIsPopoverOpen(false)}>
            <OuiSimplifiedBreadcrumbs
              className="ouiSimplifiedBreadcrumbs__inPopover"
              breadcrumbs={overflowBreadcrumbs}
              responsive={false}
              truncate={false}
              max={0}
            />
          </OuiPopover>
        </div>
        <OuiBreadcrumbSeparator />
      </Fragment>
    );
  };

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(<OuiBreadcrumbCollapsed key="collapsed" />);
  }

  return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
};

const OuiBreadcrumbSeparator = () => <div className="ouiBreadcrumbSeparator" />;

export const OuiSimplifiedBreadcrumbs: FunctionComponent<OuiBreadcrumbsProps> = ({
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

    const isFirstBreadcrumb = index === 0;
    const isLastBreadcrumb = index === breadcrumbs.length - 1;

    const breadcrumbWrapperClasses = classNames(
      'ouiSimplifiedBreadcrumbWrapper',
      {
        'ouiSimplifiedBreadcrumbWrapper--first': isFirstBreadcrumb,
        'ouiSimplifiedBreadcrumbWrapper--last': isLastBreadcrumb,
        'ouiSimplifiedBreadcrumbWrapper--truncate': truncate,
      }
    );

    const breadcrumbClasses = classNames(
      'ouiSimplifiedBreadcrumb',
      breadcrumbClassName,
      {
        'ouiSimplifiedBreadcrumb--last': isLastBreadcrumb,
        'ouiSimplifiedBreadcrumb--truncate': truncate,
      }
    );

    const link =
      !href && !onClick ? (
        <OuiInnerText>
          {(ref, innerText) => (
            <span
              ref={ref}
              className={breadcrumbClasses}
              title={innerText}
              aria-current={isLastBreadcrumb ? 'page' : 'false'}
              {...breadcrumbRest}>
              {text}
            </span>
          )}
        </OuiInnerText>
      ) : (
        <OuiInnerText>
          {(ref, innerText) => (
            <OuiLink
              ref={ref}
              color={isLastBreadcrumb ? 'text' : 'subdued'}
              onClick={onClick}
              href={href}
              className={breadcrumbClasses}
              title={innerText}
              {...breadcrumbRest}>
              {text}
            </OuiLink>
          )}
        </OuiInnerText>
      );

    const breadcrumbWallClasses = classNames('ouiSimplifiedBreadcrumbWall', {
      'ouiSimplifiedBreadcrumbWall--single':
        isFirstBreadcrumb && isLastBreadcrumb,
    });

    const wrapper = <div className={breadcrumbWrapperClasses}>{link}</div>;
    const wall = isFirstBreadcrumb ? (
      <div className={breadcrumbWallClasses}>{wrapper}</div>
    ) : (
      wrapper
    );

    const separator = <OuiBreadcrumbSeparator />;

    return (
      <Fragment key={index}>
        {wall}
        {separator}
      </Fragment>
    );
  });

  // Use the default object if they simply passed `true` for responsive
  const responsiveObject =
    typeof responsive === 'object' ? responsive : responsiveDefault;

  // The max property collapses any breadcrumbs past the max quantity.
  // This is the same behavior we want for responsiveness.
  // So calculate the max value based on the combination of `max` and `responsive`

  // First, calculate the responsive max value
  const responsiveMax =
    responsive && responsiveObject[currentBreakpoint as OuiBreakpointSize]
      ? responsiveObject[currentBreakpoint as OuiBreakpointSize]
      : null;

  // Second, if both max and responsiveMax are set, use the smaller of the two. Otherwise, use the one that is set.
  const calculatedMax: OuiBreadcrumbsProps['max'] =
    max && responsiveMax ? Math.min(max, responsiveMax) : max || responsiveMax;

  const limitedBreadcrumbs = calculatedMax
    ? limitBreadcrumbs(breadcrumbElements, calculatedMax, breadcrumbs)
    : breadcrumbElements;

  const classes = classNames('ouiSimplifiedBreadcrumbs', className, {
    'ouiSimplifiedBreadcrumbs--truncate': truncate,
  });

  return (
    <nav aria-label="breadcrumb" className={classes} {...rest}>
      {limitedBreadcrumbs}
    </nav>
  );
};
