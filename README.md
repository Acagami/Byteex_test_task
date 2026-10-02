# BYTEEX product page

Responsive React + TypeScript implementation of the supplied 1465 × 6043 desktop design. Content is managed through **Decap CMS**, stored in Git as JSON and image files, and fetched by the page at runtime. No database, API service, account, or API token is required for local review.

## Requirements and quick start

Use Node.js **22.18+** (Node 24 recommended) and npm.

From the repository root:

```sh
npm ci
npm run dev
```

The install command also installs the web app's locked dependencies and copies the pinned Decap browser bundle locally. Internet access is needed for installation; the site and local editor work without a CDN afterwards.

- Website: http://localhost:5173
- Content manager: http://localhost:5173/admin/
- Local CMS file proxy: http://127.0.0.1:8081

Keep the terminal running. Ports 5173 and 8081 must be available. Stop both services with Ctrl+C. The editing proxy is bound to the local machine and must not be exposed publicly.

## Verify dynamic content

1. Open the content manager and choose **Login** if prompted (the local backend does not require credentials).
2. Open **Pages → Homepage**.
3. Expand **Hero**, change **Title**, then **Publish → Publish now**.
4. Refresh the website. The new title is fetched from the CMS-managed JSON file.
5. Restore the original title and publish again if you are only testing.

The same editor manages announcements, images and alt text, press logos, benefits, story paragraphs, card content, reviews, FAQs, impact metrics, and button labels/destinations. Three-photo collages and three-card layouts have length constraints to preserve the design.

Edits save to `apps/web/public/content/homepage.json`; image uploads save to `apps/web/public/media/`. The local proxy saves files; use normal Git commits to version those edits. No unpublished fallback content is bundled into the React components.

## Commands

```sh
npm run lint
npm test
npm run build
npm run preview
```

`npm run build` validates the content and media references, type-checks React, and generates `apps/web/dist`. Preview serves the built site at http://localhost:4173. Run `npm run cms` separately if you need the local editor while previewing.

`npm run dev:web` runs only the website. `npm run cms` runs only the editor's file proxy.

## Architecture

- `apps/web/src/` — React views, shared UI elements, responsive CSS.
- `apps/web/src/content/` — typed content contract and runtime fetch/error handling.
- `apps/web/public/content/homepage.json` — the CMS-managed page.
- `apps/web/public/admin/` — Decap editor and field configuration.
- `apps/web/public/media/` — optimized images extracted from the supplied design.
- `scripts/` — installation and local process orchestration.
- `tests/` — content, media, and CMS configuration checks.

The storefront requests `/content/homepage.json` with cache revalidation. It validates the response before rendering and offers retry on network or content errors. Image galleries, review navigation, and the FAQ accordion remain interactive. Images below the first screen load lazily; the admin bundle loads only on the admin page.

## Static deployment

Deploy `apps/web/dist` after building. Serve the contents at the domain root and preserve the `/content`, `/media`, and `/admin` paths. Updates to content require rebuilding/redeploying the static output; reloading the local development site picks them up immediately.

This submission configures **local editing**. A hosted editor would additionally need a Git backend and authentication; it is not configured as a public, unauthenticated write endpoint.

## Scope and design notes

The page is a design implementation, not a checkout system. CTA destinations are editable links, initially pointing to page sections. Review text, commercial claims, and sustainability figures are demonstration content from the layout and must be verified before real commercial use. The provided design specifies desktop; smaller layouts adapt the same content.

The repository contains the implementation and incremental commits. Repository invitations and email submission are separate handoff steps.
