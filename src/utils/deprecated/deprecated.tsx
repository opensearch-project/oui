/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

interface IDeprecatedComponentWarning {
  NewComponent: React.ComponentType<any>;
  version: string;
}

interface IDeprecatedPropWarning {
  deprecatedProp: any;
  deprecatedPropName: string;
  version: string;
}

export const getDeprecatedMessage = (message: string): string =>
  `[DEPRECATED] ${message}`;

export const deprecatedComponentWarning = ({
  NewComponent,
  version,
}: IDeprecatedComponentWarning) => {
  return <T extends React.ComponentType<any>>(Component: T): T => {
    const deprecatedComponentName = Component.displayName || Component.name;
    const newComponentName = NewComponent.displayName || NewComponent.name;

    const DeprecatedWrapper = (props: React.ComponentProps<T>) => {
      useEffect(() => {
        const formattedMessage = `${deprecatedComponentName} is deprecated in favor of ${newComponentName} and will be removed in v${version}.`;
        const deprecatedMessage = getDeprecatedMessage(formattedMessage);

        console.warn(deprecatedMessage);
      }, []);

      return <Component {...props} />;
    };

    Object.defineProperty(DeprecatedWrapper, 'name', {
      value: Component.displayName || Component.name,
    });

    return DeprecatedWrapper as T;
  };
};

export const useDeprecatedPropWarning = ({
  deprecatedProp,
  deprecatedPropName,
  version,
}: IDeprecatedPropWarning): void => {
  useEffect(() => {
    if (deprecatedProp !== undefined) {
      const formattedMessage = `The \`${deprecatedPropName}\` prop is deprecated and will be removed in v${version}`;
      const deprecatedMessage = getDeprecatedMessage(formattedMessage);

      console.warn(deprecatedMessage);
    }
  }, [deprecatedProp, deprecatedPropName, version]);
};
