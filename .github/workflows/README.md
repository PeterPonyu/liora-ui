# Deployment Pipeline

## Automated GitHub Pages Deployment

This project uses GitHub Actions to automatically build and deploy to GitHub Pages on every push to `main` or `master` branch.

### How It Works

**Every push triggers:**
1. ✅ Code checkout
2. 📦 Node.js 20.x environment setup
3. 📥 Dependency installation
4. 🔨 Next.js production build
5. 📤 Deployment to GitHub Pages

### Live Site

Your site is automatically deployed and available at:  
**https://PeterPonyu.github.io/liora-ui**

### Monitor Deployments

Check build status and logs in your repository's **Actions** tab.

### Configuration

- **Trigger**: Push or pull request to `main`/`master`
- **Node Version**: 20.x (required for Next.js)
- **Build Command**: `npm run build`
- **Deploy Target**: `.next/standalone` → GitHub Pages
- **Cache**: npm dependencies cached for faster builds

### Workflow File

Configuration: `.github/workflows/deploy.yml`s

---

Deployments typically complete in 1-3 minutes. ⚡