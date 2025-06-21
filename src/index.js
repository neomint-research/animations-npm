/**
 * @neomint/animations - Main Entry Point
 *
 * This is the main entry point for the @neomint/animations library.
 * During the migration to golden-repo structure, we're re-exporting
 * from the legacy directory to maintain backward compatibility.
 *
 * @version 2.0.0-beta
 * @author NEOMINT Research
 */

// Re-export everything from the legacy implementation
export * from './legacy/index.js';

// Import the main component for default export
import { DataNetwork } from './legacy/index.js';

// Default export for backward compatibility
export default DataNetwork;
