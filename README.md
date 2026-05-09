# 🏋️ GYM Core — Full-Stack Gym Management System

A comprehensive, role-based **Gym Management System** built with **Next.js**, **Node.js/Express**, **Prisma ORM**, and **MySQL**. Designed for modern gym operations with dedicated portals for every staff role.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14 (App Router), Tailwind CSS |
| **Backend** | Node.js, Express.js |
| **Database** | MySQL (via XAMPP) |
| **ORM** | Prisma v5 |
| **Auth** | JWT + bcrypt |
| **Icons** | Lucide React |
| **HTTP Client** | Axios |

---

## 📁 Project Structure

```
GYM/
├── client/                  # Next.js Frontend
│   └── src/
│       ├── app/
│       │   ├── login/       # Login Page
│       │   ├── admin/       # Admin Portal
│       │   │   ├── users/   # Users & Roles Management
│       │   │   ├── packages/# Packages & Billing
│       │   │   └── settings/# Global Settings
│       │   ├── reception/   # Receptionist Portal
│       │   ├── trainer/     # Trainer Portal
│       │   └── member/      # Member App
│       └── context/
│           └── AuthContext.js  # Global Auth State
│
└── server/                  # Express.js Backend
    ├── controllers/
    │   ├── authController.js   # Login / Register
    │   └── adminController.js  # Admin CRUD APIs
    ├── routes/
    │   ├── auth.js
    │   └── admin.js
    ├── prisma/
    │   └── schema.prisma       # Full DB Schema
    └── server.js               # App Entry Point
```

---

## 🧑‍💼 Roles & Portals

| Role | Route | Color Theme | Description |
|---|---|---|---|
| **Admin** | `/admin` | Blue / Purple | Full system control |
| **Receptionist** | `/reception` | Orange / Red | Member check-in & registration |
| **Trainer** | `/trainer` | Purple / Pink | Workout & nutrition plans |
| **Member** | `/member` | Emerald / Teal | Personal fitness app |

---

## 🗃️ Database Schema (Key Models)

- **User** — Login credentials and role assignment
- **Member** — Full member profile (health metrics, contact info)
- **Trainer** — Trainer profile and specialization
- **Package** — Dynamic, customizable membership tiers
- **Membership** — Links members to packages with start/expiry dates
- **Payment** — Payment records per member
- **Attendance** — Daily check-in logs
- **WorkoutPlan** — Trainer-assigned workout programs (JSON)
- **NutritionPlan** — Trainer-assigned meal plans (JSON)
- **Class** — Scheduled group sessions
- **ClassBooking** — Member class enrollment
- **Branch** — Multi-branch support
- **Settings** — Dynamic system configuration

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- [XAMPP](https://www.apachefriends.org/) (MySQL server running)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Dadugnaw/Projects.git
cd Projects
```

### 2. Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file in the `server/` directory:

```env
PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/gym_db"
JWT_SECRET="your_super_secret_key_here"
```

Push the Prisma schema to MySQL:

```bash
npx prisma db push
npx prisma generate
```

Start the backend:

```bash
npm run dev
```

> Backend runs on **http://localhost:5000**

### 3. Setup the Frontend

```bash
cd ../client
npm install
npm run dev
```

> Frontend runs on **http://localhost:3000**

---

## 🔑 Default Test Accounts

> These are pre-seeded accounts for local development.

| Role | Username | Password |
|---|---|---|
| Admin | `DM1` | `123` |
| Receptionist | `DM2` | `123` |
| Trainer | `DM3` | `123` |
| Member | `DM4` | `123` |

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login` | Login and receive JWT |

### Admin
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/admin/dashboard` | Live system KPIs |
| `GET` | `/api/admin/users` | List all users |
| `POST` | `/api/admin/users` | Create a user |
| `PUT` | `/api/admin/users/:id` | Update user role |
| `DELETE` | `/api/admin/users/:id` | Delete a user |
| `GET` | `/api/admin/packages` | List all packages |
| `POST` | `/api/admin/packages` | Create a package |
| `GET` | `/api/admin/settings` | Get system settings |
| `PUT` | `/api/admin/settings` | Update settings |
| `GET` | `/api/admin/reports/generate` | Download system report (JSON) |

---

## ✨ Features

### ✅ Admin Portal
- Live KPI dashboard (Members, Trainers, Revenue, Check-ins)
- Full Users & Roles management with modal UI
- Dynamic Packages & Billing (create custom tiers)
- Global Settings (Gym Name, Currency, Tax Rate)
- One-click system report generation (downloads as JSON)

### 🟡 Receptionist Portal *(foundation ready)*
- Desk overview with live occupancy stats
- Designed for member registration and check-in workflows

### 🟡 Trainer Portal *(foundation ready)*
- Client management overview
- Designed for workout & nutrition plan creation

### 🟡 Member App *(foundation ready)*
- Mobile-first responsive design with bottom nav
- Digital membership ID card with QR placeholder
- Fitness streak and workout tracking UI

---

## 🛣️ Roadmap

- [ ] Receptionist: Member Registration Form & Live Check-in
- [ ] Trainer: Workout & Nutrition Plan Builder
- [ ] Member: View plans, book classes, track progress
- [ ] Recharts / Chart.js revenue charts on Admin Dashboard
- [ ] PDF report generation
- [ ] Multi-branch support

---

## 📄 License

MIT License — feel free to use and adapt.
