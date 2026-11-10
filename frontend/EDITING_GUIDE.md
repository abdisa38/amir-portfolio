# Amir Dedefo portfolio

## Content

- `src/content/portfolio.ts`: profile, portrait, services, tools, projects, and public contact details.
- `src/content/experience.ts`: illustrative pricing, skillset, FAQs, fictional brands, and sample testimonials.
- `currencyCode` in `experience.ts` controls the ETB labels in pricing, FAQs, and project briefs. Sample amounts are unchanged; no exchange-rate conversion is applied.
- The supplied real portrait is `public/assets/amir-portrait.png`.
- Set `profileIsSample` and `locationConfirmed` only after confirming the details.
- Set a project's `isSample: false` only for real work with permission to publish.
- Add `showreelUrl` and project `videoUrl` values for YouTube, Vimeo, or direct videos.
- Add public `email`, `socials`, and `resumeUrl` values when available.

## Template credibility and pricing

All brand names, testimonial names, roles, companies, and exact quotes in `experience.ts` are fictional placeholders, **not endorsements**. Replace each with an approved real quote, exact attribution, and permission before removing the sample labels.

ETB rates, package scope, revisions, and monthly plans are illustrative, not confirmed offers. Update both billing options and FAQ terms before publishing. Skill categories and tools also need confirmation. There are no fabricated performance metrics or years of experience.

## Pages

- `/`: portfolio, services, process, sample credibility, and FAQs.
- `/skills`: interactive disciplines and toolkit.
- `/pricing`: per-project and monthly sample packages.
- `/contact`: project brief.
- `/faq`: all questions.

Package selection fills the contact brief through URL parameters. With no business email configured, submitting downloads a local text brief; nothing is sent or stored. With an email configured, it opens a populated email draft that the visitor must send. There is no checkout, subscription, or server-side submission.

Production hosting must serve `index.html` for unmatched paths so direct links to these client-side routes work.

## Motion

Shared reveals and hover effects live in `src/components/Motion.tsx`. Styling is in `src/index.css` and `src/experience.css`. The specialty strip flows left, pauses on hover, and has a keyboard-accessible pause button. System reduced-motion preferences disable continuous movement and soften transitions.

Original Figma assets and resolved fonts are preserved.

## Checks

```sh
pnpm build
pnpm exec tsc --noEmit
pnpm format --check src playwright.config.ts tests EDITING_GUIDE.md
pnpm test:e2e
```

The browser tests use the existing preview at `http://localhost:3000`. Override `PLAYWRIGHT_BASE_URL` if needed. Install Playwright's Chromium once, or point `PLAYWRIGHT_CHROMIUM_EXECUTABLE` at an installed Chromium binary.

Figma Make manages the development server. Do not start a second one.
