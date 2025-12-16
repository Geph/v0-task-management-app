# Simple Colorful Emoji Task List App

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app)

![Task Management App Screenshot](https://github.com/Geph/v0-task-management-app/blob/main/Example-Screenshot.png)

---

## Three Stand-Out Features

### 1. Emojis Everywhere
Every task can have its own emoji for quick visual identification. The app includes an extensive emoji picker with hundreds of emojis organized by category - from office essentials (calendars, mail, charts) to people, animals, food, and symbols. Emojis are fully searchable by related keywords, so typing "report" finds documents or "hungry" finds food emojis. New tasks even get smart emoji suggestions based on keywords in the task name.

### 2. Colorful Status and Priority System
Tasks are organized with vibrant, color-coded status and priority indicators. Statuses include On-going (blue), Working on it (yellow), Stuck (pink), Waiting/Review (cyan), and more. Priorities range from High (red) to Low (blue) to Someday (teal). All colors are customizable through the settings, letting you create a system that works for your workflow.

### 3. Simple and Intuitive
No complicated setup or learning curve. Tasks are organized into collapsible sections that you can rename, reorder, and manage easily. The clean interface focuses on what matters - getting things done. Works beautifully on both desktop and mobile devices with a responsive design that adapts to your screen size.

---

## Main Features

### Task Management
- **Sections**: Organize tasks into named sections that can be expanded/collapsed, renamed, reordered (up/down arrows), or deleted
- **Task Details**: Click any task to open a detailed view with notes, status, priority, progress, due date, and assignee
- **Rich Text Notes**: Add formatted notes to tasks with bold, italic, underline, and hyperlinks
- **Task Completion**: Mark tasks complete to move them to a dedicated "Completed" section (collapsible); incomplete them to restore to original section
- **Bulk Actions**: Select multiple tasks to delete, move to another section, or merge into one

### Customization
- **Custom App Name**: Personalize the header with your own app name
- **Column Visibility**: Show/hide columns for attachments, status, priority, progress, due date, and assignee
- **Column Ordering**: Drag and drop to reorder columns as you prefer
- **Manage Options**: Add, edit, or remove status and priority options with custom colors
- **PIN Protection**: Optionally set a PIN to protect access to your task list

### Sorting and Search
- **Column Sorting**: Click column headers to sort by name, status, priority, or due date
- **Search**: Filter tasks across all sections by name or emoji
- **Smart Defaults**: New tasks appear at the top; default sorting prioritizes by priority, then progress, then alphabetically

### Data Management
- **Local Storage Persistence**: All changes are automatically saved and persist across page reloads
- **XML Export/Import**: Export your entire task list (sections, tasks, notes, settings) to XML; import from XML files
- **File Attachments**: Attach files to individual tasks

### Mobile-Friendly
- Responsive design with optimized layouts for phone screens
- Section action buttons stack below headers on small screens
- Touch-friendly dropdowns and dialogs

---

## Deployment

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app). Any changes you make to your deployed app will be automatically pushed to this repository.

### Self-Hosting

May require modification to your specific server directory and settings. `next.config.mjs` will likely need to be changed. Here's an example:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // produce /out for static hosting
  basePath: '/task',       // your subdirectory
  assetPrefix: '/task/',   // ensure scripts/styles point under /task
  trailingSlash: true,     // helps static hosts
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};

export default nextConfig;
```

---

## Tech Stack

- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

---

## License

MIT
