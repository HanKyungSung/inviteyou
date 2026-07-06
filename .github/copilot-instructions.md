# Copilot instructions — inviteyou

Guidance for AI assistants (GitHub Copilot) working in this repository.

## Project overview

This repo contains **two independent deliverables** that ship to the **same
DigitalOcean droplet** (`147.182.215.135`) but are otherwise unrelated:

1. **Invitation app** (MERN) — `invitation-frontend/` (React + TypeScript) and
   `invitation-backend/` (Express + MongoDB). Serves `we.inviteyou.ca` (app) and
   `api.inviteyou.ca` (backend). Deployed by `.github/workflows/main.yml`.
2. **Static marketing site** — `marketing/` (9 HTML pages, Tailwind via CDN).
   Serves `inviteyou.ca` + `www.inviteyou.ca`. Deployed by
   `.github/workflows/marketing.yml`.

Changing one must not break the other. See `README.md` for the full hostname map
and `marketing/DEPLOY.md` for the live Nginx configuration and rollback steps.

## Working conventions

- **This is a personal project: commit and push directly to `main`.** Do not
  create feature branches or PRs unless a change specifically warrants one (e.g.
  something risky you want to stage/review first).
- `main` has branch protection requiring 1 review; `enforce_admins` is off, so
  the owner can admin-merge when a PR is used.
- Keep the two deliverables cleanly separated — never mix app and marketing
  changes in a way that couples their deploys.
- Update docs (`README.md`, `marketing/DEPLOY.md`) when you change deployment,
  hostnames, or workflows. Keep the README table of contents in sync.

## Build / test

- Frontend: from `invitation-frontend/` — `npm install`, build via
  `npm run build-without-eslint` (the CI uses this variant).
- Backend: from `invitation-backend/` — `npm install`, `npm run build`.
- Marketing site: static; preview locally with
  `cd marketing && python3 -m http.server 8000`.

## Deployment

- **App:** `main.yml` triggers on a merged PR to `main` (no path filter) and
  SSH-deploys the built app. Note: it fires on *any* merged PR, even
  marketing-only ones (harmless but redundant).
- **Marketing:** `marketing.yml` triggers on pushes to `main` under
  `marketing/**` (or the workflow file) and rsyncs `marketing/` to
  `MARKETING_TARGET_PATH` (`/var/www/inviteyou-web`).
- **Server/Nginx:** the droplet is shared with the `konegolf` project. Both
  deploy via GitHub Actions over SSH using repo secrets. Apex + www are served
  from the static site; the `k-golf.inviteyou.ca` and `*.inviteyou.ca`
  (we./api.) Nginx blocks must be preserved. Full config and rollback are in
  `marketing/DEPLOY.md`.
- Secrets: `SERVER_SSH_KEY`, `SSH_HOST`, `SSH_USER`, `TARGET_PATH` (app),
  `MARKETING_TARGET_PATH` (marketing), and the `MONGO_DB_*` values for the app.

## Known issues

- `main.yml` currently fails at setup due to a deprecated `actions/upload-artifact@v3`;
  the `release`/deploy job is gated on build success, so a failed build does not
  redeploy or disrupt the running app. Bumping the artifact actions to v4 would
  fix the app pipeline.
