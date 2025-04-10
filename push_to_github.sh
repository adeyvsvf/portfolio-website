#!/bin/bash

# Replace these with your GitHub username and token
USERNAME="adeyvsvf"
TOKEN="YOUR_TOKEN"
REPO="portfolio-website"

# Get the current branch name
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Create the URL with authentication
REMOTE_URL="https://$USERNAME:$TOKEN@github.com/$USERNAME/$REPO.git"

# Update the remote URL to include the token
git remote set-url origin $REMOTE_URL

# Push to GitHub
echo "Pushing to GitHub..."
git push -u origin $BRANCH

# Reset the remote URL to remove the token (for security)
git remote set-url origin "https://github.com/$USERNAME/$REPO.git"

echo "Push completed!"
