const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(toEmail, otp) {
  try {
    const info = await transporter.sendMail({
      from: `"SecureAuth" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your SecureAuth Verification Code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>SecureAuth</h2>
          <p>Your verification code is:</p>

          <h1 style="letter-spacing:6px;">${otp}</h1>

          <p>This OTP expires in 60 seconds.</p>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    console.log("OTP Email Sent:", info.messageId);
  } catch (err) {
    console.error("Mail Error:", err);
    throw err;
  }
}

module.exports = sendEmail;