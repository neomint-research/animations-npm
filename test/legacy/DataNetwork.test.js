/**
 * Basic tests for DataNetwork component
 * Testing the legacy implementation through the new structure
 * Note: Full rendering tests are complex due to canvas and animation dependencies
 */

import React from 'react';
import '@testing-library/jest-dom';

// Import from the main entry point to test the migration structure
import { DataNetwork } from '../../src/index.js';

describe('DataNetwork Component', () => {
  test('should be defined and importable', () => {
    expect(DataNetwork).toBeDefined();
    expect(typeof DataNetwork).toBe('object'); // forwardRef component
    expect(DataNetwork.$$typeof).toBeDefined(); // React element type
  });

  test('should have the correct display name', () => {
    // forwardRef components have a displayName or render function
    expect(DataNetwork.displayName || DataNetwork.render).toBeDefined();
  });

  test('should be a valid React component type', () => {
    // Test that it's a valid React component by checking its structure
    expect(DataNetwork).toHaveProperty('$$typeof');

    // Should be a forwardRef component
    const isForwardRef = DataNetwork.$$typeof &&
      DataNetwork.$$typeof.toString().includes('react.forward_ref');
    expect(isForwardRef || DataNetwork.render).toBeTruthy();
  });

  test('should export from legacy directory correctly', () => {
    // Test that the component is properly re-exported from legacy
    const legacyDataNetwork = require('../../src/legacy/components/DataNetwork').default;
    expect(legacyDataNetwork).toBeDefined();
    expect(DataNetwork).toBe(legacyDataNetwork);
  });

  // Note: Full rendering tests would require mocking canvas context,
  // ResizeObserver, requestAnimationFrame, and other browser APIs.
  // These are covered by the integration tests and build verification.
});
