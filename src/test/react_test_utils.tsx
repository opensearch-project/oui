/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { version } from 'react';
import { render } from '../services/react_dom';

/**
 * This is a compatibility layer for React's act() function.
 * In React 18+, act is exported directly from 'react'.
 * In React <18, we use it from 'react-dom/test-utils'.
 */
const [major] = version.split('.').map(Number);

// Dynamic import to avoid loading both modules
export const act =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  major >= 18 ? (React as any).act : require('react-dom/test-utils').act;

/**
 * Renders a React element into a detached DOM node
 * Works with both React 16's ReactDOM.render and React 18's createRoot
 */
type RenderOptions = {
  /**
   * Whether to attach the container to document.body
   * @default true
   */
  attachToDocument?: boolean;
};

export const renderTestElement = (
  element: React.ReactElement,
  options: RenderOptions = {}
) => {
  const container = document.createElement('div');
  const { attachToDocument = true } = options;

  if (attachToDocument) {
    document.body.appendChild(container);
  }

  const root = render(element, container);

  return {
    container,
    cleanup: () => {
      root.unmount();
      if (attachToDocument) {
        document.body.removeChild(container);
      }
    },
  };
};
