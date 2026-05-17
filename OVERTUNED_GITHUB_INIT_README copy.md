# Overtuned

Overtuned is a browser-based Suara 2 / Suara 3 harmony practice generator.

Upload a clear lead-vocal recording, choose the song key and scale, then generate guide-tone examples for Suara 2 and Suara 3 directly in the browser. Version 1 focuses on practice playback, not realistic AI vocal synthesis.

## Features

- Browser-only audio upload and decoding
- Melody pitch tracking for clear lead vocals
- Configurable key and scale
- Suara 2 and Suara 3 harmony presets
- Separate playback for original, Suara 2, Suara 3, and practice mix
- Compact melody confidence timeline

## Local Run

```bash
python3 app.py
```

Then open:

```text
http://127.0.0.1:8000/harmony
```

## Deploy

This project is ready for Vercel. Import the GitHub repo into Vercel with:

- Framework preset: Other
- Build command: empty
- Output directory: empty
- Root directory: repository root

After deployment, open:

```text
https://your-vercel-domain.vercel.app/harmony
```
