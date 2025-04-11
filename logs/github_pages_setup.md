# Setting Up GitHub Pages for Your Portfolio Website

**Date:** Thursday, April 10, 2025

## What is GitHub Pages?
GitHub Pages is a free hosting service that takes HTML, CSS, and JavaScript files straight from a repository on GitHub and publishes a website.

## How to Set Up GitHub Pages

### Option 1: If your files are at the root of your repository

1. Go to your GitHub repository at https://github.com/adeyvsvf/portfolio-website
2. Click on "Settings"
3. Scroll down to the "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. GitHub will provide you with a URL (typically https://adeyvsvf.github.io/portfolio-website)

### Option 2: If your files are in the portfolio-website subdirectory

Since your files are currently in a subdirectory, you have a few options:

1. **Move files to root directory**:
   - Follow the steps in the github_guide.md for Option 2 to move files back to the root
   - Then follow Option 1 above for GitHub Pages setup

2. **Use the docs folder method**:
   - Create a folder called "docs" at the root of your repository
   - Move your website files into this docs folder
   - In repository Settings, under GitHub Pages, select "main branch /docs folder"
   
3. **Create a gh-pages branch**:
   ```bash
   # Clone your repository if you haven't already
   git clone https://github.com/adeyvsvf/portfolio-website.git
   cd portfolio-website
   
   # Create an orphan branch called gh-pages
   git checkout --orphan gh-pages
   
   # Remove everything except your website files
   git rm -rf .
   
   # Copy your website files to the root of this branch
   cp -r portfolio-website/* .
   
   # Add, commit and push
   git add .
   git commit -m "Set up GitHub Pages"
   git push origin gh-pages
   ```
   - In repository Settings, select "gh-pages" branch as your GitHub Pages source

## After Setup
- Your website will be available at https://adeyvsvf.github.io/portfolio-website/
- It may take a few minutes for your site to publish after setting up GitHub Pages
- Any changes you push to the selected branch will be automatically published

## Custom Domains
If you want to use a custom domain (like www.yourname.com):
1. Purchase a domain from a domain registrar (GoDaddy, Namecheap, etc.)
2. In your repository Settings, under GitHub Pages, enter your custom domain
3. Set up the DNS records with your domain provider as instructed by GitHub

## Alternative Hosting Options
- **Netlify**: Offers free hosting with more features
- **Vercel**: Great for frontend projects with automatic deployments
- **Render**: Simple cloud hosting with free tier
