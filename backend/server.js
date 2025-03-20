require('dotenv').config();
const express = require('express');
const axios = require('axios');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// bKash API Credentials
const BKASH_USERNAME = process.env.BKASH_USERNAME;
const BKASH_PASSWORD = process.env.BKASH_PASSWORD;
const BKASH_APP_KEY = process.env.BKASH_APP_KEY;
const BKASH_APP_SECRET = process.env.BKASH_APP_SECRET;
const BKASH_BASE_URL = process.env.BKASH_BASE_URL; // Example: "https://checkout.sandbox.bka.sh/v1.2.0-beta"

// Nodemailer Config
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Generate bKash Token
const generateToken = async () => {
  try {
    const response = await axios.post(`${BKASH_BASE_URL}/checkout/token/grant`, {
      app_key: BKASH_APP_KEY,
      app_secret: BKASH_APP_SECRET,
    }, {
      headers: {
        'Content-Type': 'application/json',
        username: BKASH_USERNAME,
        password: BKASH_PASSWORD,
      }
    });

    return response.data.id_token;
  } catch (error) {
    console.error('bKash Token Error:', error.response.data);
    throw new Error('Failed to generate bKash token');
  }
};

// Create Payment
app.post('/create-payment', async (req, res) => {
  try {
    const { amount } = req.body;
    const token = await generateToken();

    const response = await axios.post(`${BKASH_BASE_URL}/checkout/payment/create`, {
      amount: amount,
      currency: "BDT",
      intent: "sale",
      merchantInvoiceNumber: "INV123456"
    }, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('bKash Create Payment Error:', error.response.data);
    res.status(500).json({ message: 'Failed to create payment' });
  }
});

// Execute Payment
app.post('/execute-payment', async (req, res) => {
  try {
    const { paymentID } = req.body;
    const token = await generateToken();

    const response = await axios.post(`${BKASH_BASE_URL}/checkout/payment/execute/${paymentID}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('bKash Execute Payment Error:', error.response.data);
    res.status(500).json({ message: 'Failed to execute payment' });
  }
});

// Query Payment
app.post('/query-payment', async (req, res) => {
  try {
    const { paymentID } = req.body;
    const token = await generateToken();

    const response = await axios.post(`${BKASH_BASE_URL}/checkout/payment/query/${paymentID}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token,
      }
    });

    res.status(200).json(response.data);
  } catch (error) {
    console.error('bKash Query Payment Error:', error.response.data);
    res.status(500).json({ message: 'Failed to query payment' });
  }
});

// Send Email
app.post('/send-email', async (req, res) => {
  const { email, username } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Confirmation - Hospital Appointment System',
    text: `Hello ${username},\n\nThank you for signing up!\n\nBest regards,\nHospital Appointment System`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Email sending error:', error);
    res.status(500).send('Failed to send email');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
