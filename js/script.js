/**
 * ============================================================================
 * MY LOVE LETTER - MULTI-SCENE ROMANTIC EXPERIENCE
 * Interactive Apology Experience & Vanilla JavaScript Architecture
 * ============================================================================
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Sound Manager (Single Audio Controller Instance)
     -------------------------------------------------------------------------- */
  class SoundManager {
    constructor() {
      this.audio = document.getElementById('bg-audio');
      this.toggleBtn = document.getElementById('audio-toggle-btn');
      this.statusText = document.getElementById('audio-status-text');
      this.isPlaying = false;
      this.hasError = false;
      this.hasUserInteracted = false;

      this.init();
    }

    init() {
      if (!this.audio || !this.toggleBtn) return;

      // Handle missing audio asset gracefully without crashes
      this.audio.addEventListener('error', () => {
        this.hasError = true;
        this.updateUI('Sound: Unavailable', false);
        console.warn('Audio asset not found or not supported. Continuing gracefully.');
      });

      // Handle audio canplay
      this.audio.addEventListener('canplaythrough', () => {
        if (!this.isPlaying && !this.hasError) {
          this.updateUI('Sound: Ready ♫', false);
        }
      });

      // Audio toggle button in header
      this.toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.hasUserInteracted = true;
        this.toggle();
      });
    }

    toggle() {
      if (this.hasError) {
        this.updateUI('Sound: Unavailable', false);
        return;
      }

      if (this.isPlaying) {
        this.pause();
      } else {
        this.play();
      }
    }

    play() {
      if (!this.audio || this.hasError) return;

      const playPromise = this.audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            this.isPlaying = true;
            this.updateUI('Sound: Playing ♪', true);
          })
          .catch((err) => {
            console.log('Autoplay restriction or audio prevented:', err);
            this.updateUI('Sound: Click to Play', false);
          });
      }
    }

    pause() {
      if (!this.audio) return;
      this.audio.pause();
      this.isPlaying = false;
      this.updateUI('Sound: Paused', false);
    }

    updateUI(text, isPlaying) {
      if (this.statusText) {
        this.statusText.textContent = text;
      }
      if (this.toggleBtn) {
        if (this.hasError) {
          this.toggleBtn.classList.add('is-disabled');
          this.toggleBtn.classList.remove('is-playing');
          this.toggleBtn.setAttribute('aria-disabled', 'true');
          this.toggleBtn.setAttribute('title', 'Background audio unavailable');
          return;
        }

        if (isPlaying) {
          this.toggleBtn.classList.add('is-playing');
          this.toggleBtn.classList.remove('is-disabled');
          this.toggleBtn.setAttribute('aria-label', 'Pause background music');
        } else {
          this.toggleBtn.classList.remove('is-playing');
          this.toggleBtn.classList.remove('is-disabled');
          this.toggleBtn.setAttribute('aria-label', 'Play background music');
        }
      }
    }
  }

  /* --------------------------------------------------------------------------
     2. Particle System (Ambient Floating Hearts & Twinkling Stars Canvas)
     -------------------------------------------------------------------------- */
  class ParticleSystem {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;

      this.ctx = this.canvas.getContext('2d');
      this.particles = [];
      this.burstParticles = [];
      this.width = 0;
      this.height = 0;
      this.animId = null;

      // Check prefers-reduced-motion
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (!this.reducedMotion) {
        this.init();
      }
    }

    init() {
      this.resize();
      window.addEventListener('resize', () => this.resize());

      // Create ambient particles
      const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 30000), 38);
      for (let i = 0; i < count; i++) {
        this.particles.push(this.createAmbientParticle());
      }

      this.animate();
    }

    resize() {
      this.width = this.canvas.width = window.innerWidth;
      this.height = this.canvas.height = window.innerHeight;
    }

    createAmbientParticle() {
      const types = ['heart', 'star', 'dust'];
      const type = types[Math.floor(Math.random() * types.length)];
      return {
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        size: type === 'heart' ? (Math.random() * 10 + 8) : (Math.random() * 3 + 1.5),
        speedY: -(Math.random() * 0.45 + 0.2),
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.5 + 0.25,
        fadeSpeed: (Math.random() * 0.008 + 0.004) * (Math.random() > 0.5 ? 1 : -1),
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        type: type,
        color: type === 'star' ? '#d4af37' : '#c77d8a'
      };
    }

    burst(x, y, count = 28) {
      if (this.reducedMotion) return;

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 4.5 + 1.8;
        this.burstParticles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2,
          size: Math.random() * 10 + 6,
          opacity: 1,
          gravity: 0.08,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.15,
          color: Math.random() > 0.4 ? '#8e1b36' : '#d4af37'
        });
      }
    }

    celebrationShower(count = 70) {
      if (this.reducedMotion) return;

      for (let i = 0; i < count; i++) {
        const x = Math.random() * this.width;
        const y = Math.random() * (this.height * 0.6) + (this.height * 0.1);
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 1;
        this.burstParticles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.5,
          size: Math.random() * 12 + 7,
          opacity: 1,
          gravity: 0.06,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.18,
          color: Math.random() > 0.5 ? '#d82b52' : (Math.random() > 0.5 ? '#e6ba50' : '#e68095')
        });
      }
    }

    drawHeart(x, y, size, color, opacity, rotation = 0) {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.rotate(rotation);
      this.ctx.beginPath();
      const topCurveHeight = size * 0.3;
      this.ctx.moveTo(0, topCurveHeight);
      this.ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      this.ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.4, 0, size);
      this.ctx.bezierCurveTo(0, (size + topCurveHeight) / 1.4, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      this.ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = opacity;
      this.ctx.fill();
      this.ctx.restore();
    }

    drawStar(x, y, size, color, opacity) {
      this.ctx.save();
      this.ctx.translate(x, y);
      this.ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        this.ctx.lineTo(Math.cos((18 + i * 90) * Math.PI / 180) * size, -Math.sin((18 + i * 90) * Math.PI / 180) * size);
        this.ctx.lineTo(Math.cos((63 + i * 90) * Math.PI / 180) * (size * 0.35), -Math.sin((63 + i * 90) * Math.PI / 180) * (size * 0.35));
      }
      this.ctx.closePath();
      this.ctx.fillStyle = color;
      this.ctx.globalAlpha = opacity;
      this.ctx.fill();
      this.ctx.restore();
    }

    animate() {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Render Ambient Particles
      for (let i = 0; i < this.particles.length; i++) {
        const p = this.particles[i];
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;
        p.opacity += p.fadeSpeed;

        if (p.opacity > 0.7 || p.opacity < 0.15) {
          p.fadeSpeed = -p.fadeSpeed;
        }

        if (p.y < -20) {
          p.y = this.height + 10;
          p.x = Math.random() * this.width;
        }
        if (p.x < -20) p.x = this.width + 10;
        if (p.x > this.width + 20) p.x = -10;

        if (p.type === 'heart') {
          this.drawHeart(p.x, p.y, p.size, p.color, p.opacity, p.rotation);
        } else if (p.type === 'star') {
          this.drawStar(p.x, p.y, p.size, p.color, p.opacity);
        } else {
          this.ctx.beginPath();
          this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          this.ctx.fillStyle = p.color;
          this.ctx.globalAlpha = p.opacity * 0.6;
          this.ctx.fill();
        }
      }

      // Render Burst Particles
      for (let i = this.burstParticles.length - 1; i >= 0; i--) {
        const bp = this.burstParticles[i];
        bp.x += bp.vx;
        bp.y += bp.vy;
        bp.vy += bp.gravity;
        bp.opacity -= 0.016;
        bp.rotation += bp.rotationSpeed;

        if (bp.opacity <= 0) {
          this.burstParticles.splice(i, 1);
          continue;
        }

        this.drawHeart(bp.x, bp.y, bp.size, bp.color, bp.opacity, bp.rotation);
      }

      this.animId = requestAnimationFrame(() => this.animate());
    }
  }

  /* --------------------------------------------------------------------------
     3. Scene Manager (State Machine for Multi-Scene Progression)
     -------------------------------------------------------------------------- */
  class SceneManager {
    constructor() {
      this.currentSceneId = 'scene-1';
      this.isTransitioning = false;
      this.listeners = new Set();
    }

    goToScene(sceneId) {
      if (this.isTransitioning) return;
      if (sceneId === this.currentSceneId) return;

      const targetScene = document.getElementById(sceneId);
      const activeScene = document.getElementById(this.currentSceneId);
      if (!targetScene || !activeScene) return;

      this.isTransitioning = true;

      // Smooth fade out
      activeScene.classList.remove('active');
      activeScene.setAttribute('aria-hidden', 'true');

      setTimeout(() => {
        targetScene.classList.add('active');
        targetScene.removeAttribute('aria-hidden');

        const prevSceneId = this.currentSceneId;
        this.currentSceneId = sceneId;

        this.notify(prevSceneId, sceneId);

        // Smooth scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });

        this.isTransitioning = false;
      }, 250);
    }

    onSceneChange(callback) {
      this.listeners.add(callback);
    }

    notify(fromScene, toScene) {
      for (const listener of this.listeners) {
        listener(fromScene, toScene);
      }
    }
  }

  /* --------------------------------------------------------------------------
     4. Bilingual Controller (Scene 3 Language Toggle)
     -------------------------------------------------------------------------- */
  class BilingualController {
    constructor() {
      this.container = document.getElementById('bilingual-message-container');
      this.card = document.getElementById('bilingual-letter-card');
      this.toggleBtn = document.getElementById('btn-language-toggle');
      this.label = document.getElementById('btn-language-label');

      this.currentLang = 'en'; // default English
      this.isToggling = false;

      // Exact English message paragraphs (DEFAULT)
      this.englishParagraphs = [
        "You know, Sandra, I chose this picture because your eyes look especially beautiful in it. It's one of my favorite pictures of you since we found our way back to each other. ❤️",
        "But honestly, your eyes are beautiful in every picture, and you look amazing in everything. Every time I look at you, I feel like no words could ever do justice to how beautiful you are.",
        "There's something about this particular picture that I love so much. It's the way I can see my own reflection in your eyes while you're looking at me. I can't fully explain how much that little detail means to me, but I love seeing myself in your eyes. In that moment, it feels like the whole world disappears, and all I can see is you.",
        "Maybe that's why I made it look like I was kissing you in the picture, because honestly, I wished I could kiss you so badly. I wished I could be closer to you, have you right beside me, and stay by your side always. I don't want moments like these to exist only in pictures. I want them to become the life we get to live together. ❤️",
        "I love you, Sandra. I love you, I love you, I love you more than anyone else. I love having you in my life. I love your support, the way you stand by me, and every beautiful feeling you give me, even when you don't realize just how much it means to me.",
        "May God always keep you in my life, and may He help me become someone who can make you the happiest girl in the world. I know you've been through so much. I know you've faced difficult things that hurt you, and I know how much you've had to put up with and how hard some moments have been for you.",
        "That's why I don't want my love for you to be just a collection of beautiful words. I genuinely think every day about how I can make you happy, how I can bring a smile to your face, and how I can give back even a little of all the love you give me.",
        "I want to see you happy, to be a reason behind your smile and your peace of mind, and to make up for the difficult moments you've been through—not just with words, but through my actions, too.",
        "I pray that I always have the strength to stand beside you, to keep loving you, caring for you, and finding little ways to make you smile. I want you to feel every single day just how precious you are to me.",
        "I love you, Sandra. I want to keep being the person you find by your side, the person who makes you feel safe, and the person who tries every day to make your heart happy. May God always keep you close to me, my love, and may you always remain the most beautiful choice I've ever made. ❤️🌹"
      ];

      // Exact Egyptian Arabic message paragraphs
      this.arabicParagraphs = [
        "عارفة يا ساندرا، أنا اخترت الصورة دي بالذات لأن دي من أكتر الصور اللي عينيكي فيها حلوة من ساعة ما رجعنا لبعض. ❤️",
        "مع إن الحقيقة إن عينيكي حلوة في كل الصور، وإنتِ جميلة في كل حالاتك، وكل مرة ببصلك فيها بحس إنك أحلى من أي كلام ممكن يوصفك.",
        "بس أنا حبيت الصورة دي أوي، عشان عينيكي فيها، وعشان أكتر حاجة بحبها فيها هي انعكاس صورتي في عينيكي وإنتِ باصة لي. مش عارف أوصفلك قد إيه التفصيلة دي غالية عندي، بس بحب أوي إحساسي وأنا شايف نفسي في عينيكي، وكأني في اللحظة دي مش شايف الدنيا كلها غيرك إنتِ.",
        "ويمكن عشان كده خليت نفسي ببوسك في الصورة، لأني بجد كنت نفسي أبوسك أوي، ونفسي أكون قريب منك، وتكوني جنبي، وأفضل جنبك دايمًا. نفسي اللحظات الحلوة دي متبقاش مجرد صورة، لكن تبقى حياتنا اللي بنعيشها سوا. ❤️",
        "بحبك يا ساندرا، بحبك، بحبك، بحبك أكتر من أي حد تاني. بحب وجودك في حياتي، وبحب دعمك ليا، وبحب سندك ووقفتك جنبي، وبحب كل إحساس حلو بتديهولي حتى من غير ما تاخدي بالك.",
        "ربنا يخليكي ليا، وربنا يساعدني ويقدرني إني أخليكي أسعد إنسانة في الدنيا. أنا عارف إنك تعبتي كتير، وعارف إنك عديتي بحاجات صعبة ووجعتك، وعارف قد إيه استحملتيني، وقد إيه كان فيه حاجات كتير مش سهلة عليكي.",
        "وعشان كده، أنا مش عاوز حبي ليكي يبقى مجرد كلام حلو أقولهولك وخلاص. أنا بجد بفكر كل يوم إزاي أخليكي مبسوطة، وإزاي أقدر أفرّح قلبك، وإزاي أخليكي تحسي إن كل الحب اللي بتديهولي راجعلك أضعافه.",
        "نفسي أشوفك دايمًا مبسوطة، وأكون سبب في ضحكتك وراحتك، وأقدر أعوضك عن كل لحظة صعبة عديتي بيها، مش بالكلام بس، لكن بأفعالي كمان.",
        "ربنا يقدرني إني أفضل جنبك، وأفضل أحبك وأهتم بيكي وأفرّحك، وأخليكي تحسي كل يوم إنك غالية عندي قد إيه.",
        "بحبك يا ساندرا، ونفسي أفضل الشخص اللي تلاقيه جنبك، واللي تحسي معاه بالأمان، واللي يحاول كل يوم يخلي قلبك مبسوط. ربنا يخليكي ليا يا حبيبتي، ويديمك أجمل اختيار في حياتي. ❤️🌹"
      ];

      this.init();
    }

    init() {
      if (!this.container || !this.toggleBtn) return;

      // Render default English message
      this.render('en', false);

      this.toggleBtn.addEventListener('click', () => {
        this.toggle();
      });
    }

    toggle() {
      if (this.isToggling) return;
      this.isToggling = true;

      const nextLang = this.currentLang === 'en' ? 'ar' : 'en';

      // Subtle fade out transition
      if (this.card) {
        this.card.classList.add('is-fading');
      }

      setTimeout(() => {
        this.render(nextLang, true);

        if (this.card) {
          this.card.classList.remove('is-fading');
        }
        this.isToggling = false;
      }, 180);
    }

    render(lang, animate) {
      this.currentLang = lang;
      const paragraphs = lang === 'en' ? this.englishParagraphs : this.arabicParagraphs;

      // Construct HTML
      let html = '';
      paragraphs.forEach((p, idx) => {
        let extraClass = '';
        if (idx === 0) extraClass = 'greeting-highlight';
        else if (idx === 4) extraClass = 'love-highlight';
        else if (idx === paragraphs.length - 1) extraClass = 'signature-p';

        html += `<p class="card-p ${extraClass}">${p}</p>`;
      });

      this.container.innerHTML = html;

      // Update direction, language attributes, and button label
      if (lang === 'ar') {
        this.card.setAttribute('dir', 'rtl');
        this.card.setAttribute('lang', 'ar');
        this.container.classList.add('arabic-text');
        this.label.textContent = 'Show English ♡';
        this.toggleBtn.setAttribute('aria-pressed', 'true');
        this.toggleBtn.setAttribute('aria-label', 'Switch back to English message');
      } else {
        this.card.setAttribute('dir', 'ltr');
        this.card.setAttribute('lang', 'en');
        this.container.classList.remove('arabic-text');
        this.label.textContent = 'Translate to Egyptian Arabic ♡';
        this.toggleBtn.setAttribute('aria-pressed', 'false');
        this.toggleBtn.setAttribute('aria-label', 'Translate message to Egyptian Arabic');
      }
    }
  }

  /* --------------------------------------------------------------------------
     5. Envelope Controller (Flap, Seal, Letter Orchestration)
     -------------------------------------------------------------------------- */
  class EnvelopeController {
    constructor(sceneManager, particleSystem, soundManager) {
      this.sceneManager = sceneManager;
      this.particleSystem = particleSystem;
      this.soundManager = soundManager;

      this.wrapper = document.getElementById('envelope-wrapper');
      this.waxSeal = document.getElementById('wax-seal');
      this.letter = document.getElementById('letter');
      this.openPromptBtn = document.getElementById('open-prompt-btn');
      this.btnContinue = document.getElementById('btn-continue-journey');
      this.btnClose = document.getElementById('btn-close-envelope');

      this.isOpen = false;
      this.isAnimating = false;

      this.bindEvents();
    }

    bindEvents() {
      if (!this.wrapper) return;

      const triggerOpen = () => {
        if (!this.isOpen && !this.isAnimating) {
          this.open();
        }
      };

      this.wrapper.addEventListener('click', (e) => {
        if (e.target.closest('.letter-actions')) return;
        triggerOpen();
      });

      if (this.waxSeal) {
        this.waxSeal.addEventListener('click', (e) => {
          e.stopPropagation();
          triggerOpen();
        });
      }

      if (this.openPromptBtn) {
        this.openPromptBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          triggerOpen();
        });
      }

      // Keyboard Accessibility (Enter or Space)
      this.wrapper.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !this.isOpen && !this.isAnimating) {
          e.preventDefault();
          triggerOpen();
        }
      });

      // Escape key to fold back if letter is open
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.isOpen && !this.isAnimating && this.sceneManager.currentSceneId === 'scene-1') {
          this.close();
        }
      });

      // Button: Continue Journey (Move to Scene 2: Rose Photo & Arabic Message)
      if (this.btnContinue) {
        this.btnContinue.addEventListener('click', (e) => {
          e.stopPropagation();
          this.sceneManager.goToScene('scene-2');
        });
      }

      // Button: Close Letter / Re-seal
      if (this.btnClose) {
        this.btnClose.addEventListener('click', (e) => {
          e.stopPropagation();
          this.close();
        });
      }
    }

    open() {
      if (this.isAnimating || this.isOpen) return;

      this.isAnimating = true;
      this.wrapper.setAttribute('aria-expanded', 'true');

      // Music starts ONLY after user interaction with envelope
      if (this.soundManager && !this.soundManager.isPlaying) {
        this.soundManager.play();
      }

      // Romantic particle burst at wax seal position
      if (this.waxSeal && this.particleSystem) {
        const rect = this.waxSeal.getBoundingClientRect();
        const sealX = rect.left + rect.width / 2;
        const sealY = rect.top + rect.height / 2;
        this.particleSystem.burst(sealX, sealY, 32);
      }

      // Step 1: Flap opening and seal breaking
      this.wrapper.classList.add('is-opening');

      // Step 2: Letter rises and unfolds into reader view
      setTimeout(() => {
        this.wrapper.classList.add('is-open');

        setTimeout(() => {
          this.wrapper.classList.add('letter-unfolded');
          this.isOpen = true;
          this.isAnimating = false;

          // Focus continue button for keyboard accessibility
          if (this.btnContinue) {
            this.btnContinue.focus();
          }
        }, 650);
      }, 400);
    }

    close() {
      if (this.isAnimating || !this.isOpen) return;

      this.isAnimating = true;
      this.wrapper.classList.remove('letter-unfolded');

      setTimeout(() => {
        this.wrapper.classList.remove('is-open');

        setTimeout(() => {
          this.wrapper.classList.remove('is-opening');
          this.wrapper.setAttribute('aria-expanded', 'false');
          this.isOpen = false;
          this.isAnimating = false;
          this.wrapper.focus();
        }, 500);
      }, 400);
    }

    reset() {
      this.isOpen = false;
      this.isAnimating = false;
      this.wrapper.classList.remove('letter-unfolded', 'is-open', 'is-opening');
      this.wrapper.setAttribute('aria-expanded', 'false');
    }
  }

  /* --------------------------------------------------------------------------
     6. Navigation & Inter-Scene Wiring
     -------------------------------------------------------------------------- */
  function setupNavigation(sceneManager, envelopeController, particleSystem) {
    // Scene 2 Buttons
    const btnScene2Back = document.getElementById('btn-scene-2-back');
    const btnScene2Next = document.getElementById('btn-scene-2-next');

    if (btnScene2Back) {
      btnScene2Back.addEventListener('click', () => {
        sceneManager.goToScene('scene-1');
      });
    }

    if (btnScene2Next) {
      btnScene2Next.addEventListener('click', () => {
        sceneManager.goToScene('scene-3');
      });
    }

    // Scene 3 Buttons
    const btnScene3Back = document.getElementById('btn-scene-3-back');
    const btnScene3Next = document.getElementById('btn-scene-3-next');

    if (btnScene3Back) {
      btnScene3Back.addEventListener('click', () => {
        sceneManager.goToScene('scene-2');
      });
    }

    if (btnScene3Next) {
      btnScene3Next.addEventListener('click', () => {
        sceneManager.goToScene('scene-4');
      });
    }

    // Scene 4 Buttons
    const btnScene4Back = document.getElementById('btn-scene-4-back');
    const btnReadAgain = document.getElementById('btn-read-again') || document.getElementById('btn-replay');

    if (btnScene4Back) {
      btnScene4Back.addEventListener('click', () => {
        sceneManager.goToScene('scene-3');
      });
    }

    if (btnReadAgain) {
      btnReadAgain.addEventListener('click', () => {
        // Reset envelope state so user can reopen, without touching background music
        envelopeController.reset();
        sceneManager.goToScene('scene-1');
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. Asset Graceful Fallback Manager
     -------------------------------------------------------------------------- */
  function setupAssetFallbacks() {
    const setupFallback = (imgId, fallbackText) => {
      const img = document.getElementById(imgId);
      if (!img) return;

      img.addEventListener('error', () => {
        const parent = img.parentElement;
        if (parent) {
          parent.innerHTML = `
            <div class="photo-fallback-card">
              <div class="photo-fallback-icon" aria-hidden="true">🌹</div>
              <p class="photo-fallback-text">${fallbackText}</p>
            </div>
          `;
        }
      });
    };

    setupFallback('rose-photo-img', 'A rose kept close to my heart ♡');
    setupFallback('couple-photo-img', 'Our treasured memory together ♡');
  }

  /* --------------------------------------------------------------------------
     8. System Initialization
     -------------------------------------------------------------------------- */
  const soundManager = new SoundManager();
  const particleSystem = new ParticleSystem('ambient-canvas');
  const sceneManager = new SceneManager();
  const bilingualController = new BilingualController();
  const envelopeController = new EnvelopeController(sceneManager, particleSystem, soundManager);

  setupNavigation(sceneManager, envelopeController, particleSystem);
  setupAssetFallbacks();

  // Expose to window for testing
  window.LoveLetterApp = {
    soundManager,
    particleSystem,
    sceneManager,
    bilingualController,
    envelopeController
  };

  console.log('%c♡ My Love Letter - Validated & Ready ♡', 'color: #c77d8a; font-size: 14px; font-weight: bold;');
});
