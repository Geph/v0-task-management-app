# Simple Colorful Emoji Task List App

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/thejeffginger-5327s-projects/v0-click-up-task-list)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/Y9vCuO7c9OX)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

## Deployment

May require modification to your specific server directory and settings. next.config.mjs will likely need to be changed, here's an example:

\`\`\`
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
\`\`\`
