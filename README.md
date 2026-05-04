## Features

### Window System

All content is rendered inside draggable, resizable windows using a shared template.
Windows support layering, focus management, and controls for close, minimize, and resize.

### Desktop Environment

The desktop mimics a file system with clickable icons such as:

* portfolio_os.app
* settings.app
* commands.txt
* graveyard.folder
* unorganized_files.folder
* snake.game
* pong.game

Icons can be repositioned, and their layout is saved locally.

### Command Palette

Press `/` to open a command interface.

Examples:

* `open /works`
* `open /self`
* `reset desktop`
* `pet cat`

---

## Pages

### /home

Landing page with hero content and navigation prompts.

### /works

Displays projects as interactive cards. Each project can open a detailed window with images, descriptions, and links.

### /self

A character-sheet style personal page with text, stats, and a portrait.

### /guestbook

Users can submit messages that are stored in Supabase and visible to others.

### /reach_me

Contact information and links.

---

## Popups and Apps

Popups simulate files and applications:

* settings.app: toggles themes, effects, and UI features
* commands.txt: lists available commands
* sketchbook.folder: contains artwork and doodles
* memory_fragments.log: opens narrative fragments
* secret.log: hidden file revealed through interaction

All popups are defined and rendered dynamically through JavaScript.

---

## Games

### Snake

Canvas-based grid game with keyboard controls and score tracking.

### Pong

Simple paddle game with CPU opponent and rally tracking.

Both games include shared leaderboards powered by Supabase.

---

## How It Works

## Guestbook and Leaderboards

CatOS uses Supabase to persist shared data:

* Guestbook messages are stored and fetched from a database table
* Game scores are submitted and displayed in leaderboards

Frontend access is handled using a public API key with row-level security rules.

### HTML

Defines the base layout:

* boot screen
* sidebar navigation
* desktop container
* window template
* command palette

### CSS

Handles all styling:

* CRT effects and overlays
* window design and layout
* typography and color themes
* sticker positioning and effects

### JavaScript

Controls all interactivity:

* window creation and behavior
* routing between pages
* popup definitions
* desktop icon logic
* command parsing
* Supabase integration
* game logic

---