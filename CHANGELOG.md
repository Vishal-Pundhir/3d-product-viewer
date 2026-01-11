# Changelog

All notable changes to the 3D Gaussian Splat Viewer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-11

### Added
- Initial release of 3D Gaussian Splat Viewer
- Core rendering engine with Three.js and Gaussian Splatting
- Automatic device profiling for performance optimization
- Support for multiple performance tiers (low, basic, medium, high, ultra-high)
- Background GLB model loading with custom upload support
- Gradient background rendering
- Auto-rotation controls
- Error boundary with user-friendly error messages
- Comprehensive API service layer with retry logic and caching
- React hooks for viewer state management
- Loading spinner and progress indicators
- Responsive design for desktop and mobile
- URL parameter configuration
- Environment-based configuration management
- Code splitting and bundle optimization
- ESLint and Prettier integration
- Tailwind CSS styling
- Comprehensive documentation (README, Integration Guide)
- Example embed page

### Features
- **GaussianSplatViewer** - Main viewer component with props interface
- **DeviceProfiler** - Automatic performance tier detection
- **API Client** - Robust HTTP client with retry and caching
- **SKU Service** - Point cloud and configuration management
- **Error Handling** - ErrorBoundary component with fallback UI
- **Custom Hooks** - useViewer, useQueryParams, useGLBLoader
- **Background Upload** - File upload component for custom backgrounds

### Performance
- Bundle size optimization with code splitting
- Lazy loading of Three.js and Gaussian Splat modules
- Progressive model loading
- WebGL 2.0 support with fallback to WebGL 1.0
- Automatic device memory detection
- GPU capability assessment

### Developer Experience
- Vite for fast development and building
- Hot Module Replacement (HMR)
- Path aliases for clean imports
- TypeScript-ready (PropTypes for now)
- Git hooks with Husky and lint-staged

---

## [Unreleased]

### Planned Features
- [ ] CI/CD pipeline setup (GitHub Actions, GitLab CI, etc.)
- [ ] Deployment automation
- [ ] TypeScript migration
- [ ] Unit tests with Jest and React Testing Library
- [ ] E2E tests with Playwright
- [ ] Script tag embed option
- [ ] NPM package distribution
- [ ] Advanced camera controls
- [ ] AR/VR support
- [ ] Screenshot capture
- [ ] Measurement tools
- [ ] Annotation system
- [ ] Multi-model comparison
- [ ] Analytics integration
- [ ] Internationalization (i18n)

---

## Version History

### Version 1.0.0 (2026-01-11)
- First production release
- Complete migration from 360-fe monorepo
- Clean architecture with layered design
- Enterprise-grade error handling
- Comprehensive documentation

---

## Migration Notes

### From View3DNew (360-fe)

The viewer has been completely refactored from the original `View3DNew` component:

**What Changed:**
- Separated from 360-fe monorepo into standalone repository
- Refactored into clean component architecture
- Added proper error boundaries and handling
- Implemented robust API service layer
- Added performance optimization
- Created comprehensive documentation

**Breaking Changes:**
- Component renamed from `View3DNew` to `GaussianSplatViewer`
- Props interface standardized
- API service extracted into separate layer
- Configuration management centralized

**What Stayed the Same:**
- Core gaussian-splats-3d rendering engine
- Three.js integration
- Camera controls and interactions
- Point cloud loading mechanism

---

## Support

For questions about specific versions or upgrade paths, contact support@spyne.ai

