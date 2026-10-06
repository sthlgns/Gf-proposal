# Nudaeng's surprise 💌 (React + Vite)

## Structure
```
src/content.js   ← ALL text, image paths, audio paths, NO-dodge counts
src/audio.js     ← music engine (one audio state for the whole site, crossfade to Pasilyo)
src/components.jsx  Nudaeng, Particles, MusicBtn, Proposal (YES/NO logic), Btn
src/App.jsx      ← scenes + transitions   |   src/styles.css ← all styling
public/images/   ← your photos            |   public/audio/ ← your audio
```

## Photos → `public/images/`
`nudaeng1.png`, `nudaeng2.png` (also used as the "sad" face), `nudaeng-smile.png`, `nudaeng-crying.png`.
Transparent PNGs, shown frameless like a mascot. Missing photos show a 🐶 placeholder with the expected filename. Rename paths in `src/content.js → IMG` if you like.

## Audio → `public/audio/`
- `pasilyo-chorus.mp3` — your own legally obtained clip. Plays automatically on the first YES, crossfading out the background music. If missing, the background music just keeps going.
- `background.mp3` — optional soft instrumental. If missing, a gentle built-in ambient pad plays instead.
Music starts on her first tap (browser autoplay rules) and 🎵 mutes/unmutes.

## Run locally
```
npm install
npm run dev      # open the printed URL (use the Network URL on your phone, same Wi-Fi)
```

## Deploy to Vercel
1. Push the folder to GitHub, then vercel.com → Add New → Project → import it (Vite is auto-detected; build `npm run build`, output `dist`).
   Or: `npm i -g vercel && vercel --prod` inside the folder.
2. Open the URL on your phone and test the whole flow once before sending it.

## How NO works
NO dodges to a random spot inside the screen for `DODGES` presses (YES grows, Nudaeng gets sadder). The press after that is a **real NO** and shows a kind ending. The final question dodges `FINAL_DODGES` times, then the same. Change the numbers in `src/content.js`.
