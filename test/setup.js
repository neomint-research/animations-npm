/**
 * Test setup configuration for the golden-repo migration
 * This file configures the testing environment for both legacy and new code
 */

// Import testing library extensions
import '@testing-library/jest-dom';

// Mock canvas and WebGL contexts for D3.js and visualization tests
global.HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
  fillRect: jest.fn(),
  clearRect: jest.fn(),
  getImageData: jest.fn(() => ({ data: new Array(4) })),
  putImageData: jest.fn(),
  createImageData: jest.fn(() => ({ data: new Array(4) })),
  setTransform: jest.fn(),
  drawImage: jest.fn(),
  save: jest.fn(),
  fillText: jest.fn(),
  restore: jest.fn(),
  beginPath: jest.fn(),
  moveTo: jest.fn(),
  lineTo: jest.fn(),
  closePath: jest.fn(),
  stroke: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  rotate: jest.fn(),
  arc: jest.fn(),
  fill: jest.fn(),
  measureText: jest.fn(() => ({ width: 0 })),
  transform: jest.fn(),
  rect: jest.fn(),
  clip: jest.fn(),
}));

// Mock ResizeObserver for responsive components
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock IntersectionObserver for visibility-based animations
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock requestAnimationFrame for animation tests
global.requestAnimationFrame = jest.fn((cb) => setTimeout(cb, 16));
global.cancelAnimationFrame = jest.fn((id) => clearTimeout(id));

// Mock performance API for timing tests
global.performance = {
  ...global.performance,
  now: jest.fn(() => Date.now()),
  mark: jest.fn(),
  measure: jest.fn(),
  getEntriesByName: jest.fn(() => []),
  getEntriesByType: jest.fn(() => []),
};

// Mock window.matchMedia for responsive design tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock console methods to reduce noise in tests
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;

beforeAll(() => {
  // Suppress React warnings in tests unless explicitly testing for them
  console.error = jest.fn((message, ...args) => {
    if (
      typeof message === 'string' &&
      (message.includes('Warning:') || message.includes('React'))
    ) {
      return;
    }
    originalConsoleError(message, ...args);
  });

  console.warn = jest.fn((message, ...args) => {
    if (
      typeof message === 'string' &&
      (message.includes('Warning:') || message.includes('React'))
    ) {
      return;
    }
    originalConsoleWarn(message, ...args);
  });
});

afterAll(() => {
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
});

// Global test utilities
global.testUtils = {
  // Helper to create mock node data
  createMockNode: (id = 'test-node', overrides = {}) => ({
    id,
    label: `Node ${id}`,
    x: 100,
    y: 100,
    ...overrides,
  }),

  // Helper to create mock edge data
  createMockEdge: (source = 'node1', target = 'node2', overrides = {}) => ({
    id: `${source}-${target}`,
    source,
    target,
    ...overrides,
  }),

  // Helper to create mock animation config
  createMockAnimationConfig: (overrides = {}) => ({
    duration: 1000,
    easing: 'ease-in-out',
    enabled: true,
    ...overrides,
  }),

  // Helper to wait for animations
  waitForAnimation: (duration = 100) => 
    new Promise(resolve => setTimeout(resolve, duration)),

  // Helper to trigger resize events
  triggerResize: (width = 800, height = 600) => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: width,
    });
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: height,
    });
    window.dispatchEvent(new Event('resize'));
  },
};
