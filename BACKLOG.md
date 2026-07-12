# Backlog

Running list of things to do. Newest/most important near the top. Check items off
as they're completed.

## Marketing site

### Next up

- [x] **Wire up the contact form email** — the form now submits through the
  existing Express backend and the droplet's local Postfix service, delivering
  inquiries to `general.inviteyou@gmail.com`.

- [ ] **Revisit the website for correct values and create a hero video** — review
  all copy/stats/claims across the marketing pages for accuracy, and produce a
  hero video for the homepage.

### From the code review (recommended follow-ups)

- [ ] **Host images locally** — all imagery is hot-linked from ephemeral Stitch
  URLs (`lh3.googleusercontent.com/aida-public/...`) that will expire. Download
  into `marketing/assets/` and reference locally.
- [ ] **Compile Tailwind to static CSS** — replace `cdn.tailwindcss.com` with a
  pinned, minified local `tailwind.css` to drop the production CDN warning.
- [ ] **Add security headers to the apex Nginx block** — `X-Content-Type-Options`,
  `X-Frame-Options`, HSTS (to match the `k-golf` block).
- [x] **Footer legal links** — removed the dead `href="#"` placeholders
  (Privacy/Terms/Cookie/Sitemap). *(Optional)* add a real Privacy Policy page if
  the contact form starts storing submissions (PIPEDA/CASL).

### SEO follow-ups

- [ ] **Submit `sitemap.xml` to Google Search Console** — verify the
  `inviteyou.ca` property and submit `https://inviteyou.ca/sitemap.xml` so pages
  get crawled/indexed. (robots.txt + sitemap.xml + per-page meta are now in place.)
- [ ] **Add an `og:image`** — no social-share preview image exists yet; add a
  branded 1200×630 image and reference it via `og:image` on each page.
- [ ] **Re-enable footer/contact social links** — the "Follow our journey" block
  on `contact.html` is commented out; add real LinkedIn/X/Instagram profile URLs
  and uncomment it.

## App / infrastructure

- [ ] **Fix the app CI pipeline** — `.github/workflows/main.yml` fails on the
  deprecated `actions/upload-artifact@v3`; bump the artifact actions to v4.
- [ ] **(Optional) Gate the app pipeline** — add `paths-ignore: ["marketing/**"]`
  to `main.yml` so marketing-only merges don't redundantly redeploy the app.
