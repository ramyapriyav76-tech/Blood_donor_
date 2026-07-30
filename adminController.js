const User = require('../models/User');
const Donor = require('../models/Donor');
const BloodRequest = require('../models/BloodRequest');
const DonationHistory = require('../models/DonationHistory');

// @desc    Get Admin Dashboard Stats
// @route   GET /api/admin/stats
// @access  Private/Admin
const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await Donor.countDocuments();
    const totalRequests = await BloodRequest.countDocuments();
    const pendingRequests = await BloodRequest.countDocuments({ status: 'Pending' });
    const totalDonations = await DonationHistory.countDocuments({ status: 'Verified' });

    // Donors by Blood Group
    const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
    const donorsByBloodGroup = [];
    for (const bg of bloodGroups) {
      const count = await Donor.countDocuments({ bloodGroup: bg });
      donorsByBloodGroup.push({ name: bg, value: count });
    }

    // Requests by Blood Group
    const requestsByBloodGroup = [];
    for (const bg of bloodGroups) {
      const count = await BloodRequest.countDocuments({ bloodGroup: bg });
      requestsByBloodGroup.push({ name: bg, count });
    }

    // Request Status ratios
    const requestStatusRatios = [
      { name: 'Pending', value: await BloodRequest.countDocuments({ status: 'Pending' }) },
      { name: 'Fulfilled', value: await BloodRequest.countDocuments({ status: 'Fulfilled' }) },
      { name: 'Cancelled', value: await BloodRequest.countDocuments({ status: 'Cancelled' }) },
    ];

    // Donation Trend (last 6 months)
    const donationTrend = [];
    const today = new Date();
    for (let i = 5; i >= 0; i--) {
      const startOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() - i + 1, 0, 23, 59, 59);

      const donationsCount = await DonationHistory.countDocuments({
        donationDate: { $gte: startOfMonth, $lte: endOfMonth },
        status: 'Verified',
      });
      const requestsCount = await BloodRequest.countDocuments({
        createdAt: { $gte: startOfMonth, $lte: endOfMonth },
      });

      const monthName = startOfMonth.toLocaleString('default', { month: 'short' });
      donationTrend.push({
        month: monthName,
        donations: donationsCount,
        requests: requestsCount,
      });
    }

    res.json({
      success: true,
      stats: {
        totalUsers,
        totalDonors,
        totalRequests,
        pendingRequests,
        totalDonations,
        donorsByBloodGroup,
        requestsByBloodGroup,
        requestStatusRatios,
        donationTrend,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all users list
// @route   GET /api/admin/users
// @access  Private/Admin
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all donors list
// @route   GET /api/admin/donors
// @access  Private/Admin
const getAllDonors = async (req, res) => {
  try {
    const donors = await Donor.find({})
      .populate('user', 'name email profilePic role')
      .sort({ createdAt: -1 });
    res.json({ success: true, donors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all requests list
// @route   GET /api/admin/requests
// @access  Private/Admin
const getAllRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({})
      .populate('requester', 'name email')
      .sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user role
// @route   PUT /api/admin/users/:id/role
// @access  Private/Admin
const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    user.role = role || user.role;
    await user.save();

    res.json({ success: true, message: `User role updated to ${user.role}`, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user completely (Cascade delete requests and donor profiles)
// @route   DELETE /api/admin/users/:id
// @access  Private/Admin
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Cascade deletes
    const donor = await Donor.findOne({ user: user._id });
    if (donor) {
      await DonationHistory.deleteMany({ donor: donor._id });
      await Donor.findByIdAndDelete(donor._id);
    }
    await BloodRequest.deleteMany({ requester: user._id });
    await User.findByIdAndDelete(user._id);

    res.json({ success: true, message: 'User and all associated data deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getDashboardStats,
  getAllUsers,
  getAllDonors,
  getAllRequests,
  updateUserRole,
  deleteUser,
};
