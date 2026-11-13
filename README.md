# Wemark xSchool

Wemark xSchool-un proqramlarını, komandasını və tez-tez verilən sualları canlı API məlumatları ilə təqdim edən responsive veb-sayt.

## Texnologiyalar

Next.js 16, React 19, TypeScript və Tailwind CSS 4.

## Lokal quraşdırma

```bash
npm ci
cp .env.example .env.local
npm run dev
```

Sayt `http://localhost:3000` ünvanında açılır.

## Environment

`XSCHOOL_API_URL` — xSchool API endpoint-i. Lokal mühitdə `.env.local` faylında, Vercel-də isə layihənin Environment Variables bölməsində təyin olunmalıdır. Nümunə dəyər `.env.example` faylındadır.

## Production build

```bash
npm run build
```

**Hazırladı: Firudin Maniyev**
