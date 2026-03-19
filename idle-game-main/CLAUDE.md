# Money Tapper - Idle Game

## Project Overview

Browser-based idle/clicker game. Pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no build step, no dependencies.

**Deployed via:** GitHub Pages (auto-deploy on push to `main`)

## File Structure

```
idle-game-main/
├── index.html    # Complete UI structure (~16 KB)
├── script.js     # All game logic (~62 KB, ~1584 lines)
├── style.css     # All styling (~28 KB)
└── auto-upload.ps1  # PowerShell script for quick git push
```

## Architecture

Everything lives in three files. There is no bundler, transpiler, or package manager. Do not introduce build tooling or dependencies.

### script.js

- **Game state** is a single object with all runtime data
- `saveGame()` / `loadGame()` — localStorage persistence (save format v2, backward compatible with v1)
- `clickMoney()` — manual click with combo multiplier
- `earnMoney()` — passive income tick (runs on interval)
- `buyUpgrade(id)` / `buyPrestigeUpgrade(id)` — purchase logic with cost scaling
- `checkAchievements()` — scans milestones, awards prestige shards
- `renderUpgrades()` / `renderStats()` / `renderAchievements()` — UI refresh functions
- Events, boosts, combos, offline earnings, daily rewards, and prestige are all self-contained sections in the same file

### index.html

- Static structure only — no inline scripts or styles
- Modals: offline earnings, event popup
- Toast notification container

### style.css

- Dark theme base with mint/gold/cosmic skin variants
- CSS custom properties for theming
- Responsive breakpoints at 1040px, 760px, 480px

## Game Systems

| System | Description |
|---|---|
| Clicking | Base $1/click, scales with upgrades, combo up to 3.0x |
| Passive income | Upgrades add $/sec, runs on interval |
| Prestige | Reset for permanent bonus + shards |
| Prestige shop | 5 permanent upgrades bought with shards |
| Achievements | Milestone badges that award shards |
| Events | Random temporary multipliers (Market Boom, Click Rush, etc.) |
| Boosts | Temporary multipliers activated manually |
| Offline earnings | Calculated on return based on time away |
| Daily reward | Streak-based bonus with claim tracking |
| Skins | Cosmetic themes (unlockable) |

## Development Guidelines

- **Do not add new functions** unless explicitly asked — extend or modify existing ones instead
- **No frameworks or libraries** — keep it vanilla JS/HTML/CSS
- **No build step** — files are served directly; changes are instant
- **Test in browser** — open `index.html` directly or via a local server (e.g. `python -m http.server`)
- **Save data** lives in `localStorage` under key `idleGameSave` — clear it in DevTools to reset
- **Upgrades** are defined as arrays/objects near the top of `script.js` — add new ones there
- When adding UI elements, match the existing glass-morphism dark-theme aesthetic
- Keep all logic in `script.js`, all structure in `index.html`, all visuals in `style.css`

## Deployment

Pushing to `main` triggers `.github/workflows/pages.yml` which deploys to GitHub Pages automatically. The `auto-upload.ps1` script handles quick commits:

```powershell
.\auto-upload.ps1
```

## Common Tasks

**Add a new upgrade:**
1. Add entry to the upgrades array in `script.js`
2. Ensure `renderUpgrades()` picks it up (it iterates the array)
3. No HTML changes needed

**Add a new achievement:**
1. Add entry to the achievements config in `script.js`
2. Add the check condition in `checkAchievements()`

**Add a new skin:**
1. Add CSS class with overridden custom properties in `style.css`
2. Register it in the skins config in `script.js`

**Reset save for testing:**
- Open DevTools → Application → Local Storage → delete `idleGameSave`
