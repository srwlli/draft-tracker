# Initialize a Git repository
git init

# Create a .gitignore file (Next.js should have created one, but verify)
# If not created, add these essentials:
# node_modules
# .next
# .env.local

# Add all files to staging
git add .

# Make initial commit
git commit -m "Initial setup: Next.js project with dependencies"

# Add a remote repository (replace with your actual GitHub/GitLab URL)
git remote add origin https://github.com/yourusername/draft-tracker.git

# Push to remote repository
git push -u origin main