/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { createContext } from 'react';

export interface ElevationContextValue {
  register: () => number;
  unregister: (zIndex: number) => void;
}

export const ElevationContext = createContext<
  ElevationContextValue | undefined
>(undefined);
