/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Centralized icon exports for OUI package
 *
 * This module provides a curated set of icons including:
 * - Lucide React icons that already end with "Icon" suffix
 * - Custom SVG icons converted to React components
 *
 * All icons follow the same API pattern and naming convention.
 */

// Export curated lucide icons (only aliases ending with "Icon")
export * from './lucide';

// Export custom OUI icons
export * from './custom';

// Export types and utilities
export type { IconProps } from './base-icon';
export { BaseIcon } from './base-icon';
