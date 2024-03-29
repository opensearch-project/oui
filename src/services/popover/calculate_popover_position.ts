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

import { OuiPopoverPosition } from './types';

interface OuiPopoverBoundingBox {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface OuiPopoverAnchorRect extends OuiPopoverBoundingBox {
  right: number;
  bottom: number;
}

interface OuiPopoverDimensions {
  width: number;
  height: number;
}

interface OuiPopoverPositionedBox extends OuiPopoverBoundingBox {
  position: OuiPopoverPosition;
}

const getVisibleArea = (
  bounds: OuiPopoverBoundingBox,
  windowWidth: number,
  windowHeight: number
): number => {
  const { left, top, width, height } = bounds;
  // This is a common algorithm for finding the intersected area among two rectangles.
  const dx = Math.min(left + width, windowWidth) - Math.max(left, 0);
  const dy = Math.min(top + height, windowHeight) - Math.max(top, 0);
  return dx * dy;
};

type Positioner = (
  bounds: OuiPopoverAnchorRect,
  width: number,
  height: number,
  buffer: number
) => OuiPopoverBoundingBox;

const positionAtTop: Positioner = (anchorBounds, width, height, buffer) => {
  const widthDifference = width - anchorBounds.width;
  const left = anchorBounds.left - widthDifference * 0.5;
  const top = anchorBounds.top - height - buffer;
  return { left, top, width, height };
};

const positionAtRight: Positioner = (anchorBounds, width, height, buffer) => {
  const left = anchorBounds.right + buffer;
  const heightDifference = height - anchorBounds.height;
  const top = anchorBounds.top - heightDifference * 0.5;
  return { left, top, width, height };
};

const positionAtBottom: Positioner = (anchorBounds, width, height, buffer) => {
  const widthDifference = width - anchorBounds.width;
  const left = anchorBounds.left - widthDifference * 0.5;
  const top = anchorBounds.bottom + buffer;
  return { left, top, width, height };
};

const positionAtLeft: Positioner = (anchorBounds, width, height, buffer) => {
  const left = anchorBounds.left - width - buffer;
  const heightDifference = height - anchorBounds.height;
  const top = anchorBounds.top - heightDifference * 0.5;
  return { left, top, width, height };
};

const positionToPositionerMap: { [position: string]: Positioner } = {
  top: positionAtTop,
  right: positionAtRight,
  bottom: positionAtBottom,
  left: positionAtLeft,
};

/**
 * Determine the best position for a popover that avoids clipping by the window view port.
 *
 * @param {Object} anchorBounds - getBoundingClientRect() of the node the popover is tethered to (e.g. a button).
 * @param {Object} popoverBounds - getBoundingClientRect() of the popover node (e.g. the tooltip).
 * @param {string} requestedPosition - Position the user wants. One of ["top", "right", "bottom", "left"]
 * @param {number} buffer - The space between the wrapper and the popover. Also the minimum space between the
 * popover and the window.
 * @param {Array} positions - List of acceptable positions. Defaults to ["top", "right", "bottom", "left"].
 *
 * @returns {Object} With properties position (one of ["top", "right", "bottom", "left"]), left, top, width, and height.
 */
export function calculatePopoverPosition(
  anchorBounds: OuiPopoverAnchorRect,
  popoverBounds: OuiPopoverDimensions,
  requestedPosition: OuiPopoverPosition,
  buffer: number = 16,
  positions: OuiPopoverPosition[] = ['top', 'right', 'bottom', 'left']
): OuiPopoverPositionedBox {
  if (typeof buffer !== 'number') {
    throw new Error(
      `calculatePopoverPosition received a buffer argument of ${buffer}' but expected a number`
    );
  }

  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const { width: popoverWidth, height: popoverHeight } = popoverBounds;

  const positionToBoundsMap: { [position: string]: OuiPopoverBoundingBox } = {};
  const positionToVisibleAreaMap: { [positon: string]: number } = {};

  positions.forEach((position) => {
    const bounds = positionToPositionerMap[position](
      anchorBounds,
      popoverWidth,
      popoverHeight,
      buffer
    );
    positionToBoundsMap[position] = bounds;

    // Calculate how much area of the popover is visible at each position.
    positionToVisibleAreaMap[position] = getVisibleArea(
      bounds,
      windowWidth,
      windowHeight
    );
  });

  // If the requested position clips the popover, find the position which clips the popover the least.
  // Default to use the requested position.
  const calculatedPopoverPosition = positions.reduce(
    (mostVisiblePosition, position) => {
      if (
        positionToVisibleAreaMap[position] >
        positionToVisibleAreaMap[mostVisiblePosition]
      ) {
        return position;
      }
      return mostVisiblePosition;
    },
    requestedPosition
  );

  return {
    position: calculatedPopoverPosition,
    ...positionToBoundsMap[calculatedPopoverPosition],
  };
}
