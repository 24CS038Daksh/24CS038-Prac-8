import React from 'react';

/**
 * Custom lazy loading wrapper that enforces a minimum fallback display delay
 * (Supplementary Problem: avoids flickering loading states on fast network connections)
 *
 * @param {Function} importFunc - Dynamic import function, e.g. () => import('./Component')
 * @param {number} delayMs - Minimum delay in milliseconds (default: 300ms)
 * @returns {React.LazyExoticComponent} Lazy-loaded component
 */
export function lazyWithDelay(importFunc, delayMs = 300) {
  return React.lazy(() => {
    return Promise.all([
      importFunc(),
      new Promise((resolve) => setTimeout(resolve, delayMs))
    ]).then(([moduleExports]) => moduleExports);
  });
}
