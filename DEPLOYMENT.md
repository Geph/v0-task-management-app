# Deploying to Dreamhost Shared Hosting

## Option 1: Download from GitHub (Recommended)

1. **Clone or download** your repository from GitHub
2. **Install dependencies** (requires Node.js on your local machine):
   \`\`\`bash
   npm install
   \`\`\`
3. **Build the static site**:
   \`\`\`bash
   npm run build
   \`\`\`
4. **Upload the `out` folder** contents to your Dreamhost public_html directory via FTP

## Option 2: Direct FTP Upload

If you don't have Node.js locally, you can:

1. Download the repository as a ZIP from GitHub
2. Extract it locally
3. Upload ALL files to a subdirectory on your Dreamhost server
4. Use SSH (if available) to run the build commands on the server

## File Structure After Build

After running `npm run build`, you'll find a new `out` folder containing:
- `index.html` (your main app)
- `_next/` folder (contains CSS, JS, and other assets)
- Other static files

## Important Notes

- **Upload the contents of the `out` folder**, not the folder itself
- Make sure your Dreamhost domain points to the directory containing `index.html`
- The app will work entirely client-side with localStorage for data persistence
- No server-side functionality is required

## Troubleshooting

- If images don't load, check that the `_next` folder uploaded correctly
- Ensure file permissions are set correctly (644 for files, 755 for directories)
- Clear your browser cache if you see old versions after updates
