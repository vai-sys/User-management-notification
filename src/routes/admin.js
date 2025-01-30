const express = require('express');
const router = express.Router();
const { auth, isAdmin } = require('../middleware/auth');
const Notification = require('../models/Notification');

router.post('/notifications', [auth, isAdmin], async (req, res) => {
  try {
    const { recipients, message, isCritical } = req.body;
    
    const notification = new Notification({
      sender: req.user.userId,
      recipients,
      message,
      isCritical
    });

    if (isCritical) {
      notification.status = 'delivered';
      notification.deliveryTime = new Date();
    } else {
      for (const recipientId of recipients) {
        const canDeliver = await shouldDeliverNotification(recipientId, notification);
        if (canDeliver) {
          notification.status = 'delivered';
          notification.deliveryTime = new Date();
          break;
        }
      }
    }

    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;