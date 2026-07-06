#!/usr/bin/env python3
"""Standardize the shared header + footer across all InviteYou.ca pages so every
page is reachable (fully connected navigation)."""
import re
from pathlib import Path

OUT = Path(__file__).resolve().parent

# dest file -> active nav label (None = no active top-nav item)
ACTIVE = {
    "index.html": None,
    "services.html": "Services",
    "solutions.html": "Solutions",
    "process.html": "Process",
    "portfolio.html": "Portfolio",
    "about.html": "About",
    "contact.html": "Contact",
    "careers.html": None,
    "faq.html": None,
}

NAV = [
    ("Services", "services.html"),
    ("Solutions", "solutions.html"),
    ("Process", "process.html"),
    ("Portfolio", "portfolio.html"),
    ("About", "about.html"),
    ("Contact", "contact.html"),
]

INACTIVE_CLS = ("text-on-surface-variant hover:text-primary transition-colors "
                "duration-200 font-label-md text-label-md")
ACTIVE_CLS = ("text-primary border-b-2 border-primary pb-1 font-semibold "
              "font-label-md text-label-md")


def header_html(active):
    links = []
    for label, href in NAV:
        cls = ACTIVE_CLS if label == active else INACTIVE_CLS
        links.append(f'<a class="{cls}" href="{href}">{label}</a>')
    links_html = "\n".join(links)
    return f'''<header class="fixed top-0 left-0 w-full z-50 bg-surface/70 backdrop-blur-xl shadow-sm">
<div class="flex justify-between items-center max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-4">
<a href="index.html" class="font-headline-md text-headline-md font-bold text-primary tracking-tight" style="cursor:pointer">InviteYou.ca</a>
<nav class="hidden md:flex items-center space-x-8">
{links_html}
</nav>
<a href="contact.html"><button class="bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full font-label-md text-label-md hover:scale-105 hover:shadow-md transition-all duration-200 active:scale-95">Get Started</button></a>
</div>
</header>'''


FLINK = "text-on-surface-variant hover:text-primary transition-all text-body-md font-body-md"
FLEGAL = "text-on-surface-variant hover:text-primary transition-all text-sm font-body-md"


def _fcol(title, items):
    lis = "\n".join(
        f'<li><a class="{FLINK}" href="{href}">{label}</a></li>'
        for label, href in items)
    return f'''<div>
<h4 class="font-label-md text-label-md uppercase tracking-widest text-on-surface mb-4">{title}</h4>
<ul class="space-y-3">
{lis}
</ul>
</div>'''


FOOTER = f'''<footer class="w-full bg-surface-container-lowest border-t border-surface-variant">
<div class="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
<div class="col-span-2 md:col-span-1">
<a href="index.html" class="font-headline-md text-headline-md font-bold text-primary" style="cursor:pointer">InviteYou.ca</a>
<p class="font-body-md text-body-md text-on-surface-variant mt-4 max-w-xs">Architecting custom business solutions with high-tech innovation and institutional reliability.</p>
</div>
{_fcol("Company", [("About", "about.html"), ("Careers", "careers.html"), ("Contact", "contact.html")])}
{_fcol("Expertise", [("Services", "services.html"), ("Solutions", "solutions.html"), ("Process", "process.html"), ("Portfolio", "portfolio.html")])}
{_fcol("Support", [("FAQ", "faq.html"), ("Contact", "contact.html"), ("Get Started", "contact.html")])}
</div>
<div class="border-t border-surface-variant">
<div class="max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-6 flex flex-col md:flex-row justify-between items-center gap-4">
<p class="font-label-sm text-label-sm text-on-surface-variant">© 2024 InviteYou.ca Business Solutions. All rights reserved.</p>
<div class="flex flex-wrap justify-center gap-6">
<a class="{FLEGAL}" href="#">Privacy Policy</a>
<a class="{FLEGAL}" href="#">Terms of Service</a>
<a class="{FLEGAL}" href="#">Cookie Policy</a>
<a class="{FLEGAL}" href="#">Sitemap</a>
</div>
</div>
</div>
</footer>'''

HEADER_RE = re.compile(r'<header\b[^>]*>.*?</header>', re.S)
FAQ_NAV_RE = re.compile(r'<nav class="fixed top-0[^"]*"[^>]*>.*?</nav>', re.S)
FOOTER_RE = re.compile(r'<footer\b[^>]*>.*?</footer>', re.S)


def main():
    for fname, active in ACTIVE.items():
        p = OUT / fname
        html = p.read_text(encoding="utf-8")
        hdr = header_html(active)
        if HEADER_RE.search(html):
            html, n = HEADER_RE.subn(hdr, html, count=1)
        else:  # faq.html uses a bare fixed <nav> as its header
            html, n = FAQ_NAV_RE.subn(hdr, html, count=1)
        fn = FOOTER_RE.subn(FOOTER, html, count=1)
        html, nf = fn
        p.write_text(html, encoding="utf-8")
        print(f"  {fname}: header={n} footer={nf} active={active}")


if __name__ == "__main__":
    main()
