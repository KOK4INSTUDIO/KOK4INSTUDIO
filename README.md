# KOK4INSTUDIO — Vite Migration

This project was migrated to a Vite (vanilla) setup to enable modern dev tooling and easy deployment to Vercel.

Quick start:

```bash
# install dependencies
npm install

# start dev server (localhost:5173)
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```

Vercel deployment:
- Vercel will run `npm run build` and serve the `dist` directory.
- If you use the Vercel Git integration, push to GitHub and redeploy your project at https://vercel.com/kok4instudio-5192s-projects/kok4in

Notes:
- `index.html`, `style.css`, `script.js`, and the `img/` folder were preserved. `script.js` is loaded as an ES module under Vite.
