# Simple Colorful Emoji-Enhanced Task List App

![a picture of this app]([image-url](https://github.com/Geph/v0-task-management-app/blob/main/preview-image.jpg))

I decided I would vibe code a replacement to ClickUp that had better colors, fun emojis and was free to use. 

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/thejeffginger-5327s-projects/v0-click-up-task-list)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/Y9vCuO7c9OX)

## Overview

So colorful it almost makes to-do lists fun. Columns include uploads, priority, status, due date, progress and who it's assigned to. Reflows for mobile to be mostly functional there too. Export it to xml for backup or to transfer to another device if you're not hosting it on the web. Add a passcode to keep evil-doers out. 

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

Install [Node.js](https://nodejs.org/en) and build with: 
```bash
npm install
```
and then 
```bash
npm run build
```

May require modification to your specific server directory and settings. next.config.mjs will likely need to be changed, here's an example:

```
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // produce /out for static hosting
  basePath: '/task',       // <<< your subdirectory
  assetPrefix: '/task/',   // ensure scripts/styles point under /task
  trailingSlash: true,     // helps static hosts
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
};

export default nextConfig;
```
