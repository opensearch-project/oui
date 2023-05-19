/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

export const getDeprecatedMessage = (message: string): string =>
  `[DEPRECATED] ${message}`;

interface IDeprecatedComponentWarning {
  newComponentName: string;
  version?: string;
  getMessage?: (deprecatedComponentName: string) => string;
}

export const deprecatedComponentWarning = ({
  newComponentName,
  version,
  getMessage,
}: IDeprecatedComponentWarning) => {
  return <T extends React.ComponentType<any>>(Component: T): T => {
    const deprecatedComponentName = Component.displayName || Component.name;

    const DeprecatedWrapper = (props: React.ComponentProps<T>) => {
      useEffect(() => {
        const message =
          getMessage?.(deprecatedComponentName) ||
          `${deprecatedComponentName} is deprecated in favor of ${newComponentName} and will be removed in v${version}.`;
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

interface IDeprecatedPropWarning {
  props: Record<string, any>;
  version: string;
}
export const useDeprecatedPropWarning = ({
  props,
  version,
}: IDeprecatedPropWarning): void => {
  const warnedProps = useRef(new Set()).current;

  useEffect(() => {
    Object.entries(props).forEach(([name, value]) => {
      if (value !== undefined && !warnedProps.has(name)) {
        const message = `The \`${name}\` prop is deprecated and will be removed in v${version}`;
        const deprecatedMessage = getDeprecatedMessage(message);

        warnedProps.add(name);
        console.warn(deprecatedMessage);
      }
    });
  }, [warnedProps, props, version]);
};
