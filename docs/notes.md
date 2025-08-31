● Best approach for dark mode:

  1. Use Tailwind's built-in dark mode
    - Add darkMode: 'class' to tailwind.config.js
    - Use dark: prefix on classes
    - No extra packages needed
  2. Simple toggle button
    - Store preference in localStorage
    - Add/remove 'dark' class on <html>
    - ~20 lines of code total
  3. Skip next-themes for simple apps
    - Overkill for a draft tracker
    - Adds complexity and dependencies

  Example:
  onClick={() => document.documentElement.classList.toggle('dark')}

  Much simpler than ThemeProvider setup.

  ---

  need to modify all rankings, we hid the tab and the logic needs to be created.