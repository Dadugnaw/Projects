const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

// ------------------- USERS -------------------
exports.getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, username: true, role: true, createdAt: true },
      orderBy: { createdAt: "desc" }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const existing = await prisma.user.findUnique({ where: { username } });
    if (existing) return res.status(400).json({ error: "Username already exists" });

    const password_hash = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { username, password_hash, role }
    });
    res.status(201).json({ id: user.id, username: user.username, role: user.role });
  } catch (error) {
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.updateUserRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    const user = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, username: true, role: true }
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// ------------------- PACKAGES -------------------
exports.getPackages = async (req, res) => {
  try {
    const packages = await prisma.package.findMany({ orderBy: { createdAt: "asc" } });
    res.json(packages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch packages" });
  }
};

exports.createPackage = async (req, res) => {
  try {
    const { name, duration_days, price } = req.body;
    const pkg = await prisma.package.create({
      data: { name, duration_days: Number(duration_days), price: Number(price) }
    });
    res.status(201).json(pkg);
  } catch (error) {
    res.status(500).json({ error: "Failed to create package" });
  }
};

// ------------------- SETTINGS & DASHBOARD -------------------
exports.getDashboardStats = async (req, res) => {
  try {
    const totalMembers = await prisma.member.count();
    const activeTrainers = await prisma.trainer.count();
    
    // Calculate total revenue from all payments
    const payments = await prisma.payment.findMany();
    const revenue = payments.reduce((sum, p) => sum + p.amount, 0);

    const checkins = await prisma.attendance.count({
      where: { checkin_time: { gte: new Date(new Date().setHours(0,0,0,0)) } }
    });

    res.json({ totalMembers, activeTrainers, revenue, checkinsToday: checkins });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stats" });
  }
};

// ------------------- SETTINGS -------------------
exports.getSettings = async (req, res) => {
  try {
    const settings = await prisma.settings.findMany();
    // Convert to object
    const settingsObj = settings.reduce((acc, curr) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsObj);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch settings" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updates = req.body; // e.g. { gymName: "Gold Gym", taxRate: "10" }
    for (const [key, value] of Object.entries(updates)) {
      await prisma.settings.upsert({
        where: { key },
        update: { value: String(value) },
        create: { key, value: String(value) }
      });
    }
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to update settings" });
  }
};

// ------------------- REPORTS -------------------
exports.generateReport = async (req, res) => {
  try {
    const totalMembers = await prisma.member.count();
    const activeTrainers = await prisma.trainer.count();
    const payments = await prisma.payment.findMany();
    const revenue = payments.reduce((sum, p) => sum + p.amount, 0);
    const users = await prisma.user.findMany({ select: { username: true, role: true, createdAt: true }});
    
    const report = {
      generatedAt: new Date().toISOString(),
      summary: { totalMembers, activeTrainers, totalRevenue: revenue },
      users
    };
    
    res.setHeader('Content-disposition', 'attachment; filename=gym_report.json');
    res.setHeader('Content-type', 'application/json');
    res.send(JSON.stringify(report, null, 2));
  } catch (error) {
    res.status(500).json({ error: "Failed to generate report" });
  }
};
