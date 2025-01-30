const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  message: {
    type: String,
    required: true
  },
  isCritical: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'read'],
    default: 'pending'
  },
  deliveryTime: Date,
  readTime: Date
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);