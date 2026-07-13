# Front-End AI Capstone — FlyRank

A frontend AI engineering capstone project built with React, TypeScript, and Next.js.

## Overview

FlyRank is an AI-powered web app that uses a large language model to help users interact with content through a polished, modern interface. It demonstrates a full-stack frontend approach for building secure, server-side AI features.

## Features

- AI-assisted content interaction through a Next.js application
- Server-side LLM requests to keep API keys protected
- Auth-ready structure with route protection and environment-based configuration

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **UI:** React
- **Styling:** Tailwind CSS
- **AI/LLM:** [e.g. Anthropic API / OpenAI API]
- **Auth:** Auth.js (NextAuth.js)
- **Deployment:** [e.g. Vercel]

## Getting Started

```bash
# clone the repo
git clone <repo-url>
cd <repo-name>

# install dependencies
npm install

# set up environment variables
cp .env.example .env.local
# then fill in your API keys

# run the dev server
npm run dev
```

Visit `http://localhost:3000` to view the app.

## Environment Variables

| Variable | Description |
|---|---|
| `ANTHROPIC_API_KEY` | API key for AI features (server-side only, never exposed to client) |

## Project Structure

```
/app          — Next.js App Router pages and layouts
/components   — Reusable React components
/lib          — Utility functions, API clients
/middleware.ts — Route protection / auth checks
```

## Scripts

- `npm run dev` — start development server
- `npm run build` — production build
- `npm run lint` — run linter

## License

MIT — see [LICENSE](./LICENSE).
