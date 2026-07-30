const Donor = require('../models/Donor');
const User = require('../models/User');
const DonationHistory = require('../models/DonationHistory');

// Helper to calculate 90 days after last donation
const calculateNextEligibleDate = (dateString) => {
  if (!dateString) return null;
  const date = new Date(dateString);
  date.setDate(date.getDate() + 90);
  return date;
};

// @desc    Create or update donor profile
// @route   POST /api/donors/profile
// @access  Private
const upsertDonorProfile = async (req, res) => {
  try {
    const {
      bloodGroup,
      phone,
      state,
      district,
      city,
      address,
      status,
      lastDonationDate,
    } = req.body;

    const nextEligibleDate = calculateNextEligibleDate(lastDonationDate);

    let donor = await Donor.findOne({ user: req.user._id });

    if (donor) {
      // Update
      donor.bloodGroup = bloodGroup || donor.bloodGroup;
      donor.phone = phone || donor.phone;
      donor.state = state || donor.state;
      donor.district = district || donor.district;
      donor.city = city || donor.city;
      donor.address = address || donor.address;
      donor.status = status || donor.status;
      if (lastDonationDate !== undefined) {
        donor.lastDonationDate = lastDonationDate ? new Date(lastDonationDate) : null;
        donor.nextEligibleDate = nextEligibleDate;
      }
      donor = await donor.save();
    } else {
      // Create new
      donor = await Donor.create({
        user: req.user._id,
        bloodGroup,
        phone,
        state,
        district,
        city,
        address,
        status: status || 'Available',
        lastDonationDate: lastDonationDate ? new Date(lastDonationDate) : null,
        nextEligibleDate,
      });

      // Update User role to donor
      await User.findByIdAndUpdate(req.user._id, { role: 'donor' });
    }

    // Populate user details for returning
    const populatedDonor = await Donor.findById(donor._id).populate('user', 'name email profilePic role');

    res.status(200).json({ success: true, donor: populatedDonor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get donor profile of logged in user
// @route   GET /api/donors/myprofile
// @access  Private
const getMyDonorProfile = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id }).populate('user', 'name email profilePic role');
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor profile not found for this user' });
    }
    res.json({ success: true, donor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Search donors
// @route   GET /api/donors
// @access  Public
const searchDonors = async (req, res) => {
  try {
    const { bloodGroup, state, district, city } = req.query;

    const query = {};

    // Filters
    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (state) query.state = new RegExp(state, 'i');
    if (district) query.district = new RegExp(district, 'i');
    if (city) query.city = new RegExp(city, 'i');

    // Only search active / available donors
    query.status = 'Available';

    // Check if nextEligibleDate is in the past, or null, meaning they are ready to donate
    const today = new Date();
    query.$or = [
      { nextEligibleDate: { $lte: today } },
      { nextEligibleDate: null }
    ];

    const donors = await Donor.find(query)
      .populate('user', 'name email profilePic role')
      .sort({ updatedAt: -1 });

    res.json({ success: true, count: donors.length, donors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get donor donation history
// @route   GET /api/donors/history
// @access  Private
const getDonationHistory = async (req, res) => {
  try {
    const donor = await Donor.findOne({ user: req.user._id });
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor profile not found' });
    }

    const history = await DonationHistory.find({ donor: donor._id }).sort({ donationDate: -1 });
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Add a donation history log and update donor eligibility
// @route   POST /api/donors/history
// @access  Private
const addDonationRecord = async (req, res) => {
  try {
    const { donationDate, units, patientName, location } = req.body;

    const donor = await Donor.findOne({ user: req.user._id });
    if (!donor) {
      return res.status(404).json({ success: false, message: 'Donor profile not found. Complete donor profile first.' });
    }

    const donation = await DonationHistory.create({
      donor: donor._id,
      donationDate: donationDate || Date.now(),
      units: units || 1,
      patientName: patientName || 'Voluntary Donation',
      location: location || 'Blood Bank',
      status: 'Verified'
    });

    // Update donor eligibility
    donor.lastDonationDate = donation.donationDate;
    donor.nextEligibleDate = calculateNextEligibleDate(donation.donationDate);
    await donor.save();

    res.status(201).json({ success: true, donation, donor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  upsertDonorProfile,
  getMyDonorProfile,
  searchDonors,
  getDonationHistory,
  addDonationRecord,
};
