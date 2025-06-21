/**
 * Basic structure test for the golden-repo migration
 * This test verifies that the main exports work correctly
 */

import { DataNetwork, version } from '../src/index.js';

describe('Golden Repo Structure Migration', () => {
  test('should export DataNetwork component', () => {
    expect(DataNetwork).toBeDefined();
    // DataNetwork is a forwardRef component, which is an object with $$typeof property
    expect(typeof DataNetwork).toBe('object');
    expect(DataNetwork.$$typeof).toBeDefined();
  });

  test('should export version', () => {
    expect(version).toBeDefined();
    expect(typeof version).toBe('string');
  });

  test('should have default export', () => {
    const defaultExport = require('../src/index.js').default;
    expect(defaultExport).toBeDefined();
    expect(defaultExport).toBe(DataNetwork);
  });
});
