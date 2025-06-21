/**
 * Integration tests for the golden-repo migration
 * This test verifies that the main exports work correctly and maintains backward compatibility
 */

import * as AnimationsLib from '../src/index.js';
import { DataNetwork, version, themes, utils } from '../src/index.js';

describe('Golden Repo Structure Migration - Integration Tests', () => {
  describe('Main Exports', () => {
    test('should export DataNetwork component', () => {
      expect(DataNetwork).toBeDefined();
      // DataNetwork is a forwardRef component, which is an object with $$typeof property
      expect(typeof DataNetwork).toBe('object');
      expect(DataNetwork.$$typeof).toBeDefined();
    });

    test('should export version', () => {
      expect(version).toBeDefined();
      expect(typeof version).toBe('string');
      expect(version).toMatch(/^\d+\.\d+\.\d+/); // Semantic version format
    });

    test('should export themes', () => {
      expect(themes).toBeDefined();
      expect(typeof themes).toBe('object');
    });

    test('should export utils', () => {
      expect(utils).toBeDefined();
      expect(typeof utils).toBe('object');
    });

    test('should have default export', () => {
      const defaultExport = require('../src/index.js').default;
      expect(defaultExport).toBeDefined();
      expect(defaultExport).toBe(DataNetwork);
    });
  });

  describe('Backward Compatibility', () => {
    test('should maintain all legacy exports', () => {
      // Test that all expected exports are available
      const expectedExports = ['DataNetwork', 'version', 'themes', 'utils'];

      expectedExports.forEach(exportName => {
        expect(AnimationsLib[exportName]).toBeDefined();
      });

      // Test specific utility functions are available
      expect(AnimationsLib.utils).toBeDefined();
      expect(typeof AnimationsLib.utils).toBe('object');
    });

    test('should support legacy import patterns', () => {
      // Test CommonJS require
      const cjsExports = require('../src/index.js');
      expect(cjsExports.DataNetwork).toBeDefined();
      expect(cjsExports.default).toBeDefined();

      // Test ES6 named imports (already tested above)
      expect(DataNetwork).toBeDefined();

      // Test ES6 namespace import
      expect(AnimationsLib.DataNetwork).toBeDefined();
    });
  });

  describe('Legacy Directory Structure', () => {
    test('should maintain legacy code in correct location', () => {
      // Test that legacy imports still work
      const legacyDataNetwork = require('../src/legacy/components/DataNetwork').default;
      expect(legacyDataNetwork).toBeDefined();
      expect(legacyDataNetwork).toBe(DataNetwork);
    });

    test('should have legacy utils accessible', () => {
      const legacyUtils = require('../src/legacy/utils');
      expect(legacyUtils).toBeDefined();
      expect(typeof legacyUtils).toBe('object');
    });
  });

  describe('Build Compatibility', () => {
    test('should work with different module systems', () => {
      // This test ensures the build output works with both CommonJS and ES modules
      expect(() => {
        const cjsImport = require('../src/index.js');
        return cjsImport.DataNetwork;
      }).not.toThrow();

      expect(() => {
        return DataNetwork;
      }).not.toThrow();
    });
  });
});
