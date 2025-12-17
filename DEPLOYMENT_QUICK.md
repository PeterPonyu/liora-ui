# 🚀 Liora UI - Deployment Quick Reference

## One-Time Setup (5 minutes)

### Step 1: Create GitHub Repository
```bash
# Go to https://github.com/new
# Name: Liora
# Public: Yes
# Click Create
```

### Step 2: Push Your Code
```bash
cd ~/Desktop/Liora/liora-ui
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/Liora.git
git branch -M main
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Go to `https://github.com/YOUR_USERNAME/Liora/settings/pages`
2. **Source:** Select `GitHub Actions`
3. Done! ✅

---

## ✅ Deployment Complete!

Your site will be live at: **`https://YOUR_USERNAME.github.io/Liora`**

Check the **Actions** tab to monitor the build progress.

---

## Regular Updates

Every time you want to update:

```bash
git add .
git commit -m "Your message"
git push origin main
# Site updates automatically in ~2 minutes
```

---

## Files Created for Deployment

```
.github/workflows/deploy.yml      ← Automatic deployment workflow
.nojekyll                         ← GitHub Pages configuration
next.config.ts                    ← Updated with GitHub Pages config
package.json                      ← Added deploy script
DEPLOYMENT.md                     ← Full deployment guide (this file)
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| 404 Error | Wait 2-3 min, check repo is public, clear cache |
| Assets not loading | Hard refresh (Ctrl+Shift+R) |
| Build fails | Check Actions tab logs |
| Dark mode broken | Clear cache, reload page |

---

## Useful Commands

```bash
# Test build locally
npm run build

# Start dev server
npm run dev

# Check deployment status
git log --oneline  # See your commits

# Update specific repo name
# Edit line 5 in next.config.ts:
# const repoName = "your-repo-name";
```

---

## Links

- 📍 Live Site: `https://YOUR_USERNAME.github.io/Liora`
- 🔧 Repository: `https://github.com/YOUR_USERNAME/Liora`
- 📊 Actions: `https://github.com/YOUR_USERNAME/Liora/actions`
- ⚙️ Settings: `https://github.com/YOUR_USERNAME/Liora/settings/pages`

---

**That's it! Your Liora UI is ready to deploy!** 🎉
