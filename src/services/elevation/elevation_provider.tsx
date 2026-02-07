/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useMemo, FunctionComponent } from 'react';
import { ElevationContext, ElevationContextValue } from './elevation_context';

const STARTING_Z_INDEX = 90;
const Z_INDEX_INCREMENT = 10;

export const OuiElevationProvider: FunctionComponent = ({ children }) => {
  const nextZIndexRef = useRef(STARTING_Z_INDEX);

  const contextValue = useMemo<ElevationContextValue>(
    () => ({
      register: () => {
        const zIndex = nextZIndexRef.current;
        nextZIndexRef.current += Z_INDEX_INCREMENT;
        return zIndex;
      },
      unregister: (_zIndex: number) => {
        // Z-index values are not recycled within a provider lifecycle
        // to prevent flicker from reuse
      },
    }),
    []
  );

  return (
    <ElevationContext.Provider value={contextValue}>
      {children}
    </ElevationContext.Provider>
  );
};
