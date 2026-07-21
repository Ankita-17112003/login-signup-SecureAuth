const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});

async function sendEmail(toEmail, otp) {
  await transporter.sendMail({
    from: `"Checkpoint" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "Your verification code",
    text: `Your OTP is ${otp}. It expires in 60 seconds.`,
    html: `<p>Your verification code is <b>${otp}</b>. It expires in 60 seconds.</p>`,
  });
}

module.exports = sendEmail;
