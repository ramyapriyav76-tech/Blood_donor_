const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Donor = require('../models/Donor');
const BloodRequest = require('../models/BloodRequest');
const DonationHistory = require('../models/DonationHistory');

dotenv.config();

const statesData = {
  Maharashtra: {
    districts: {
      Mumbai: ['Colaba', 'Bandra', 'Andheri', 'Borivali'],
      Pune: ['Kothrud', 'Hinjawadi', 'Shivajinagar', 'Hadapsar'],
    },
  },
  Karnataka: {
    districts: {
      Bangalore: ['Koramangala', 'Indiranagar', 'Jayanagar', 'Whitefield'],
      Mysore: ['Gokulam', 'Vidyaranyapuram', 'Hebbal'],
    },
  },
  Delhi: {
    districts: {
      'New Delhi': ['Connaught Place', 'Chanakyapuri', 'Dwarka', 'Saket'],
    },
  },
};

const donorsData = [
  { name: 'Amit Sharma', email: 'amit@gmail.com', bg: 'O+', state: 'Maharashtra', dist: 'Mumbai', city: 'Andheri', phone: '9876543210', address: '102 Green Heights, Andheri West' },
  { name: 'Priya Patel', email: 'priya@gmail.com', bg: 'A+', state: 'Maharashtra', dist: 'Mumbai', city: 'Bandra', phone: '9876543211', address: '404 Sea View, Bandra West' },
  { name: 'Rahul Deshmukh', email: 'rahul@gmail.com', bg: 'B+', state: 'Maharashtra', dist: 'Pune', city: 'Kothrud', phone: '9876543212', address: 'Plot 12, Rambaug Colony' },
  { name: 'Sneha Kulkarni', email: 'sneha@gmail.com', bg: 'AB+', state: 'Maharashtra', dist: 'Pune', city: 'Hinjawadi', phone: '9876543213', address: 'Tech Park View Apartments' },
  { name: 'Vikram Gowda', email: 'vikram@gmail.com', bg: 'O-', state: 'Karnataka', dist: 'Bangalore', city: 'Koramangala', phone: '9876543214', address: '80 Feet Road, 4th Block' },
  { name: 'Ananya Rao', email: 'ananya@gmail.com', bg: 'A-', state: 'Karnataka', dist: 'Bangalore', city: 'Indiranagar', phone: '9876543215', address: '12th Main, Stage 2' },
  { name: 'Karthik Nair', email: 'karthik@gmail.com', bg: 'B-', state: 'Karnataka', dist: 'Bangalore', city: 'Whitefield', phone: '9876543216', address: 'ECC Road, near ITPL' },
  { name: 'Meera Hegde', email: 'meera@gmail.com', bg: 'AB-', state: 'Karnataka', dist: 'Mysore', city: 'Gokulam', phone: '9876543217', address: '3rd Stage, Gokulam' },
  { name: 'Rohan Verma', email: 'rohan@gmail.com', bg: 'O+', state: 'Delhi', dist: 'New Delhi', city: 'Saket', phone: '9876543218', address: 'J-Block, Saket' },
  { name: 'Divya Gupta', email: 'divya@gmail.com', bg: 'A+', state: 'Delhi', dist: 'New Delhi', city: 'Dwarka', phone: '9876543219', address: 'Sector 6, Pocket 2' },
  { name: 'Abhishek Kumar', email: 'abhishek@gmail.com', bg: 'B+', state: 'Delhi', dist: 'New Delhi', city: 'Connaught Place', phone: '9876543220', address: 'Radial Road 4' },
  { name: 'Pooja Singh', email: 'pooja@gmail.com', bg: 'O+', state: 'Maharashtra', dist: 'Pune', city: 'Shivajinagar', phone: '9876543221', address: 'Model Colony' },
  { name: 'Sanjay Dutt', email: 'sanjay@gmail.com', bg: 'A+', state: 'Maharashtra', dist: 'Mumbai', city: 'Colaba', phone: '9876543222', address: 'Gateway View' },
  { name: 'Deepa Balan', email: 'deepa@gmail.com', bg: 'O-', state: 'Karnataka', dist: 'Bangalore', city: 'Jayanagar', phone: '9876543223', address: '5th Block, Jayanagar' },
  { name: 'Vijay Iyer', email: 'vijay@gmail.com', bg: 'B+', state: 'Karnataka', dist: 'Bangalore', city: 'Koramangala', phone: '9876543224', address: '1st Block, Koramangala' },
];

const requestsData = [
  { patientName: 'Rajesh Sharma', age: 45, bg: 'A+', units: 2, hospital: 'Lilavati Hospital', state: 'Maharashtra', dist: 'Mumbai', city: 'Bandra', phone: '9000000001', note: 'Scheduled bypass surgery. Urgent.' },
  { patientName: 'Baby of Sneha', age: 2, bg: 'O-', units: 1, hospital: 'Manipal Hospital', state: 'Karnataka', dist: 'Bangalore', city: 'Whitefield', phone: '9000000002', note: 'Pediatric emergency. Immediate requirement.' },
  { patientName: 'Gopal Krishnan', age: 67, bg: 'B+', units: 3, hospital: 'Apollo Hospital', state: 'Delhi', dist: 'New Delhi', city: 'Saket', phone: '9000000003', note: 'Severe anemia, post-chemotherapy transfusion needed.' },
  { patientName: 'Sunita Patil', age: 34, bg: 'AB+', units: 2, hospital: 'Ruby Hall Clinic', state: 'Maharashtra', dist: 'Pune', city: 'Shivajinagar', phone: '9000000004', note: 'Accident trauma patient. Stable but needs transfusion.' },
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/lifeline');

    console.log('Clearing database...');
    await User.deleteMany();
    await Donor.deleteMany();
    await BloodRequest.deleteMany();
    await DonationHistory.deleteMany();

    console.log('Seeding admin...');
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const adminUser = await User.create({
      name: 'Lifeline Admin',
      email: 'admin@lifeline.com',
      password: 'admin123', // hooks pre-save will hash
      role: 'admin',
    });

    console.log('Seeding donors and users...');
    const userPassword = 'user123';
    const seededDonors = [];

    for (const donorObj of donorsData) {
      const user = await User.create({
        name: donorObj.name,
        email: donorObj.email,
        password: userPassword,
        role: 'donor',
      });

      const lastDonationDate = Math.random() > 0.3 ? new Date(Date.now() - Math.floor(Math.random() * 120 + 30) * 24 * 60 * 60 * 1000) : null;
      let nextEligibleDate = null;
      if (lastDonationDate) {
        nextEligibleDate = new Date(lastDonationDate);
        nextEligibleDate.setDate(nextEligibleDate.getDate() + 90);
      }

      const donor = await Donor.create({
        user: user._id,
        bloodGroup: donorObj.bg,
        phone: donorObj.phone,
        state: donorObj.state,
        district: donorObj.dist,
        city: donorObj.city,
        address: donorObj.address,
        status: 'Available',
        lastDonationDate,
        nextEligibleDate,
      });

      seededDonors.push(donor);

      // Add a couple donation histories
      if (lastDonationDate) {
        await DonationHistory.create({
          donor: donor._id,
          units: 1,
          donationDate: lastDonationDate,
          patientName: 'Voluntary Donation',
          location: `${donorObj.city} Red Cross Clinic`,
          status: 'Verified',
        });

        // Add an older donation
        const olderDate = new Date(lastDonationDate);
        olderDate.setDate(olderDate.getDate() - 110);
        await DonationHistory.create({
          donor: donor._id,
          units: 1,
          donationDate: olderDate,
          patientName: 'Emergency Help',
          location: `${donorObj.city} General Hospital`,
          status: 'Verified',
        });
      }
    }

    console.log('Seeding emergency blood requests...');
    const normalUser = await User.create({
      name: 'Regular Requester',
      email: 'requester@gmail.com',
      password: userPassword,
      role: 'user',
    });

    let index = 0;
    for (const reqObj of requestsData) {
      // Rotate requester between the normal user and some donor accounts
      const requesterId = index % 2 === 0 ? normalUser._id : seededDonors[index % seededDonors.length].user;
      
      const reqDate = new Date();
      reqDate.setDate(reqDate.getDate() + 3);

      const request = await BloodRequest.create({
        requester: requesterId,
        patientName: reqObj.patientName,
        age: reqObj.age,
        bloodGroup: reqObj.bg,
        unitsNeeded: reqObj.units,
        hospital: reqObj.hospital,
        state: reqObj.state,
        district: reqObj.dist,
        city: reqObj.city,
        contactPhone: reqObj.phone,
        requiredDate: reqDate,
        additionalNotes: reqObj.note,
        status: index === 3 ? 'Fulfilled' : 'Pending',
      });
      index++;
    }

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
