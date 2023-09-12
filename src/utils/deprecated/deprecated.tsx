/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { ExclusiveUnion } from '../../components/common';

export const getDeprecatedMessage = (message: string): string =>
  `[DEPRECATED] ${message}`;

type DeprecatedComponentWarning = ExclusiveUnion<
  { newComponentName: string; version?: string },
  { getMessage?: (deprecatedComponentName: string) => string }
>;

export const deprecatedComponentWarning = ({
  newComponentName,
  version,
  getMessage,
}: DeprecatedComponentWarning) => {
  return <T extends React.ComponentType<any>>(Component: T): T => {
    const deprecatedComponentName = Component.displayName || Component.name;

    const DeprecatedWrapper = (props: React.ComponentProps<T>) => {
      useEffect(() => {
        const defaultMessage = version
          ? `${deprecatedComponentName} is deprecated in favor of ${newComponentName} and will be removed in v${version}.`
          : `${deprecatedComponentName} is deprecated in favor of ${newComponentName} and will be removed.`;
        const message = getMessage?.(deprecatedComponentName) || defaultMessage;
        const deprecatedMessage = getDeprecatedMessage(message);

        console.warn(deprecatedMessage);
      }, []);

      return <Component {...props} />;
    };

    Object.defineProperty(DeprecatedWrapper, 'name', {
      value: deprecatedComponentName,
    });

    return DeprecatedWrapper as T;
  };
};

type _DeprecatedPropWarningExclusiveProps = ExclusiveUnion<
  { version?: string },
  { getMessage?: (deprecatedComponentName: string) => string }
>;

type DeprecatedPropWarning = {
  props: Record<string, unknown>;
} & _DeprecatedPropWarningExclusiveProps;

export const useDeprecatedPropWarning = ({
  props,
  version,
  getMessage,
}: DeprecatedPropWarning): void => {
  const warnedProps = useRef(new Set()).current;

  useEffect(() => {
    Object.entries(props).forEach(([name, value]) => {
      if (value !== undefined && !warnedProps.has(name)) {
        const defaultMessage = version
          ? `The \`${name}\` prop is deprecated and will be removed in v${version}.`
          : `The \`${name}\` prop is deprecated and will be removed.`;
        const message = getMessage?.(name) || defaultMessage;
        const deprecatedMessage = getDeprecatedMessage(message);

        warnedProps.add(name);
        console.warn(deprecatedMessage);
      }
    });
  }, [warnedProps, props, version, getMessage]);
};
