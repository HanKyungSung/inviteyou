# inviteyou

This repository contains **two independent deliverables** that ship to the same
DigitalOcean droplet but are otherwise unrelated:

| # | What | Lives in | Served at | Deployed by |
|---|------|----------|-----------|-------------|
| 1 | **Invitation app** (existing MERN product) | `invitation-frontend/`, `invitation-backend/` | `we.inviteyou.ca` (app) + `api.inviteyou.ca` (backend) | `.github/workflows/main.yml` |
| 2 | **Marketing site** (new static site) | `marketing/` | `inviteyou.ca` + `www.inviteyou.ca` | `.github/workflows/marketing.yml` |

> The two are deployed separately and do not affect each other. Changing the
> marketing site never redeploys the app's runtime, and vice versa.

---

## Repository structure

```
.
├── invitation-frontend/   # React + TypeScript SPA (the invitation app UI)
├── invitation-backend/    # Express + MongoDB API
├── marketing/             # Static marketing site (HTML + Tailwind CDN)
│   ├── *.html             # 9 pages (index, about, services, solutions,
│   │                      #          process, portfolio, contact, careers, faq)
│   ├── build_site.py      # Generator: normalizes filenames + rewires links
│   ├── connect_nav.py     # Generator: standardizes header/footer nav
│   ├── nginx-inviteyou-marketing.conf  # Nginx server block for apex + www
│   └── DEPLOY.md          # One-time server/Nginx setup, verify, rollback
└── .github/workflows/
    ├── main.yml           # Builds + deploys the app (we. / api.)
    └── marketing.yml      # Deploys the static marketing site (apex / www)
```

## Domain / hostname map

All hostnames resolve to the same droplet (`147.182.215.135`); Nginx routes by host:

| Hostname | Serves | Backed by |
|----------|--------|-----------|
| `inviteyou.ca` | Marketing site | Static files in `/var/www/inviteyou-web` |
| `www.inviteyou.ca` | Redirects to `inviteyou.ca` | Nginx redirect |
| `we.inviteyou.ca` | Invitation app (React SPA) | `main.yml` deploy target |
| `api.inviteyou.ca` | Invitation backend (Express/MongoDB) | `main.yml` deploy target |

---

# 1. Invitation app (existing MERN product)

## Tech stack
- ReactJS
- ExpressJS
- MongoDB
- TypeScript

## How to start
1. Fill up the `.env` file. Copy the values from the `.env.example` file and remove the `.example` extension.
2. Run `npm install` under `/invitation-frontend` and `/invitation-backend` to install dependencies.

## Frontend `.env`
- `REACT_APP_API_URL`: Default set to `http://localhost:8080` for local backend.
- `DISABLE_ESLINT_PLUGIN`: Default set to `false`. We set this to `true` when we need to disable it for reasons.

## Backend `.env`
```env
  NODE_ENV=development

  SECRET_KEY="" # Random generated secret key to use authentication.

  MONGO_DB_USERNAME=
  MONGO_DB_PASSWORD=
  MONGO_DB_NAME=test
```

This is a mobile invitation project.

---

# 2. Marketing site (new static site)

A 9-page static marketing site built from the Stitch "Luminous Professionalism"
design (Tailwind via CDN, Hanken Grotesk / Inter / JetBrains Mono, electric-blue
`#0062FF`, glassmorphic nav, scroll-reveal animations). All pages are
cross-linked with a standardized header and footer.

## Local preview
```bash
cd marketing
python3 -m http.server 8000
# open http://localhost:8000/index.html
```

## Regenerating pages
The pages were produced from the design exports by two helper scripts (kept for
reproducibility):
- `build_site.py` — copies source pages to clean filenames and rewires `href="#"`
  links by their label text.
- `connect_nav.py` — injects a consistent header + footer into every page so all
  pages (including FAQ and Careers) are reachable.

## Server setup & deployment
See **[`marketing/DEPLOY.md`](marketing/DEPLOY.md)** for the one-time Nginx/TLS
setup on the droplet, verification commands, and rollback steps. The Nginx server
block lives in [`marketing/nginx-inviteyou-marketing.conf`](marketing/nginx-inviteyou-marketing.conf).

There are two ways to do the server setup:
- **Automated (recommended):** run the **`Marketing Server Setup (Nginx/TLS)`**
  workflow (`.github/workflows/marketing-server-setup.yml`) from the Actions tab.
  It SSHes into the droplet using the existing deploy secrets and installs the
  Nginx block for you (defaults to a safe dry-run; set `apply=apply` to go live).
- **Manual:** follow the SSH steps in `marketing/DEPLOY.md`.

---

# CI / CD

Both deploys reuse the same SSH secrets: `SERVER_SSH_KEY`, `SSH_HOST`, `SSH_USER`.

## `main.yml` — Invitation app
- **Trigger:** a pull request to `main` is **closed** (i.e. merged), or manual
  **workflow_dispatch**. It has **no path filter**, so it runs on *every* merged
  PR regardless of which files changed.
- **Does:** builds the React frontend + Express backend, then SSH-deploys to
  `TARGET_PATH` and restarts the app (serves `we.` / `api.`).

## `marketing.yml` — Marketing site
- **Trigger:** a push to `main` that changes files under **`marketing/**`** (or
  the `marketing.yml` workflow file itself), or manual **workflow_dispatch**.
- **Does:** rsyncs the `marketing/` folder over SSH to `MARKETING_TARGET_PATH`
  (default `/var/www/inviteyou-web`) with `--delete`, excluding the `.py`
  generator scripts (serves `inviteyou.ca` / `www`).

## `marketing-server-setup.yml` — One-time Nginx/TLS setup
- **Trigger:** manual **workflow_dispatch** only (never runs automatically).
- **Does:** SSHes into the droplet with the existing `SERVER_SSH_KEY` / `SSH_HOST`
  / `SSH_USER` secrets (the same droplet + access pattern the `konegolf` repo
  uses) to install the apex/www Nginx block, optionally run `certbot`, validate
  with `nginx -t`, and reload. Defaults to a safe **dry-run** (auto-rolls back,
  changes nothing); set input `apply=apply` to actually enable + reload. Leaves
  `we.` / `api.` untouched.

### Does the marketing pipeline only trigger on marketing changes?
**Yes** — `marketing.yml` only runs when files inside `marketing/**` (or its own
workflow file) change on `main`, plus manual dispatch.

**But the reverse is not symmetric:** `main.yml` (the app pipeline) has **no
`paths:` filter** and fires on *any* merged PR. So merging a marketing-only PR
will still trigger an app rebuild + redeploy. That redeploys the same app and is
harmless, just redundant. If you want the app pipeline to skip marketing-only
changes, add a `paths-ignore: ["marketing/**"]` filter to `main.yml`.

## Required GitHub secrets
| Secret | Used by | Purpose |
|--------|---------|---------|
| `SERVER_SSH_KEY` | both | SSH private key for the droplet |
| `SSH_HOST` | both | Droplet host/IP |
| `SSH_USER` | both | SSH user |
| `TARGET_PATH` | `main.yml` | App deploy directory |
| `MARKETING_TARGET_PATH` | `marketing.yml` | Static site directory (`/var/www/inviteyou-web`) |
| `MONGO_DB_USERNAME` / `MONGO_DB_PASSWORD` / `MONGO_DB_NAME` | `main.yml` | App build/runtime |

---

## Contact us
- Hailey Yang
