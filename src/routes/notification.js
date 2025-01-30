const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const Notification = require('../models/Notification');
const User = require('../models/User');

const shouldDeliverNotification = async (userId, notification) => {
  if (notification.isCritical) return true;

  const user = await User.findById(userId);
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' });
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false });

  const availableSlot = user.availability.find(slot => 
    slot.dayOfWeek === currentDay &&
    slot.startTime <= currentTime &&
    slot.endTime >= currentTime
  );

  return !!availableSlot;
};

router.post('/', auth, async (req, res) => {
  try {
    const { recipients, message } = req.body;
    
    const notification = new Notification({
      sender: req.user.userId,
      recipients,
      message
    });

    for (const recipientId of recipients) {
      const canDeliver = await shouldDeliverNotification(recipientId, notification);
      if (canDeliver) {
        notification.status = 'delivered';
        notification.deliveryTime = new Date();
      }
    }

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', auth, async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipients: req.user.userId
    }).populate('sender', 'name email');
    
    res.json(notifications);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;