# My Roadmap Tracker

A personal Java Full-Stack + AI roadmap tracker. Sign in, tick off topics as you complete them, add notes, and add your own custom items. All data is saved permanently — log in from any device and your progress follows you.

**Tech:** Next.js 15 + Supabase (auth + Postgres). Free hosting on Vercel.

**Features:**
- 12 stages, 70+ sections, 400+ checklist items (the full v3 roadmap)
- Email/password authentication (per-user data)
- Real-time progress saving (no save button — auto-saves on every change)
- Per-item notes (📝 button next to each item)
- Stage-level notes (questions, links, observations)
- Add your own custom checklist items per section
- Delete custom items
- Live search across all topics
- Overall + per-stage progress bars
- Mobile-responsive
- Dark theme

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

Edit `data/roadmap.js` — that's a single file with all stages/sections/items. Commit and push; Vercel auto-redeploys.

## Troubleshooting

- **"Auth error" on signup:** in Supabase → Authentication → Providers → Email, turn off **Confirm email** (Step 1.8).
- **Build fails on Vercel:** double-check your two environment variables are set EXACTLY as shown.
- **Data not saving:** open browser DevTools → Network tab → look for failed requests to supabase.co. Usually means env vars are wrong.

---

## Privacy

This is YOUR private tracker. RLS (Row Level Security) is enabled in Supabase, so each user only sees their own data. Even if multiple people sign up to your deployment, they can't see each other's progress or notes.
