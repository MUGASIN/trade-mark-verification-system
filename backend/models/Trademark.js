const mongoose = require('mongoose');

const trademarkSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  similarityScore: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String,
  },
}, { timestamps: true });

module.exports = mongoose.model('Trademark', trademarkSchema);
