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
  ReactNode,
  FunctionComponent,
  useState,
  useEffect,
} from 'react';
import { throttle } from '../../services';
import { OuiBreakpointSize, getBreakpoint } from '../../services/breakpoint';

export type OuiShowForBreakpoints = OuiBreakpointSize;

export interface OuiShowForProps {
  /**
   * Required otherwise nothing ever gets returned
   */
  children: ReactNode;
  /**
   * List of all the responsive sizes to show the children for.
   * Array of #OuiBreakpointSize
   */
  sizes: OuiShowForBreakpoints[] | 'all' | 'none';
}

export const OuiShowFor: FunctionComponent<OuiShowForProps> = ({
  children,
  sizes,
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
  }, [sizes, functionToCallOnWindowResize]);

  if (
    sizes === 'all' ||
    sizes.includes(currentBreakpoint as OuiBreakpointSize)
  ) {
    return <>{children}</>;
  }

  return null;
};
