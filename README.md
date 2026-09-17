# AZSA — Zimbabwean Students in Algeria

A community platform for Zimbabwean students studying in Algeria: news, events,
a community feed, student resources, notifications, and a direct channel to
the embassy's student affairs office.

This is a **working full-stack application**, not a static mockup. Everything
listed below as "real" is backed by an actual Postgres database, actual
authentication, and server-enforced permissions -- populated with clearly
synthetic demo data for illustration. See `TESTING.md` for the full manual
test plan (already run once against this build).

## What's real right now

- **Auth**: email/password signup and login (NextAuth v5, bcrypt-hashed
  passwords, JWT sessions), suspended accounts are blocked at login.
- **RBAC**: four roles (`student`, `moderator`, `embassy_admin`,
  `super_admin`) with a permission matrix in `src/lib/rbac.ts`. Access to
  `/admin` and `/embassy` is enforced in `src/proxy.ts` (Next.js 16's
  successor to `middleware.ts`) **and** re-checked inside every server
  action and API route -- a redirect in the UI is not the security boundary,
  the server check is.
- **Community**: posts, likes (idempotent, unique-constrained), comments and
  replies, topic filtering, and a working "report this post" flow that feeds
  a real moderation queue.
- **Notifications**: likes, comments, replies, and embassy announcements all
  create real notification rows; a bell icon in the nav shows an unread
  count and a dropdown of recent activity, with mark-all-read on open.
- **Events**: listing, detail pages, and registration with real capacity
  enforcement.
- **News & editorial**: articles with categories, featured flag, publishing
  flow from the admin panel.
- **Embassy tools**: announcements (which broadcast notifications to the
  chosen audience), resources, and opportunities management, plus a student
  directory view -- scoped to `embassy_admin` and `super_admin`.
- **Admin tools**: user list with role changes and suspend/reactivate, a
  moderation queue that resolves real reports, news publishing, and platform
  stats pulled live from the database.
- **Design system**: a near-black ("ink") + gold palette with brick red for
  rare urgency-only accents, real scroll/hover motion (via the `motion`
  library), and a few explicit Zimbabwean touches -- a flag-colour accent
  stripe at the top of every page, the Zimbabwe flag emoji next to the AZSA
  wordmark, an abstract wing-shaped logo mark, and the national motto
  ("Unity, Freedom, Work") on the About page. An earlier green-dominant
  palette and a decorative "stone" pattern were both replaced after user
  testing showed the pattern rendering as visibly broken and the green
  reading as generic -- see git history if you want to see what changed.

## What's an intentional gap, not a hidden one

These are left unbuilt on purpose -- either because they need external
services and credentials only you can provide, or because you specifically
said you'd rather add them yourself:

- **Hero/section background video**. The homepage's "Life across Algeria"
  section (`src/components/home/immersive-media-section.tsx`) is fully built
  to hold a real video -- gradient scrim, text legibility, fallback all
  done -- but has no video wired in. Stock sites like Pexels/Unsplash don't
  give permanent hotlink URLs, so I didn't link one in; it would break or
  violate their terms. To add real footage: drop a licensed `.mp4` into
  `public/video/`, then pass `src="/video/yourfile.mp4"` (and optionally
  `poster="/video/yourposter.jpg"`) to `<ImmersiveMediaSection>` in
  `src/app/page.tsx`. Everything else already works.
- **Image uploads**. Posts and profiles have `images` / `avatarUrl` fields
  ready in the schema, but there's no file-storage integration (S3 /
  Cloudinary / Vercel Blob). Wire one in and point the existing UI at it.
- **Transactional email**. No verification or password-reset email -- that
  needs an email service (Resend, Postmark, etc.) and its own API key.
  Accounts are marked verified at signup for this prototype.
- **Comment-level reporting**. The report API and schema already support
  `targetType: "comment"`; only the button UI for it isn't wired (posts are).

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind v4), using `proxy.ts`
  (not the deprecated `middleware.ts`) for route-level auth checks.
- **Drizzle ORM** + **node-postgres**, targeting real Postgres. (Prisma was
  tried first but its engine binary download is blocked by this sandbox's
  network policy -- Drizzle is pure JS with no such dependency, and is fully
  portable to any managed Postgres.)
- **NextAuth v5** (Credentials + JWT), with the auth config split into
  `auth.config.ts` (session/callbacks only, safe anywhere) and `auth.ts`
  (adds the bcrypt-based provider). Next.js 16 runs `proxy.ts` on the
  Node.js runtime by default, so this split is no longer strictly required
  to avoid an Edge-bundle crash -- it's kept anyway as clean separation
  between "what proxy.ts needs" and "what the rest of the app needs".
- **@fontsource** for Fraunces / Public Sans / IBM Plex Mono (self-hosted
  font files, no external font CDN call at build or runtime).

## Local setup

```bash
npm install
cp .env.example .env.local   # fill in DATABASE_URL and AUTH_SECRET
npm run db:push              # create tables from src/lib/db/schema.ts
npm run db:seed              # populate demo data
npm run dev
```

### Demo accounts (all password: `Password123!`)

| Role          | Email                  |
|---------------|-------------------------|
| Super admin   | admin@azsa.dz           |
| Embassy admin | embassy@azsa.dz         |
| Student       | tanaka.moyo@azsa.dz     |
| Moderator     | farai.ndlovu@azsa.dz    |

## Deploying for free

1. **Database**: create a free Postgres instance on
   [Neon](https://neon.tech) or [Supabase](https://supabase.com). Copy the
   connection string into `DATABASE_URL`.
2. **Hosting**: push this repo to GitHub and import it into
   [Vercel](https://vercel.com) (free tier). Set `DATABASE_URL`,
   `AUTH_SECRET`, and `NEXTAUTH_URL` (your Vercel domain) as environment
   variables.
3. Run `npm run db:push` and `npm run db:seed` once against the production
   `DATABASE_URL` (locally, with `.env.local` pointed at production, or via
   a one-off script) to create tables and demo data.
4. Work through `TESTING.md` against the live deployment before sharing it
   further -- a few things (cookies, redirects) are worth re-checking once
   real HTTPS and a real domain are involved.

## Project structure

```
src/
  app/            Routes (App Router) -- public pages, auth, admin, embassy, API routes
  components/     ui/ primitives, layout/, and one folder per feature area
  lib/
    db/           schema.ts (Drizzle schema), queries.ts, seed.ts, index.ts (client)
    actions/      Server actions for admin/embassy mutations
    auth.ts       Full NextAuth config (Node-only)
    auth.config.ts Session/callback config shared with proxy.ts
    notifications.ts  notify() / notifyAudience() helpers
    rbac.ts       Permission matrix + can() / assertCan()
    validations.ts Zod schemas for every mutating input
  proxy.ts        Route-level auth/role redirects (Next.js 16 convention)
```

## Production checklist

Before deploying to a public URL:

1. **Set `SEED_PASSWORD`** in your deployment environment before running
   `npm run db:seed`. Without it the seed falls back to a documented
   development password and prints a warning.
2. **Do not set** `NEXT_PUBLIC_SHOW_TEST_LOGINS` or
   `NEXT_PUBLIC_SEED_PASSWORD` in production. These only exist so the
   tap-to-fill helper appears on `/login` during local development; the
   component returns `null` unless `NEXT_PUBLIC_SHOW_TEST_LOGINS=true`.
3. **Set `AUTH_SECRET`** (`npx auth secret`) and `NEXTAUTH_URL` to the
   deployed origin, then redeploy.
4. **Background videos** (optional): drop `zimbabwe.mp4` and `algeria.mp4`
   into `public/video/`. They autoplay muted and loop in the heritage
   section; until present, an animated light field shows instead.

## Motion architecture

- `motion` (Framer Motion's successor) for component orchestration.
- `lenis` for momentum smooth scrolling — disabled under
  `prefers-reduced-motion` and on coarse pointers, where native inertia is
  better than anything we'd override it with.
- `src/components/motion/magnetic.tsx` — cursor-attracted buttons.
- `src/components/motion/parallax.tsx` — scroll-linked depth.
- `src/components/ui/tilt-card.tsx` — CSS 3D perspective tilt.
- Scroll reveals are **CSS-first**: content is visible by default and the
  animation is opt-in via a class JS adds on mount, so a failed hydration
  can never leave a section permanently invisible.
