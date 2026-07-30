const BloodRequest = require('../models/BloodRequest');

// @desc    Create emergency blood request
// @route   POST /api/requests
// @access  Private
const createRequest = async (req, res) => {
  try {
    const {
      patientName,
      age,
      bloodGroup,
      unitsNeeded,
      hospital,
      state,
      district,
      city,
      contactPhone,
      requiredDate,
      additionalNotes,
    } = req.body;

    const request = await BloodRequest.create({
      requester: req.user._id,
      patientName,
      age,
      bloodGroup,
      unitsNeeded,
      hospital,
      state,
      district,
      city,
      contactPhone,
      requiredDate,
      additionalNotes,
    });

    res.status(201).json({ success: true, request });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all blood requests (with filter)
// @route   GET /api/requests
// @access  Public
const getRequests = async (req, res) => {
  try {
    const { bloodGroup, state, district, city, status } = req.query;

    const query = {};

    if (bloodGroup) query.bloodGroup = bloodGroup;
    if (state) query.state = new RegExp(state, 'i');
    if (district) query.district = new RegExp(district, 'i');
    if (city) query.city = new RegExp(city, 'i');
    
    // Default to show Pending requests, but allow filtering other statuses
    query.status = status || 'Pending';

    const requests = await BloodRequest.find(query)
      .populate('requester', 'name email profilePic')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: requests.length, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get requests made by logged in user
// @route   GET /api/requests/myrequests
// @access  Private
const getMyRequests = async (req, res) => {
  try {
    const requests = await BloodRequest.find({ requester: req.user._id }).sort({ createdAt: -1 });
    res.json({ success: true, requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update blood request status
// @route   PUT /api/requests/:id
// @access  Private
const updateRequestStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const request = await BloodRequest.findById(req.params.id);

    if (!request) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Only allow requester or admin to update
    if (request.requester.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to update this request' });
    }

    request.status = status || request.status;
    const updatedRequest = await request.save();

    res.json({ success: true, request: updatedRequest });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createRequest,
  getRequests,
  getMyRequests,
  updateRequestStatus,
};
