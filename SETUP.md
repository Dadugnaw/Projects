# 🖥️ GYM Core — Setup Guide for a New Machine

Follow these steps to get the GYM Core system running on any local machine from scratch.

---

## ✅ Step 1 — Install Prerequisites

Download and install the following:

| Tool | Version | Download |
|---|---|---|
| **Node.js** | v18 or higher | https://nodejs.org |
| **XAMPP** | Latest | https://www.apachefriends.org |
| **Git** | Latest | https://git-scm.com |

---

## ✅ Step 2 — Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Dadugnaw/Projects.git
cd Projects
```

---

## ✅ Step 3 — Setup MySQL Database (XAMPP)

1. Open **XAMPP Control Panel**
2. Click **Start** next to **Apache** and **MySQL**
3. Open your browser and go to: `http://localhost/phpmyadmin`
4. Click **New** in the left sidebar
5. Name the database: **`gym_db`**
6. Click **Create**

---

## ✅ Step 4 — Setup the Backend (Server)

Open a terminal in the project folder:

```bash
cd server
npm install
```

### Create the `.env` file

Inside the `server/` folder, create a new file called `.env` and paste this:

```env
PORT=5000
DATABASE_URL="mysql://root:@localhost:3306/gym_db"
JWT_SECRET="supersecret_gym_key_change_in_production"
```

> ⚠️ This file is NOT in the repo for security. You must create it manually on every machine.

### Push the Database Schema

```bash
npx prisma db push
npx prisma generate
```

### Create Test User Accounts

Run this command to seed the 4 default accounts into the database:

```bash
node -e "const {PrismaClient}=require('@prisma/client');const bcrypt=require('bcrypt');const p=new PrismaClient();async function main(){const h=await bcrypt.hash('123',10);const users=[{username:'DM1',role:'ADMIN'},{username:'DM2',role:'RECEPTIONIST'},{username:'DM3',role:'TRAINER'},{username:'DM4',role:'MEMBER'}];for(const u of users){await p.user.create({data:{username:u.username,password_hash:h,role:u.role}})}console.log('All users created!');}main().catch(console.error).finally(()=>p.$disconnect());"
```

### Start the Backend Server

```bash
npm run dev
```

> Backend runs on **http://localhost:5000**
> You should see: `Server running on port 5000`

---

## ✅ Step 5 — Setup the Frontend (Client)

Open a **second terminal window** and run:

```bash
cd client
npm install
npm run dev
```

> Frontend runs on **http://localhost:3000**

---

## ✅ Step 6 — Open the App

Open your browser and go to: **http://localhost:3000**

Log in with any of the default test accounts:

| Role | Username | Password |
|---|---|---|
| 🔴 Admin | `DM1` | `123` |
| 🟠 Receptionist | `DM2` | `123` |
| 🟣 Trainer | `DM3` | `123` |
| 🟢 Member | `DM4` | `123` |

---

## 🔄 Running After First Setup

Every time you want to run the project again, just:

1. Open XAMPP → Start **MySQL**
2. In one terminal: `cd server && npm run dev`
3. In another terminal: `cd client && npm run dev`
4. Go to **http://localhost:3000**

---

## 🔄 Pulling Latest Changes from GitHub

If the project was updated from another machine:

```bash
git pull
```

Then if the database schema changed:

```bash
cd server
npx prisma db push
npx prisma generate
```

---

## ❗ Common Issues

| Problem | Fix |
|---|---|
| `Cannot connect to database` | Make sure XAMPP MySQL is running |
| `Port 5000 already in use` | Kill the existing process or change `PORT` in `.env` |
| `Prisma generate error` | Stop all Node processes then run `npx prisma generate` again |
| `Module not found` | Run `npm install` inside both `client/` and `server/` |
| `Prisma EPERM error on Windows` | Stop all running Node.js processes and retry |
