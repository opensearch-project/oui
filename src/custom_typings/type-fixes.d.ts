/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Type fixes for incompatibilities between TypeScript and node_modules type definitions
 */

// Fix for jest-each using Global as a type
declare global {
  // Add Global type for jest-each
  interface Global {
    [key: string]: any;
  }
}

// Make Global available as a type
type Global = typeof globalThis;

// Ensure this is treated as a module
export {};
