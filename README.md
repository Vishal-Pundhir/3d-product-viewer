# 3D Gaussian Splat Viewer

> High-performance 3D point cloud visualization for web applications

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/spyne-ai-tech/3d-product)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## Overview

The **3D Gaussian Splat Viewer** is a production-ready, embeddable widget for displaying 3D point cloud models using Gaussian Splatting technology. Built with React and Three.js, it provides stunning visual quality with optimized performance across devices.

### Key Features

✨ **High Performance** - Automatic device profiling and performance tier optimization  
🎨 **Beautiful Rendering** - Advanced Gaussian Splatting for photorealistic quality  
📱 **Responsive** - Works seamlessly on desktop, tablet, and mobile  
🔧 **Customizable** - Easy configuration via URL parameters or props  
🚀 **Lightweight** - Optimized bundle size with code splitting  
🛡️ **Robust** - Comprehensive error handling and recovery  
📦 **Easy Integration** - Embed via iframe or direct integration  

---

## Quick Start

### 1. As an Iframe (Recommended)

```html
<iframe 
  src="https://3d.yourcompany.com/viewer?sku_id=YOUR_SKU_ID"
  width="100%" 
  height="600px"
  frameborder="0"
  allowfullscreen
></iframe>
```

### 2. Direct URL

```
https://3d.yourcompany.com/viewer?sku_id=YOUR_SKU_ID&autoRotate=true&gradient=true
```

### 3. Development Mode

```bash
# Clone the repository
git clone https://github.com/spyne-ai-tech/3d-product.git
cd 3d-product

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# http://localhost:3000?sku_id=YOUR_SKU_ID
```

---

## Configuration Options

### URL Parameters

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `sku_id` | string | **required** | Unique identifier for the 3D model |
| `autoRotate` | boolean | `true` | Enable automatic rotation |
| `tier` | string | `medium` | Performance tier: `low`, `basic`, `medium`, `high`, `ultra-high` |
| `bg` | boolean | `false` | Enable background model |
| `gradient` | boolean | `false` | Enable gradient background |
| `bgUrl` | string | - | Custom background GLB model URL |

### Examples

```html
<!-- Basic viewer with auto-rotation -->
?sku_id=ABC123&autoRotate=true

<!-- High performance mode with gradient background -->
?sku_id=ABC123&tier=high&gradient=true

<!-- With custom background -->
?sku_id=ABC123&bg=true&bgUrl=https://example.com/bg.glb
```

---

## Technology Stack

- **Framework**: React 19.2
- **Build Tool**: Vite 7.2
- **3D Engine**: Three.js 0.182
- **Rendering**: Custom Gaussian Splatting module
- **HTTP Client**: Axios
- **Styling**: Tailwind CSS 4.1
- **Code Quality**: ESLint, Prettier, Husky

---

## Project Structure

```
3d-product/
├── src/
│   ├── core/                    # Core rendering engine
│   │   └── gaussian-splats/     # Gaussian splatting module
│   ├── services/                # API and external services
│   │   ├── api/                 # SKU service, API client
│   │   └── config/              # Configuration management
│   ├── features/                # Feature modules
│   │   └── viewer/              # Main viewer component
│   ├── shared/                  # Shared utilities
│   │   ├── hooks/               # Custom React hooks
│   │   ├── utils/               # Helper functions
│   │   └── components/          # Reusable components
│   ├── config/                  # App configuration
│   └── styles/                  # Global styles
├── public/                      # Static assets
├── .github/workflows/           # CI/CD pipelines
└── docs/                        # Documentation
```

---

## Development

### Prerequisites

- Node.js 18+ 
- npm 9+

### Setup

```bash
# Install dependencies
npm install

# Copy environment template
cp .env.example .env.development

# Edit environment variables
# Update API endpoints as needed
```

### Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Linting
npm run lint
npm run lint:fix

# Formatting
npm run format
npm run format:check
```

### Environment Variables

Create `.env.development` and `.env.production` files:

```env
# API Configuration
VITE_API_BASE_URL=https://api.spyne.ai
VITE_S3_BUCKET_URL=https://spyne-prod-3d-model.s3.amazonaws.com
VITE_CLOUDFRONT_URL=https://d2b9isnedwxntv.cloudfront.net

# Debug & Monitoring
VITE_ENABLE_DEBUG=true
VITE_SENTRY_DSN=

# Performance
VITE_DEFAULT_PERFORMANCE_TIER=medium
```

---

## API Integration

The viewer fetches 3D model data from your API. Ensure your API returns data in this format:

```json
{
  "sku_id": "ABC123",
  "config_details": {
    "model_config": {
      "new_perams": {
        "initialCameraPosition": [-0.5, -3.7, -0.06]
      },
      "torus_config": {
        "torus_inner_radius": 3.5
      }
    }
  },
  "status": "active"
}
```

---

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari 14+, Chrome Mobile)

---

## Performance

### Bundle Size
- Main bundle: ~180KB gzipped
- Three.js: ~120KB gzipped
- Gaussian module: ~150KB gzipped (lazy-loaded)

### Load Time
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- 3D Model Load: Varies by model size

### Optimization
- Automatic device profiling
- Progressive model loading
- Code splitting
- CDN delivery
- WebGL 2.0 with fallback

---

## Troubleshooting

### Common Issues

**Issue**: Viewer shows "sku_id is required"  
**Solution**: Ensure URL includes `?sku_id=YOUR_ID`

**Issue**: Black screen or no rendering  
**Solution**: Check browser WebGL support at https://get.webgl.org/

**Issue**: Slow performance  
**Solution**: Use `tier=low` parameter for low-end devices

**Issue**: API errors  
**Solution**: Verify API endpoint and SKU ID validity

---

## Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards
- Follow ESLint and Prettier configurations
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## License

MIT License - see [LICENSE](LICENSE) file for details

---

## Support

- 📧 Email: support@spyne.ai
- 📝 Documentation: [Integration Guide](INTEGRATION_GUIDE.md)
- 🐛 Issues: [GitHub Issues](https://github.com/spyne-ai-tech/3d-product/issues)

---

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

## Acknowledgments

- Built with [Three.js](https://threejs.org/)
- Powered by [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**Made with ❤️ by Spyne.ai**
