# Backlog

Running list of things to do. Newest/most important near the top. Check items off
as they're completed.

## Marketing site

- [ ] **Revisit the website for correct values and create a hero video** — review
  all copy/stats/claims across the marketing pages for accuracy, and produce a
  hero video for the homepage.

### From the code review (recommended follow-ups)

- [ ] **Wire up the contact form** — `marketing/contact.html` currently shows a
  success message but discards submissions. Connect it to a real endpoint
  (Express API, Formspree, or a mailto fallback).
- [ ] **Host images locally** — all imagery is hot-linked from ephemeral Stitch
  URLs (`lh3.googleusercontent.com/aida-public/...`) that will expire. Download
  into `marketing/assets/` and reference locally.
- [ ] **Compile Tailwind to static CSS** — replace `cdn.tailwindcss.com` with a
  pinned, minified local `tailwind.css` to drop the production CDN warning.
- [ ] **Add security headers to the apex Nginx block** — `X-Content-Type-Options`,
  `X-Frame-Options`, HSTS (to match the `k-golf` block).
- [ ] **Real footer legal pages** — Privacy Policy / Terms / Cookie Policy /
  Sitemap are currently `href="#"` placeholders.

## App / infrastructure

- [ ] **Fix the app CI pipeline** — `.github/workflows/main.yml` fails on the
  deprecated `actions/upload-artifact@v3`; bump the artifact actions to v4.
- [ ] **(Optional) Gate the app pipeline** — add `paths-ignore: ["marketing/**"]`
  to `main.yml` so marketing-only merges don't redundantly redeploy the app.
