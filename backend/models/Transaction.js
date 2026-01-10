const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  senderUPI: {
    type: String,
    required: true
  },
  senderName: String,
  receiverUPI: {
    type: String,
    required: true
  },
  receiverName: String,
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'failed'],
    default: 'completed'
  },
  description: String,
  transactionId: {
    type: String,
    unique: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);
