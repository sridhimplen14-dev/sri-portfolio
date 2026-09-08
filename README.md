# Sri Dhimple — Portfolio

Developer-console style personal portfolio built with React, TypeScript, Vite, Tailwind CSS, and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

## Edit your content

**All resume-derived content lives in one file:**

[`src/data/portfolio.ts`](src/data/portfolio.ts)

Update these fields before publishing:

| Field | Why |
| --- | --- |
| `personal.email` | Resume had a placeholder |
| `personal.phone` | Resume had a placeholder |
| `personal.socials.github` | Resume had a placeholder URL |
| `personal.availability` | Optional status string, or leave `null` |
| `projects` | Add real projects (none were listed on the resume) |
| `projectPlaceholders` | Remove after adding real projects |
| `contactFormEndpoint` | Optional Formspree/EmailJS URL; empty uses `mailto:` |

Resume PDF download path:

- File: `public/Sri_Dhimple_Nuthalapati_Resume.pdf`
- Configured via `personal.resumeFile`

## Deploy

Any static host works with the Vite build output in `dist/`:

- **Vercel / Netlify:** connect the repo; build command `npm run build`, output `dist`
- **GitHub Pages:** set base path in `vite.config.ts` if needed, then deploy `dist`

## Stack

- React 19 + TypeScript
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React + Simple Icons
# sri-portfolio
