/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import * as ReactDOM from 'react-dom';
import { createRoot } from './react-dom-client';

// Mock ReactDOM methods
jest.mock('react-dom', () => ({
  render: jest.fn(),
  unmountComponentAtNode: jest.fn(),
}));

describe('react-dom-client', () => {
  let container: HTMLDivElement;
  let element: React.ReactElement;

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Set up test elements
    container = document.createElement('div');
    element = <div>Test Element</div>;
  });

  describe('createRoot', () => {
    it('returns an object with render and unmount methods', () => {
      const root = createRoot(container);

      expect(root).toBeDefined();
      expect(typeof root.render).toBe('function');
      expect(typeof root.unmount).toBe('function');
    });

    it('calls ReactDOM.render when root.render is called', () => {
      const root = createRoot(container);
      root.render(element);

      expect(ReactDOM.render).toHaveBeenCalledWith(element, container);
    });

    it('calls ReactDOM.unmountComponentAtNode when root.unmount is called', () => {
      const root = createRoot(container);
      root.unmount();

      expect(ReactDOM.unmountComponentAtNode).toHaveBeenCalledWith(container);
    });
  });
});
