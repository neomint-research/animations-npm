/**
 * Tests for utility functions
 * Testing the legacy utility implementations
 */

import {
  version,
  PerformanceMonitor,
  detectDeviceCapabilities,
  getOptimalSettings,
  usePerformanceMonitor,
  detectMotionPreferences,
  getAccessibilitySettings,
  createMotionListener,
  announceToScreenReader
} from '../../src/legacy/utils';

describe('Legacy Utility Functions', () => {
  describe('Basic Exports', () => {
    test('should export version', () => {
      expect(version).toBeDefined();
      expect(typeof version).toBe('string');
      expect(version).toMatch(/^\d+\.\d+\.\d+/);
    });

    test('should export PerformanceMonitor', () => {
      expect(PerformanceMonitor).toBeDefined();
      expect(typeof PerformanceMonitor).toBe('function');
    });

    test('should export detectDeviceCapabilities', () => {
      expect(detectDeviceCapabilities).toBeDefined();
      expect(typeof detectDeviceCapabilities).toBe('function');
    });

    test('should export getOptimalSettings', () => {
      expect(getOptimalSettings).toBeDefined();
      expect(typeof getOptimalSettings).toBe('function');
    });
  });

  describe('Performance Utilities', () => {
    test('detectDeviceCapabilities should return an object', () => {
      const capabilities = detectDeviceCapabilities();
      expect(typeof capabilities).toBe('object');
      expect(capabilities).not.toBeNull();
    });

    test('getOptimalSettings should return settings object', () => {
      // getOptimalSettings requires device capabilities parameter
      const mockDeviceCaps = { isHighPerformance: true, isMobile: false };
      const settings = getOptimalSettings(mockDeviceCaps);
      expect(typeof settings).toBe('object');
      expect(settings).not.toBeNull();
    });
  });

  describe('Accessibility Utilities', () => {
    test('should export detectMotionPreferences', () => {
      expect(detectMotionPreferences).toBeDefined();
      expect(typeof detectMotionPreferences).toBe('function');
    });

    test('should export getAccessibilitySettings', () => {
      expect(getAccessibilitySettings).toBeDefined();
      expect(typeof getAccessibilitySettings).toBe('function');
    });

    test('should export createMotionListener', () => {
      expect(createMotionListener).toBeDefined();
      expect(typeof createMotionListener).toBe('function');
    });

    test('should export announceToScreenReader', () => {
      expect(announceToScreenReader).toBeDefined();
      expect(typeof announceToScreenReader).toBe('function');
    });

    test('detectMotionPreferences should return preferences object', () => {
      const preferences = detectMotionPreferences();
      expect(typeof preferences).toBe('object');
      expect(preferences).not.toBeNull();
    });
  });

  describe('React Hooks', () => {
    test('should export usePerformanceMonitor hook', () => {
      expect(usePerformanceMonitor).toBeDefined();
      expect(typeof usePerformanceMonitor).toBe('function');
    });

    // Note: Testing React hooks requires more complex setup with @testing-library/react-hooks
    // This basic test just verifies the export exists
  });

  describe('Integration with Main Exports', () => {
    test('should be accessible through main utils export', () => {
      const { utils } = require('../../src/index.js');

      expect(utils).toBeDefined();
      expect(utils.version).toBe(version);
      expect(utils.detectDeviceCapabilities).toBe(detectDeviceCapabilities);
      expect(utils.getOptimalSettings).toBe(getOptimalSettings);
    });
  });
});
