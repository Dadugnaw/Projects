const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

// Users
router.get("/users", adminController.getUsers);
router.post("/users", adminController.createUser);
router.put("/users/:id", adminController.updateUserRole);
router.delete("/users/:id", adminController.deleteUser);

// Packages
router.get("/packages", adminController.getPackages);
router.post("/packages", adminController.createPackage);

// Dashboard
router.get("/dashboard", adminController.getDashboardStats);

// Settings
router.get("/settings", adminController.getSettings);
router.put("/settings", adminController.updateSettings);

// Reports
router.get("/reports/generate", adminController.generateReport);

module.exports = router;
