# My Roadmap Tracker

A personal multi-track career roadmap + interview-prep tracker. Pick a career track, tick off topics, study 1,100+ interview Q&A with code and diagrams, drill flashcards, and bookmark questions for revision. All data is saved permanently — log in from any device and your progress follows you.

**Tech:** Next.js 15 + Supabase (auth + Postgres). Free hosting on Vercel.

## Career tracks (switch from the header)
| Track | Stages | Interview Q&A |
|---|---|---|
| ☕ Java Full-Stack | 12 | 641 |
| 🟢 MERN Stack (Mongo · Express · React · Node) | 8 | 95 |
| 🤖 Generative AI Engineer | 10 | 124 |
| 🚀 Forward Deployed Engineer | 7 | 80 |
| 🛢️ Data Engineer | 8 | 112 |
| 🐍 Python Backend Developer | 8 | 106 |

**~1,158 interview Q&A total**, with syntax-highlighted code and clean Mermaid diagrams.

**Features:**
- 6 career tracks; each track's data lazy-loads as its own chunk (fast initial load)
- Checklist progress + "I can answer this" Q&A mastery tracking (two progress bars)
- Bookmark/star any Q&A → cross-track revision list (`/bookmarks`)
- Flashcard / quiz mode with keyboard shortcuts (`/flashcards`)
- 🔥 Daily learning streak
- Per-item & stage notes, custom items
- Live search across topics, Q&A, and code; filter chips (unanswered / bookmarked / with-code)
- Export any stage to Markdown or print to PDF
- Floating stage jump menu
- Email/password auth (per-user data, auto-saved)
- Mobile-responsive, dark theme

> **Existing Java progress is preserved** — every track uses globally-unique stage IDs, so no database migration was needed when tracks were added.

---

## Deploy in ~15 minutes — total cost: ₹0

You will need accounts on:
1. **GitHub** — to hold your code (free)
2. **Supabase** — for database + auth (free tier, no credit card)
3. **Vercel** — for hosting (free tier, no credit card)

### STEP 1 — Set up Supabase (5 min)

1. Go to https://supabase.com and click **Start your project**.
2. Sign up with GitHub or email.
3. Click **New Project**:
   - Name: `roadmap-tracker`
   - Database password: pick a strong one and SAVE IT (you won't need it for the app, but you'll need it if you ever access the DB directly)
   - Region: closest to you (e.g., **Mumbai** for India)
   - Plan: **Free**
4. Wait ~2 minutes for the project to be created.
5. Once ready, go to **SQL Editor** (left sidebar) → **New Query**.
6. Open the file `supabase-setup.sql` from this project, copy ALL of it, paste into the SQL Editor, and click **RUN**.
   You should see "Success. No rows returned." — that means the 3 tables and security rules are created.
7. Go to **Project Settings** (gear icon, bottom-left) → **API**. Copy these TWO values somewhere safe:
   - **Project URL** (looks like `https://xxxxxxxxxx.supabase.co`)
   - **Project API keys → anon public** (a long string starting with `eyJ...`)
8. (Optional, but recommended for testing) Go to **Authentication** → **Providers** → **Email**, scroll to **"Confirm email"**, and turn it **OFF**. This lets you sign up and use the app without needing email confirmation. You can turn it back on later.

### STEP 2 — Put the code on GitHub (3 min)

1. Create a new repository at https://github.com/new (make it private if you want).
2. On your computer, in this `roadmap-app` folder, run:
   ```bash
   git init
   git add .
   git commit -m "initial"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

### STEP 3 — Deploy to Vercel (5 min)

1. Go to https://vercel.com/signup → sign up with GitHub.
2. Click **Add New → Project**.
3. **Import** your GitHub repo from step 2.
4. **Framework Preset:** Next.js (auto-detected).
5. Expand **Environment Variables** and add two:
   - `NEXT_PUBLIC_SUPABASE_URL` = the Project URL from Supabase step 1.7
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = the anon public key from Supabase step 1.7
6. Click **Deploy**.
7. Wait ~2 minutes. Vercel gives you a URL like `https://your-app.vercel.app`.

### STEP 4 — Sign up and start tracking

1. Open your Vercel URL.
2. Click **Sign up**, create your account, sign in.
3. Click any stage → start ticking items as you complete them.
4. Use the 📝 button on any item to add a note.
5. Use **Stage notes** at the top of each stage for high-level reflections.
6. Use **+ Add your own item...** to add items the roadmap doesn't cover.

Done. Anything you do is auto-saved to Supabase. Open on phone, laptop, anywhere — same data.

---

## Running locally (optional)

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase URL and anon key in .env.local
npm run dev
# Open http://localhost:3000
```

---

## Free tier limits (more than enough for you)

- **Vercel Hobby:** unlimited deployments, 100 GB bandwidth/month
- **Supabase Free:** 500 MB database, 50,000 monthly active users, 5 GB bandwidth

You'll use way less than 1% of any of these.

---

## What if you want to change the roadmap data?

- **Java track checklist:** `data/roadmap.js`. **Java Q&A:** `data/study-material.json`.
- **Other tracks:** `data/tracks/<track>.roadmap.js` (checklist) and `data/tracks/<track>.study.json` (Q&A).
- **Add a whole new track:** add an entry to `data/tracks.js` (`TRACKS` + a `case` in `loadTrackData`) and create its two data files. See `data/tracks/_SCHEMA.md` for the exact JSON shape.

Commit and push; Vercel auto-redeploys. No Supabase changes are needed to add tracks (stage IDs are globally unique).

## Troubleshooting

- **"Auth error" on signup:** in Supabase → Authentication → Providers → Email, turn off **Confirm email** (Step 1.8).
- **Build fails on Vercel:** double-check your two environment variables are set EXACTLY as shown.
- **Data not saving:** open browser DevTools → Network tab → look for failed requests to supabase.co. Usually means env vars are wrong.

---

## Privacy

This is YOUR private tracker. RLS (Row Level Security) is enabled in Supabase, so each user only sees their own data. Even if multiple people sign up to your deployment, they can't see each other's progress or notes.
