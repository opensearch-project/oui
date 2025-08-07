/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { createRoot } from './react-dom-client';

/**
 * Version-agnostic render function that works with both React 16 and 18
 * In React 16, it uses our shim for react-dom/client (./react-dom-client.ts)
 * In React 18, we can alias this file to the actual react-dom/client
 */
export function render(element: React.ReactElement, container: Element) {
  const root = createRoot(container);
  root.render(element);
  return root;
}
