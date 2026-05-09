# GYM Core — Backend API

Express.js REST API server for the Gym Core Management System.

## Stack
- **Runtime**: Node.js
- **Framework**: Express.js + nodemon
- **Database**: MySQL (XAMPP)
- **ORM**: Prisma v5
- **Auth**: JWT + bcrypt

## Setup

```bash
npm install
```

Create `.env`:
```env
PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/gym_db"
JWT_SECRET="your_secret_key"
```

Push schema to DB:
```bash
npx prisma db push
npx prisma generate
```

Start dev server:
```bash
npm run dev
```

## API Base URL
`http://localhost:5000`

## Key Routes
- `POST /api/auth/login` — Login
- `POST /api/auth/register` — Register
- `GET /api/admin/dashboard` — Live KPIs
- `GET /api/admin/users` — User management
- `GET /api/admin/packages` — Package management
- `GET /api/admin/settings` — System settings
- `GET /api/admin/reports/generate` — Download report
