require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, // অ্যাপ পাসওয়ার্ড
  },
});


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
