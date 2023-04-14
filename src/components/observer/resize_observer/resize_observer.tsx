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

import {
  MutableRefObject,
  ReactNode,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { OuiObserver } from '../observer';

export interface OuiResizeObserverProps {
  /**
   * ReactNode to render as this component's content
   */
  children: (ref: (e: HTMLElement | null) => void) => ReactNode;
  onResize: (dimensions: { height: number; width: number }) => void;
}

const hasResizeObserver =
  typeof window !== 'undefined' && typeof window.ResizeObserver !== 'undefined';
export class OuiResizeObserver extends OuiObserver<OuiResizeObserverProps> {
  name = 'OuiResizeObserver';

  state = {
    height: 0,
    width: 0,
  };

  onResize: ResizeObserverCallback = () => {
    // `entry.contentRect` provides incomplete `height` and `width` data.
    // Use `getBoundingClientRect` to account for padding and border.
    // https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly
    if (!this.childNode) return;
    const { height, width } = this.childNode.getBoundingClientRect();
    // Check for actual resize event
    if (this.state.height === height && this.state.width === width) {
      return;
    }

    this.props.onResize({
      height,
      width,
    });
    this.setState({ height, width });
  };

  beginObserve = () => {
    // The superclass checks that childNode is not null before invoking
    // beginObserve()
    const childNode = this.childNode!;
    this.observer = makeResizeObserver(childNode, this.onResize)!;
  };
}

const makeResizeObserver = (
  node: Element,
  callback: ResizeObserverCallback
) => {
  let observer;
  if (hasResizeObserver) {
    observer = new window.ResizeObserver(callback);
    observer.observe(node);
  }
  return observer;
};

export interface UseResizeObserverProps {
  element?: HTMLElement | null;
  elementRef?: MutableRefObject<any> | RefObject<any> | null;
  elementId?: string;
  observableDimension?: 'all' | 'width' | 'height';
  shouldObserve?: boolean;
}

export const useResizeObserver = ({
  element,
  elementRef,
  elementId,
  observableDimension = 'all',
  shouldObserve = true,
}: UseResizeObserverProps) => {
  const animationFrameRef = useRef<number | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  // currentDimensions and handleElementResize are used to only store the
  // new state (and trigger a re-render) when the new dimensions actually differ
  const currentDimensions = useRef(size);
  const handleElementResize = useCallback(
    (dimensions) => {
      const isAllObservable = observableDimension === 'all';
      const isWidthObservable = observableDimension === 'width';
      const isHeightObservable = observableDimension === 'height';

      const isWidthChanged =
        currentDimensions.current.width !== dimensions.width;
      const isHeightChanged =
        currentDimensions.current.height !== dimensions.height;

      if (
        (isAllObservable && (isWidthChanged || isHeightChanged)) ||
        (isWidthObservable && isWidthChanged) ||
        (isHeightObservable && isHeightChanged)
      ) {
        cancelAnimationFrame(animationFrameRef.current!);
        animationFrameRef.current = requestAnimationFrame(() => {
          currentDimensions.current = dimensions;
          setSize(dimensions);
        });
      }
    },
    [observableDimension]
  );

  useEffect(() => {
    if (shouldObserve) {
      let observableElement: HTMLElement | undefined | null = element;
      if (elementRef) observableElement = elementRef.current;
      if (elementId) observableElement = document.getElementById(elementId);

      if (observableElement) {
        // ResizeObserver's first call to the observation callback is scheduled in the future
        // so find the container's initial dimensions now
        const { height, width } = observableElement.getBoundingClientRect();
        setSize({ width, height });

        const observer = makeResizeObserver(observableElement, () => {
          // `entry.contentRect` provides incomplete `height` and `width` data.
          // Use `getBoundingClientRect` to account for padding and border.
          // https://developer.mozilla.org/en-US/docs/Web/API/DOMRectReadOnly
          const { height, width } = observableElement!.getBoundingClientRect();
          handleElementResize({ width, height });
        });

        return () => {
          observer && observer.disconnect();
          animationFrameRef.current &&
            cancelAnimationFrame(animationFrameRef.current);
        };
      } else {
        handleElementResize({ width: 0, height: 0 });
      }
    }
  }, [
    element,
    elementRef,
    elementId,
    shouldObserve,
    setSize,
    handleElementResize,
  ]);

  return size;
};
