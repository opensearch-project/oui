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

import { OuiI18n } from '../../i18n';
import { OuiInnerText } from '../../inner_text';
import { OuiLink } from '../../link';
import { OuiPopover } from '../../popover';
import { OuiIcon } from '../../icon';
import { throttle } from '../../../services';
import { OuiBreakpointSize, getBreakpoint } from '../../../services/breakpoint';
import {
  OuiBreadcrumbResponsiveMaxCount,
  OuiBreadcrumb,
  OuiBreadcrumbsProps,
} from '../breadcrumbs';

export type OuiSimplifiedBreadcrumbsProps = OuiBreadcrumbsProps & {
  hideTrailingSeparator?: boolean;
  disableTrailingLink?: boolean;
  hideLastBreadCrumb?: boolean;
};

const responsiveDefault: OuiBreadcrumbResponsiveMaxCount = {
  xs: 1,
  s: 2,
  m: 4,
  l: 6,
  xl: 8,
  xxl: 10,
  xxxl: 12,
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
        token="ouiSimplifiedBreadcrumbs.collapsedBadge.ariaLabel"
        default="Show collapsed breadcrumbs">
        {(ariaLabel: string) => (
          <OuiLink
            className="ouiSimplifiedBreadcrumb ouiSimplifiedBreadcrumb__collapsedLink"
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
            hideLastBreadCrumb={false}
            hideTrailingSeparator={true}
            disableTrailingLink={false}
            max={0}
          />
        </OuiPopover>
        <OuiBreadcrumbSeparator />
      </Fragment>
    );
  };

  if (max < breadcrumbs.length) {
    breadcrumbsAtStart.push(<OuiBreadcrumbCollapsed key="collapsed" />);
  }

  return [...breadcrumbsAtStart, ...breadcrumbsAtEnd];
};

const OuiBreadcrumbSeparator = () => (
  // preserveAspectRatio is none so we can stretch it vertically and keep the width fixed
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 8 12"
    preserveAspectRatio="none"
    className="ouiBreadcrumbSeparator">
    <path fill="currentColor" d="M2 12H0L6 0h2z" />
  </svg>
);

export const OuiSimplifiedBreadcrumbs: FunctionComponent<OuiSimplifiedBreadcrumbsProps> = ({
  breadcrumbs,
  className,
  responsive = responsiveDefault,
  truncate = true,
  max = 5,
  hideTrailingSeparator,
  disableTrailingLink,
  hideLastBreadCrumb,
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

    const breadcrumbsLength = breadcrumbs.length;
    const isLastBreadcrumb = index === breadcrumbsLength - 1;

    if (isLastBreadcrumb && hideLastBreadCrumb) return null;

    const isFirstBreadcrumb = index === 0;
    // If hideLastBreadCrumb, the trailing breadcrumb would be the one before the last
    const isTrailingBreadcrumb =
      index >= breadcrumbsLength - (hideLastBreadCrumb ? 2 : 1);

    const breadcrumbClasses = classNames(
      'ouiSimplifiedBreadcrumb',
      breadcrumbClassName,
      {
        'ouiSimplifiedBreadcrumb--last': isLastBreadcrumb,
        'ouiSimplifiedBreadcrumb--truncate': truncate,
      }
    );

    const link =
      !(href || onClick) || (isTrailingBreadcrumb && disableTrailingLink) ? (
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

    const wall = isFirstBreadcrumb ? (
      <div
        className={classNames('ouiSimplifiedBreadcrumbWall', {
          'ouiSimplifiedBreadcrumbWall--single':
            isFirstBreadcrumb && isLastBreadcrumb,
        })}>
        {link}
      </div>
    ) : (
      link
    );

    const separator =
      hideTrailingSeparator && isTrailingBreadcrumb ? null : (
        <OuiBreadcrumbSeparator />
      );

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
    (responsive && responsiveObject[currentBreakpoint as OuiBreakpointSize]) ||
    null;

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
