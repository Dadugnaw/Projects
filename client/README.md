# GYM Core — Frontend

Next.js 14 frontend for the Gym Core Management System.

## Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS (dark mode)
- **Icons**: Lucide React
- **HTTP**: Axios
- **Auth**: React Context + localStorage JWT

## Setup

```bash
npm install
npm run dev
```

Runs on **http://localhost:3000**

## Pages

| Route | Description |
|---|---|
| `/` | Root — auto-redirects based on role |
| `/login` | Login page |
| `/admin` | Admin dashboard |
| `/admin/users` | Users & Roles management |
| `/admin/packages` | Packages & Billing |
| `/admin/settings` | Global Settings |
| `/reception` | Receptionist desk |
| `/trainer` | Trainer portal |
| `/member` | Member app |

## Auth Flow
1. User submits credentials at `/login`
2. JWT returned from backend is stored in `localStorage`
3. `AuthContext` reads token on load and redirects to role-specific dashboard
4. Protected routes check role before rendering — unauthorized users are redirected to `/login`
