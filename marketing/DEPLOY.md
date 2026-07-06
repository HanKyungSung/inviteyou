# Marketing site deployment (server / Nginx)

This folder holds the **static marketing site** served at `https://inviteyou.ca` and
`https://www.inviteyou.ca`. It is deployed by `.github/workflows/marketing.yml`
(SSH deploy) to the server directory in the `MARKETING_TARGET_PATH` secret
(default: `/var/www/inviteyou-web`).

**Untouched by this change:** `we.inviteyou.ca` (the React invitation app) and
`api.inviteyou.ca` (Express/MongoDB backend).

---

## ✅ Status: LIVE (deployed 2026-07-06)

The server-side Nginx setup below has **already been applied** to the droplet
(`147.182.215.135`). Current live routing:

| Host | Serves |
|------|--------|
| `inviteyou.ca` | Static marketing site (`/var/www/inviteyou-web`) |
| `www.inviteyou.ca` | 301 redirect → `inviteyou.ca` |
| `we.inviteyou.ca` | React invitation app (unchanged) |
| `api.inviteyou.ca` | Express/MongoDB backend (unchanged) |
| `k-golf.inviteyou.ca` | K one Golf (unchanged) |

**How it was actually done:** rather than a separate site file, the apex + www
handling was integrated into the existing `/etc/nginx/sites-available/inviteyou.ca`
so the `k-golf.inviteyou.ca` and `*.inviteyou.ca` (we./api.) server blocks are
preserved verbatim. The full deployed config is checked in as
[`nginx-inviteyou-marketing.conf`](./nginx-inviteyou-marketing.conf). Certs reused:
apex uses `inviteyou.ca-0001`, www reuses the `*.inviteyou.ca` wildcard cert
`inviteyou.ca-0002` (no new certbot needed). A timestamped backup of the previous
config was saved on the server as `/etc/nginx/sites-available/inviteyou.ca.bak.*`.

**Rollback:** restore the backup and reload —
```bash
ssh root@147.182.215.135 \
  'cp $(ls -t /etc/nginx/sites-available/inviteyou.ca.bak.* | head -1) \
      /etc/nginx/sites-available/inviteyou.ca && nginx -t && systemctl reload nginx'
```

Ongoing content updates deploy automatically via `.github/workflows/marketing.yml`
(rsync to `MARKETING_TARGET_PATH` = `/var/www/inviteyou-web`).

---

The sections below document the setup for reference / re-creation from scratch.

## Option A — Automated (workflow, no local SSH needed)

The repo already has SSH access to the droplet (the same secrets `main.yml` uses:
`SERVER_SSH_KEY` / `SSH_HOST` / `SSH_USER`). The **`Marketing Server Setup (Nginx/TLS)`**
workflow (`.github/workflows/marketing-server-setup.yml`) does the server setup
for you over SSH — the same way the `konegolf` repo configures this droplet.

1. GitHub → **Actions** → **Marketing Server Setup (Nginx/TLS)** → **Run workflow**.
2. Leave `apply` as `dry-run` for the first run. It will:
   - print the current `server_name` blocks (so you can see what serves apex/www today),
   - create the web root, upload the Nginx config, and run `nginx -t`,
   - **change nothing** (auto-rolls back the symlink) — safe to run anytime.
   - Set `run_certbot: true` on this run if the TLS cert doesn't yet cover apex + www.
3. Review the dry-run log. If the apex/www is currently handled inside the same
   block as `we.`/`api.`, first remove `inviteyou.ca www.inviteyou.ca` from that
   block's `server_name` (see Option B step 2) so there's no conflict.
4. Re-run the workflow with **`apply` = `apply`** to enable the site and reload Nginx.
   On any `nginx -t` failure it automatically rolls back and makes no changes.

> Prefer doing it by hand? Use **Option B** below.

---

## Option B — Manual one-time server setup (run on the droplet via SSH)

> Requires SSH access to `147.182.215.135` with sudo.

### 1. Create the web root (must match `MARKETING_TARGET_PATH`)
```bash
sudo mkdir -p /var/www/inviteyou-web
sudo chown -R "$USER":www-data /var/www/inviteyou-web
```

### 2. Inspect the current config to see what serves the apex today
```bash
grep -Rano "server_name[^;]*;" /etc/nginx/sites-enabled/ /etc/nginx/conf.d/ 2>/dev/null
```
Find the `server` block whose `server_name` matches `inviteyou.ca`/`www.inviteyou.ca`
(likely a `proxy_pass` to the Node/Express app). You will replace **only that block's
apex/www handling** with the static block below. Leave `we.inviteyou.ca` and
`api.inviteyou.ca` blocks exactly as they are.

### 3. Add the static server block
Create `/etc/nginx/sites-available/inviteyou-marketing` with the contents of
[`nginx-inviteyou-marketing.conf`](./nginx-inviteyou-marketing.conf) from this folder,
then enable it:
```bash
sudo ln -sf /etc/nginx/sites-available/inviteyou-marketing /etc/nginx/sites-enabled/inviteyou-marketing
```
> If the apex/www is currently handled inside the same block as `we.`/`api.`, instead
> remove `inviteyou.ca www.inviteyou.ca` from that block's `server_name` (and its
> apex/www TLS) so this new block takes over those two names.

### 4. TLS certificate
If the existing certificate does **not** already include the apex + www names, issue it:
```bash
sudo certbot --nginx -d inviteyou.ca -d www.inviteyou.ca
```
(Skip if the cert already covers them — the site already serves HTTPS today.)

### 5. Test & reload
```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## Deploy the files
- Automatic: merge `add-marketing-site` → `main`; the `Deploy Marketing Site` workflow
  runs on changes under `marketing/**` and rsyncs the files to `/var/www/inviteyou-web`.
- Manual trigger: GitHub → Actions → **Deploy Marketing Site** → *Run workflow*.

## Verify
```bash
curl -sI https://inviteyou.ca | grep -i '^HTTP\|^content-type'
curl -s  https://inviteyou.ca | grep -o '<title>[^<]*</title>'      # -> InviteYou.ca marketing
curl -s  https://we.inviteyou.ca | grep -o '<title>[^<]*</title>'   # -> You have been invited! (unchanged)
curl -sI https://api.inviteyou.ca | grep -i '^HTTP'                 # -> app/API unchanged
```

## Rollback
Re-add `inviteyou.ca www.inviteyou.ca` to the previous (proxy-to-Express) `server`
block — or disable this one:
```bash
sudo rm /etc/nginx/sites-enabled/inviteyou-marketing
sudo nginx -t && sudo systemctl reload nginx
```
