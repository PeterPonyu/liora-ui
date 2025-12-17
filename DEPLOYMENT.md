# Liora UI - GitHub Pages Deployment Guide

This guide explains how to deploy the Liora UI project to GitHub Pages using GitHub Actions (the modern, automated way).

## 📋 Quick Start

### 1. Initialize Git Repository (if not already done)

```bash
cd ~/Desktop/Liora/liora-ui
git init
git add .
git commit -m "Initial commit: Liora benchmarking UI"
```

### 2. Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Name: `Liora` (or your preferred name)
3. Description: "Single-cell benchmarking dashboard"
4. Choose Public (required for free GitHub Pages)
5. Click "Create repository"

### 3. Push to GitHub

```bash
git remote add origin https://github.com/YOUR_USERNAME/Liora.git
git branch -M main
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository: `https://github.com/YOUR_USERNAME/Liora`
2. Settings → Pages
3. **Source:** Select `GitHub Actions` (dropdown)
4. **Done!** Your site will deploy automatically

---

## 🚀 How It Works

### Automatic Deployment Flow

```
You push code to main branch
    ↓
GitHub Actions workflow triggered (.github/workflows/deploy.yml)
    ↓
Installs dependencies
    ↓
Builds Next.js project (npm run build)
    ↓
Uploads .next/standalone to GitHub Pages
    ↓
Website live at: https://YOUR_USERNAME.github.io/Liora
```

### Files Set Up for You

| File | Purpose |
|------|---------|
| `.github/workflows/deploy.yml` | Automatic CI/CD workflow |
| `next.config.ts` | Next.js config with basePath |
| `.nojekyll` | Tells GitHub Pages to skip Jekyll processing |
| `package.json` | Deploy script added |

---

## 📤 Deploying Updates

Every time you push to `main`, the site automatically updates:

```bash
# Make changes
git add .
git commit -m "Update dashboard"
git push origin main

# Workflow runs automatically, site updates in ~2-3 minutes
```

### Check Deployment Status

1. Go to **Actions** tab on GitHub
2. View the `Deploy to GitHub Pages` workflow
3. See build logs and deployment status

---

## 🌐 Accessing Your Site

After the first successful deployment:

- **Live URL:** `https://YOUR_USERNAME.github.io/Liora`
- **Example:** `https://alice.github.io/Liora`

### If repo name is different

Update `next.config.ts` line 5:
```typescript
const repoName = "your-repo-name"; // Match your GitHub repo name
```

---

## 🔧 Configuration Details

### Next.js Setup (`next.config.ts`)

```typescript
output: "standalone"           // Optimized build
basePath: "/Liora"             // GitHub repo name
assetPrefix: "/Liora/"         // Assets path
images: { unoptimized: true }  // GitHub Pages compatible
```

### Deployment Workflow (`deploy.yml`)

- **Trigger:** Push to `main` or `master`
- **Node version:** 18.x
- **npm flag:** `--legacy-peer-deps` (for lucide-react compatibility)
- **Build:** `npm run build`
- **Deploy:** Uploads `.next/standalone` to GitHub Pages

---

## ✅ Verification Checklist

After first deployment, verify:

- [ ] Workflow completes successfully (Actions tab)
- [ ] Site accessible at `https://username.github.io/Liora`
- [ ] All pages load (home, models, datasets, metrics, benchmarks)
- [ ] Navigation links work
- [ ] Dark/light theme toggle functional
- [ ] No 404 errors in browser console
- [ ] Images and styling display correctly

---

## 🐛 Troubleshooting

### Issue: "Workflow fails to complete"

**Solution:**
1. Check Actions tab for error logs
2. Common fixes:
   ```bash
   npm install --legacy-peer-deps
   npm run build
   ```
3. Verify Node.js version in Actions is 18.x

### Issue: "Site returns 404"

**Solution:**
1. Verify repository is **public** (not private)
2. Check that `basePath` matches repository name:
   ```typescript
   const repoName = "Liora"; // Must match GitHub repo name
   ```
3. Clear browser cache (Ctrl+Shift+Delete)
4. Wait 2-3 minutes for Pages to rebuild

### Issue: "Assets (CSS/JS) not loading"

**Solution:**
1. Verify `assetPrefix` in `next.config.ts`
2. Open DevTools → Network tab
3. Check asset URLs include `/Liora/` path
4. Hard refresh browser (Ctrl+Shift+R)

### Issue: "Dark mode not working"

**Solution:**
- CSS variables are already configured in `globals.css`
- This works on GitHub Pages out of the box
- Check theme toggle button in header

---

## 📚 Advanced: Custom Domain

To use a custom domain (e.g., `liora-demo.com`):

1. **Add CNAME file:**
   ```bash
   echo "liora-demo.com" > public/CNAME
   ```

2. **Configure DNS:** Add CNAME record pointing to `username.github.io`

3. **Update GitHub Pages:**
   - Settings → Pages
   - Custom domain: `liora-demo.com`

4. **Update `next.config.ts`:**
   ```typescript
   const repoName = "Liora";
   const isCustomDomain = process.env.NEXT_PUBLIC_CUSTOM_DOMAIN === "true";
   
   basePath: isCustomDomain ? "" : `/${repoName}`,
   assetPrefix: isCustomDomain ? "" : `/${repoName}/`,
   ```

---

## 🔄 Development Workflow

```bash
# 1. Local development
npm run dev
# Visit http://localhost:3000

# 2. Test production build
npm run build
npm start

# 3. Push to GitHub (triggers automatic deployment)
git push origin main

# 4. Check live site
# https://username.github.io/Liora
```

---

## 📝 Environment Variables

If you need environment variables:

1. **Local development:** Create `.env.local`
   ```
   NEXT_PUBLIC_API_URL=http://localhost:3000
   ```

2. **GitHub Actions:** Add secrets
   - Settings → Secrets and variables → Actions
   - Add secret: `API_URL`
   - Use in workflow: `${{ secrets.API_URL }}`

---

## ✨ What's Next

After deployment:

- [ ] Share your live site link
- [ ] Add custom domain (optional)
- [ ] Connect to real API endpoints
- [ ] Set up database/backend
- [ ] Add authentication if needed
- [ ] Monitor with GitHub Actions insights

---

## 📞 Support

- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [GitHub Pages Help](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

**Status:** ✅ Ready to Deploy!

Your Liora UI is configured for automatic GitHub Pages deployment. Just push to GitHub and it will be live within minutes!
