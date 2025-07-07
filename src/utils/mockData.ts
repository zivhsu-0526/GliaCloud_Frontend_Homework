// This file is deprecated. Functions have been moved to:
// - Data: src/data/mockData.ts
// - Highlight utilities: src/utils/highlightUtils.ts
// - Format utilities: src/utils/formatUtils.ts

// Re-export for backward compatibility
export { generateMockVideoData, mockApiCall } from '../data/mockData';
export {
  generateHighlightClips,
  calculateHighlightDuration,
  getOriginalTimeFromHighlightTime,
  getHighlightTimeFromOriginalTime,
} from './highlightUtils';
