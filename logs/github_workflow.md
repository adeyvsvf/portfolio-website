# GitHub Workflow Guide

## One-Time Setup (Already Completed)
- Created local Git repository
- Created GitHub repository
- Connected local repo to remote GitHub repo

## Regular Workflow

### 1. Update GitHub Personal Access Token (PAT)
If you haven't already, you need to update the push script with your GitHub token:

1. Generate a Personal Access Token (PAT) on GitHub:
   - Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
   - Click "Generate new token" → "Generate new token (classic)"
   - Give it a name like "Portfolio Website Access"
   - Select the "repo" scope
   - Click "Generate token"
   - Copy the token (you'll only see it once!)

2. Edit the push_to_github.sh script:
   ```bash
   nano push_to_github.sh
   ```
   
3. Replace "YOUR_TOKEN" with your actual token
   ```bash
   TOKEN="your_actual_token_here"
   ```

4. Save the file and make it executable:
   ```bash
   chmod +x push_to_github.sh
   ```

### 2. Stage and Commit Changes
Every time you make changes to your website, follow these steps:

1. Check what files have been changed:
   ```bash
   git status
   ```

2. Add all changes to staging:
   ```bash
   git add .
   ```
   
   Or add specific files:
   ```bash
   git add index.html css/styles.css
   ```

3. Commit your changes with a descriptive message:
   ```bash
   git commit -m "Description of changes made"
   ```

### 3. Push to GitHub
1. Using the script (recommended for security):
   ```bash
   ./push_to_github.sh
   ```

2. Or manually (if you've configured GitHub credentials):
   ```bash
   git push -u origin main
   ```

### 4. Deploy to GitHub Pages (Optional)
1. Go to your GitHub repository
2. Click on "Settings"
3. Scroll down to "GitHub Pages" section
4. Under "Source", select "main" branch
5. Click "Save"
6. Your site will be published at https://yourusername.github.io/portfolio-website/

## Additional Useful Commands

### Clone your repository to another computer:
```bash
git clone https://github.com/yourusername/portfolio-website.git
```

### Pull latest changes from GitHub:
```bash
git pull origin main
```

### Create and switch to a new branch:
```bash
git checkout -b new-feature
```

### Merge a branch back to main:
```bash
git checkout main
git merge new-feature
```
