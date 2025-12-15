import * as React from "react"

let idCounter = 0

/**
 * Polyfill for React.useId (React 18+)
 * Generates a unique ID for React 16/17 compatibility
 */
export const useId = (): string => {
  const [id] = React.useState(() => `react-id-${++idCounter}`)
  return id
}

/**
 * Cross-version compatible useId hook
 * Uses React.useId if available (React 18+), otherwise uses polyfill
 */
export const useCompatId = (): string => {
  // Check if React.useId exists (React 18+)
  // @ts-ignore - React.useId might not exist in older React versions
  if (typeof React.useId === 'function') {
    // @ts-ignore
    return React.useId()
  }

  // Fallback to polyfill for React 16/17
  return useId()
}

/**
 * Runtime detection of React features for conditional logic
 */
export const reactFeatures = {
  hasUseId: typeof (React as any).useId === 'function',
  hasNewJSXTransform: typeof React.createElement !== 'undefined',
  version: React.version
}