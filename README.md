# My Love Letter ♡

An exquisite, interactive, multi-scene romantic apology website created with vanilla HTML5, CSS3, and JavaScript.

This website is completely static, self-contained, and ready for deployment on GitHub Pages, Netlify, Vercel, or any static hosting service. It requires **no backend, no database, no authentication, and no API keys**.

---

## 🌹 Project Sequence

The website presents a cohesive, heartfelt storytelling journey across four scenes:

1. **Scene 1: The Sealed Envelope** — A realistic 3D folded envelope with a red wax seal and champagne gold detailing. Clicking or tapping the envelope unfolds the top flap, slides the letter out of the pocket, and initiates background music.
2. **Scene 2: My Photo & Egyptian Arabic Message** — Displays the original photo holding a fresh rose (`assets/images/rose-photo.png`) inside an elegant romantic frame (with zero forced cropping), accompanied by a sincere message in Egyptian Arabic with right-to-left (RTL) formatting and custom Arabic typography.
3. **Scene 3: Our Couple Photo & Bilingual Message** — Displays the couple portrait (`assets/images/couple-photo.png`) accompanied by a client-side bilingual translation toggle. English is displayed by default; clicking `"Translate to Egyptian Arabic ♡"` seamlessly switches to Egyptian Arabic with RTL alignment without page reload or audio interruption.
4. **Scene 4: Final Thank-You Message** — A warm, unconditional thank-you card honoring Sandra (`"Thank You for Being You ❤️"`), followed by an interactive `"Read Again ♡"` button that allows replaying the experience from the envelope without duplicate audio or glitches.

> [!NOTE]
> This apology experience intentionally contains no pressure, no forgiveness ultimatum, and no yes/no decisions. It focuses entirely on sincere appreciation, accountability, and love.

---

## 📁 Project Structure

```text
My-Love-Letter/
│
├── index.html                     # Semantic HTML5 markup for all 4 scenes
├── README.md                      # Complete documentation & customization guide
│
├── css/
│   └── style.css                  # Romantic color tokens, 3D envelope folds, Arabic RTL styling & animations
│
├── js/
│   └── script.js                  # SceneManager, BilingualController, EnvelopeController, SoundManager, ParticleSystem & Asset Fallbacks
│
└── assets/
    ├── images/
    │   ├── rose-photo.png         # Photo of you holding a rose (Scene 2)
    │   └── couple-photo.png       # Photo of you together (Scene 3)
    └── audio/
        └── love-song.mp3          # Romantic background soundtrack (Scene 1-4)
```

---

## 🚀 How to Run the Website Locally

Since the project uses vanilla web standards, you can run it in multiple ways:

### Option 1: Direct Browser Launch
Double-click `index.html` or drag it into any modern web browser (Google Chrome, Microsoft Edge, Safari, Firefox).

### Option 2: Using Python (Recommended)
Open a terminal inside the project folder:
```powershell
python -m http.server 8000
```
Then navigate to: `http://localhost:8000`

### Option 3: Using Node.js
```powershell
npx serve .
```

---

## 📸 Where to Put Images and Audio

### 1. Photos
Place your original high-resolution photos in:
- `assets/images/rose-photo.png` — Photo of you holding a rose (displayed in Scene 2).
- `assets/images/couple-photo.png` — Photo of the two of you together (displayed in Scene 3).

*Note: The website automatically maintains the natural aspect ratio of your photos using `object-fit: contain` and responsive constraints to prevent awkward cropping on mobile and desktop.*

### 2. Background Music
Place your romantic audio file in:
- `assets/audio/love-song.mp3`

### Missing Asset Graceful Fallback
- If an image file is missing, the website displays an elegant blush-and-gold card with a rose emblem (`"A rose kept close to my heart ♡"`) instead of a broken image icon.
- If the audio file is missing, the website functions smoothly without blocking errors or alerts; the header audio indicator gracefully reflects `"Sound: Unavailable"`.

---

## ✏️ How to Customize and Edit Messages

### 1. How to Edit the First Arabic Message (Scene 2)
Open `index.html` and locate the `<article class="romantic-letter-card rtl-card" dir="rtl" lang="ar">` section inside `<section id="scene-2">` (lines ~250–290).

You can edit or adjust any paragraph directly:
```html
<p class="card-p greeting-highlight">صباح الفل على أحلى بنت في الدنيا كلها ❤️🌹</p>
<p class="card-p">عارفة يا ساندرا، أنا كنت سهران بالليل...</p>
```

### 2. How to Edit the Bilingual Messages (Scene 3)
Open `js/script.js` and locate `class BilingualController`:
- **English version** (default): Edit the strings inside the `this.englishParagraphs = [ ... ];` array.
- **Egyptian Arabic version**: Edit the strings inside the `this.arabicParagraphs = [ ... ];` array.

Paragraph breaks and emojis are preserved automatically when the user toggles between languages.

### 3. How to Edit the Final Thank-You Message (Scene 4)
Open `index.html` and locate `<section id="scene-4">`:
```html
<h2 id="scene-4-title" class="thankyou-title">Thank You for Being You ❤️</h2>

<div class="thankyou-body">
  <p class="thankyou-message">
    Thank you for being such a beautiful part of my life. Every moment with you means more to me than words can explain. No matter what, I want you to know how much you mean to me. You will always have a special place in my heart. ♡
  </p>
  
  <p class="thankyou-closing">
    With all my love, always. 🌹
  </p>
</div>
```

---

## 🌐 Deploying to Static Hosting

### Deploying to GitHub Pages
1. Push this repository to GitHub.
2. In your repository settings, go to **Settings** > **Pages**.
3. Under **Build and deployment** > **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Within a minute, your website will be live at `https://<username>.github.io/<repo-name>/`.

### Deploying to Netlify
1. Go to [Netlify](https://www.netlify.com/) and log in.
2. Drag and drop the `My-Love-Letter` project folder into the Netlify dashboard.
3. Your romantic website will be published instantly with an HTTPS link.

---

## ♿ Accessibility & Standards

- **Mobile First**: Tested across 320px, 375px, 414px, 768px, and desktop viewports with zero horizontal scrolling.
- **Arabic Typography**: Google Fonts `Cairo` and `Amiri` ensure optimal Arabic calligraphic legibility and generous line-spacing (`1.95`).
- **Audio Integrity**: A single `<audio>` element persists across scene transitions, avoiding duplicate sounds or sudden audio restarts.
- **Reduced Motion**: Full support for `@media (prefers-reduced-motion: reduce)`.
# love-letter
# love-letter
