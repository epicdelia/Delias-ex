# How to Push This to GitHub

Follow these steps to get "Delia's Ex" live on GitHub.

---

## Step 1 — Create the GitHub Repository

1. Go to [github.com](https://github.com) and log in.
2. Click the **+** icon in the top-right corner → **New repository**.
3. Fill in:
   - **Repository name:** `deliasex` (or whatever you want)
   - **Description:** `My ex, but open source.`
   - **Visibility:** Public or Private — your call
   - ❌ Do NOT check "Initialize this repository with a README" (we already have one)
4. Click **Create repository**.

---

## Step 2 — Set Up Git Locally

Open your terminal inside the project folder.

```bash
# If you haven't already, initialize git
git init

# Stage all files
git add .

# Make your first commit
git commit -m "initial heartbreak"
```

---

## Step 3 — Connect to GitHub and Push

Copy the remote URL from GitHub (shown after you create the repo). It looks like:
`https://github.com/YOUR_USERNAME/deliasex.git`

```bash
# Connect your local repo to GitHub
git remote add origin https://github.com/YOUR_USERNAME/deliasex.git

# Rename your branch to "main" (GitHub's default)
git branch -M main

# Push it up
git push -u origin main
```

That's it. Refresh your GitHub page and the repo should be live.

---

## Step 4 — Add Your API Key (Do NOT commit this)

The `.env` file is already in `.gitignore` so it won't be uploaded.

```bash
# Create your local .env from the example
cp .env.example .env
```

Then open `.env` and paste your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

Get a key at: https://console.anthropic.com

---

## Step 5 — Run It

```bash
npm install
npm run heartbreak
```

Open http://localhost:3000 and start asking the hard questions.

---

## Optional: Deploy to the Internet

If you want others to chat with your ex:

### Render (free tier)
1. Go to [render.com](https://render.com) → New Web Service
2. Connect your GitHub repo
3. Set build command: `npm install`
4. Set start command: `npm run heartbreak`
5. Add environment variable: `ANTHROPIC_API_KEY` = your key
6. Deploy

### Railway
1. Go to [railway.app](https://railway.app) → New Project → Deploy from GitHub
2. Add `ANTHROPIC_API_KEY` in Variables
3. Done

---

## Troubleshooting

| Problem | Fix |
|---|---|
| `Cannot find module 'express'` | Run `npm install` |
| Port 3000 already in use | Change `PORT=3001` in `.env` |
| API key error | Check `.env` has the right key |
| Git push rejected | Make sure remote URL is correct |
