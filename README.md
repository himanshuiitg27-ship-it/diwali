# A Diwali Night Just for Us ❤️🪔

A five-chapter, romantic Diwali website built with **React + Vite + Tailwind CSS + Framer Motion**.
Frontend-only (no backend needed). Mobile-first, deploys to Vercel in a couple of minutes.

| # | Chapter | What happens |
|---|---------|--------------|
| 1 | A Little Diwali Surprise | Glowing diya, stars, rangoli. The button brightens the flame and releases golden sparks |
| 2 | You Are My Favourite Light | Messages appear one by one, fireworks on both sides, tap the diya for sparkles |
| 3 | Before the Diyas, There's You | Swaying lantern. Tap it: the screen warms and a hidden message appears |
| 4 | Let's Light Up Diwali Together | Tap each diya to light it and read its message. Light them all for a fireworks finale |
| 5 | Just You, Me & A Little Forever | Typewriter love letter, then **Light Up Our Forever** triggers the grand finale and a replay button |

Extras: persistent play/pause + mute, chapter progress dots (revisit any chapter you've reached), replay, graceful handling of missing music.

---

## 1. Install

Requires Node.js 18+.

```bash
npm install
```

## 2. Run locally

```bash
npm run dev          # http://localhost:5173
npm run build        # production build into dist/
npm run preview      # serve the production build locally
```

To test on your phone, run `npm run dev -- --host` and open the Network URL on the same Wi-Fi.

## 3. Customize names and messages

**Everything personal is in one file: `src/config/loveConfig.js`.** You never need to touch a component.

- Names: `herName`, `yourName`, `nickname`, `herNickForYou` (placeholders: `YOUR_GIRLFRIEND_NAME`, `YOUR_NAME`, `YOUR_NICKNAME`)
- Set `welcome.showNameGreeting: true` to show "For <her name>" on the first page
- Page headings, button labels and footer
- `lightTogether.diyaMessages`: one message per diya (the circle adapts to how many you list; 9 to 12 looks best)
- `lightTogether.initiallyLit`: how many diyas start already lit
- `forever.letter`: the love letter, **one string per paragraph** (the typewriter types them in order)
- `forever.finalMessage`, `forever.closingLine`, `forever.typingSpeedMs`

Nothing is invented for you: `memories` and `photos` start empty.

## 4. Add photographs

1. Copy your photos into `src/assets/images/` (jpg, png, webp).
2. List them in `loveConfig.js`:

```js
photos: [
  { file: 'us-1.jpg', caption: 'Our favourite day' },
  { file: 'us-2.jpg', caption: 'Just us' },
],
memories: [
  { title: 'First time we met', text: 'Your own words here…', date: 'March 2024' },
],
```

They appear as a small gallery under the letter once it finishes typing. Keep photos under ~500 KB each so the page loads quickly on mobile data. Files that don't exist are silently skipped.

## 5. Add background music

1. Put an audio file in `src/assets/music/` (mp3 recommended), e.g. `diwali.mp3`.
2. Make sure `music.file` in `loveConfig.js` matches the name (default: `diwali.mp3`).

Music **never autoplays**: it starts when she taps the first button, and she can pause or mute anytime (top-right). If the file is missing, the site works normally and the play button shows a short hint.

No song is bundled. Royalty-free instrumental sources: [Pixabay Music](https://pixabay.com/music/), [Free Music Archive](https://freemusicarchive.org/), [YouTube Audio Library](https://studio.youtube.com/channel/music). Always check the licence. Search for "Indian flute", "sitar instrumental" or "romantic piano".

## 6. Deploy on Vercel

**Option A: GitHub (recommended)**

```bash
git init
git add .
git commit -m "Diwali surprise"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

1. Go to <https://vercel.com/new> and import the repository.
2. Vercel detects **Vite** automatically (Build command `npm run build`, Output `dist`). Click **Deploy**.
3. You get a URL like `https://your-project.vercel.app` to send her.

**Option B: CLI**

```bash
npm i -g vercel
vercel          # first deploy, answer the prompts
vercel --prod   # production URL
```

`vercel.json` is included so refreshing on any path serves the app. No environment variables are needed.

Tip: set a nice project name (Vercel → Settings → Domains) so the link looks personal.

## 7. Optional backend on Render

**This project does not need a backend**, and none is included. Everything (the diyas, letter, fireworks, music) runs in the browser, so there is no server to maintain or pay for.

If you later want something server-side (for example, getting notified when she opens the last page), you would add a small Express app in a separate `server/` folder:

1. Create `server/index.js` with an Express endpoint, plus a `server/package.json` with a `start` script.
2. Push to GitHub, then on <https://render.com> choose **New → Web Service**, set the root directory to `server`, build command `npm install`, start command `npm start`.
3. Add the frontend URL to the server's CORS allow-list and call the Render URL from the frontend using a `VITE_API_URL` variable (set in Vercel → Settings → Environment Variables). Only put non-secret values in `VITE_*` variables, since they are public.

---

## Project structure

```
src/
  config/loveConfig.js   ← all text, names, music + photo paths
  pages/                 ← the 5 chapters
  components/            ← Diya, Lantern, Rangoli, Fireworks, FloatingParticles,
                           FloatingHearts, HeartLights, SparkleBurst, CursorGlow,
                           RevealLines, MusicPlayer, Navigation, PageTransition
  hooks/                 ← useFireworks, useCanvasLoop, useAudio
  styles/                ← global.css, animations.css
  assets/images|music/   ← your photos and song
```

## Notes

- Fonts (Playfair Display, Cormorant Garamond, Great Vibes, Inter) load from Google Fonts; offline they fall back to system serif/sans.
- Canvas effects pause when the tab is hidden, scale down on small screens, and respect "reduce motion" settings.
- iOS Safari requires a tap before audio can play, which is why music begins on the first button press.
