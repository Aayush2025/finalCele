const express = require('express');
const router = express.Router();
const stripe = require('stripe')(require('../config/keys').stripeSecretKey); // Import and initialize Stripe
const Transaction = require('../models/Transaction'); // Import your Transaction model

// Payment route
router.post('/pay', async (req, res) => {
  try {
    const { amount, source, currency } = req.body; // Extract payment details from request

    // Create a charge using Stripe
    const charge = await stripe.charges.create({
      amount,
      source,
      currency
    });

    // Save transaction details in the database
    const transaction = new Transaction({
      amount: charge.amount,
      currency: charge.currency,
      status: charge.status
    });

    await transaction.save(); // Save to MongoDB

    res.status(200).send({ success: true, charge }); // Send response with charge details
  } catch (error) {
    res.status(500).send({ success: false, error: error.message }); // Handle errors
  }
});

module.exports = router;
