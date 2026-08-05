const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.log(error);
  } else {
    console.log("SMTP Connected");
  }
});

async function sendEmail(toEmail, otp) {
  try {
    const info = await transporter.sendMail({
      from: `"Checkpoint" <${process.env.EMAIL_USER}>`,
      to: toEmail,
      subject: "Your verification code",
      text: `Your OTP is ${otp}. It expires in 60 seconds.`,
      html: `<p>Your verification code is <b>${otp}</b>. It expires in 60 seconds.</p>`,
    });

    console.log("Mail Sent:", info.response);
  } catch (err) {
    console.error("Mail Error:", err);
    throw err;
  }
}

module.exports = sendEmail;
