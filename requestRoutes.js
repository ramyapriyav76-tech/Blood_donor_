const express = require('express');
const {
  createRequest,
  getRequests,
  getMyRequests,
  updateRequestStatus,
} = require('../controllers/requestController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/')
  .get(getRequests)
  .post(protect, createRequest);
router.get('/myrequests', protect, getMyRequests);
router.put('/:id', protect, updateRequestStatus);

module.exports = router;
