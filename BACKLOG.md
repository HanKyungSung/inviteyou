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

- [ ] **Add TimeNDime to the portfolio** — `timendime.com` is a live project and
  should sit alongside K one Golf on `portfolio.html` (and in the homepage
  "Featured Engagements" grid). It is a mobile-first, no-login group scheduling
  web app (When2Meet / 모두의 시간 style): a host shares a link, everyone paints
  their availability, and a live heatmap surfaces the best meeting time, plus a
  bill-splitting page. Stack: React client, Express + Postgres (Prisma) server,
  WebSockets, Docker on a DigitalOcean droplet. Repo:
  `github.com/HanKyungSung/timendime`. Needs screenshots captured and optimised
  into `marketing/assets/` (reuse the K one Golf carousel pattern).

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

## Ideas / exploration (not scheduled)

- [ ] **Korean/English language switch** — serve English at the current URLs and
  Korean under `/ko/`, with an "EN | 한국어" link in the header. This can be done
  fully statically (translated page copies plus plain links); JavaScript is only
  needed if we want to auto-suggest Korean from the browser language or remember
  the visitor's choice. Country-based auto-redirects need Nginx/CDN geolocation
  and are unreliable for travellers and VPN users, so prefer a suggestion over a
  forced redirect. Also add `hreflang` tags and both language trees to
  `sitemap.xml`. Cost: every page, nav, and meta description needs a translation.

- [ ] **Run an LLM on the visitor's own machine (in-browser inference)** — worth
  exploring as a service offering and/or a site demo. A web app can run a
  quantised model client-side over WebGPU with no per-message cloud bill and no
  user data leaving the device:
  - **WebLLM** (`@mlc-ai/web-llm`) for chat/text generation; OpenAI-compatible API.
  - **Transformers.js** for smaller jobs: embeddings, classification,
    translation, summarisation, speech, image analysis.
  - **Ollama on localhost** when the user is willing to install software; the
    page then talks to a local service.
  - Constraints to design around: WebGPU needs a secure context (HTTPS) and is
    unavailable on some older/mobile devices; the first load downloads hundreds
    of MB to several GB into browser storage (OPFS/IndexedDB); heavy RAM, GPU,
    and battery use; small local models are weaker than hosted ones.
  - Preferred shape: opt-in (never auto-download on page load), feature-detect
    `navigator.gpu`, run inference in a Web Worker, and keep a server API
    fallback for unsupported devices.

## App / infrastructure

- [ ] **Fix the app CI pipeline** — `.github/workflows/main.yml` fails on the
  deprecated `actions/upload-artifact@v3`; bump the artifact actions to v4.
- [ ] **(Optional) Gate the app pipeline** — add `paths-ignore: ["marketing/**"]`
  to `main.yml` so marketing-only merges don't redundantly redeploy the app.
