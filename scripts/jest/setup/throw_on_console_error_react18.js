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

// Store the original console.error
const originalConsoleError = console.error;

// Override console.error to ignore specific React 18 warnings
console.error = (message) => {
  // Ignore the findDOMNode deprecation warning from React 18
  if (
    typeof message === 'string' &&
    message.includes('findDOMNode is deprecated')
  ) {
    // Just log the warning without throwing
    originalConsoleError('Warning suppressed for React 18 tests:', message);
    return;
  }

  // For all other errors, throw as before
  throw new Error(message);
};
