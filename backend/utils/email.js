const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: String(process.env.EMAIL_SECURE).toLowerCase() === 'true',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendVerificationEmail = async ({ to, username, verificationUrl }) => {
    const html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Verify your Sideline account</h2>
            <p>Hi ${username},</p>
            <p>Thanks for creating your account. Please verify your email by clicking the button below:</p>
            <p>
                <a
                    href="${verificationUrl}"
                    style="
                        display: inline-block;
                        padding: 12px 20px;
                        background-color: #2563eb;
                        color: #ffffff;
                        text-decoration: none;
                        border-radius: 6px;
                        font-weight: bold;
                    "
                >
                    Verify Email
                </a>
            </p>
            <p>If the button does not work, use this link:</p>
            <p>${verificationUrl}</p>
            <p>This link will expire in 24 hours.</p>
        </div>
    `;

    return transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to,
        subject: 'Verify your Sideline account',
        html,
    });
};

const sendPasswordResetEmail = async ({ to, username, resetUrl }) => {
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Reset your Sideline password</h2>
      <p>Hi ${username},</p>
      <p>We received a request to reset your password.</p>
      <p>
        <a href="${resetUrl}" style="display:inline-block;padding:12px 20px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:bold;">
          Reset Password
        </a>
      </p>
      <p>If the button does not work, use this link:</p>
      <p>${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you did not request this, you can safely ignore this email.</p>
    </div>
  `;

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Reset your Sideline password',
    html,
  });
};

module.exports = {
    sendVerificationEmail,
    sendPasswordResetEmail,
};