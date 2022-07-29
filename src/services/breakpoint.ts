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

import { keysOf } from '../components/common';

export type OuiBreakpointSize = 'xs' | 's' | 'm' | 'l' | 'xl';

export type OuiBreakpoints = {
  /**
   * Set the minimum window width at which to start to the breakpoint
   */
  [key in OuiBreakpointSize]: number;
};

export const BREAKPOINTS: OuiBreakpoints = {
  xl: 1200,
  l: 992,
  m: 768,
  s: 575,
  xs: 0,
};

export const BREAKPOINT_KEYS = keysOf(BREAKPOINTS);

/**
 * Given the current `width` and an object of `OuiBreakpoints`,
 * this function returns the string that is the name of the breakpoint key
 * that is less than or equal to the width
 *
 * @param {number} width Can either be the full window width or any width
 * @param {OuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {string | undefined} Name of the breakpoint key or `undefined` if a key doesn't exist
 */
export function getBreakpoint(
  width: number,
  breakpoints: OuiBreakpoints = BREAKPOINTS
): OuiBreakpointSize | undefined {
  // Find the breakpoint (key) whose value is <= windowWidth starting with largest first
  return keysOf(BREAKPOINTS).find((key) => breakpoints[key] <= width);
}

/**
 * Given the current `width` and a max breakpoint key,
 * this function returns true or false if the `width` falls within the max
 * breakpoint or any breakpoints below
 *
 * @param {number} width Can either be the full window width or any width
 * @param {OuiBreakpointSize | number} max The named breakpoint or custom number to check against
 * @param {OuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Will return `false` if it can't find a value for the `max` breakpoint
 */
export function isWithinMaxBreakpoint(
  width: number,
  max: OuiBreakpointSize | number,
  breakpoints: OuiBreakpoints = BREAKPOINTS
): boolean {
  if (typeof max === 'number') {
    return width <= max;
  } else {
    const currentBreakpoint = getBreakpoint(width, breakpoints);
    return currentBreakpoint
      ? breakpoints[currentBreakpoint] <= breakpoints[max]
      : false;
  }
}

/**
 * Given the current `width` and a max breakpoint key,
 * this function returns true or false if the `width` falls within the max
 * breakpoint or any breakpoints below
 *
 * @param {number} width Can either be the full window width or any width
 * @param {OuiBreakpointSize | number} min The named breakpoint or custom number to check against
 * @param {OuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Will return `false` if it can't find a value for the `min` breakpoint
 */
export function isWithinMinBreakpoint(
  width: number,
  min: OuiBreakpointSize | number,
  breakpoints: OuiBreakpoints = BREAKPOINTS
): boolean {
  if (typeof min === 'number') {
    return width >= min;
  } else {
    const currentBreakpoint = getBreakpoint(width, breakpoints);
    return currentBreakpoint
      ? breakpoints[currentBreakpoint] >= breakpoints[min]
      : false;
  }
}

/**
 * Given the current `width` and an array of breakpoint keys,
 * this function returns true or false if the `width` falls within
 * any of the named breakpoints
 *
 * @param {number} width Can either be the full window width or any width
 * @param {OuiBreakpointSize[]} sizes An array of named breakpoints
 * @param {OuiBreakpoints} breakpoints An object with keys for sizing and values for minimum width
 * @returns {boolean} Returns `true` if current breakpoint name is included in `sizes`
 */
export function isWithinBreakpoints(
  width: number,
  sizes: OuiBreakpointSize[],
  breakpoints: OuiBreakpoints = BREAKPOINTS
): boolean {
  const currentBreakpoint = getBreakpoint(width, breakpoints);
  return currentBreakpoint ? sizes.includes(currentBreakpoint) : false;
}

/* OUI -> EUI Aliases */
export type EuiBreakpointSize = OuiBreakpointSize;
export type EuiBreakpoints = OuiBreakpoints;
/* End of Aliases */
