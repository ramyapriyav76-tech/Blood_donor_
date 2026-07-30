const express = require('express');
const {
  getDashboardStats,
  getAllUsers,
  getAllDonors,
  getAllRequests,
  updateUserRole,
  deleteUser,
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

// Apply admin guard to all routes below
router.use(protect);
router.use(admin);

router.get('/stats', getDashboardStats);
router.get('/users', getAllUsers);
router.get('/donors', getAllDonors);
router.get('/requests', getAllRequests);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

module.exports = router;
