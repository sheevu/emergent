# Kirana-Kranti AI (किराना क्रांति)

AI-powered business assistant for Indian MSMEs.

## Features
- **Multi-Agent CRM**: Add leads via chat in Hinglish.
- **Scanner**: OCR for handwritten diaries using Gemini 1.5 Flash.
- **Business Insights**: Visual charts and AI-driven growth tips.
- **Govt Support**: Quick view of MSME schemes and tutorials.

## Tech Stack
- **Frontend**: Next.js 15+, Tailwind CSS 4, Framer Motion.
- **AI**: Google Gemini SDK (@google/generative-ai).
- **Charts**: Recharts.

## Deployment on Cloudflare Pages
1. Push your code to GitHub.
2. Link your repo to Cloudflare Pages.
3. Use Build Command: `npm run build`
4. Build Output Directory: `.next`
5. Add Environment Variable: `NEXT_PUBLIC_GEMINI_API_KEY`.

## Development
```bash
npm install
npm run dev
```
