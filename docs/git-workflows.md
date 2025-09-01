# Git Workflow Reference

## Standard Commit Flow
```bash
git add .
git commit -m "[type]: [description]"
git push origin main
```

## Commit Message Format
- `feat:` - New feature
- `fix:` - Bug fix
- `refactor:` - Code restructuring
- `wip:` - Work in progress
- `chore:` - Maintenance tasks

## Common Commands

### View Recent Commits
```bash
git log --oneline -5
git log --oneline --pretty=format:"%h %ai %s" -5
```

### Reset to Previous Commit
```bash
git reset --hard [commit-hash]
git push origin main --force
```

### Clean Working Directory
```bash
git reset --hard HEAD && git clean -fd
```

### Create New Repository
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin [repository-url]
git push -u origin main
```

### Vercel Redeploy
```bash
vercel --prod --force
```

## Example Commit Messages
- `feat: add dashboard, authentication, and landing page`
- `fix: clipboard copy/paste functionality`
- `refactor: implement flexbox grid layout`
- `feat: add auto-hide header for improved UX`
- `wip: header improvements`
- `feat: add scroll-to-top on drafted table`
- `feat: add dark mode`
- `refactor: remove title/subtitle and add nested tabs for improved UI`
- `feat: add clipboard fallback, sticky tabs, and empty state for undrafted view`

## Instructions for AI Agent
When user states a change:
1. Respond only with git commands
2. Use appropriate commit type prefix
3. Keep commit messages concise and descriptive
4. Format:
   ```bash
   git add .
   git commit -m "[type]: [description]"
   git push origin main
   ```