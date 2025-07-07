# Technical Specification

## Project Overview

**Project Name**: AI Video Highlight Editing Tool  
**Version**: 1.0.0  
**Tech Stack**: React 18 + TypeScript + Styled Components + Custom Design System  
**Target Platform**: Web (Desktop + Mobile)  
**Deployment Platform**: Netlify  

## Technical Architecture

### Core Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | Frontend framework with concurrent features |
| TypeScript | 4.9.0 | Type safety and enhanced development experience |
| Styled Components | 5.3.0 | CSS-in-JS for component-level style management |
| Lucide React | 0.263.1 | Modern icon library |
| Playwright | 1.53.2 | E2E testing framework |

### Project Structure

```
Gliacloud_FE_Homework/
├── public/
│   ├── _headers                # Netlify deployment configuration
│   ├── index.html              # HTML entry point
│   └── sample-video264.mp4     # H.264 encoded test video
├── src/
│   ├── components/             # React components (logic only)
│   │   ├── App.tsx             # Main application component
│   │   ├── LoadingScreen.tsx   # Loading screen component
│   │   ├── MobileLayout.tsx    # Mobile layout component
│   │   ├── TranscriptEditor.tsx # Transcript editor
│   │   ├── VideoUpload.tsx     # Video upload component
│   │   ├── VideoPreview.tsx    # Video preview main component
│   │   ├── VideoControls.tsx   # Video control buttons
│   │   └── VideoTimeline.tsx   # Timeline and progress bar
│   ├── hooks/                  # Custom React hooks
│   │   └── useVideoNavigation.ts # Video navigation logic hook
│   ├── styles/                 # Design system and styling
│   │   ├── theme.ts            # Design tokens (colors, spacing, typography)
│   │   ├── mixins.ts           # Reusable CSS patterns and utilities
│   │   └── components/         # Component-specific styled components
│   │       ├── AppStyles.ts    # App component styles
│   │       ├── TranscriptEditorStyles.ts # TranscriptEditor styles
│   │       └── VideoPreviewStyles.ts     # VideoPreview styles
│   ├── utils/                  # Utility functions (by responsibility)
│   │   ├── highlightUtils.ts   # Highlight-related business logic
│   │   ├── formatUtils.ts      # Formatting and display utilities
│   │   └── mockData.ts         # Backward compatibility re-exports
│   ├── data/                   # Data and API functions
│   │   └── mockData.ts         # Mock data generation
│   ├── types/
│   │   └── index.ts            # TypeScript type definitions
│   ├── tests/
│   │   └── VideoPreview.test.ts # Playwright E2E tests
│   └── index.tsx               # Application entry point
├── package.json                # Project configuration and dependencies
├── tsconfig.json              # TypeScript configuration
├── playwright.config.ts       # Playwright test configuration
├── TECHNICAL_SPECIFICATION.md # This technical specification
└── README.md                  # Project documentation
```

## Design System Architecture

### Theme System (`src/styles/theme.ts`)

**Design Tokens**:
```typescript
export const theme = {
  colors: {
    primary: '#3b82f6',           // Blue primary
    primaryDark: '#2563eb',       // Darker blue
    secondary: '#3b82f6',         // Secondary blue
    secondaryDark: '#2563eb',     // Darker secondary
    background: {
      primary: '#ffffff',         // White background
      secondary: '#f8fafc',       // Light gray
      dark: '#1f2937',           // Dark background
    },
    text: {
      primary: '#1f2937',         // Dark text
      secondary: '#6b7280',       // Gray text
      light: '#9ca3af',          // Light gray text
      inverse: '#ffffff',         // White text
    },
    border: {
      light: '#e5e7eb',          // Light border
      medium: '#d1d5db',         // Medium border
      dark: '#6b7280',           // Dark border
    },
    status: {
      success: '#10b981',         // Green
      warning: '#f59e0b',         // Orange
      error: '#ef4444',           // Red
      info: '#3b82f6',           // Blue
    }
  },
  spacing: {
    xs: '4px', sm: '8px', md: '12px', lg: '16px',
    xl: '20px', xxl: '24px', xxxl: '32px'
  },
  typography: {
    fontSizes: {
      xs: '12px', sm: '14px', md: '16px', lg: '18px',
      xl: '20px', xxl: '24px', xxxl: '32px'
    },
    fontWeights: {
      normal: 400, medium: 500, semibold: 600, bold: 700
    }
  },
  borderRadius: {
    sm: '4px', md: '6px', lg: '8px', xl: '12px'
  },
  breakpoints: {
    mobile: '767px',
    tablet: '1024px',
    desktop: '1200px'
  },
  transitions: {
    fast: 'all 0.1s ease',
    normal: 'all 0.2s ease',
    slow: 'all 0.3s ease'
  }
};
```

### Mixin System (`src/styles/mixins.ts`)

**Reusable CSS Patterns**:
```typescript
// Layout mixins
export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = css`
  display: flex;
  flex-direction: column;
`;

// Responsive mixins
export const mobileOptimized = css`
  @media (max-width: ${theme.breakpoints.mobile}) {
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    padding: ${theme.spacing.lg};
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
`;

// Typography mixins
export const monospaceText = css`
  font-family: 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace;
`;

// Animation mixins
export const fadeIn = css`
  animation: fadeIn 0.3s ease-in-out;
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
```

## Core Type Definitions

### Data Models

```typescript
// Transcript sentence
interface TranscriptSentence {
  id: string;              // Unique identifier
  startTime: number;       // Start time (seconds)
  endTime: number;         // End time (seconds)
  text: string;           // Sentence content
  selected: boolean;       // Whether selected as highlight
  highlighted?: boolean;   // Whether currently highlighted
  suggested?: boolean;     // Whether AI-suggested highlight
}

// Transcript section
interface TranscriptSection {
  id: string;              // Section ID
  title: string;           // Section title
  sentences: TranscriptSentence[]; // Contained sentences
}

// Video data
interface VideoData {
  url: string;             // Video URL
  duration: number;        // Total video duration (seconds)
  transcript: TranscriptSection[]; // Transcript sections
  suggestedHighlights: string[];   // AI-suggested highlight sentence IDs
}

// Highlight clip
interface HighlightClip {
  id: string;              // Clip ID
  startTime: number;       // Start time in highlight timeline
  endTime: number;         // End time in highlight timeline
  sentences: TranscriptSentence[]; // Contained sentences
  originalStartTime: number; // Start time in original video
  originalEndTime: number;   // End time in original video
}

// Highlight playback state
interface HighlightPlaybackState {
  currentClipIndex: number;    // Current playing clip index
  currentClipTime: number;     // Current playback time within clip
  totalHighlightTime: number;  // Total highlight duration
  isPlayingHighlights: boolean; // Whether playing in highlight mode
  isHighlightMode: boolean;    // Whether in highlight mode
}
```

## Component Architecture

### 1. App.tsx (Main Application Component)

**Responsibility**: Root component managing global state and component coordination

**Main Features**:
- Responsive layout management (desktop/mobile)
- Video data state management
- Playback state synchronization
- Highlight mode switching logic
- Timeline synchronization handling

**Core State**:
```typescript
const [videoData, setVideoData] = useState<VideoData | null>(null);
const [currentTime, setCurrentTime] = useState(0);
const [isPlaying, setIsPlaying] = useState(false);
const [highlightPlaybackState, setHighlightPlaybackState] = useState<HighlightPlaybackState>();
```

**Styled Components**: Extracted to `src/styles/components/AppStyles.ts`

### 2. VideoUpload.tsx (Video Upload Component)

**Responsibility**: Handle video file upload and AI processing simulation

**Main Features**:
- Drag and drop upload support
- File format validation (MP4, MOV, AVI)
- Upload progress visual feedback
- AI processing simulation (2-second delay)

### 3. TranscriptEditor.tsx (Transcript Editor)

**Responsibility**: Display and edit transcript text, manage sentence selection

**Main Features**:
- Sectioned transcript display
- Sentence selection/deselection
- Timestamp click navigation
- Current playing sentence highlighting
- Auto-scroll following playback progress
- AI suggested highlight marking

**Interactive Features**:
- Click timestamp to jump video
- Click sentence to toggle selection state
- Scrollbar auto-follows playback position

**Styled Components**: Extracted to `src/styles/components/TranscriptEditorStyles.ts`

### 4. VideoPreview.tsx (Video Preview Player)

**Responsibility**: Main video component orchestration and video element management

**Main Features**:
- Video element lifecycle management
- Mode switching coordination
- Subtitle overlay display
- Component composition and state coordination


**Sub-Components**:
- Uses `VideoControls` for playback controls
- Uses `VideoTimeline` for progress and timeline
- Uses `useVideoNavigation` hook for navigation logic

### 5. VideoControls.tsx (NEW - Video Controls Component)

**Responsibility**: Video playback control interface

**Main Features**:
- Play/pause button with state indication
- Previous/next segment navigation buttons
- Current time display with monospace formatting
- Consistent control styling with theme system

**Design Features**:
- Grid-based layout (1fr 1fr 1fr 0.5fr)
- Theme-based styling with hover effects
- Responsive button sizing

### 6. VideoTimeline.tsx (NEW - Video Timeline Component)

**Responsibility**: Video progress visualization and seeking control

**Main Features**:
- Interactive timeline bar with drag support
- Highlight segment visualization
- Progress indicator with smooth transitions
- Click and drag seeking functionality

**Advanced Features**:
- Dual-mode timeline (full video/highlight clips)
- Drag state management with playback pause/resume
- Visual highlight segments with different colors
- Mobile-optimized touch interactions

### 7. useVideoNavigation.ts (NEW - Custom Hook)

**Responsibility**: Encapsulate complex video navigation logic

**Main Features**:
- Next/previous segment navigation
- Mobile-compatible time seeking
- Highlight mode vs full video mode logic
- Sentence-level and clip-level navigation

**Hook Interface**:
```typescript
const { handleNext, handlePrevious, seekToTime } = useVideoNavigation({
  selectedSentences,
  highlightPlaybackState,
  videoRef,
  onTimeUpdate,
});
```

**Benefits**:
- **Reusable Logic**: Can be used in other video components
- **Separation of Concerns**: Complex logic separated from UI
- **Easier Testing**: Isolated logic easier to unit test
- **Performance**: useCallback optimization for function stability

### 8. MobileLayout.tsx (Mobile Layout Component)

**Responsibility**: Mobile tabbed layout management

**Main Features**:
- Fixed top tab bar (position: fixed, z-index: 1000)
- Edit/Preview mode switching
- Responsive content area with proper spacing
- Touch optimization

**Design Features**:
- 60px height tab bar
- Content area: margin-top: 60px, height: calc(100vh - 60px)
- Prevents content overlap with fixed tab bar

### 9. LoadingScreen.tsx (Loading Screen Component)

**Responsibility**: Loading animation during AI processing

**Main Features**:
- Spinning animation effect
- Gradient background design
- Processing status indication

## Core Feature Implementation

### 1. Video Time Synchronization System

**Bidirectional Sync Mechanism**:
- Editor → Preview: Timestamp clicks trigger video seeking
- Preview → Editor: Playback progress triggers sentence highlighting and auto-scroll

**Time Conversion Logic**:
```typescript
// Original time → Highlight time
getHighlightTimeFromOriginalTime(originalTime: number, clips: HighlightClip[]): number

// Highlight time → Original time  
getOriginalTimeFromHighlightTime(highlightTime: number, clips: HighlightClip[]): number
```

### 2. Highlight Clip Generation Algorithm

**Clip Merging Logic**:
- Sentences with time intervals ≤ 5 seconds are merged into the same clip
- Auto-calculate clip positions in highlight timeline
- Maintain mapping relationship with original timestamps

```typescript
export const generateHighlightClips = (selectedSentences: TranscriptSentence[]): HighlightClip[]
```

**Location**: `src/utils/highlightUtils.ts` (extracted from mixed utilities)

### 3. Responsive Design System

**Breakpoint Design**:
- Desktop: ≥ 768px (split layout)
- Mobile: < 768px (tabbed layout)

**Layout Adaptation**:
- Desktop: 50/50 split (editor/preview)
- Mobile: Full-screen tab switching with fixed tab bar

**Theme-Based Implementation**:
```typescript
@media (max-width: ${theme.breakpoints.mobile}) {
  // Mobile-specific styles
}
```

### 4. Mobile Video Control Optimization

**Compatibility Handling**:
- iOS Safari video control limitations
- Android Chrome autoplay restrictions
- Range requests support (Netlify _headers configuration)

**Implementation Strategy**:
- Safe time seeking function (`seekToTime` in useVideoNavigation hook)
- Error retry mechanism with setTimeout fallback
- Playback state protection during drag operations

## Utility Functions Architecture

### 1. Separation by Responsibility

**Before**: Mixed utilities in single file (292 lines)
**After**: Organized by function type

```typescript
// src/utils/highlightUtils.ts - Business logic
export const generateHighlightClips = (selectedSentences: TranscriptSentence[]): HighlightClip[]
export const getOriginalTimeFromHighlightTime = (highlightTime: number, clips: HighlightClip[]): number
export const getHighlightTimeFromOriginalTime = (originalTime: number, clips: HighlightClip[]): number

// src/utils/formatUtils.ts - Formatting functions
export const formatTime = (seconds: number): string
export const formatDuration = (seconds: number): string

// src/data/mockData.ts - Data generation
export const generateMockVideoData = (): VideoData
export const generateMockTranscript = (): TranscriptSection[]

// src/utils/mockData.ts - Backward compatibility
export * from '../data/mockData';
export * from './highlightUtils';
export * from './formatUtils';
```

### 2. Type Safety and Documentation

**Enhanced TypeScript Support**:
- Proper interface definitions for all functions
- JSDoc comments for complex algorithms
- Strict null checking compliance

## Deployment Configuration

### Netlify Headers Configuration

```
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff

/*.mp4
  Content-Type: video/mp4
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, HEAD, OPTIONS
  Access-Control-Allow-Headers: Range, Content-Range, Content-Length
  Accept-Ranges: bytes
  Cache-Control: public, max-age=31536000
```

**Key Configuration Explanation**:
- `Accept-Ranges: bytes`: Support video Range requests, essential for mobile seeking
- `Access-Control-Allow-Headers: Range`: Allow cross-origin Range requests
- `Cache-Control`: Video file caching optimization

## Testing Strategy

### E2E Testing (Playwright)

**Test Coverage**:
- Video upload workflow
- Sentence selection functionality
- Time synchronization mechanism
- Mode switching functionality
- Component interaction testing

**Test Configuration**:
- Base URL: http://localhost:3000
- Viewport size: 1280x720
- Timeout setting: 10 seconds
- Video recording: Auto-record on failure

**Future Testing Expansion**:
- Unit tests for custom hooks
- Component testing for sub-components
- Integration tests for design system

## Performance Optimization

### 1. Component Optimization
- **Component Separation**: Smaller components enable better React optimization
- **Custom Hooks**: Reusable logic with useCallback optimization
- **Styled Components**: Theme-based styling reduces runtime calculations
- **State Management**: Localized state in appropriate components

### 2. Bundle Optimization
- **Code Splitting**: Natural separation enables better tree-shaking
- **Lazy Loading**: Potential for component-level lazy loading
- **Asset Optimization**: Theme-based approach reduces CSS duplication

### 3. Video Optimization
- `preload="metadata"` reduces initial loading
- H.264 encoded video files
- Appropriate video compression ratio
- Range request support for efficient seeking

### 4. Mobile Optimization
- Touch-friendly control design
- Fixed positioned navigation bar with proper z-index
- Content area height auto-adaptation
- Safe seeking with retry mechanism

## Browser Compatibility

**Supported Browsers**:
- Chrome 90+ (desktop/mobile)
- Safari 14+ (desktop/mobile)  
- Firefox 88+ (desktop)
- Edge 90+ (desktop)

**Mobile Special Handling**:
- iOS Safari: Video control limitation handling
- Android Chrome: Autoplay policy compliance
- Touch event optimization
- Range request support for video seeking

## Development Tool Configuration

### TypeScript Configuration
- Strict mode enabled
- ES6+ syntax support
- DOM type definitions
- JSX React 17+ syntax
- Path mapping for clean imports

### Build Configuration
- Create React App 5.0.1
- Automatic code splitting
- Production environment optimization
- Source map generation

### Code Quality
- Consistent naming conventions ($prefix for styled props)
- Single responsibility principle
- Type safety throughout
- Documentation standards

## Architecture Benefits

### 1. Maintainability
- **Smaller Files**: Components focused on single responsibilities
- **Clear Separation**: Logic, styling, and data clearly separated
- **Consistent Patterns**: Design system ensures consistency
- **Easy Navigation**: Well-organized file structure

### 2. Scalability
- **Modular Design**: Easy to add new components following established patterns
- **Reusable Components**: Sub-components can be used elsewhere
- **Theme System**: Easy to implement design changes
- **Hook Pattern**: Complex logic can be extracted and reused

### 3. Developer Experience
- **Type Safety**: Comprehensive TypeScript coverage
- **Design System**: Consistent styling patterns
- **Hot Reloading**: Fast development iteration
- **Clear Documentation**: Self-documenting code structure

### 4. Performance
- **Component Optimization**: Smaller components enable better React optimization
- **Bundle Splitting**: Natural code organization enables better splitting
- **Caching Strategy**: Theme-based approach improves caching
- **Mobile Optimization**: Dedicated mobile handling

## Future Expansion Directions

### 1. Feature Expansion
- Real AI API integration
- Multi-language subtitle support
- Video filters and effects
- Cloud storage integration
- Collaborative editing features

### 2. Technology Upgrades
- React 19 upgrade with new concurrent features
- State management library (Zustand/Redux Toolkit)
- PWA support with offline capabilities
- WebAssembly video processing
- Server-side rendering (Next.js migration)

### 3. Architecture Improvements
- Component library extraction
- Micro-frontend architecture
- GraphQL API integration
- Real-time collaboration (WebSocket)
- Advanced caching strategies

### 4. User Experience Optimization
- Keyboard shortcut support
- Advanced animation system
- Accessibility feature support (WCAG compliance)
- Multi-theme system (dark/light mode)
- Advanced responsive design
- Voice control integration

### 5. Development Experience
- Storybook integration for component documentation
- Advanced testing suite (unit + integration + E2E)
- CI/CD pipeline improvements
- Performance monitoring
- Error boundary implementation
- Analytics integration

---

**Document Version**: 2.0  
**Last Updated**: December 2025  
**Maintainer**: Development Team