# 📌 Bulletin Board

A GitHub Pages image board. Drop PNGs into the `images/` folder — they appear on the board automatically. No compression, no renaming.

## Setup (one time)

1. **Create a new GitHub repo** and push this folder's contents to it.

2. **Edit `js/config.js`** — set your username and repo name:
   ```js
   const CONFIG = {
     owner:  'your-github-username',
     repo:   'your-repo-name',
     branch: 'main',
     imagesFolder: 'images'
   };
   ```

3. **Enable GitHub Pages**:
   - Go to your repo → Settings → Pages
   - Source: `Deploy from a branch` → `main` → `/ (root)`
   - Save. Your board will be live at `https://your-github-username.github.io/your-repo-name/`

## Adding images

Commit any `.png` files to the `images/` folder and push. The board reads them directly from GitHub — filenames and file contents are untouched.

```
images/
  photo-of-cat.png       ← shows up as "photo-of-cat.png"
  my-drawing.png
  screenshot_2024.png
```

## File structure

```
├── index.html       ← board UI
├── style.css        ← all styles
├── js/
│   ├── config.js    ← ✏ only file you edit
│   ├── api.js       ← GitHub API fetch
│   ├── display.js   ← card + lightbox rendering
│   └── init.js      ← startup wiring
└── images/
    └── (your PNGs go here)
```

## Notes

- GitHub's unauthenticated API allows 60 requests/hour per IP. For a personal board this is plenty.
- The board uses `raw.githubusercontent.com` download URLs — the browser receives the exact original file bytes.
- Click any image on the board to view it full size, with a download link to the original.
