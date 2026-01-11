# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Navigate to Repository
```bash
cd /Users/vishal-cm67/Documents/Spyne/360FE/3d-product
```

### 2. Install Dependencies (if not done)
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
```
http://localhost:3000?sku_id=YOUR_SKU_ID
```

---

## 📝 Common Commands

### Development
```bash
npm run dev          # Start dev server (port 3000)
npm run build        # Build for production
npm run preview      # Preview production build
```

### Code Quality
```bash
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format code with Prettier
npm run format:check # Check formatting
```

### Git
```bash
git status           # Check status
git log --oneline    # View commit history
git remote add origin <url>  # Add remote
git push -u origin main      # Push to GitHub
```

---

## 🔧 Quick Configuration

### Change API Endpoint
Edit `.env.development`:
```env
VITE_API_BASE_URL=http://your-api.com
```

### Enable Debug Mode
```env
VITE_ENABLE_DEBUG=true
```

### Change Default Performance Tier
```env
VITE_DEFAULT_PERFORMANCE_TIER=high
```

---

## 📦 Production Build

### Build
```bash
npm run build
```

### Output
```
dist/
├── index.html
├── assets/
│   ├── index-*.css
│   ├── three-*.js (148 KB gzipped)
│   ├── gaussian-splats-*.js (68 KB gzipped)
│   ├── react-vendor-*.js (60 KB gzipped)
│   └── ...
```

### Deploy
Upload `dist/` folder to:
- **Vercel**: `vercel --prod`
- **Netlify**: `netlify deploy --prod`
- **AWS S3**: `aws s3 sync dist/ s3://bucket`

---

## 🌐 Usage Examples

### Basic Viewer
```html
<iframe 
  src="http://localhost:3000?sku_id=ABC123"
  width="800" 
  height="600"
></iframe>
```

### With Options
```html
<iframe 
  src="http://localhost:3000?sku_id=ABC123&autoRotate=true&gradient=true&tier=high"
  width="100%" 
  height="600px"
></iframe>
```

### React Component
```jsx
import { GaussianSplatViewer } from '@features/viewer';

<GaussianSplatViewer
  skuId="ABC123"
  autoRotate={true}
  performanceTier="high"
  enableGradient={true}
/>
```

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### Build Fails
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Git Issues
```bash
# Reset to last commit
git reset --hard HEAD

# Clean untracked files
git clean -fd
```

---

## 📚 Documentation

- **README.md** - Comprehensive guide
- **INTEGRATION_GUIDE.md** - Integration details
- **MIGRATION_SUMMARY.md** - Migration report
- **CHANGELOG.md** - Version history

---

## 🎯 Next Steps

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/spyne-ai-tech/3d-product.git
   git push -u origin main
   ```

2. **Set up GitHub Secrets**
   - `VITE_API_BASE_URL`
   - `VITE_S3_BUCKET_URL`
   - `VITE_CLOUDFRONT_URL`

3. **Deploy**
   - Vercel / Netlify / AWS
   - Configure custom domain
   - Set up CDN

4. **Monitor**
   - Add Sentry for error tracking
   - Set up analytics
   - Monitor performance

---

## ✅ Checklist

Before deploying to production:

- [ ] Update API endpoints in `.env.production`
- [ ] Test with real SKU IDs
- [ ] Verify CORS configuration
- [ ] Set up error tracking (Sentry)
- [ ] Configure CDN
- [ ] Test on mobile devices
- [ ] Check bundle sizes
- [ ] Enable HTTPS
- [ ] Set up monitoring
- [ ] Update documentation with production URL

---

## 💡 Tips

1. **Fast Reload**: Vite HMR is instant - no need to refresh browser
2. **Debug Mode**: Add `VITE_ENABLE_DEBUG=true` to see console logs
3. **Path Aliases**: Use `@` for imports: `import X from '@features/viewer'`
4. **Bundle Size**: Check `dist/` folder after build
5. **Performance**: Use `?tier=low` for testing on slow devices

---

**Happy Developing! 🎉**

For support: support@spyne.ai

