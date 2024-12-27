const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/userSchema');

app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).send('User not found.');

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'your-email@gmail.com',
        pass: 'your-email-password',
      },
    });

    await transporter.sendMail({
      from: 'your-email@gmail.com',
      to: user.email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="http://localhost:3000/reset-password/${token}">here</a> to reset your password.</p>`,
    });

    res.send('Password reset link sent to your email.');
  } catch (err) {
    res.status(500).send('Server error.');
  }
});
