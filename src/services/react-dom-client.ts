/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Root interface for React 16 compatibility with React 18's createRoot API
 */
export interface Root {
  render(element: React.ReactElement): void;
  unmount(): void;
}

/**
 * Shim for React 18's createRoot API
 * This provides a compatible API for React 16 using ReactDOM.render
 *
 * @param container The DOM element to render into
 * @returns A root object with render and unmount methods
 */
export function createRoot(container: Element): Root {
  return {
    render(element: React.ReactElement) {
      ReactDOM.render(element, container);
    },
    unmount() {
      ReactDOM.unmountComponentAtNode(container);
    },
  };
}
