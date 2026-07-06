#!/usr/bin/env python3
"""Assemble the InviteYou.ca multi-page site from the Stitch source folders.

Copies each source `code.html` to a clean filename in this directory and rewires
all internal navigation: brand -> home, nav/footer labels -> their pages,
CTAs (Get Started / Book Consultation / etc.) -> contact.
"""
import re
from pathlib import Path

SRC = Path.home() / "Downloads" / "stitch_inviteyou_dynamic_business_solution"
OUT = Path(__file__).resolve().parent

# source folder -> destination filename
PAGES = {
    "home_inviteyou.ca_business_solutions": "index.html",
    "services_inviteyou.ca_business_solutions": "services.html",
    "solutions_inviteyou.ca_tailored_business_solutions": "solutions.html",
    "process_inviteyou.ca_methodology": "process.html",
    "portfolio_inviteyou.ca_case_studies": "portfolio.html",
    "about_us_inviteyou.ca_mission_team": "about.html",
    "contact_us_inviteyou.ca_project_inquiry": "contact.html",
    "careers_join_the_inviteyou.ca_team": "careers.html",
    "faq_frequently_asked_questions_inviteyou.ca": "faq.html",
}

# normalized anchor text -> destination file
LABEL_MAP = {
    "home": "index.html",
    "solutions": "solutions.html",
    "services": "services.html",
    "process": "process.html",
    "portfolio": "portfolio.html",
    "view portfolio": "portfolio.html",
    "view all work": "portfolio.html",
    "view case studies": "portfolio.html",
    "about": "about.html",
    "about us": "about.html",
    "our story": "about.html",
    "contact": "contact.html",
    "contact us": "contact.html",
    "get in touch": "contact.html",
    "start a project": "contact.html",
    "start a conversation": "contact.html",
    "book consultation": "contact.html",
    "book a consultation": "contact.html",
    "get started": "contact.html",
    "careers": "careers.html",
    "join our team": "careers.html",
    "view open roles": "careers.html",
    "view all positions": "careers.html",
    "faq": "faq.html",
    "faqs": "faq.html",
    "inviteyou.ca": "index.html",
    # Footer service columns
    "custom web apps": "services.html",
    "mobile development": "services.html",
    "ai integration": "services.html",
    "saas systems": "services.html",
    "b2b platforms": "services.html",
    "custom tech": "services.html",
    "digital strategy": "services.html",
    "ux/ui design": "services.html",
    # Footer industry columns
    "fintech": "solutions.html",
    "finance": "solutions.html",
    "retail": "solutions.html",
    "tech & saas": "solutions.html",
    "healthcare": "solutions.html",
    "logistics": "solutions.html",
}


def norm(text: str) -> str:
    t = text.replace("&amp;", "&")
    t = re.sub(r"\s+", " ", t).strip().lower()
    t = t.strip(" \u2192->\u2013\u2014.!")  # strip arrows/punctuation
    return t.strip()


def rewrite_anchor(m: re.Match) -> str:
    pre, mid, label = m.group(1), m.group(2), m.group(3)
    dest = LABEL_MAP.get(norm(label))
    if dest:
        return f'{pre}"{dest}"{mid}{label}'
    return m.group(0)


# Matches <a ... href="#"> LABEL   (label = text up to next tag)
ANCHOR_RE = re.compile(r'(<a\b[^>]*?href=)"#"([^>]*>)(\s*[^<]*)')

# Brand text as a <div> -> convert to link to home
BRAND_DIV_RE = re.compile(r'<div([^>]*)>(\s*InviteYou\.ca\s*)</div>')

# "Get Started" style <button> in headers -> wrap with a contact link
GET_STARTED_BTN_RE = re.compile(
    r'(<button\b[^>]*>)(\s*Get Started\s*)(</button>)', re.S)


def transform(html: str) -> str:
    html = ANCHOR_RE.sub(rewrite_anchor, html)
    html = BRAND_DIV_RE.sub(
        r'<a href="index.html"\1 style="cursor:pointer">\2</a>', html)
    html = GET_STARTED_BTN_RE.sub(
        r'<a href="contact.html">\1\2\3</a>', html)
    return html


def main():
    count = 0
    for folder, dest in PAGES.items():
        src_file = SRC / folder / "code.html"
        if not src_file.exists():
            print(f"!! missing {src_file}")
            continue
        html = src_file.read_text(encoding="utf-8")
        (OUT / dest).write_text(transform(html), encoding="utf-8")
        count += 1
        print(f"  {folder}/code.html -> {dest}")
    print(f"Wrote {count} pages to {OUT}")


if __name__ == "__main__":
    main()
