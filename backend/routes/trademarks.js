const express = require('express');
const multer = require('multer');
const path = require('path');
const Trademark = require('../models/Trademark');
const auth = require('../middleware/auth');
const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files are allowed'));
  }
});

// Submit new trademark
router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, category } = req.body;
    const trademark = await Trademark.create({
      name,
      description,
      category,
      imageUrl: `/uploads/${req.file.filename}`,
      owner: req.user.userId
    });
    res.status(201).json(trademark);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get user's trademarks
router.get('/my-trademarks', auth, async (req, res) => {
  try {
    const trademarks = await Trademark.find({ owner: req.user.userId });
    res.json(trademarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all trademarks (admin only)
router.get('/all', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const trademarks = await Trademark.find().populate('owner', 'username email');
    res.json(trademarks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update trademark status (admin only)
router.patch('/:id/status', auth, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const { status, feedback, similarityScore } = req.body;
    const trademark = await Trademark.findByIdAndUpdate(
      req.params.id,
      { status, feedback, similarityScore },
      { new: true }
    );
    res.json(trademark);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
