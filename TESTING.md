# AZSA — Testing Procedure

This is a manual test plan. Everything in it has already been run once against
this build (see the build notes in the delivery message), but you should
re-run it yourself after any change, and definitely after deploying.

Reset to a clean state at any time with:
```bash
npm run db:push    # recreate schema (safe if tables already match)
npm run db:seed    # wipe and repopulate demo data
```

## 1. Environment sanity

- [ ] `npm run build` completes with no TypeScript errors and no route missing
      from the route list it prints.
- [ ] `npm run dev` starts without console errors on first load of `/`.
- [ ] No `⨯` error lines appear in the terminal while clicking through the
      site (this is where a broken query or a bad join will show up first,
      even if the page still renders something).

## 2. Public pages (no login required)

Visit each and confirm it renders without an empty crash and without
placeholder/lorem-ipsum text: `/`, `/news`, `/news/[any-slug]`, `/events`,
`/events/[any-slug]`, `/community`, `/about`, `/contact`, `/resources`,
`/universities`, `/cities`, `/opportunities`, `/announcements`, `/stories`.

- [ ] Home page stats (students / universities / cities) match reality —
      cross-check against `/universities` and `/cities` counts.
- [ ] Empty states: temporarily filter `/community?topic=jobs` (or any topic
      with no posts) and confirm you see the "be the first" message, not a
      crash.
- [ ] Mobile width (< 400px): nav collapses to the hamburger menu, hero
      doesn't overflow horizontally, cards stack to one column.
- [ ] Keyboard only: tab through the nav and a form (e.g. `/login`) — every
      interactive element should show a visible focus ring.

## 3. Signup & login

- [ ] Sign up with a new email → redirected to `/dashboard`, logged in
      automatically.
- [ ] Sign up again with the same email → clear error, not a crash.
- [ ] Sign up with a password under 8 characters → validation error shown
      before any request succeeds.
- [ ] Log out, log back in with the same credentials → succeeds.
- [ ] Log in with a wrong password → clear error, no stack trace leaked.
- [ ] Log in as each demo account and confirm the role shown in the nav
      user-menu matches: `admin@azsa.dz` (super admin), `embassy@azsa.dz`
      (embassy admin), `tanaka.moyo@azsa.dz` (student).

## 4. Role-based access control

This is the most important section — it's the actual security boundary.

| Action                          | student | moderator | embassy_admin | super_admin |
|----------------------------------|:-------:|:---------:|:--------------:|:------------:|
| Visit `/dashboard`               |   ✅    |    ✅     |       ✅        |      ✅      |
| Visit `/embassy`                 |   ❌    |    ❌     |       ✅        |      ✅      |
| Visit `/admin`                   |   ❌    |    ❌     |       ❌        |      ✅      |

- [ ] Confirm each ❌ above actually redirects (to `/login` if logged out, to
      `/dashboard?denied=...` if logged in as the wrong role) rather than
      showing the page or throwing an error.
- [ ] **Don't just trust the redirect** — while logged in as a student, open
      devtools and call `fetch('/api/posts', {method:'POST', ...})` type
      requests are expected to work (students can post), but try hitting an
      admin server action's effect indirectly: e.g. a student should never be
      able to change another user's role. There's no UI path to attempt this
      as a student (the controls aren't rendered), which is itself part of
      the test — confirm the admin-only controls are genuinely absent from
      the rendered HTML, not just hidden by CSS.

## 5. Community feature

- [ ] Post as a logged-in student → appears at the top of `/community`
      immediately (no refresh needed beyond the automatic one).
- [ ] Post while logged out → composer shows a "log in to post" prompt
      instead of a form.
- [ ] Like a post → count increments immediately (optimistic), and persists
      after a page reload.
- [ ] Like the same post again → count does not double-increment (check the
      database if unsure: `likes` table has a unique constraint on
      `(post_id, user_id)`).
- [ ] Unlike → count decrements, never goes below zero.
- [ ] Comment on a post → appears in the thread immediately, `commentCount`
      on the post card updates after reload.
- [ ] Report a post → confirmation message appears; the report shows up in
      `/admin/moderation` when logged in as `admin@azsa.dz`.
- [ ] Topic filter chips on `/community` actually filter (`?topic=housing`
      etc.) and "All" clears the filter.

## 6. Notifications

- [ ] As student A, like or comment on student B's post.
- [ ] Log in as student B → the bell icon in the nav shows an unread badge.
- [ ] Open the bell dropdown → the like/comment notification is listed and
      links to the right post.
- [ ] Badge clears after opening the dropdown (mark-all-read fires).
- [ ] As `embassy@azsa.dz`, publish an announcement with audience "Students
      only" → log in as a student and confirm a notification appears (bell
      badge increments). Publish one with "Everyone" and confirm an
      embassy/admin account also gets notified.

## 7. Events

- [ ] Register for an event while logged in → button changes to "Cancel
      registration", registered count increments.
- [ ] Cancel → button reverts, count decrements.
- [ ] Register while logged out → redirected to `/login` with a
      `callbackUrl` back to the event.
- [ ] Set an event's capacity very low (via `psql` or a quick script) and
      register enough demo accounts to fill it → confirm the button shows
      "Event full" and the API rejects a further registration with a 400.

## 8. Admin panel (`admin@azsa.dz`)

- [ ] `/admin` overview numbers match the database (spot-check one, e.g.
      total users, against `SELECT count(*) FROM users;`).
- [ ] `/admin/users`: change a test user's role via the dropdown → reload →
      new role persisted. Suspend a test user → status flips, and confirm a
      suspended user can no longer log in (`authorize()` in `auth.ts` checks
      `status === "suspended"`).
- [ ] `/admin/moderation`: resolve a report as "actioned" or "dismissed" → it
      disappears from the open queue.
- [ ] `/admin/news`: publish an article → appears on `/news` and, if
      "Feature on homepage" was checked, in the homepage's featured list.

## 9. Embassy panel (`embassy@azsa.dz`)

- [ ] `/embassy/announcements`: publish one → appears on `/announcements`
      immediately, pinned ones sort to the top.
- [ ] `/embassy/resources`: publish one → appears on `/resources`.
- [ ] `/embassy/opportunities`: publish one with a deadline → appears on
      `/opportunities`, sorted by deadline.
- [ ] `/embassy/directory`: lists all students with university/city/field —
      confirm a student who marked their profile private still appears here
      (this is intentional; the directory is an administrative view).

## 10. Input validation / abuse resistance

- [ ] Submit an empty post → rejected client-side (button disabled) and
      server-side (`postSchema` requires non-empty content).
- [ ] Submit a 5000-character post → rejected (max 4000).
- [ ] Try posting/commenting with an expired or missing session cookie
      (e.g. via curl with no cookie jar) → 401, not a 500.
- [ ] Try `POST /api/events/[slug]/register` for a nonexistent slug → 404,
      not a crash.

## 11. Cross-browser / device pass

- [ ] Latest Chrome, Firefox, Safari (or their mobile equivalents) — the
      layout, fonts, and forms all render consistently.
- [ ] iOS Safari specifically: check that the sticky nav and bottom-sheet-style
      mobile menu don't clip under the notch/home indicator.

## Known-safe-to-skip for now

Don't spend testing time on these — they're documented as not built yet, not
as broken:
- Image upload (no file storage integrated)
- Password reset / email verification (no email service integrated)
- Reporting a **comment** specifically (the API supports it via
  `targetType: "comment"`, but no UI button is wired for comments yet — only
  posts)
