# CrackDev: auth emails and password reset (Supabase)

Setup for sign-up confirmation and forgot-password emails on
`https://roadmap-tracker-five.vercel.app`. Adapted from the shared
`supabase-gmail-smtp.md` guide. About 15 minutes in the Supabase dashboard.

**Why the reset link said "expired":** Supabase's default email link is a one-time
token that the page used up the moment it opened. Corporate mail (Outlook Safe
Links etc.) pre-opens links to scan them, and opening the email on a different
device than the one that asked for it breaks the PKCE "code verifier" check.
Either way the real tap arrives second and sees an expired link.

**The fix (already in the code):** the email now opens `/auth/confirm`, which does
nothing until the person taps **Continue**. The button verifies the link on the
server (`verifyOtp`), signs them in, and sends them to `/auth/reset` to choose a
new password. Works in any browser or device.

Order matters: **deploy first, then change the templates** (step 4), or the links
will point at a page that isn't live yet.

---

## 1. Deploy the code

Push `main`. Vercel deploys it. Confirm `https://roadmap-tracker-five.vercel.app/auth/confirm`
shows "This link doesn't work" (that's the page with no token, working as intended).

## 2. Addresses

Supabase dashboard → **Authentication → URL Configuration**

| Field | Value |
|---|---|
| Site URL | `https://roadmap-tracker-five.vercel.app` |
| Redirect URLs | `https://roadmap-tracker-five.vercel.app/**` and `http://localhost:3000/**` |

## 3. Sender (Gmail SMTP, free)

Only needed so emails reach real users (the built-in sender only delivers to team
addresses, a few per hour). Skip for now if you are the only user.

1. A Gmail account just for app mail, with **2-Step Verification** on.
2. `myaccount.google.com/apppasswords` → create an app password named "CrackDev Supabase".
3. Supabase → **Authentication → Emails → SMTP Settings** → **Enable custom SMTP**:

| Field | Value |
|---|---|
| Sender email | the app Gmail address |
| Sender name | `CrackDev` |
| Host | `smtp.gmail.com` |
| Port | `587` (try `465` if it fails) |
| Username | the app Gmail address |
| Password | the 16-letter app password, no spaces (type it in the dashboard only) |

4. **Authentication → Rate Limits** → emails per hour: `30`–`100`.
5. **Authentication → Sign In / Providers → Email** → keep **Confirm email** on.

## 4. Email templates

**Authentication → Emails → Templates.** Replace subject and body of each.

**Reset password**. Subject: `Reset your CrackDev password`

```html
<h2>Reset your password</h2>
<p>Tap the button to choose a new password. If you didn't ask for this, ignore this email.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery">Choose a new password</a></p>
```

**Confirm signup**. Subject: `Confirm your CrackDev email`

```html
<h2>Confirm your email</h2>
<p>Tap the button to finish creating your CrackDev account.</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard">Confirm my email</a></p>
```

**Magic link**. Subject: `Your CrackDev sign-in link`

```html
<h2>Your sign-in link</h2>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/dashboard">Sign in to CrackDev</a></p>
```

**Change email address**. Subject: `Confirm your new email`

```html
<h2>Confirm your new email</h2>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email_change&next=/dashboard">Confirm new email</a></p>
```

Save each one.

## 5. Test

1. Open `/forgot-password`, enter your email, send.
2. Open the email on your phone (a different device on purpose). Tap the link →
   `/auth/confirm` shows **Reset your password** with a Continue button.
3. Tap **Continue** → `/auth/reset` → set a new password → you land signed in.
4. Sign out, sign in with the new password.

## If something goes wrong

| Symptom | Check |
|---|---|
| Still "Link expired" after Continue | The template wasn't saved, or the link is older than an hour / already used. Send a new one. |
| Link opens Supabase then errors | Template still uses `{{ .ConfirmationURL }}`. Replace with the `token_hash` link above. |
| Link opens `localhost` | Fix **Site URL**. |
| No email at all | Spam folder; SMTP username/sender must be the full Gmail address; regenerate the app password; port `465`. |
| "Email rate limit exceeded" | Raise emails per hour. |
| Login shows "Failed to fetch" | Supabase project paused, or Vercel env vars `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` missing. |

## How the code fits together

- `app/auth/confirm/page.js`: reads `token_hash`, `type`, `next` and renders the Continue form.
- `app/auth/confirm/actions.js`: server action → `verifyOtp` → redirect (`/auth/reset` for recovery, `next` otherwise; `?error=link_expired` on failure).
- `app/auth/confirm/ConfirmClient.js`: the UI; also still handles old-style `?code=` links.
- `lib/supabase-server.js`: server-side Supabase client (cookies).
- `app/auth/reset/page.js`: "set a new password" page; relies on the session set by the action.
- `middleware.js` already lets `/auth/*` and `/forgot-password` through.
