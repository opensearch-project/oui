/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { useContext, useEffect, useRef, CSSProperties } from 'react';
import { ElevationContext } from './elevation_context';

export interface UseElevationOptions {
  isEnabled?: boolean;
}

export interface UseElevationReturn {
  style: CSSProperties;
}

export function useElevation(
  options?: UseElevationOptions
): UseElevationReturn {
  const { isEnabled = true } = options || {};
  const context = useContext(ElevationContext);
  const zIndexRef = useRef<number | null>(null);
  const registeredRef = useRef(false);

  // Eagerly register on first render so the z-index is available
  // immediately (useEffect runs after paint, which would be too late).
  if (isEnabled && context && !registeredRef.current) {
    zIndexRef.current = context.register();
    registeredRef.current = true;
  }

  // Clean up on unmount or when isEnabled changes to false
  useEffect(() => {
    return () => {
      if (registeredRef.current && context && zIndexRef.current !== null) {
        context.unregister(zIndexRef.current);
        zIndexRef.current = null;
        registeredRef.current = false;
      }
    };
  }, [context]);

  if (!context) {
    if (
      typeof process !== 'undefined' &&
      process.env.NODE_ENV !== 'production'
    ) {
      console.warn(
        'useElevation: No ElevationProvider found. The hook will return an empty style object. ' +
          'Wrap your application in <OuiElevationProvider> to enable dynamic z-index management.'
      );
    }
    return { style: {} };
  }

  if (!isEnabled) {
    return { style: {} };
  }

  return {
    style: zIndexRef.current !== null ? { zIndex: zIndexRef.current } : {},
  };
}
