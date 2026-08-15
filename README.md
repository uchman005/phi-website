# Passion of Hope International — Website

The public website for Passion of Hope International (PHI), a US 501(c)(3)
nonprofit working across Kenya, Nigeria, and the DRC. Built with Next.js 16
(App Router, Turbopack), Tailwind CSS v4, and a PayPal-powered donation flow.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in the values — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # serve a production build locally
npm run lint    # eslint
```

## Environment variables

Copy `.env.local.example` to `.env.local` and fill it in. It documents each
variable inline, including exactly how to obtain PayPal Sandbox and Live
credentials and how to register the PayPal webhook. In short:

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used in SEO metadata, sitemap, structured data |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal app Client ID (public) |
| `PAYPAL_CLIENT_SECRET` | PayPal app Secret (server only — never commit or expose) |
| `PAYPAL_ENV` | `sandbox` or `live` |
| `PAYPAL_MONTHLY_PLAN_ID` | Recurring-donation billing plan; auto-created and logged on first use if unset, then should be pinned |
| `PAYPAL_WEBHOOK_ID` | Used to verify PayPal webhook signatures locally (see `lib/paypal.ts`) |

Without PayPal credentials set, the donate page still renders — it just shows
a "payments being set up" notice instead of live buttons.

## Editing content

Most of the site's real-world content lives in a handful of typed config
files under `lib/`, not scattered across page components. Edit these first:

- **`lib/hubs.ts`** — every hub (DRC, Nigeria, Kenya), their leaders, and
  every project under them (base image, gallery, description). Drives
  `/programs/hubs`, `/programs/hubs/[hub]`, and `/programs/hubs/[hub]/[project]`
  automatically — new hubs/projects need no page code, just a new entry here.
  Leave an image's `src` unset to render a labelled placeholder instead of a
  broken image.
- **`lib/donation-projects.ts`** — the donation categories shown on `/donate`
  and validated server-side by the PayPal API routes. This is the single
  source of truth for project names/ids — the server never trusts a project
  name sent by the client, only the id, which it resolves from this file.
- **`lib/blog-posts.ts`** — blog posts shown on `/blog` and `/blog/[slug]`.

Team members (`app/team/page.tsx`), testimonials (`app/testimonials/page.tsx`),
and most standalone pages (`app/about`, `app/impact`, `app/partners`, etc.)
still hold their content directly in the page file.

## PayPal integration

- **One-time donations**: `app/api/paypal/create-order` →
  PayPal Checkout → `app/api/paypal/capture-order` (Orders v2). Capture is
  idempotent — a duplicate capture attempt (double-click, retry) is treated
  as a successful lookup rather than an error.
- **Monthly donations**: PayPal Subscriptions against a single $1/unit
  billing plan (`app/api/paypal/monthly-plan`), where quantity = donation
  amount — avoids creating a new plan per dollar amount.
- **Webhook** (`app/api/paypal/webhook`): verifies PayPal's signature
  **locally** (fetches PayPal's own signing certificate and verifies the RSA
  signature in-process) rather than relying solely on PayPal's remote
  verification API, which was found to accept forged requests in Sandbox.
  See the comments in `lib/paypal.ts` for details.
- All amounts are re-validated server-side (`validateAmount` in
  `lib/paypal.ts`) regardless of what the client sends. The PayPal routes are
  also rate-limited per IP (`lib/rate-limit.ts`) — a best-effort, in-memory
  limiter scoped to a single warm server instance.

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`:

1. **`verify`** job — lints and builds on a GitHub-hosted runner. If this
   fails, the VPS is never touched.
2. **`deploy`** job — SSHes into the VPS and runs `scripts/deploy.sh` (fetched
   fresh from the exact commit being deployed, since the repo is public).
   That script backs up the currently-live build, pulls the new code,
   installs dependencies, lints, and builds again — and **automatically
   rolls back to the previous commit and restarts pm2 on it** if any of
   those steps, or a post-restart health check, fails. A failed deploy always
   leaves production on the last known-good version.

Required GitHub repo configuration (Settings → Secrets and variables →
Actions):

- **Secrets**: `VPS_HOST`, `VPS_USERNAME`, `VPS_SSH_KEY`, `VPS_PORT`
- **Variables**: `VPS_APP_DIR`, `VPS_PM2_ID`, `VPS_HEALTH_URL`

See `scripts/deploy.sh` for the full rollback logic and required env vars.

## Tech stack

- [Next.js 16](https://nextjs.org/docs) (App Router, Turbopack, `next/font`)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals
- [@paypal/react-paypal-js](https://github.com/paypal/react-paypal-js) for the donate flow
- TypeScript throughout; ESLint via `eslint-config-next`
