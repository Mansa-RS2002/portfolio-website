const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// Contact form route
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASS
      }
    });

    await transporter.sendMail({
      from: email,
      to: process.env.MY_EMAIL,
      subject: `Portfolio Contact from ${name}`,
      text: message
    });

    res.send('Message sent successfully!');
  } catch (err) {
    res.status(500).send('Failed to send message.');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://192.168.135.112:${PORT}`);
});
