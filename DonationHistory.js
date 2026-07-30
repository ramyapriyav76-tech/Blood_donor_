const mongoose = require('mongoose');

const donationHistorySchema = new mongoose.Schema({
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Donor',
    required: true,
  },
  units: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
  donationDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  patientName: {
    type: String,
    default: 'Voluntary Donation',
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Verified'],
    default: 'Verified',
  },
}, {
  timestamps: true,
});

const DonationHistory = mongoose.model('DonationHistory', donationHistorySchema);
module.exports = DonationHistory;
