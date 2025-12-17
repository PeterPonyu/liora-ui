# GitHub Actions Workflows

## Deploy to GitHub Pages (`deploy.yml`)

Automatically builds and deploys the Liora UI to GitHub Pages.

### Trigger
- **Push to** `main` or `master` branch
- **Pull requests** to `main` or `master` (preview builds)

### Steps
1. Checkout code
2. Setup Node.js 18
3. Install dependencies with `--legacy-peer-deps`
4. Build Next.js project
5. Upload build artifact to GitHub Pages
6. Deploy to GitHub Pages

### Configuration
- **Node Version:** 18.x
- **Build Command:** `npm run build`
- **Deploy:** `.next/standalone` → GitHub Pages

### Monitoring
View deployment status in the **Actions** tab of your GitHub repository.

### Deployment URL
After successful deployment, your site will be available at:
`https://YOUR_USERNAME.github.io/Liora`
