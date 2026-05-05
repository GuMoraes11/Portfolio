const addressPath = document.querySelector('#addressPath');
const statusText = document.querySelector('#statusText');
const systemNote = document.querySelector('#systemNote');
const windowLayer = document.querySelector('#windowLayer');
const mainStage = document.querySelector('#mainStage');
const desktopFiles = document.querySelector('#desktopFiles');
const windowTemplate = document.querySelector('#windowTemplate');
const bootScreen = document.querySelector('#bootScreen');
const bootTyping = document.querySelector('#bootTyping');
const bootModes = document.querySelectorAll('[data-boot-mode]');
const commandPalette = document.querySelector('#commandPalette');
const commandForm = document.querySelector('#commandForm');
const commandInput = document.querySelector('#commandInput');

const SUPABASE_URL = 'https://oolaifbojplmykeyizrp.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_RdpbbyqfFEVJQl-T5uKM5Q_H70fQhuk';

const catosDb = window.supabase
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;


let zIndex = 20;
let snake = null;
let pong = null;
let glitchTimer = null;
let accentTimer = null;
let secretClickCount = 0;
let currentMode = 'normal';

const notes = [
  'click files. open windows.',
  'system is stable enough. probably.',
  'some files are decorative.',
  'tip: keyboard commands in the bottom bar are real.',
  'guestbook messages can be read by anyone.',
  'drag desktop icons around at your convenience.',
  'meow?',
  'some fragments know where they belong.',
  'press / to open the command palette.',
  'stay a while…'
];

const projects = [
  {
    id: 'pear-shader',
    title: 'Pear Shader Toolkit',
    type: 'technical art / unity shaders / editor tooling',
    desc: 'A stylized Unity shader toolkit for soft toon, glossy, shimmer, and water materials.',
    windowWidth: 760,
    detail: `
      <article class="project-detail pear-case-study">
        <header class="pear-hero">
          <section class="pear-hero-copy">
            <p class="meta-line">technical art / unity shaders / editor tooling</p>
            <h2 class="section-title">Pear Shader Toolkit</h2>

            <p class="lede">
              Pear is a stylized Unity shader toolkit for soft toon, glossy, shimmer, and water materials.
            </p>

            <p>
              I built it to explore how shader features can stay powerful without becoming overwhelming for artists or non-technical users. The focus was not just the final material look, but the full workflow: readable shader controls, custom inspectors, clean presets, validation warnings, and documentation.
            </p>

            <p>
              View the repository, download the Unity package, or keep scrolling for a breakdown of the shader features and demo scenes.
            </p>

            <div class="project-actions">
              <a href="https://github.com/GuMoraes11/Pear-Shader" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://github.com/GuMoraes11/Pear-Shader/releases/tag/v0.2.0" target="_blank" rel="noreferrer">Download Package</a>
              <a href="https://gumoraes11.github.io/Pear-Shader/" target="_blank" rel="noreferrer">Demo Site</a>
            </div>
          </section>

          <aside class="pear-hero-media">
            <img src="assets/projects/pear-shader/pear-hero.gif" alt="Pear Shader Toolkit hero clip">
          </aside>
        </header>

        <section class="pear-build-card">
          <h3>What I built</h3>
          <div class="pear-feature-grid">
            <div>URP and Built-In toon shaders</div>
            <div>Custom Unity material inspectors</div>
            <div>Artist-friendly preset buttons</div>
            <div>Grouped shader controls</div>
            <div>Toon bands, ramp textures, hue shifting, outlines, rim light, emission, matcap, and shimmer</div>
            <div>Stylized water with foam, sparkles, surface motion, mesh waves, and subsurface glow</div>
          </div>
        </section>

        <section class="pear-text-section">
          <div>
            <h3>Why I made it</h3>
            <p>
              Pear started as a shader for my own Unity projects, then grew into a focused technical art toolkit.
            </p>
            <p>
              A lot of stylized shaders either feel too limited or turn into a wall of confusing properties. I wanted Pear to sit somewhere cleaner: small enough to understand, flexible enough to make different looks, and friendly enough that someone could use it without reading the shader code first.
            </p>
            <p>
              The inspector was a major part of the project. I wanted the controls to feel organized and approachable, especially for artists.
            </p>
            <p>
              Instead of exposing every property in one long list, I grouped the controls into clear sections, added preset buttons, keyword syncing, and validation warnings for common setup issues.
            </p>
          </div>

          <aside class="pear-small-media">
            <img src="assets/projects/pear-shader/pear-custom-inspector.png" alt="Pear Shader custom Unity inspector">
          </aside>
        </section>

        <section class="pear-text-section pear-text-section-flipped">
          <aside class="pear-small-media">
            <img src="assets/projects/pear-shader/pear-toon-turntable.gif" alt="Pear toon shader material turntable">
          </aside>

          <div>
            <h3>Toon Shader</h3>
            <p>
              The toon shader supports soft and graphic stylized materials through controllable lighting bands, ramp textures, hue shifting, rim light, emission, matcap reflection, shimmer, and an outline pass.
            </p>
            <p>
              I also built a custom material inspector so the shader feels like a tool instead of a raw list of properties.
            </p>

            <ul class="project-list">
              <li>Two-band and three-band toon lighting</li>
              <li>Ramp texture support</li>
              <li>Texture hue shifting and hue shift speed</li>
              <li>Rim light, emission, matcap, and shimmer controls</li>
              <li>Inverted hull outline</li>
              <li>Presets for Pear, Cozy, Bold, and Gloss</li>
            </ul>
          </div>
        </section>
      </article>
    `
  },
  {
  id: 'Project-213c',
  title: 'Project 213',
  type: 'game dev / cooperative platformer / speedrun systems',
  desc: 'A cooperative 2D platformer built around speedrunning, communication, and shared problem-solving.',
  windowWidth: 760,
  detail: `
    <article class="project-detail pear-case-study">
      <header class="pear-hero">
        <section class="pear-hero-copy">
          <p class="meta-line">game dev / cooperative platformer / speedrun systems</p>
          <h2 class="section-title">Project 213</h2>

          <p class="lede">
            Project 213 is a cooperative 2D platformer built around speedrunning, communication, and shared problem-solving.
          </p>

          <p>
            Players work together to move through obstacle rooms as quickly as possible, using timing, positioning, and coordination to reach the end. The project focuses on fast iteration, readable mechanics, and creating a game loop that feels simple to understand but satisfying to optimize.
          </p>

          <p>
            View the repository or keep scrolling for a breakdown of the gameplay systems, level design, and development process.
          </p>

          <div class="project-actions">
            <a href="https://github.com/GuMoraes11/Unity-Platformer" target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        <aside class="pear-hero-media">
          <img src="assets/projects/project-213/project-213-hero.gif" alt="Project 213 gameplay preview">
        </aside>
      </header>

      <section class="pear-build-card">
        <h3>What I built</h3>
        <div class="pear-feature-grid">
          <div>Cooperative 2D platforming gameplay</div>
          <div>Player movement and jumping systems</div>
          <div>Timer-based speedrun structure</div>
          <div>Level layouts built around teamwork and timing</div>
          <div>UI elements for player labels, timer, and game state</div>
          <div>Visual style inspired by retro computer interfaces and arcade speedrun overlays</div>
          <div>Playable prototype focused on pacing, readability, and cooperative flow</div>
        </div>
      </section>

      <section class="pear-text-section">
        <div>
          <h3>Why I made it</h3>
          <p>
            Project 213 was built as a way to explore cooperative game design in a small, focused format.
          </p>
          <p>
            I wanted the core idea to be immediately understandable: two players enter a level, work together, and try to complete it faster each time. The fun comes from the back-and-forth between execution and communication. A player might understand what needs to happen, but the challenge is coordinating that action under pressure.
          </p>
          <p>
            The speedrun structure helped give the project a clear identity. Instead of treating the timer as just a UI feature, I used it as part of the game’s motivation. The goal is not only to finish, but to improve, retry, and find cleaner routes through the level.
          </p>
        </div>

        <aside class="pear-small-media">
          <img src="assets/projects/project-213/project-213-screenshot-1.png" alt="Project 213 gameplay screenshot">
        </aside>
      </section>

      <section class="pear-text-section pear-text-section-flipped">
        <aside class="pear-small-media">
          <img src="assets/projects/project-213/project-213-screenshot-2.png" alt="Project 213 level design screenshot">
        </aside>

        <div>
          <h3>Gameplay Design</h3>
          <p>
            Project 213 is built around short platforming challenges where cooperation matters more than raw mechanical difficulty.
          </p>
          <p>
            The level design focuses on readable obstacles, repeated attempts, and moments where players need to pause, plan, or time their movement together. I wanted the rooms to feel like small puzzles that become faster once players understand the solution.
          </p>
          <p>
            The visual presentation supports that goal by keeping the play area clear and high contrast. Player labels, bright platforms, and simple shapes make it easier to read what is happening during fast attempts.
          </p>
        </div>
      </section>
    </article>
  `
  },
  {
    id: 'game-demo',
    title: 'Project 3 TBD name',
    type: 'Project 3 TBD tag / Project 3 TBD tag',
    desc: 'Project 3 TBD description short',
    detail: 'Use this as a devlog-style project. Show blockouts, models, lighting tests, and explain your aesthetic goals.'
  },
  {
    id: 'os-port',
    title: 'CatOS Portfolio Site',
    type: 'personal website',
    desc: 'This site itself is somewhat of an art piece disguised as a portfolio.',
    detail: 'idk what else to say, you are here... looking at it.'
  }
];

const routes = {
  home: {
    title: '/home',
    width: 1020,
    height: 620,
    centered: true,
    html: () => `
      <div class="hero-grid">
        <section class="hero-copy">
          <p class="meta-line">boot complete // visitor session initialized</p>
          <h1>CatOS systems online.</h1>
          <p class="opening-line">this is my portfolio. take a look around while you’re here.</p>
          <p class="lede">this started off as something simpler but became somewhat of an art project. a terminal screen, and a tiny archive of things i make when i care too much. probably a waste of time but who knows it might get me hired…</p>
          <div class="terminal-card">
            <p><code>&gt;</code> open /works to see projects</p>
            <p><code>&gt;</code> open memory_fragments.log and arrange the pieces</p>
            <p><code>&gt;</code> click stickers. they’re fun :3</p>
          </div>
          <div class="tag-row">
            <span class="tag">game dev</span>
            <span class="tag">shaders</span>
            <span class="tag">illustration</span>
            <span class="tag">web dev</span>
          </div>
        </section>
        <aside class="home-centerpiece">
          <img src="assets/images/heroImage.png" class="hero-image" alt="CatOS mascot portrait" />
        </aside>
      </div>
    `,
    after: () => {}
  },
  works: {
    title: '/works',
    width: 760,
    html: () => `
      <h2 class="section-title">/works — my little treasures</h2>
      <p class="lede">a lot of projects are forgotten but not these, these are important to me. they are files, or something close to that, feel free to click any for more info.</p>
      <div class="project-grid">
        ${projects.map(project => `
          <button class="project-card" data-project="${project.id}" type="button">
            <p class="meta-line">${project.type}</p>
            <h3>${project.title}</h3>
            <p>${project.desc}</p>
          </button>
        `).join('')}
      </div>
    `,
    after: setupProjectCards
  },
  self: {
    title: '/self',
    width: 920,
    height: 720,
    centered: true,
    html: () => `
      <h2 class="section-title">/self — character sheet</h2>
      <div class="self-layout self-layout-expanded">
        <section class="self-summary">
          <p class="lede">I like to make things that feel a little different. I’m drawn to creative work that has personality, the stuff that doesn’t try to appeal to everyone, but connects with the right people.</p>
          <p>I’ve spent a lot of time exploring different hobbies, but I always come back to building and creating: game development, drawing, shaders, crochet, honestly any interactive projects or craft.</p>
          <p>I like experimenting, following through with ideas and seeing where they go. Sometimes that leads to unexpected results, which is honestly my favorite part.</p>
          <p>I’m still figuring things out, but I care a lot about making things that feel honest and tailored instead of mass appealing. I believe having a dedicated, caring, and invested client that will stick for as long as you’re around is way more valuable than passing high numbers.</p>
        </section>
        <aside class="profile-card">
          <h3>stats</h3>
          <dl class="stat-list">
            <div><dt>curiosity</dt><dd>high</dd></div>
            <div><dt>social battery</dt><dd>variable</dd></div>
            <div><dt>creativity</dt><dd>high</dd></div>
            <div><dt>approach</dt><dd>experimental</dd></div>
            <div><dt>focus</dt><dd>idea-driven</dd></div>
          </dl>
          <div class="portrait-frame">
            <img src="assets/images/Portrait/portrait.png" alt="portrait" class="portrait-image">
          </div>
        </aside>
      </div>

      <section class="terminal-card self-deep-dive">
        <p>I’m from São Paulo, Brazil, and I’m currently studying Computer Science with a minor in Game Development at Chapman University. Moving between cultures has shaped how I notice things, from small everyday details to bigger questions about identity, safety, language, and self-expression.</p>
        <p>I’ve been making things for as long as I can remember: drawings, songs, photos, websites, and games. Over time, I realized the medium changes, but the instinct stays the same. I like building things that help me communicate an idea, a feeling, or a small world someone else can step into.</p>
        <p>My process usually starts with curiosity. I get attached to a strange idea or technical challenge, then work through moodboards, messy sketches, prototypes, and a lot of trial and error until it feels right. I’m especially interested in systems, mechanics, tools, and interactive spaces that make people want to explore.</p>
        <p>CatOS is my way of making a portfolio feel more like an experience than a page.</p>
      </section>
    `,
    after: () => {}
  },
  guestbook: {
    title: '/guestbook',
    width: 640,
    html: () => `
      <h2 class="section-title">/guestbook — leave a .msg</h2>
      <p class="lede">messages left here aren’t just for you or I. These can be read by the next visitors who come by and take a look around… so please let’s be polite… <br><br>shared mode: messages are saved online so future visitors can see them too.</p>
      <form class="guest-form" id="guestForm">
        <label>name <input name="name" maxlength="32" placeholder="anonymous_user" required /></label>
        <label>message <textarea name="message" maxlength="280" placeholder="write something if you’d like…
be nice…" required></textarea></label>
        <button class="primary-btn" type="submit">send .msg</button>
      </form>
      <div class="message-list" id="messageList"></div>
    `,
    after: setupGuestbook
  },
  reach: {
    title: '/reach_me',
    width: 620,
    html: () => `
      <h2 class="section-title">/reach_me — contact</h2>
      <div class="contact-card">
        <p class="lede">want to talk about games, web dev, art, shaders, or something that does not fit neatly in a subject line?</p>
        <div class="contact-links">
          <a href="mailto:gu.b.moraes11@gmail.com">gu.b.moraes11@gmail.com</a>
          <a href="https://github.com/GuMoraes11" target="_blank" rel="noreferrer">github / GuMoraes11</a>
        </div>
      </div>
    `,
    after: () => {}
  }
};

const memoryFragments = [
  { id: 'fragment-01', title: 'fragment_01.log', x: 36, y: 38, text: 'i dont mind being alone', sub: 'that’s not the same as being lonely, though.', letter: '', sx: '18%', sy: '28%' },
  { id: 'fragment-02', title: 'fragment_02.log', x: 330, y: 38, text: 'individuality is risky nowadays', sub: 'hopefully it pays off…', letter: '', sx: '42%', sy: '18%' },
  { id: 'fragment-03', title: 'fragment_03.log', x: 36, y: 278, text: 'the internet is better', sub: 'when it feels handmade.', letter: '', sx: '60%', sy: '62%' },
  { id: 'fragment-04', title: 'fragment_04.log', x: 330, y: 278, text: 'if you put the fragments together', sub: 'you might see something more…', letter: '', sx: '82%', sy: '76%' }
];

const popupContent = {

  looseFiles: {
    title: 'unorganized_files.folder',
    width: 520,
    html: () => `<h3>Unorganized files</h3><p class="lede">A small junk drawer for files that never got their own place. Some are useful. Some are not.</p><div class="file-folder-grid"><button class="folder-file-card" data-open-popup="memory" type="button"><span>memory_fragments.log</span><small>pieces of something bigger</small></button><button class="folder-file-card" data-open-popup="stickers" type="button"><span>sticker_sheet.png</span><small>storage for my stickers</small></button><button class="folder-file-card" data-open-popup="sketchbook" type="button"><span>doodles.folder</span><small>these didn’t make it to the sketchbook</small></button><button class="folder-file-card" data-open-popup="secret" type="button"><span>do_not_open.exe</span><small>seriously… don’t!</small></button></div>`,
    after: setupFolderFileLinks
  },  memory: {
    title: 'memory_fragments.log',
    width: 520,
    html: () => `<h3>memory fragments</h3><p>These .log files are separate windows. They’re not much on their own but they each play a part of the story, in their own ways…</p><div class="fragment-actions"><button type="button" id="openFragments">open fragments</button></div>`,
    after: setupMemoryHub
  },
  stickers: {
    title: 'sticker_sheet.png',
    width: 500,
    html: () => `<h3>you found the stickers!</h3><img src="assets/stickers/calico-peace.svg" alt="happy sticker placeholder" />`
  },
  secret: {
    title: 'do_not_open.exe',
    width: 440,
    html: () => `<h3>you opened it.</h3><p>this file wasn’t meant to be shared so casually…</p><button class="secret-command" type="button" id="secretCommand">run catnip_protocol</button><p class="settings-note" id="secretHint">status: locked</p>`,
    after: setupSecretCommand
  },
  secretNote: {
    title: 'secret.log',
    width: 420,
    html: () => `<h3>secret found</h3><p>mrrp. you found the hidden file.</p><div class="placeholder-art" style="min-height:180px;"><div><strong>bonfire placeholder</strong>Replace this with a tiny pixel/CRT bonfire illustration.</div></div>`
  },
  aboutTiny: {
    title: 'notes.txt',
    width: 390,
    html: () => `<p>remember to feed the cat. are we out of cat food???</p>`
  },
  sketchbook: {
    title: 'doodles.folder',
    width: 720,
    html: () => `
      <h3>doodles.folder</h3>
      <p class="lede">A small sketchbook of drawings and character art. These live inside unorganized_files.folder now, because that feels more honest. Click any image to open it full size.</p>
      <div class="doodle-grid">
        <button class="doodle-card" data-doodle-image="assets/images/Doodles/Cheeto.png" data-doodle-title="Cheeto.png" type="button"><img src="assets/images/Doodles/Cheeto.png" alt="Cheeto doodle" /><span>Cheeto.png</span></button>
        <button class="doodle-card" data-doodle-image="assets/images/Doodles/Cheri.png" data-doodle-title="Cheri.png" type="button"><img src="assets/images/Doodles/Cheri.png" alt="Cheri doodle" /><span>Cheri.png</span></button>
        <button class="doodle-card" data-doodle-image="assets/images/Doodles/Guitar.png" data-doodle-title="Guitar.png" type="button"><img src="assets/images/Doodles/Guitar.png" alt="Guitar doodle" /><span>Guitar.png</span></button>
        <button class="doodle-card" data-doodle-image="assets/images/Doodles/Lineart.png" data-doodle-title="Lineart.png" type="button"><img src="assets/images/Doodles/Lineart.png" alt="Lineart doodle" /><span>Lineart.png</span></button>
        <button class="doodle-card" data-doodle-image="assets/images/Doodles/OnThePhone.png" data-doodle-title="OnThePhone.png" type="button"><img src="assets/images/Doodles/OnThePhone.png" alt="On The Phone doodle" /><span>OnThePhone.png</span></button>
        <button class="doodle-card" data-doodle-image="assets/images/Doodles/Pride_&_Joy.png" data-doodle-title="Pride_&_Joy.png" type="button"><img src="assets/images/Doodles/Pride_&_Joy.png" alt="Pride and Joy doodle" /><span>Pride_&_Joy.png</span></button>
      </div>
    `,
    after: setupSketchbook
  },
  commands: {
    title: 'commands.txt',
    width: 620,
    html: () => `<h3>commands</h3><p class="lede">Press <strong>/</strong> to open the command palette, then type one of these.</p><ul class="command-list"><li><code>open /home</code> — open home</li><li><code>open /works</code> — open projects</li><li><code>open /self</code> — open character sheet</li><li><code>open /guestbook</code> — open shared guestbook</li><li><code>open /reach_me</code> — open contact</li><li><code>open settings</code> — open settings.app</li><li><code>open commands</code> or <code>help</code> — open this file</li><li><code>open graveyard</code> — open process graveyard</li><li><code>pet cat</code> — make the sticker talk</li><li><code>boot</code> or <code>reboot</code> — return to boot screen</li><li><code>reset desktop</code> — reset homescreen icon positions</li><li><code>reset site</code> — reset theme, icons, guestbook, scores, and settings</li><li><code>safe mode</code> — switch to quiet professional mode</li><li><code>catos</code> — switch back to CatOS</li></ul><p class="command-warning">not every command is documented. cats keep secrets.</p>`
  },
  graveyard: {
    title: 'graveyard.folder',
    width: 540,
    html: () => `<h3>process graveyard</h3><p class="lede">not every idea becomes a finished project. some prototypes just teach you something and haunt the hard drive.</p><div class="process-list"><div class="process-item"><strong>old_demo placeholder 1 name</strong><p>old_demo placeholder 1 description</p></div><div class="process-item"><strong>old_demo placeholder 2 name</strong><p>old_demo placeholder 2 description</p></div><div class="process-item"><strong>old_demo placeholder 3 name</strong><p>old_demo placeholder 3 description</p></div></div>`
  },
  aboutSite: {
    title: 'why_this_exists.txt',
    width: 560,
    html: () => `<h3>about this site</h3><div class="about-site-copy"><p>i got tired of websites that look like they are trying to copy apple or whatever, I miss it when the internet had character and people had personal sites.</p><p>this is still a portfolio. i just realized that it didn’t have to be cookie cutter and allowed myself to give it some personality.</p><blockquote>Ive mentioned it in other parts of this place but I hope this risk pays off…</blockquote><p>the goal is to make browsing my work feel like opening a personal operating system: slightly messy, slightly alive, and worth poking around in.</p></div>`
  },
  settings: {
    title: 'settings.app',
    width: 510,
    html: () => `
      <h3>settings</h3>
      <div class="settings-grid">
        <div class="settings-card setting-row">
          <label for="themeSelect">appearance</label>
          <select id="themeSelect">
            <option value="dark">dark mode / night terminal</option>
            <option value="light">light mode / paper terminal</option>
          </select>
        </div>
        <div class="settings-card setting-toggle"><label for="glitchToggle">glitch moments</label><input id="glitchToggle" type="checkbox" /></div>
        <div class="settings-card setting-toggle"><label for="accentToggle">slow orange ↔ blue accent shift</label><input id="accentToggle" type="checkbox" /></div>
        <div class="settings-card setting-toggle"><label for="stickerToggle">show sticker</label><input id="stickerToggle" type="checkbox" /></div>
        <div class="settings-card setting-toggle"><label for="scanlineToggle">CRT scanlines</label><input id="scanlineToggle" type="checkbox" /></div>
        <div class="settings-card setting-row">
          <label>future controls</label>
          <p class="settings-note">reserved space for: cursor style, sound effects later, reduced motion, guestbook moderation, and shared game high scores.</p>
        </div>
      </div>
    `,
    after: setupSettings
  },
  snakeGame: {
    title: 'snake.game',
    width: 460,
    html: () => `
      <h3>snake</h3>
      <div class="snake-wrap game-card">
        <div class="snake-head"><span>score: <strong id="snakeScore">0</strong></span><span>local high: <strong id="snakeHigh">0</strong></span></div>
        <canvas id="snakeCanvas" width="320" height="320" tabindex="0" aria-label="snake game canvas"></canvas>
        <div class="game-controls"><button id="snakeStart" type="button">start</button><button id="snakeReset" type="button">reset</button></div>

        <form class="score-submit" id="snakeScoreForm">
          <label>name <input id="snakePlayerName" maxlength="32" placeholder="anonymous_user" /></label>
          <button class="primary-btn" type="submit">submit score</button>
        </form>

        <h4>shared leaderboard</h4>
        <div id="snakeLeaderboard"><p class="settings-note">loading scores...</p></div>

        <p class="settings-note">click the game, then use arrow keys. shared leaderboard saves online.</p>
      </div>
    `,
    after: setupSnake
  },
  pongGame: {
    title: 'pong.game',
    width: 500,
    html: () => `
      <h3>tiny pong</h3>
      <div class="pong-wrap game-card">
        <div class="pong-head"><span>you: <strong id="pongPlayer">0</strong></span><span>catOS: <strong id="pongCPU">0</strong></span><span>local high rally: <strong id="pongHigh">0</strong></span></div>
        <canvas id="pongCanvas" width="360" height="270" tabindex="0" aria-label="pong game canvas"></canvas>
        <div class="game-controls"><button id="pongStart" type="button">start</button><button id="pongReset" type="button">reset</button></div>

        <form class="score-submit" id="pongScoreForm">
          <label>name <input id="pongPlayerName" maxlength="32" placeholder="anonymous_user" /></label>
          <button class="primary-btn" type="submit">submit high rally</button>
        </form>

        <h4>shared leaderboard</h4>
        <div id="pongLeaderboard"><p class="settings-note">loading scores...</p></div>

        <p class="settings-note">click the game, then move with arrow keys. shared leaderboard saves online.</p>
      </div>
    `,
    after: setupPong
  }
};

function setStatus(text) { statusText.textContent = text; }
function randomNote() { systemNote.textContent = notes[Math.floor(Math.random() * notes.length)]; }
function escapeHTML(str) { return String(str).replace(/[&<>'"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#039;', '"': '&quot;' }[c])); }
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function stageRect() { return mainStage.getBoundingClientRect(); }

function setMode(mode = 'normal') {
  currentMode = mode === 'safe' ? 'safe' : 'normal';
  document.body.dataset.siteMode = currentMode;
  if (currentMode === 'safe') {
    document.body.dataset.stickers = 'off';
    document.body.dataset.scanlines = 'off';
    stopAccentCycle();
    stopGlitches();
    setStatus('safe mode // professional shell loaded');
  } else {
    document.body.dataset.stickers = localStorage.getItem('osPortStickers') || 'on';
    document.body.dataset.scanlines = localStorage.getItem('osPortScanlines') || 'on';
    if (localStorage.getItem('osPortAccentCycle') === 'on') startAccentCycle();
    if (localStorage.getItem('osPortGlitches') !== 'off') startGlitches();
    setStatus('CatOS loaded');
  }
}
function closeAllWindows() { [...windowLayer.querySelectorAll('.app-window')].forEach(win => win.remove()); }
function clearSafePage() { mainStage.querySelector('#safePage')?.remove(); }
function renderSafePage() {
  clearSafePage();
  const page = document.createElement('section');
  page.id = 'safePage';
  page.className = 'safe-page';
  page.innerHTML = `
    <div class="safe-page-inner">
      <h1>Safe Mode / CatOS</h1>
      <p><strong>Hey! I make, games, shaders, websites, and interactive systems.</strong></p>
      <div class="badge-line"><span>Unity</span><span>Shaders</span><span>HTML/CSS/JS</span><span>Graphic Design</span><span>Game development</span><span>GUI</span></div>
      <p>This is safe mode: the more formal portfolio shell. Same important info, less chaos. The full CatOS version has files, popups, stickers, tiny games, ‘memory fragments’, and a few more fun features I’ll let you explore if you’re interested.</p>
      <p id="works">Projects will go here: shader toolkit, CatOS Portfolio Site, game demo scene, and other stuff...</p>
      <hr />
      <p id="about">I care about things that unique, and expressive, and personal — individuality is important too me.</p>
      <p id="contact">Find me: <a href="mailto:gu.b.moraes11@gmail.com">gu.b.moraes11@gmail.com</a> · <a href="https://github.com/GuMoraes11" target="_blank" rel="noreferrer">GitHub</a> · <a href="https://www.linkedin.com/in/gubmoraes11/" target="_blank" rel="noreferrer">LinkedIn</a> </p>
      <div class="safe-actions"><button type="button" data-safe-action="catos">boot CatOS</button></div>
    </div>`;
  mainStage.appendChild(page);
  page.querySelector('[data-safe-action="catos"]').addEventListener('click', () => chooseBoot('normal'));
}
function showBootScreen() {
  closeAllWindows();
  clearSafePage();
  bootTyping.textContent = 'choose boot mode...';
  bootScreen.classList.remove('hidden');
  setStatus('returned to boot screen');
}
function resetDesktopPositions() {
  localStorage.removeItem('osPortIconPositions');
  setupDesktopIcons(true);
  setStatus('desktop icons reset');
}
function resetSite() {
  Object.keys(localStorage).forEach(key => { if (key.startsWith('osPort')) localStorage.removeItem(key); });
  closeAllWindows();
  clearSafePage();
  document.body.dataset.theme = 'dark';
  document.body.dataset.siteMode = 'normal';
  document.body.dataset.stickers = 'on';
  document.body.dataset.scanlines = 'on';
  stopAccentCycle();
  stopGlitches();
  setupDesktopIcons(true);
  setStatus('site reset to defaults');
}
function chooseBoot(mode) {
  const selected = mode === 'safe' ? 'safe' : 'normal';
  setMode(selected);
  closeAllWindows();
  clearSafePage();
  bootScreen.classList.add('hidden');
  if (selected === 'safe') renderSafePage();
  else openRoute('home');
}

function createWindow({ id, title, html, width = 520, height = null, centered = false, kind = 'popup', after = null }) {
  const existing = id ? document.querySelector(`.app-window[data-window-id="${CSS.escape(id)}"]`) : null;
  if (existing) {
    existing.classList.remove('is-minimized');
    existing.style.zIndex = ++zIndex;
    addressPath.textContent = title.replace(/^\//, '');
    setStatus(`focused ${title}`);
    return existing;
  }

  const node = windowTemplate.content.firstElementChild.cloneNode(true);
  node.dataset.windowId = id || `${kind}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  node.dataset.kind = kind;

  if (id === 'route-home') node.classList.add('home-window');
  if (id === 'route-self') node.classList.add('self-window');
  if (id === 'sketchbook') node.classList.add('sketchbook-window');

  node.querySelector('.window-title').textContent = title;
  node.querySelector('.window-body').innerHTML = html;

  const rect = stageRect();
  const offset = (windowLayer.children.length % 6) * 28;
  const margin = 18;

  let safeWidth = width;
  let safeHeight = height;

  // Only scale the initial spawn size if the requested window is too large.
  // This keeps the window visible on boot without stopping you from resizing it larger later.
  if (height) {
    const scale = Math.min(
      1,
      (rect.width - margin * 2) / width,
      (rect.height - margin * 2) / height
    );

    safeWidth = Math.max(320, Math.floor(width * scale));
    safeHeight = Math.max(260, Math.floor(height * scale));
  } else {
    safeWidth = Math.min(width, Math.max(320, rect.width - margin * 2));
    safeHeight = null;
  }

  let left;
  let top;

  if (centered) {
    left = Math.round((rect.width - safeWidth) / 2);
    top = Math.round((rect.height - (safeHeight || 420)) / 2);
  } else {
    left = 48 + offset;
    top = 40 + offset;
  }

  left = clamp(left, margin, Math.max(margin, rect.width - safeWidth - margin));
  top = clamp(top, margin, Math.max(margin, rect.height - (safeHeight || 220) - margin));

  node.style.width = `${safeWidth}px`;
  node.style.left = `${left}px`;
  node.style.top = `${top}px`;

  const availableHeight = Math.max(260, rect.height - top - margin);

  if (safeHeight) {
    node.style.height = `${Math.min(safeHeight, availableHeight)}px`;
  } else {
    node.style.height = 'auto';
  }

  node.style.maxHeight = `${availableHeight}px`;
  
  node.style.zIndex = ++zIndex;

  wireWindowControls(node, title);
  makeDraggable(node, windowLayer);
  makeResizable(node, windowLayer);
  windowLayer.appendChild(node);
  node.addEventListener('pointerdown', () => focusWindow(node, title));

  if (after) after(node);
  addressPath.textContent = title.replace(/^\//, '').replace(/\.app|\.txt|\.folder|\.game/g, '');
  setStatus(`opened ${title}`);
  randomNote();
  updateNavActive();
  return node;
}

function focusWindow(node, title = '') {
  node.style.zIndex = ++zIndex;
  const label = title || node.querySelector('.window-title')?.textContent || 'window';
  addressPath.textContent = label.replace(/^\//, '').replace(/\.app|\.txt|\.folder|\.game/g, '');
  updateNavActive();
}

function wireWindowControls(node, title) {
  const min = node.querySelector('.min-btn');
  const max = node.querySelector('.max-btn');
  const close = node.querySelector('.close-btn');

  min.addEventListener('click', event => {
    event.preventDefault(); event.stopPropagation();
    node.classList.toggle('is-minimized');
    node.classList.remove('is-maximized');
    node.style.zIndex = ++zIndex;
    setStatus(node.classList.contains('is-minimized') ? `minimized ${title}` : `restored ${title}`);
  });

  max.addEventListener('click', event => {
    event.preventDefault(); event.stopPropagation();
    toggleMaximize(node, title);
  });

  close.addEventListener('click', event => {
    event.preventDefault(); event.stopPropagation();
    if (node.dataset.windowId === 'snakeGame' && snake) snake.stop();
    if (node.dataset.windowId === 'pongGame' && pong) pong.stop();
    node.remove();
    setStatus(`closed ${title}`);
    updateNavActive();
  });
}

function toggleMaximize(node, title) {
  if (!node.classList.contains('is-maximized')) {
    node.dataset.restoreLeft = node.style.left;
    node.dataset.restoreTop = node.style.top;
    node.dataset.restoreWidth = node.style.width;
    node.dataset.restoreHeight = node.style.height;
    node.classList.remove('is-minimized');
    node.classList.add('is-maximized');
    node.style.zIndex = ++zIndex;
    setStatus(`maximized ${title}`);
  } else {
    node.classList.remove('is-maximized');
    node.style.left = node.dataset.restoreLeft || '1rem';
    node.style.top = node.dataset.restoreTop || '1rem';
    node.style.width = node.dataset.restoreWidth || '';
    node.style.height = node.dataset.restoreHeight || '';
    node.style.zIndex = ++zIndex;
    setStatus(`restored ${title}`);
  }
}

function makeDraggable(win, boundsEl) {
  const handle = win.querySelector('.drag-handle');
  let startX = 0, startY = 0, initialX = 0, initialY = 0, dragging = false;
  handle.addEventListener('pointerdown', event => {
    if (event.target.closest('button')) return;
    if (win.classList.contains('is-maximized')) return;
    dragging = true;
    win.style.zIndex = ++zIndex;
    startX = event.clientX;
    startY = event.clientY;
    initialX = win.offsetLeft;
    initialY = win.offsetTop;
    handle.setPointerCapture(event.pointerId);
  });
  handle.addEventListener('pointermove', event => {
    if (!dragging) return;
    const bounds = boundsEl.getBoundingClientRect();
    const maxX = Math.max(4, bounds.width - win.offsetWidth - 4);
    const maxY = Math.max(4, bounds.height - win.offsetHeight - 4);
    win.style.left = `${clamp(initialX + event.clientX - startX, 4, maxX)}px`;
    win.style.top = `${clamp(initialY + event.clientY - startY, 4, maxY)}px`;
  });
  handle.addEventListener('pointerup', () => dragging = false);
  handle.addEventListener('pointercancel', () => dragging = false);
}


function makeResizable(win, boundsEl) {
  const handles = win.querySelectorAll('.resize-handle');
  if (!handles.length) return;

  let resizing = false;
  let direction = '';
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;
  let startWidth = 0;
  let startHeight = 0;
  const minWidth = 280;
  const minHeight = 150;

  handles.forEach(handle => {
    handle.addEventListener('pointerdown', event => {
      event.preventDefault();
      event.stopPropagation();
      if (win.classList.contains('is-maximized') || win.classList.contains('is-minimized')) return;

      resizing = true;
      direction = handle.dataset.resize || 'se';
      startX = event.clientX;
      startY = event.clientY;
      startLeft = win.offsetLeft;
      startTop = win.offsetTop;
      startWidth = win.offsetWidth;
      startHeight = win.offsetHeight;
      win.style.zIndex = ++zIndex;
      handle.setPointerCapture(event.pointerId);
    });

    handle.addEventListener('pointermove', event => {
      if (!resizing) return;

      const bounds = boundsEl.getBoundingClientRect();
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;

      let newLeft = startLeft;
      let newTop = startTop;
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes('e')) newWidth = startWidth + dx;
      if (direction.includes('s')) newHeight = startHeight + dy;
      if (direction.includes('w')) {
        newWidth = startWidth - dx;
        newLeft = startLeft + dx;
      }
      if (direction.includes('n')) {
        newHeight = startHeight - dy;
        newTop = startTop + dy;
      }

      if (newWidth < minWidth) {
        if (direction.includes('w')) newLeft -= minWidth - newWidth;
        newWidth = minWidth;
      }
      if (newHeight < minHeight) {
        if (direction.includes('n')) newTop -= minHeight - newHeight;
        newHeight = minHeight;
      }

      if (newLeft < 4) {
        newWidth += newLeft - 4;
        newLeft = 4;
      }
      if (newTop < 4) {
        newHeight += newTop - 4;
        newTop = 4;
      }
      // if (newLeft + newWidth > bounds.width - 4) newWidth = bounds.width - newLeft - 4;
      // if (newTop + newHeight > bounds.height - 4) newHeight = bounds.height - newTop - 4;

      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
      win.style.width = `${Math.max(minWidth, newWidth)}px`;
      win.style.height = `${Math.max(minHeight, newHeight)}px`;
    });

    const stop = () => { resizing = false; };
    handle.addEventListener('pointerup', stop);
    handle.addEventListener('pointercancel', stop);
  });
}

function openRoute(route) {
  const data = routes[route];
  if (!data) return;
  createWindow({
    id: `route-${route}`,
    title: data.title,
    html: data.html(),
    width: data.width,
    height: data.height,
    centered: data.centered,
    kind: 'route',
    after: data.after
  });
}

function openPopup(key) {
  const data = popupContent[key];
  if (!data) return;
  createWindow({ id: key, title: data.title, html: data.html(), width: data.width, kind: 'popup', after: data.after });
}


function setupFolderFileLinks(node) {
  node.querySelectorAll('[data-open-popup]').forEach(button => {
    button.addEventListener('click', () => openPopup(button.dataset.openPopup));
  });
}

function setupSketchbook(node) {
  node.querySelectorAll('[data-doodle-image]').forEach(button => {
    button.addEventListener('click', () => {
      const src = button.dataset.doodleImage;
      const title = button.dataset.doodleTitle || 'doodle.png';
      createWindow({
        id: `doodle-${title}`,
        title,
        width: 820,
        height: 680,
        kind: 'popup',
        html: `
          <div class="doodle-viewer">
            <img src="${src}" alt="${escapeHTML(title)} full image" />
          </div>
        `
      });
    });
  });
}

function setupProjectCards(node) {
  node.querySelectorAll('[data-project]').forEach(card => {
    card.addEventListener('click', () => {
      const project = projects.find(item => item.id === card.dataset.project);
      createWindow({
        id: `project-${project.id}`,
        title: `${project.title}.project`,
        width: project.windowWidth || 560,
        kind: 'popup',
        html: project.detail
      });
    });
  });
}

const guestbookFallback = [
  { name: 'system', message: 'Feel free to leave a message.', created_at: null },
  { name: 'anonymous_user', message: 'you’re welcome to stay as long as you’d like.', created_at: null }
];

function formatMessageTime(value) {
  if (!value) return 'prototype';
  try { return new Date(value).toLocaleString(); }
  catch { return 'unknown time'; }
}

async function fetchGuestbookMessages() {
  if (!catosDb) return guestbookFallback;

  const { data, error } = await catosDb
    .from('guestbook_messages')
    .select('name, message, created_at')
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) {
    console.error('Guestbook fetch failed:', error);
    setStatus('guestbook offline // using fallback messages');
    return guestbookFallback;
  }

  return data?.length ? data : guestbookFallback;
}

async function addGuestbookMessage(name, message) {
  if (!catosDb) throw new Error('Supabase client is not available.');

  const cleanName = String(name || 'anonymous_user').trim().slice(0, 32);
  const cleanMessage = String(message || '').trim().slice(0, 280);

  if (!cleanMessage) throw new Error('Message cannot be empty.');

  const { error } = await catosDb
    .from('guestbook_messages')
    .insert({ name: cleanName || 'anonymous_user', message: cleanMessage });

  if (error) throw error;
}

function setupGuestbook(node) {
  const form = node.querySelector('#guestForm');
  const list = node.querySelector('#messageList');

  const renderMessages = async () => {
    list.innerHTML = '<article class="guest-card"><p>loading shared messages...</p></article>';
    const messages = await fetchGuestbookMessages();
    list.innerHTML = messages.map(msg => `
      <article class="guest-card">
        <div class="meta-line">${escapeHTML(msg.name)} // ${escapeHTML(formatMessageTime(msg.created_at))}</div>
        <p>${escapeHTML(msg.message)}</p>
      </article>
    `).join('');
  };

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const formData = new FormData(form);
    const name = String(formData.get('name')).trim() || 'anonymous_user';
    const message = String(formData.get('message')).trim();

    try {
      await addGuestbookMessage(name, message);
      form.reset();
      await renderMessages();
      setStatus('shared guestbook message saved');
      createWindow({ id: `message-${Date.now()}`, title: 'message_saved.msg', width: 420, html: '<p>message saved to the shared guestbook.</p>' });
    } catch (error) {
      console.error('Guestbook save failed:', error);
      setStatus('guestbook save failed');
      createWindow({ id: `message-error-${Date.now()}`, title: 'message_error.msg', width: 460, html: '<p>message could not be saved. check Supabase settings, table policies, or internet connection.</p>' });
    }
  });

  renderMessages();
}


function setupSettings(node) {
  const select = node.querySelector('#themeSelect');
  const glitchToggle = node.querySelector('#glitchToggle');
  const accentToggle = node.querySelector('#accentToggle');
  const stickerToggle = node.querySelector('#stickerToggle');
  const scanlineToggle = node.querySelector('#scanlineToggle');
  const savedTheme = localStorage.getItem('osPortTheme') || 'dark';
  select.value = savedTheme;
  glitchToggle.checked = localStorage.getItem('osPortGlitches') !== 'off';
  accentToggle.checked = localStorage.getItem('osPortAccentCycle') === 'on';
  stickerToggle.checked = localStorage.getItem('osPortStickers') !== 'off';
  scanlineToggle.checked = localStorage.getItem('osPortScanlines') !== 'off';

  select.addEventListener('change', () => {
    document.body.dataset.theme = select.value;
    localStorage.setItem('osPortTheme', select.value);
    setStatus(`appearance set to ${select.value}`);
  });
  glitchToggle.addEventListener('change', () => {
    localStorage.setItem('osPortGlitches', glitchToggle.checked ? 'on' : 'off');
    glitchToggle.checked ? startGlitches() : stopGlitches();
    setStatus(glitchToggle.checked ? 'cat-glitches enabled' : 'cat-glitches disabled');
  });
  accentToggle.addEventListener('change', () => {
    localStorage.setItem('osPortAccentCycle', accentToggle.checked ? 'on' : 'off');
    accentToggle.checked ? startAccentCycle() : stopAccentCycle();
    setStatus(accentToggle.checked ? 'accent cycle enabled' : 'accent cycle disabled');
  });
  stickerToggle.addEventListener('change', () => {
    localStorage.setItem('osPortStickers', stickerToggle.checked ? 'on' : 'off');
    document.body.dataset.stickers = stickerToggle.checked ? 'on' : 'off';
    setStatus(stickerToggle.checked ? 'stickers visible' : 'stickers hidden');
  });
  scanlineToggle.addEventListener('change', () => {
    localStorage.setItem('osPortScanlines', scanlineToggle.checked ? 'on' : 'off');
    document.body.dataset.scanlines = scanlineToggle.checked ? 'on' : 'off';
    setStatus(scanlineToggle.checked ? 'scanlines visible' : 'scanlines hidden');
  });
}

function setupMemoryHub(node) {
  node.querySelector('#openFragments')?.addEventListener('click', () => {
    memoryFragments.forEach(openMemoryFragment);
    setStatus('opened memory fragment set');
  });
  node.querySelector('#arrangeFragments')?.addEventListener('click', arrangeMemoryFragments);
}

function openMemoryFragment(fragment) {
  const win = createWindow({
    id: fragment.id,
    title: fragment.title,
    width: 280,
    kind: 'popup',
    html: `<h3>${fragment.title}</h3><p>${fragment.text}</p><p class="settings-note">${fragment.sub}</p>`
  });
  win.classList.add('fragment-window');
  win.style.setProperty('--sx', fragment.sx);
  win.style.setProperty('--sy', fragment.sy);
  win.style.setProperty('--fragment-pos', fragment.id.endsWith('01') ? 'right center' : fragment.id.endsWith('02') ? 'left center' : fragment.id.endsWith('03') ? 'right top' : 'left top');
  return win;
}

function arrangeMemoryFragments() {
  memoryFragments.forEach(fragment => {
    const win = openMemoryFragment(fragment);
    win.classList.remove('is-minimized', 'is-maximized');
    win.style.left = `${fragment.x}px`;
    win.style.top = `${fragment.y}px`;
    win.style.width = '280px';
    win.style.height = '210px';
    win.style.zIndex = ++zIndex;
  });
  setStatus('fragments arranged // hidden picture mode');
}

function setupSecretCommand(node) {
  const command = node.querySelector('#secretCommand');
  const hint = node.querySelector('#secretHint');
  command?.addEventListener('click', () => {
    secretClickCount += 1;
    hint.textContent = secretClickCount < 3 ? `status: ${3 - secretClickCount} more meows required` : 'status: unlocked';
    spawnMeowText(command, secretClickCount >= 3 ? 'unlocked :3' : 'mrrp');
    if (secretClickCount >= 3) revealSecretIcon();
  });
}

function revealSecretIcon() {
  const icon = desktopFiles.querySelector('[data-icon-id="secretNote"]');
  if (!icon) return;
  icon.hidden = false;
  const saved = JSON.parse(localStorage.getItem('osPortIconPositions') || '{}');
  if (!saved.secretNote) {
    icon.style.left = '264px';
    icon.style.top = '328px';
  }
  localStorage.setItem('osPortSecretUnlocked', 'true');
  setStatus('secret file appeared on the homescreen');
}

function spawnMeowText(target, forcedText = null) {
  const words = ['meow', 'mrrp', 'nyah', 'maww', ':3', 'prrr', 'mew'];
  const text = document.createElement('span');
  text.className = 'meow-text';
  text.textContent = forcedText || words[Math.floor(Math.random() * words.length)];
  const stage = mainStage.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const x = rect.left - stage.left + rect.width * (0.28 + Math.random() * 0.45) + (Math.random() * 56 - 28);
  const y = rect.top - stage.top + rect.height * (0.15 + Math.random() * 0.25) + (Math.random() * 26 - 13);
  text.style.left = `${clamp(x, 4, stage.width - 80)}px`;
  text.style.top = `${clamp(y, 4, stage.height - 32)}px`;
  mainStage.appendChild(text);
  text.addEventListener('animationend', () => text.remove());
}

function setupStickerInteractions() {
  document.querySelectorAll('.sticker').forEach(sticker => {
    sticker.addEventListener('click', event => {
      event.preventDefault();
      spawnMeowText(sticker);
    });
  });
}

function corruptTextOnce() {
  const candidates = [...document.querySelectorAll('.window-title, .nav-item span, .address-bar, .brand-title')].filter(el => el.offsetParent !== null);
  const target = candidates[Math.floor(Math.random() * candidates.length)];
  if (!target || target.dataset.originalText) return;
  const original = target.textContent;
  target.dataset.originalText = original;
  const catGarbles = ['meow meow mrrp', 'mrow??///', 'nyaaaaa :3', 'mmrrp_keyboard_cat', 'pawpawpawpaw'];
  target.textContent = catGarbles[Math.floor(Math.random() * catGarbles.length)];
  document.body.classList.add('glitching');
  setTimeout(() => {
    target.textContent = original;
    delete target.dataset.originalText;
    document.body.classList.remove('glitching');
  }, 220 + Math.random() * 260);
}

function startGlitches() {
  stopGlitches();
  const schedule = () => {
    const delay = 30000 + Math.random() * 60000;
    glitchTimer = setTimeout(() => {
      if (localStorage.getItem('osPortGlitches') !== 'off') corruptTextOnce();
      schedule();
    }, delay);
  };
  schedule();
}
function stopGlitches() { if (glitchTimer) clearTimeout(glitchTimer); glitchTimer = null; document.body.classList.remove('glitching'); }

function hexToRgb(hex) {
  const value = hex.replace('#', '');
  return { r: parseInt(value.slice(0,2), 16), g: parseInt(value.slice(2,4), 16), b: parseInt(value.slice(4,6), 16) };
}
function rgbToHex({ r, g, b }) {
  const to = n => Math.round(n).toString(16).padStart(2, '0');
  return `#${to(r)}${to(g)}${to(b)}`;
}
function lerpColor(a, b, t) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  return rgbToHex({ r: ca.r + (cb.r - ca.r) * t, g: ca.g + (cb.g - ca.g) * t, b: ca.b + (cb.b - ca.b) * t });
}
function startAccentCycle() {
  stopAccentCycle(false);
  const orange = '#d98738';
  const blue = '#597d86';
  const tick = () => {
    const t = (Math.sin(Date.now() / 9000) + 1) / 2;
    const color = lerpColor(orange, blue, t);
    document.documentElement.style.setProperty('--orange', color);
    document.documentElement.style.setProperty('--glow', `color-mix(in srgb, ${color} 28%, transparent)`);
  };
  tick();
  accentTimer = setInterval(tick, 120);
}
function stopAccentCycle(reset = true) {
  if (accentTimer) clearInterval(accentTimer);
  accentTimer = null;
  if (reset) {
    document.documentElement.style.removeProperty('--orange');
    document.documentElement.style.removeProperty('--glow');
  }
}



async function fetchGameScores(game, limit = 5) {
  if (!catosDb) return [];

  const { data, error } = await catosDb
    .from('game_scores')
    .select('player_name, game, score, created_at')
    .eq('game', game)
    .order('score', { ascending: false })
    .order('created_at', { ascending: true })
    .limit(limit);

  if (error) {
    console.error(`${game} score fetch failed:`, error);
    return [];
  }

  return data || [];
}

async function submitGameScore(game, playerName, score) {
  if (!catosDb) throw new Error('Supabase client is not available.');

  const cleanName = String(playerName || 'anonymous_user').trim().slice(0, 32);
  const cleanScore = Math.max(0, Math.min(999999, Number(score) || 0));

  const { error } = await catosDb
    .from('game_scores')
    .insert({ player_name: cleanName || 'anonymous_user', game, score: cleanScore });

  if (error) throw error;
}

function renderLeaderboard(target, scores) {
  if (!target) return;

  if (!scores.length) {
    target.innerHTML = '<p class="settings-note">no shared scores yet.</p>';
    return;
  }

  target.innerHTML = `
    <ol class="score-list">
      ${scores.map(score => `
        <li>
          <span>${escapeHTML(score.player_name)}</span>
          <strong>${escapeHTML(score.score)}</strong>
        </li>
      `).join('')}
    </ol>
  `;
}

async function refreshLeaderboard(game, target) {
  const scores = await fetchGameScores(game, 5);
  renderLeaderboard(target, scores);
}


function setupSnake(node) {
  const canvas = node.querySelector('#snakeCanvas');
  const ctx = canvas.getContext('2d');
  const scoreEl = node.querySelector('#snakeScore');
  const highEl = node.querySelector('#snakeHigh');
  const startBtn = node.querySelector('#snakeStart');
  const resetBtn = node.querySelector('#snakeReset');
  const scoreForm = node.querySelector('#snakeScoreForm');
  const nameInput = node.querySelector('#snakePlayerName');
  const leaderboard = node.querySelector('#snakeLeaderboard');
  const cell = 16;
  const cells = canvas.width / cell;
  let timer = null;
  let score = 0;
  let dir = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let body = [];
  let food = { x: 10, y: 10 };
  let high = Number(localStorage.getItem('osPortSnakeHigh') || 0);

  const reset = () => {
    score = 0;
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    body = [{ x: 5, y: 8 }, { x: 4, y: 8 }, { x: 3, y: 8 }];
    placeFood();
    draw();
    updateScore();
  };
  const updateScore = () => { scoreEl.textContent = score; highEl.textContent = high; };
  const placeFood = () => {
    do {
      food = { x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) };
    } while (body.some(p => p.x === food.x && p.y === food.y));
  };
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--panel').trim();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--soft-line').trim();
    for (let i = 0; i <= canvas.width; i += cell) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--orange').trim();
    ctx.fillRect(food.x * cell + 2, food.y * cell + 2, cell - 4, cell - 4);
    ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--ink').trim();
    body.forEach((p, index) => {
      ctx.globalAlpha = index === 0 ? 1 : 0.78;
      ctx.fillRect(p.x * cell + 2, p.y * cell + 2, cell - 4, cell - 4);
    });
    ctx.globalAlpha = 1;
  };
  const step = () => {
    if (nextDir.x !== -dir.x || nextDir.y !== -dir.y) dir = nextDir;
    const head = { x: body[0].x + dir.x, y: body[0].y + dir.y };
    const hitWall = head.x < 0 || head.y < 0 || head.x >= cells || head.y >= cells;
    const hitSelf = body.some(p => p.x === head.x && p.y === head.y);
    if (hitWall || hitSelf) {
      stop();
      setStatus(`snake.game over // score ${score}`);
      return;
    }
    body.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      score += 10;
      if (score > high) {
        high = score;
        localStorage.setItem('osPortSnakeHigh', String(high));
      }
      placeFood();
    } else {
      body.pop();
    }
    updateScore();
    draw();
  };
  const start = () => {
    if (timer) return;
    canvas.focus();
    timer = setInterval(step, 125);
    setStatus('snake.game running');
  };
  const stop = () => {
    clearInterval(timer);
    timer = null;
  };
  const keyHandler = event => {
    const key = event.key.toLowerCase();
    const map = {
      arrowup: { x: 0, y: -1 },
      arrowdown: { x: 0, y: 1 },
      arrowleft: { x: -1, y: 0 },
      arrowright: { x: 1, y: 0 }
    };
    if (map[key]) {
      event.preventDefault();
      nextDir = map[key];
    }
  };
  canvas.addEventListener('keydown', keyHandler);
  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', () => { stop(); reset(); canvas.focus(); });
  node.addEventListener('remove', stop);
  scoreForm.addEventListener('submit', async event => {
    event.preventDefault();
    try {
      await submitGameScore('snake', nameInput.value || 'anonymous_user', score);
      await refreshLeaderboard('snake', leaderboard);
      setStatus('snake score submitted');
    } catch (error) {
      console.error('Snake score submit failed:', error);
      setStatus('snake score submit failed');
    }
  });
  refreshLeaderboard('snake', leaderboard);
  snake = { stop };
  reset();
}

function setupPong(node) {
  const canvas = node.querySelector('#pongCanvas');
  const ctx = canvas.getContext('2d');
  const playerEl = node.querySelector('#pongPlayer');
  const cpuEl = node.querySelector('#pongCPU');
  const highEl = node.querySelector('#pongHigh');
  const startBtn = node.querySelector('#pongStart');
  const resetBtn = node.querySelector('#pongReset');
  const scoreForm = node.querySelector('#pongScoreForm');
  const nameInput = node.querySelector('#pongPlayerName');
  const leaderboard = node.querySelector('#pongLeaderboard');
  let timer = null;
  let keys = new Set();
  let player = 0, cpu = 0, rally = 0;
  let high = Number(localStorage.getItem('osPortPongHigh') || 0);
  const state = {
    paddleW: 8,
    paddleH: 58,
    playerY: 106,
    cpuY: 106,
    ballX: 180,
    ballY: 135,
    vx: 3.2,
    vy: 2.1
  };
  function updateLabels() { playerEl.textContent = player; cpuEl.textContent = cpu; highEl.textContent = high; }
  function resetBall(direction = 1) {
    state.ballX = canvas.width / 2;
    state.ballY = canvas.height / 2;
    state.vx = 3.2 * direction;
    state.vy = (Math.random() > 0.5 ? 1 : -1) * (1.7 + Math.random() * 1.5);
    rally = 0;
  }
  function draw() {
    const styles = getComputedStyle(document.body);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = styles.getPropertyValue('--panel').trim();
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.strokeStyle = styles.getPropertyValue('--soft-line').trim();
    ctx.setLineDash([4, 8]);
    ctx.beginPath(); ctx.moveTo(canvas.width/2, 0); ctx.lineTo(canvas.width/2, canvas.height); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = styles.getPropertyValue('--ink').trim();
    ctx.fillRect(18, state.playerY, state.paddleW, state.paddleH);
    ctx.fillRect(canvas.width - 26, state.cpuY, state.paddleW, state.paddleH);
    ctx.fillStyle = styles.getPropertyValue('--orange').trim();
    ctx.fillRect(state.ballX - 4, state.ballY - 4, 8, 8);
  }
  function step() {
    const up = keys.has('arrowup');
    const down = keys.has('arrowdown');
    if (up) state.playerY -= 5;
    if (down) state.playerY += 5;
    state.playerY = clamp(state.playerY, 4, canvas.height - state.paddleH - 4);
    const cpuTarget = state.ballY - state.paddleH / 2;
    state.cpuY += clamp(cpuTarget - state.cpuY, -3.2, 3.2);
    state.cpuY = clamp(state.cpuY, 4, canvas.height - state.paddleH - 4);
    state.ballX += state.vx;
    state.ballY += state.vy;
    if (state.ballY <= 4 || state.ballY >= canvas.height - 4) state.vy *= -1;
    const hitPlayer = state.ballX <= 30 && state.ballX >= 16 && state.ballY >= state.playerY && state.ballY <= state.playerY + state.paddleH;
    const hitCpu = state.ballX >= canvas.width - 30 && state.ballX <= canvas.width - 16 && state.ballY >= state.cpuY && state.ballY <= state.cpuY + state.paddleH;
    if (hitPlayer || hitCpu) {
      state.vx *= -1.06;
      state.vy += (Math.random() - 0.5) * 0.8;
      rally += 1;
      if (rally > high) { high = rally; localStorage.setItem('osPortPongHigh', String(high)); }
    }
    if (state.ballX < -10) { cpu += 1; resetBall(1); }
    if (state.ballX > canvas.width + 10) { player += 1; resetBall(-1); }
    updateLabels();
    draw();
  }
  function start() { if (timer) return; canvas.focus(); timer = setInterval(step, 16); setStatus('pong.game running'); }
  function stop() { clearInterval(timer); timer = null; }
  canvas.addEventListener('keydown', e => { const key = e.key.toLowerCase(); if (['arrowup','arrowdown'].includes(key)) { e.preventDefault(); keys.add(key); } });
  canvas.addEventListener('keyup', e => keys.delete(e.key.toLowerCase()));
  startBtn.addEventListener('click', start);
  resetBtn.addEventListener('click', () => { player = 0; cpu = 0; resetBall(Math.random() > 0.5 ? 1 : -1); updateLabels(); draw(); canvas.focus(); });
  scoreForm.addEventListener('submit', async event => {
    event.preventDefault();
    try {
      await submitGameScore('pong', nameInput.value || 'anonymous_user', high);
      await refreshLeaderboard('pong', leaderboard);
      setStatus('pong rally submitted');
    } catch (error) {
      console.error('Pong score submit failed:', error);
      setStatus('pong score submit failed');
    }
  });
  refreshLeaderboard('pong', leaderboard);
  pong = { stop };
  updateLabels();
  draw();
}



function openCommandPalette(prefill = '') {
  commandPalette.classList.remove('hidden');
  commandPalette.setAttribute('aria-hidden', 'false');
  commandInput.value = prefill;
  setTimeout(() => commandInput.focus(), 20);
}
function closeCommandPalette() {
  commandPalette.classList.add('hidden');
  commandPalette.setAttribute('aria-hidden', 'true');
}
function runCommand(raw) {
  const cmd = String(raw || '').trim().toLowerCase();
  if (!cmd) return closeCommandPalette();
  const normalized = cmd.replace(/^open\s+/, '');
  const routeMap = { '/home':'home', 'home':'home', '/works':'works', 'works':'works', '/self':'self', 'self':'self', '/guestbook':'guestbook', 'guestbook':'guestbook', '/reach_me':'reach', 'reach':'reach', 'contact':'reach' };
  const popupMap = { 'settings':'settings', 'open settings':'settings', 'commands':'commands', 'open commands':'commands', 'help':'commands', 'graveyard':'graveyard', 'open graveyard':'graveyard', 'about site':'aboutSite', 'why this exists':'aboutSite', 'loose files':'looseFiles', 'open loose files':'looseFiles', 'snake':'snakeGame', 'open snake':'snakeGame', 'pong':'pongGame', 'open pong':'pongGame' };
  if (routeMap[normalized]) { openRoute(routeMap[normalized]); closeCommandPalette(); return; }
  if (popupMap[cmd] || popupMap[normalized]) { openPopup(popupMap[cmd] || popupMap[normalized]); closeCommandPalette(); return; }
  if (cmd === 'pet cat' || cmd === 'pet the cat') { document.querySelector('.sticker') && spawnMeowText(document.querySelector('.sticker'), 'prrr'); closeCommandPalette(); return; }
  if (cmd === 'open secret' || cmd === 'unlock secret') { revealSecretIcon(); closeCommandPalette(); return; }
  if (cmd === 'boot' || cmd === 'reboot' || cmd === 'return boot') { showBootScreen(); closeCommandPalette(); return; }
  if (cmd === 'reset desktop' || cmd === 'reset icons') { resetDesktopPositions(); closeCommandPalette(); return; }
  if (cmd === 'reset site' || cmd === 'factory reset') { resetSite(); closeCommandPalette(); return; }
  if (cmd === 'safe mode') { chooseBoot('safe'); closeCommandPalette(); return; }
  if (cmd === 'normal mode' || cmd === 'catos' || cmd === 'cat os') { chooseBoot('normal'); closeCommandPalette(); return; }
  setStatus(`unknown command: ${cmd}`);
  commandInput.select();
}
function setupCommandPalette() {
  commandPalette.addEventListener('click', event => { if (event.target === commandPalette) closeCommandPalette(); });
  commandForm.addEventListener('submit', event => { event.preventDefault(); runCommand(commandInput.value); });
}
function closeTopWindow() {
  const windows = [...windowLayer.querySelectorAll('.app-window')];
  if (!windows.length) return setStatus('no open windows to close');
  const top = windows.sort((a, b) => (Number(b.style.zIndex) || 0) - (Number(a.style.zIndex) || 0))[0];
  const title = top.querySelector('.window-title')?.textContent || 'window';
  if (top.dataset.windowId === 'snakeGame' && snake) snake.stop();
  if (top.dataset.windowId === 'pongGame' && pong) pong.stop();
  top.remove();
  setStatus(`closed ${title}`);
  updateNavActive();
}

function updateNavActive() {
  const openRoutes = new Set([...windowLayer.querySelectorAll('[data-kind="route"]')].map(w => w.dataset.windowId.replace('route-', '')));
  document.querySelectorAll('.nav-item').forEach(btn => btn.classList.toggle('active', openRoutes.has(btn.dataset.openRoute)));
}

function setupDesktopIcons(forceDefaults = false) {
  const grid = { w: 114, h: 98, ox: 36, oy: 34 };
  const rect = mainStage.getBoundingClientRect();
  const maxCol = Math.max(0, Math.floor((rect.width - 100 - grid.ox) / grid.w));
  const maxRow = Math.max(0, Math.floor((rect.height - 84 - grid.oy) / grid.h));
  const pos = (col, row) => ({ x: grid.ox + col * grid.w, y: grid.oy + row * grid.h });
  const snakeCol = Math.max(0, maxCol);
  const pongCol = Math.max(0, snakeCol - 1);

  const defaults = {
    settings: pos(0, 0),
    portfolio: pos(1, 0),
    commands: pos(2, 0),
    abouttiny: pos(0, 1),
    fragments: pos(1, 1),
    aboutsite: pos(2, 1),
    graveyard: pos(0, 2),
    loosefiles: pos(1, 2),
    pong: pos(pongCol, maxRow),
    snake: pos(snakeCol, maxRow),
    secretNote: pos(2, 3)
  };
  const ICON_LAYOUT_VERSION = 'v16-games-bottom-right';
  const needsLayoutMigration = !forceDefaults && localStorage.getItem('osPortIconLayoutVersion') !== ICON_LAYOUT_VERSION;
  if (needsLayoutMigration) localStorage.removeItem('osPortIconPositions');
  if (forceDefaults || needsLayoutMigration) localStorage.setItem('osPortIconLayoutVersion', ICON_LAYOUT_VERSION);
  const saved = forceDefaults ? {} : JSON.parse(localStorage.getItem('osPortIconPositions') || '{}');
  if (!forceDefaults && localStorage.getItem('osPortSecretUnlocked') === 'true') revealSecretIcon();
  const icons = [...desktopFiles.querySelectorAll('.desktop-file')];

  function cellFromPos(pos) { return { col: Math.max(0, Math.round((pos.x - grid.ox) / grid.w)), row: Math.max(0, Math.round((pos.y - grid.oy) / grid.h)) }; }
  function posFromCell(cell) { return { x: grid.ox + cell.col * grid.w, y: grid.oy + cell.row * grid.h }; }
  function keyFromCell(cell) { return `${cell.col},${cell.row}`; }
  function visibleIcons(except = null) { return icons.filter(i => i !== except && !i.hidden); }
  function occupiedCells(except = null) {
    const set = new Set();
    visibleIcons(except).forEach(icon => set.add(keyFromCell(cellFromPos({ x: icon.offsetLeft, y: icon.offsetTop }))));
    return set;
  }
  function findFreeCell(preferred, except = null) {
    const rect = mainStage.getBoundingClientRect();
    const maxCol = Math.max(0, Math.floor((rect.width - 100 - grid.ox) / grid.w));
    const maxRow = Math.max(0, Math.floor((rect.height - 84 - grid.oy) / grid.h));
    const occupied = occupiedCells(except);
    const candidates = [preferred];
    for (let radius = 1; radius < 14; radius++) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          candidates.push({ col: preferred.col + dx, row: preferred.row + dy });
        }
      }
    }
    for (const c of candidates) {
      const cell = { col: clamp(c.col, 0, maxCol), row: clamp(c.row, 0, maxRow) };
      if (!occupied.has(keyFromCell(cell))) return cell;
    }
    return { col: 0, row: 0 };
  }
  function applyPosition(icon, pos) {
    const rect = mainStage.getBoundingClientRect();
    icon.style.left = `${clamp(pos.x, 0, rect.width - 100)}px`;
    icon.style.top = `${clamp(pos.y, 0, rect.height - 84)}px`;
  }
  const initialCells = new Set();
  function findInitialFreeCell(preferred) {
    const rect = mainStage.getBoundingClientRect();
    const maxCol = Math.max(0, Math.floor((rect.width - 100 - grid.ox) / grid.w));
    const maxRow = Math.max(0, Math.floor((rect.height - 84 - grid.oy) / grid.h));
    const candidates = [preferred];
    for (let radius = 1; radius < 14; radius++) {
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
          candidates.push({ col: preferred.col + dx, row: preferred.row + dy });
        }
      }
    }
    for (const c of candidates) {
      const cell = { col: clamp(c.col, 0, maxCol), row: clamp(c.row, 0, maxRow) };
      if (!initialCells.has(keyFromCell(cell))) {
        initialCells.add(keyFromCell(cell));
        return cell;
      }
    }
    return { col: 0, row: 0 };
  }

  icons.forEach(icon => {
    const id = icon.dataset.iconId;
    const preferredPos = saved[id] || defaults[id] || { x: 36, y: 36 };
    const freeCell = findInitialFreeCell(cellFromPos(preferredPos));
    const finalPos = posFromCell(freeCell);
    applyPosition(icon, finalPos);
    if (!forceDefaults && (saved[id]?.x !== finalPos.x || saved[id]?.y !== finalPos.y)) {
      const positions = JSON.parse(localStorage.getItem('osPortIconPositions') || '{}');
      positions[id] = finalPos;
      localStorage.setItem('osPortIconPositions', JSON.stringify(positions));
    }
    if (icon.dataset.boundIcon === 'true') return;
    icon.dataset.boundIcon = 'true';

    let downX = 0, downY = 0, startX = 0, startY = 0, dragging = false, moved = false;
    icon.addEventListener('pointerdown', event => {
      dragging = true; moved = false;
      downX = event.clientX; downY = event.clientY;
      startX = icon.offsetLeft; startY = icon.offsetTop;
      icon.classList.add('is-dragging');
      icon.setPointerCapture(event.pointerId);
    });
    icon.addEventListener('pointermove', event => {
      if (!dragging) return;
      const dx = event.clientX - downX;
      const dy = event.clientY - downY;
      if (Math.abs(dx) + Math.abs(dy) > 5) moved = true;
      const rect = mainStage.getBoundingClientRect();
      icon.style.left = `${clamp(startX + dx, 0, rect.width - icon.offsetWidth)}px`;
      icon.style.top = `${clamp(startY + dy, 0, rect.height - icon.offsetHeight)}px`;
    });
    icon.addEventListener('pointerup', () => {
      if (!dragging) return;
      dragging = false;
      icon.classList.remove('is-dragging');
      const rawCell = cellFromPos({ x: icon.offsetLeft, y: icon.offsetTop });
      const freeCell = findFreeCell(rawCell, icon);
      const snap = posFromCell(freeCell);
      applyPosition(icon, snap);
      const positions = JSON.parse(localStorage.getItem('osPortIconPositions') || '{}');
      positions[id] = snap;
      localStorage.setItem('osPortIconPositions', JSON.stringify(positions));
      if (!moved) {
        const route = icon.dataset.openRoute;
        const popup = icon.dataset.openPopup;
        if (route) openRoute(route);
        if (popup) openPopup(popup);
      } else {
        setStatus(`moved ${icon.textContent.trim()}`);
      }
    });
    icon.addEventListener('pointercancel', () => { dragging = false; icon.classList.remove('is-dragging'); });
  });
}

function wireUI() {
  document.querySelectorAll('[data-open-route]').forEach(btn => {
    if (btn.classList.contains('desktop-file')) return;
    btn.addEventListener('click', () => openRoute(btn.dataset.openRoute));
  });
  document.querySelectorAll('[data-open-popup]').forEach(btn => {
    if (btn.classList.contains('desktop-file')) return;
    btn.addEventListener('click', () => openPopup(btn.dataset.openPopup));
  });
  document.querySelector('#closeTopWindow').addEventListener('click', closeTopWindow);
  document.addEventListener('keydown', event => {
    const target = event.target;
    if (event.key === '/' && !(target.matches('input, textarea, select'))) { event.preventDefault(); return openCommandPalette(); }
    if ((event.key === ':' || event.key === '~') && !(target.matches('input, textarea, select'))) { event.preventDefault(); return openCommandPalette(event.key === ':' ? '' : ''); }
    if (event.key === 'Escape' && !commandPalette.classList.contains('hidden')) { closeCommandPalette(); return; }
    if (target.matches('input, textarea, select') || target.id === 'snakeCanvas' || target.id === 'pongCanvas') return;
    const key = event.key.toLowerCase();
    if (key === 'h') openRoute('home');
    if (key === 'w' || key === 'p') openRoute('works');
    if (key === 's' || key === 'a') openRoute('self');
    if (key === 'g') openRoute('guestbook');
    if (key === 'c') openRoute('reach');
    if (key === 'o') openPopup('settings');
    if (event.key === 'Escape') closeTopWindow();
  });
  setupDesktopIcons();
  setupStickerInteractions();
  setupCommandPalette();
}

function applySavedSettings() {
  document.body.dataset.siteMode = 'normal';
  const theme = localStorage.getItem('osPortTheme') || 'dark';
  document.body.dataset.theme = theme;
  document.body.dataset.stickers = localStorage.getItem('osPortStickers') || 'on';
  document.body.dataset.scanlines = localStorage.getItem('osPortScanlines') || 'on';
  if (localStorage.getItem('osPortAccentCycle') === 'on') startAccentCycle();
  if (localStorage.getItem('osPortGlitches') !== 'off') startGlitches();
}

function boot() {
  const lines = [
    'initializing display...',
    'loading stickers...',
    'mounting /home /works /self /guestbook /reach_me...',
    'restoring memories...',
    'warming up command palette...',
    'meow >w<...',
    'ready...'
  ];
  let line = 0, char = 0;
  const tick = () => {
    if (line >= lines.length) return;
    bootTyping.textContent = lines.slice(0, line).join('\n') + (line ? '\n' : '') + lines[line].slice(0, char) + '█';
    char++;
    if (char > lines[line].length) { line++; char = 0; setTimeout(tick, 200); }
    else setTimeout(tick, 22);
  };
  tick();
  bootModes.forEach(btn => btn.addEventListener('click', () => chooseBoot(btn.dataset.bootMode)));
  document.addEventListener('keydown', event => {
    if (bootScreen.classList.contains('hidden')) return;
    if (event.key === 'Enter') chooseBoot('normal');
    if (event.key.toLowerCase() === 's') chooseBoot('safe');
  });
}

applySavedSettings();
wireUI();
boot();