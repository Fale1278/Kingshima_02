// Automated Email Notification Service for Kingshima Platform
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.ethereal.email',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'kingshima.demo@ethereal.email',
    pass: process.env.SMTP_PASS || 'demo123456',
  },
});

export async function sendWelcomeEmail(toEmail, username, loginCode) {
  try {
    const html = `
      <div style="font-family: sans-serif; background: #0d0f17; color: #ffffff; padding: 20px; border-radius: 12px;">
        <h2 style="color: #ef4444;">✧ Welcome to Kingshima Foundation</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your student account has been successfully created. Here is your secret login code:</p>
        <div style="background: #141722; padding: 12px 20px; border: 1px solid #ef4444; border-radius: 8px; font-size: 20px; letter-spacing: 4px; color: #ffffff; font-weight: bold; width: max-content;">
          ${loginCode}
        </div>
        <p style="margin-top: 20px; color: #9ca3af;">Use this code to log into your student dashboard anytime at Kingshima.</p>
      </div>
    `;

    if (process.env.NODE_ENV === 'production' && process.env.SMTP_USER) {
      await transporter.sendMail({
        from: '"Kingshima Platform" <hello@kingshima.org>',
        to: toEmail,
        subject: 'Welcome to Kingshima — Student Login Code',
        html,
      });
    } else {
      console.log(`[Email Service Simulation] Sent Welcome Email to ${toEmail} with code ${loginCode}`);
    }
  } catch (err) {
    console.error('Email send error:', err);
  }
}

export async function sendPaymentReceipt(toEmail, username, reference) {
  try {
    const html = `
      <div style="font-family: sans-serif; background: #0d0f17; color: #ffffff; padding: 20px; border-radius: 12px;">
        <h2 style="color: #34d399;">✓ Payment Confirmed</h2>
        <p>Hi <strong>${username}</strong>,</p>
        <p>Your one-time acceptance fee payment of reference <code>${reference}</code> has been confirmed.</p>
        <p>All bootcamp tracks and curriculums are now unlocked on your student dashboard.</p>
      </div>
    `;

    if (process.env.NODE_ENV === 'production' && process.env.SMTP_USER) {
      await transporter.sendMail({
        from: '"Kingshima Platform" <billing@kingshima.org>',
        to: toEmail,
        subject: 'Payment Receipt — Kingshima Access Unlocked',
        html,
      });
    } else {
      console.log(`[Email Service Simulation] Sent Payment Receipt to ${toEmail} for ref ${reference}`);
    }
  } catch (err) {
    console.error('Email send error:', err);
  }
}
