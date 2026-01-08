# GitHub Pages Deployment Guide

## ✅ Setup Complete!

Your project is now configured for GitHub Pages deployment. Follow these steps to deploy:

## 📋 Prerequisites

1. GitHub account
2. Repository created on GitHub
3. Node.js and npm installed locally

## 🚀 Deployment Steps

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit changes
git commit -m "Initial commit - K-GEO website"

# Add remote repository (replace with your GitHub repo URL)
git remote add origin https://github.com/yourusername/K-geo-v2.git

# Push to main branch
git branch -M main
git push -u origin main
```

### Step 2: Enable GitHub Pages

1. Go to your GitHub repository
2. Navigate to **Settings** → **Pages**
3. Under "Build and deployment":
   - **Source**: Select "GitHub Actions"
   - This will automatically use the workflow we created

### Step 3: Automatic Deployment

The GitHub Actions workflow will:
- Automatically trigger on every push to `main` branch
- Install dependencies
- Build the project
- Deploy to GitHub Pages

Your site will be live at: **`https://yourusername.github.io/K-geo-v2/`**

## 📝 Configuration Details

### Vite Config Updates
- ✅ Base path set to `/K-geo-v2/`
- ✅ Output directory changed to `dist`

### GitHub Actions Workflow
- ✅ Automatic deployment on push
- ✅ Node.js 18 environment
- ✅ npm caching for faster builds

## 🔄 How It Works

1. You push code to GitHub
2. GitHub Actions automatically runs the workflow
3. Project is built with `npm run build`
4. Built files are deployed to GitHub Pages
5. Your site is live!

## 📊 Build Output

- **Build Command**: `npm run build`
- **Output Directory**: `dist/`
- **Base Path**: `/K-geo-v2/`

## ⚠️ Important Notes

- The base path `/K-geo-v2/` must match your repository name
- All routes will be prefixed with `/K-geo-v2/`
- The workflow uses `GITHUB_TOKEN` (automatically available)
- No manual configuration needed for the token

## 🆘 Troubleshooting

### Site not loading?
- Check that GitHub Pages is enabled in repository settings
- Verify the base path matches your repository name
- Check GitHub Actions logs for build errors

### Styles/images not loading?
- Ensure all imports use relative paths
- Check that the base path is correctly set in vite.config.ts

### Build fails?
- Run `npm install` locally to check for dependency issues
- Check GitHub Actions logs for specific errors
- Ensure all TypeScript types are correct

## 📚 Useful Commands

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Development server
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint
```

## 🎯 Next Steps

1. Push your code to GitHub
2. Wait for GitHub Actions to complete (usually 1-2 minutes)
3. Visit `https://yourusername.github.io/K-geo-v2/`
4. Your K-GEO website is live!

---

**Happy deploying! 🚀**
