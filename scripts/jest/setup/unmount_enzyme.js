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

const mockMountedComponents = [];
jest.mock('enzyme', () => {
  const enzyme = jest.requireActual('enzyme');
  return {
    ...enzyme,
    mount: (component, ...options) => {
      const mountedComponent = enzyme.mount(component, ...options);
      mockMountedComponents.push(mountedComponent);
      return mountedComponent;
    },
  };
});

afterEach(() => {
  while (mockMountedComponents.length) {
    const component = mockMountedComponents.pop();
    if (component.length === 1) {
      component.unmount();
    }
  }
});
