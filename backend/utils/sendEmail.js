const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(toEmail, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: "SecureAuth <onboarding@resend.dev>",
      to: [toEmail],
      subject: "Your SecureAuth verification code",
      html: `
        <div style="font-family: Arial, sans-serif;">
          <h2>SecureAuth</h2>
          <p>Your verification code is:</p>

          <h1 style="letter-spacing: 6px;">${otp}</h1>

          <p>This OTP expires in 60 seconds.</p>
          <p>If you did not request this code, please ignore this email.</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend Error:", error);
      throw new Error(error.message);
    }

    console.log("OTP Email Sent:", data);
  } catch (err) {
    console.error("Mail Error:", err);
    throw err;
  }
}

module.exports = sendEmail;