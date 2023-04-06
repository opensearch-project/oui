/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';

export const getDeprecatedMessage = (message: string): string =>
  `[DEPRECATED] ${message}`;

export const deprecated = (message: string) => {
  return <T extends React.ComponentType<any>>(Component: T): T => {
    const DeprecatedWrapper = (props: React.ComponentProps<T>) => {
      useEffect(() => {
        console.warn(getDeprecatedMessage(message));
      }, []);

      return <Component {...props} />;
    };

    Object.defineProperty(DeprecatedWrapper, 'name', {
      value: Component.displayName || Component.name,
    });

    return DeprecatedWrapper as T;
  };
};
