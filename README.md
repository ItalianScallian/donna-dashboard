# Donna Dashboard

Personal command center for Romeo Scagliarini — built with Next.js 16, TypeScript, Tailwind CSS.

## Pages

| Route | Description |
|---|---|
| `/` | **Command Center** — portfolio, goals, accountability, cron health, people, system |
| `/vision` | **Vision Board** — masonry-style cards with category filtering |
| `/point-scorer` | **Credit Card Rewards Optimizer** — upload CSV, analyze rewards, get recommendations |

## Data Files

The dashboard reads live data from `/public/`:
- `public/data.json` — updated by external cron jobs (portfolio, goals, cron health, etc.)
- `public/vision.json` — vision board items

These are fetched client-side at runtime (every 60s for the dashboard), so cron jobs can update them in-place without restarting the app.

## Running

### Development
```bash
npm run dev
# Open http://localhost:3000
```

### Production (systemd)
The app runs as a systemd service:

```bash
sudo systemctl status donna-dashboard
sudo systemctl restart donna-dashboard
sudo systemctl stop donna-dashboard
```

Logs:
```bash
journalctl -u donna-dashboard -f
```

### Manual production
```bash
npm run build
npm start   # serves on port 3000
```

## Stack

- **Next.js 16** (App Router, server components where possible)
- **TypeScript** exclusively
- **Tailwind CSS** for utility classes
- **Recharts** for point-scorer charts
- **lucide-react** for icons
- **papaparse** for CSV parsing

## GitHub

https://github.com/ItalianScallian-bot/donna-dashboard
