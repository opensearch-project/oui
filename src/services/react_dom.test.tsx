/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { render } from './react_dom';

// Simplified test that just verifies the basic functionality without trying to mock all
// the internals - will be run against multiple versions of react to validate
describe('react_dom', () => {
  it('provides a version-agnostic render function', () => {
    // Just verify that the function exists and returns an object with the expected shape
    const container = document.createElement('div');
    const element = <div>Test</div>;

    const root = render(element, container);

    // Check that the returned object has the expected API
    expect(root).toBeDefined();
    expect(typeof root.render).toBe('function');
    expect(typeof root.unmount).toBe('function');
  });
});
