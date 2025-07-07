# AI Video Highlight Editing Tool

A modern, responsive web application for creating video highlights through AI-powered transcript analysis and intuitive editing interface.



## ✨ Features

### 🎥 Video Processing
- **Drag & Drop Upload**: Intuitive video file upload with progress feedback
- **AI Processing Simulation**: Automated transcript generation and highlight suggestions
- **Format Support**: MP4, MOV, AVI video formats

### 📝 Intelligent Transcript Editor
- **Interactive Transcript**: Click timestamps to navigate video playback
- **Smart Selection**: Toggle sentence selection for highlight creation
- **AI Suggestions**: Pre-selected highlight recommendations
- **Real-time Sync**: Auto-scroll and highlight current playing sentence

### 🎬 Advanced Video Player
- **Dual Playback Modes**: 
  - Full Video Mode: Complete video with selected highlights
  - Highlight Mode: Play only selected clips with seamless transitions
- **Interactive Timeline**: Visual progress bar with highlight segments
- **Smart Navigation**: Previous/next segment buttons with intelligent jumping
- **Mobile Optimized**: Touch-friendly controls with safe seeking

### 📱 Responsive Design
- **Desktop Layout**: Split-screen editor and preview (≥768px)
- **Mobile Layout**: Tab-based interface with fixed navigation (<768px)
- **Cross-Platform**: Optimized for iOS Safari, Android Chrome, and desktop browsers

## 🏗️ Architecture

### Component Structure (Refactored)
```
VideoPreview
├── VideoControls      # Play/pause/navigation controls
├── VideoTimeline     # Progress bar and seeking
├── useVideoNavigation  # Custom hook for navigation logic
└── VideoPreviewStyles  # Theme-based styling
```

### Design System
- **Theme System**: Centralized design tokens (colors, spacing, typography)
- **Mixin Library**: Reusable CSS patterns and responsive utilities
- **Component Styles**: Separated styling with consistent patterns
- **TypeScript Integration**: Type-safe styled component props

### Tech Stack
- **Frontend**: React 18.2.0 + TypeScript 4.9.0
- **Styling**: Styled Components 5.3.0 + Custom Design System
- **Icons**: Lucide React 0.263.1
- **Testing**: Playwright 1.53.2
- **Deployment**: Netlify with optimized headers

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ and npm/yarn
- Modern web browser with video support

### Quick Start
```bash
# Clone the repository
git clone git@github.com:zivhsu-0526/GliaCloud_Frontend_Homework.git
cd GliaCloud_Frontend_Homework

# Install dependencies
npm install

# Start development server
npm start
```

The application will open at `http://localhost:3000`

### Build for Production
```bash
# Create optimized production build
npm run build

# Serve locally (optional)
npx serve -s build
```

## 📂 Project Structure

```
src/
├── components/                 # React components (logic only)
│   ├── App.tsx                # Main application orchestrator
│   ├── VideoUpload.tsx        # File upload with drag & drop
│   ├── TranscriptEditor.tsx   # Interactive transcript interface
│   ├── VideoPreview.tsx       # Main video component (refactored)
│   ├── VideoControls.tsx      # Playback control buttons
│   ├── VideoTimeline.tsx      # Timeline and progress visualization
│   ├── MobileLayout.tsx       # Mobile-optimized tab layout
│   └── LoadingScreen.tsx      # AI processing animation
├── hooks/                     # Custom React hooks
│   └── useVideoNavigation.ts  # Video navigation logic
├── styles/                    # Design system
│   ├── theme.ts              # Design tokens and constants
│   ├── mixins.ts             # Reusable CSS patterns
│   └── components/           # Component-specific styles
├── utils/                     # Utility functions (by responsibility)
│   ├── highlightUtils.ts     # Highlight generation logic
│   ├── formatUtils.ts        # Formatting and display utilities
│   └── mockData.ts           # Backward compatibility exports
├── data/                      # Data and API functions
│   └── mockData.ts           # Mock data generation
├── types/                     # TypeScript definitions
│   └── index.ts              # Core type definitions
└── tests/                     # E2E tests
    └── VideoPreview.test.ts   # Playwright test suite
```

## 🎯 Core Features Deep Dive

### Highlight Generation Algorithm
```typescript
// Intelligent clip merging (≤5 second gaps)
const clips = generateHighlightClips(selectedSentences);

// Time conversion between modes
const originalTime = getOriginalTimeFromHighlightTime(highlightTime, clips);
const highlightTime = getHighlightTimeFromOriginalTime(originalTime, clips);
```

### Responsive Breakpoints
```typescript
// Theme-based responsive design
const theme = {
  breakpoints: {
    mobile: '767px',    // Tab layout
    tablet: '1024px',   // Intermediate
    desktop: '1200px'   // Full split layout
  }
};
```

### Mobile Video Optimization
- **Range Request Support**: Configured Netlify headers for mobile seeking
- **Safe Time Seeking**: Retry mechanism for iOS Safari compatibility
- **Touch Interactions**: Optimized drag and tap controls

## 🧪 Testing

### End-to-End Testing with Playwright
```bash
# Run E2E tests
npm run test:e2e

# Run tests in headed mode
npx playwright test --headed

# Generate test report
npx playwright show-report
```

### Test Coverage
- ✅ Video upload workflow
- ✅ Transcript interaction and selection
- ✅ Video playback and navigation
- ✅ Mode switching functionality
- ✅ Mobile responsiveness

## 🚀 Deployment

### Netlify Configuration
The project includes optimized Netlify configuration:

```
# public/_headers
/*.mp4
  Content-Type: video/mp4
  Access-Control-Allow-Origin: *
  Accept-Ranges: bytes
  Cache-Control: public, max-age=31536000
```

### Deployment Steps
1. **Build**: `npm run build`
2. **Deploy**: Connect to Netlify or upload `build/` folder
3. **Configure**: Ensure `_headers` file is included for video support

## 🎨 Design System Usage

### Using Theme Tokens
```typescript
import { theme } from '../styles/theme';

const Button = styled.button`
  background: ${theme.colors.primary};
  padding: ${theme.spacing.md};
  border-radius: ${theme.borderRadius.md};
  font-size: ${theme.typography.fontSizes.sm};
`;
```

### Applying Mixins
```typescript
import { flexCenter, mobileOptimized } from '../styles/mixins';

const Container = styled.div`
  ${flexCenter}
  ${mobileOptimized}
  background: ${theme.colors.background.primary};
`;
```

### Styled Component Props
```typescript
// Use $ prefix for styled component props
interface ButtonProps {
  $variant: 'primary' | 'secondary';
  $size: 'sm' | 'md' | 'lg';
}

const Button = styled.button<ButtonProps>`
  background: ${props => 
    props.$variant === 'primary' ? theme.colors.primary : theme.colors.secondary
  };
`;
```

## 🔧 Development Guidelines

### Component Development
1. **Separation of Concerns**: Logic in components, styles in separate files
2. **Custom Hooks**: Extract complex stateful logic
3. **Theme Integration**: Use design tokens consistently
4. **TypeScript**: Maintain strict type safety

### Code Quality
- **ESLint**: Code linting and formatting
- **TypeScript**: Strict mode enabled
- **Component Testing**: Isolated unit tests
- **E2E Testing**: User workflow validation

## 📊 Performance Optimizations

### Bundle Optimization
- **Code Splitting**: Natural component separation
- **Tree Shaking**: Optimized imports and exports
- **Asset Optimization**: Compressed video files and images

### Runtime Performance
- **Component Memoization**: Optimized re-renders
- **Custom Hooks**: Reusable logic with useCallback
- **Lazy Loading**: Potential for route-based splitting

### Mobile Performance
- **Touch Optimization**: Debounced interactions
- **Video Seeking**: Safe time jumping with retries
- **Memory Management**: Efficient video element handling

## 🔮 Future Roadmap

### Short Term
- [ ] Real AI API integration
- [ ] Advanced keyboard shortcuts
- [ ] Accessibility improvements (WCAG compliance)
- [ ] Unit test coverage expansion

### Medium Term
- [ ] Multi-language subtitle support
- [ ] Video filters and effects
- [ ] Cloud storage integration
- [ ] Collaborative editing features

### Long Term
- [ ] PWA support with offline capabilities
- [ ] WebAssembly video processing
- [ ] Real-time collaboration
- [ ] Advanced analytics and insights

## 🤝 Contributing


### Coding Standards
- Follow TypeScript strict mode
- Use the established design system
- Maintain component separation principles
- Write comprehensive tests


## 🙏 Acknowledgments

- **React Team**: For the amazing framework and concurrent features
- **Styled Components**: For powerful CSS-in-JS capabilities
- **Playwright**: For reliable E2E testing
- **Netlify**: For seamless deployment and hosting

---

**Built with ❤️ using React, TypeScript, and modern web technologies**

For technical details, see [TECHNICAL_SPECIFICATION.md](docs/TECHNICAL_SPECIFICATION.md)  
For architecture details, see [PROJECT_STRUCTURE.md](docs/PROJECT_STRUCTURE.md) 