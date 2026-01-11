# Integration Guide

Complete guide for integrating the 3D Gaussian Splat Viewer into your application.

---

## Table of Contents

1. [Integration Methods](#integration-methods)
2. [Iframe Embedding](#iframe-embedding)
3. [React Component Integration](#react-component-integration)
4. [API Requirements](#api-requirements)
5. [Advanced Configuration](#advanced-configuration)
6. [Security Considerations](#security-considerations)
7. [Performance Optimization](#performance-optimization)
8. [Troubleshooting](#troubleshooting)

---

## Integration Methods

### Method 1: Iframe Embedding (Recommended)

Best for: Quick integration, security isolation, cross-framework compatibility

```html
<iframe 
  src="https://your-domain.com/viewer?sku_id=YOUR_SKU_ID"
  width="100%" 
  height="600px"
  frameborder="0"
  allowfullscreen
  allow="accelerometer; gyroscope; fullscreen"
  style="border-radius: 8px;"
></iframe>
```

#### Responsive Iframe

```html
<div style="position: relative; width: 100%; padding-bottom: 56.25%; /* 16:9 aspect ratio */">
  <iframe 
    src="https://your-domain.com/viewer?sku_id=YOUR_SKU_ID"
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>
```

#### Iframe Communication

Use `postMessage` for parent-child communication:

```javascript
// Parent window
const iframe = document.getElementById('viewer-iframe');

// Send message to viewer
iframe.contentWindow.postMessage({
  type: 'LOAD_MODEL',
  skuId: 'NEW_SKU_ID'
}, 'https://your-domain.com');

// Receive messages from viewer
window.addEventListener('message', (event) => {
  if (event.origin !== 'https://your-domain.com') return;
  
  if (event.data.type === 'VIEWER_LOADED') {
    console.log('Viewer loaded successfully');
  }
  
  if (event.data.type === 'VIEWER_ERROR') {
    console.error('Viewer error:', event.data.error);
  }
});
```

---

### Method 2: React Component Integration

Best for: React applications, full control, customization

#### Installation

```bash
# Clone and copy the viewer to your project
cp -r 3d-product/src/features/viewer your-project/src/components/
cp -r 3d-product/src/core your-project/src/
cp -r 3d-product/src/services your-project/src/
```

#### Usage in React

```jsx
import { GaussianSplatViewer } from './components/viewer';

function ProductPage({ productId }) {
  const handleLoadComplete = (viewer) => {
    console.log('3D viewer loaded:', viewer);
  };

  const handleError = (error) => {
    console.error('Viewer error:', error);
  };

  return (
    <div className="product-3d-viewer" style={{ height: '600px' }}>
      <GaussianSplatViewer
        skuId={productId}
        autoRotate={true}
        performanceTier="medium"
        enableBackground={false}
        enableGradient={true}
        onLoadComplete={handleLoadComplete}
        onError={handleError}
      />
    </div>
  );
}
```

---

### Method 3: Script Tag Embed (Future)

Coming soon - Standalone JavaScript bundle for non-React applications.

---

## Iframe Embedding

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <title>Product 3D View</title>
  <style>
    .viewer-container {
      width: 100%;
      max-width: 1200px;
      height: 600px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div class="viewer-container">
    <iframe 
      id="3d-viewer"
      src="https://your-domain.com/viewer?sku_id=ABC123&autoRotate=true"
      width="100%" 
      height="100%"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</body>
</html>
```

### WordPress Integration

```php
<!-- In your WordPress theme template -->
<div class="product-3d-viewer">
  <iframe 
    src="https://your-domain.com/viewer?sku_id=<?php echo get_post_meta(get_the_ID(), 'sku_id', true); ?>"
    width="100%" 
    height="600px"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>
```

### Shopify Integration

```liquid
<!-- In your Shopify product template -->
<div class="product-3d-viewer">
  <iframe 
    src="https://your-domain.com/viewer?sku_id={{ product.metafields.custom.sku_id }}"
    width="100%" 
    height="600px"
    frameborder="0"
    allowfullscreen
  ></iframe>
</div>
```

---

## API Requirements

### Backend API Setup

Your API must provide 3D model configuration. Implement this endpoint:

```
GET /3d/api/v2/sku/getById?sku_id={SKU_ID}
```

#### Required Response Format

```json
{
  "sku_id": "ABC123",
  "status": "active",
  "config_details": {
    "model_config": {
      "new_perams": {
        "initialCameraPosition": [-0.5, -3.7, -0.06]
      },
      "torus_config": {
        "torus_inner_radius": 3.5
      }
    }
  }
}
```

#### Optional Metadata

```json
{
  "car_name": "Tesla Model 3",
  "sku_name": "model3-2024",
  "year": 2024,
  "make": "Tesla",
  "model": "Model 3"
}
```

### Point Cloud Storage

Store `.ply` files in S3 with this structure:

```
s3://your-bucket/processed/{SKU_ID}/point_cloud.ply
```

Update environment variables:

```env
VITE_S3_BUCKET_URL=https://your-bucket.s3.amazonaws.com
```

---

## Advanced Configuration

### Custom Background Models

```javascript
// Upload custom background
const viewer = document.getElementById('viewer');
viewer.src = 'https://your-domain.com/viewer?sku_id=ABC123&bg=true&bgUrl=https://cdn.example.com/custom-bg.glb';
```

### Performance Tiers

```javascript
// Auto-detect (default)
?sku_id=ABC123

// Force high performance
?sku_id=ABC123&tier=high

// Optimize for low-end devices
?sku_id=ABC123&tier=low
```

### Custom Styling

```html
<style>
  .viewer-wrapper {
    border: 2px solid #333;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.3);
  }
</style>

<div class="viewer-wrapper">
  <iframe src="..." frameborder="0"></iframe>
</div>
```

---

## Security Considerations

### CORS Configuration

If hosting separately, configure CORS on your API:

```javascript
// Express.js example
app.use(cors({
  origin: ['https://your-frontend.com', 'https://viewer.your-domain.com'],
  credentials: true
}));
```

### Content Security Policy

Add to your HTML head:

```html
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.spyne.ai https://*.amazonaws.com;
  frame-src 'self' https://viewer.your-domain.com;
">
```

### API Authentication

For private models, implement authentication:

```javascript
// Frontend
const viewer = new Viewer({
  apiKey: 'your-api-key',
  skuId: 'ABC123'
});

// Backend API
app.get('/3d/api/v2/sku/getById', authenticate, (req, res) => {
  // Verify API key
  // Return SKU data
});
```

---

## Performance Optimization

### Lazy Loading

Load viewer only when visible:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const iframe = entry.target;
      iframe.src = iframe.dataset.src;
      observer.unobserve(iframe);
    }
  });
});

const viewerIframe = document.getElementById('viewer');
viewerIframe.dataset.src = 'https://...';
observer.observe(viewerIframe);
```

### Preloading

```html
<link rel="preconnect" href="https://api.spyne.ai">
<link rel="preconnect" href="https://spyne-prod-3d-model.s3.amazonaws.com">
<link rel="dns-prefetch" href="https://d2b9isnedwxntv.cloudfront.net">
```

### CDN Hosting

Host the viewer on a CDN for optimal performance:

- Cloudflare
- AWS CloudFront
- Vercel
- Netlify

---

## Troubleshooting

### Issue: Viewer not loading

**Check:**
1. SKU ID is valid and exists
2. API endpoint is accessible
3. CORS is configured correctly
4. Browser supports WebGL

```javascript
// Test WebGL support
const canvas = document.createElement('canvas');
const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
if (!gl) {
  alert('Your browser does not support WebGL');
}
```

### Issue: Slow loading

**Solutions:**
1. Use performance tier parameter: `?tier=low`
2. Enable CDN for static assets
3. Compress `.ply` files
4. Use progressive loading

### Issue: Iframe not responsive

**Solution:**
```css
.responsive-iframe-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
}

.responsive-iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
```

### Issue: Blank screen on mobile

**Check:**
1. Device has sufficient GPU memory
2. Use `tier=low` for older devices
3. Reduce point cloud resolution

---

## Examples

### E-commerce Product Page

```html
<div class="product-container">
  <div class="product-images">
    <!-- 2D images -->
  </div>
  
  <div class="product-3d-view">
    <h3>Interactive 3D View</h3>
    <iframe 
      src="https://viewer.example.com?sku_id=product-123&gradient=true"
      width="100%" 
      height="500px"
      frameborder="0"
    ></iframe>
  </div>
  
  <div class="product-details">
    <!-- Product info -->
  </div>
</div>
```

### Car Dealership Website

```html
<div class="vehicle-showcase">
  <div class="vehicle-3d-viewer">
    <iframe 
      src="https://viewer.example.com?sku_id=tesla-model3&autoRotate=true&bg=true&gradient=true"
      width="100%" 
      height="700px"
      frameborder="0"
      allowfullscreen
    ></iframe>
  </div>
</div>
```

---

## Support

Need help? Contact us:

- 📧 Email: support@spyne.ai
- 💬 Slack: #3d-viewer-support
- 📝 Docs: https://docs.spyne.ai/3d-viewer

---

**Happy Integrating! 🎉**

