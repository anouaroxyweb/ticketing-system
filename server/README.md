# Ticketing System — Server

## Quick Start
1. `cp .env.example .env` and adjust values.
2. Start DB: `docker compose up -d`
3. Install & migrate:
   ```bash
   npm i
   npx prisma migrate dev --name init
   npm run db:seed
   npm run dev
   ```
Seeded users:
- admin@example.com / password123
- support@example.com / password123
