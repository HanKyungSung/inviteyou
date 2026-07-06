# Marketing site deployment (server / Nginx)

This folder holds the **static marketing site** served at `https://inviteyou.ca` and
`https://www.inviteyou.ca`. It is deployed by `.github/workflows/marketing.yml`
(SSH deploy) to the server directory in the `MARKETING_TARGET_PATH` secret
(default: `/var/www/inviteyou-web`).

**Untouched by this change:** `we.inviteyou.ca` (the React invitation app) and
`api.inviteyou.ca` (Express/MongoDB backend).

---

## One-time server setup (run on the droplet via SSH)

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
