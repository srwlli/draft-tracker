# Navigation (use appropriate one for your OS)
cd ~/Desktop/tracker-final
cd "C:\Users\willh\Desktop\tracker-final"

# Creating Next.js project
npx create-next-app@latest draft-tracker

# Navigate into project directory
cd draft-tracker

# Install dependencies
npm install @supabase/supabase-js @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities uuid sonner

# Initialize shadcn
npx shadcn@latest init

# Shadcn components
npx shadcn@latest add button
npx shadcn@latest add table
npx shadcn@latest add dialog
npx shadcn@latest add select
npx shadcn@latest add tabs
npx shadcn@latest add card
npx shadcn@latest add separator
npx shadcn@latest add badge
npx shadcn@latest add avatar
npx shadcn@latest add checkbox
npx shadcn@latest add input

# Git setup
git init
git add .
git commit -m "Initial setup: Next.js project with dependencies and Shadcn UI components"
git remote add origin https://github.com/srwlli/draft-tracker.git
git push -u origin main

# Check Dependencies
npm list --depth=0

# Check Shadcn Components
ls src/components/ui

# Git update
git add .
git commit -m "Your specific change description here"
git push


