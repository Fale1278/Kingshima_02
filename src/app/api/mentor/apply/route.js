import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request) {
  try {
    const { name, email, linkedin, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json({ message: 'Name and email are required' }, { status: 400 });
    }

    let transporter;

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS,
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, 
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const receiverEmail = process.env.RECEIVER_EMAIL || "admin@kingshimafoundation.org";

    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: receiverEmail,
      subject: "New Mentor Application",
      text: `Name: ${name}\nEmail: ${email}\nLinkedIn: ${linkedin || 'Not Provided'}\nMessage: ${message}`,
      html: `
        <h3>New Mentor Application</h3>
        <ul>
          <li><strong>Name:</strong> ${name}</li>
          <li><strong>Email:</strong> ${email}</li>
          <li><strong>LinkedIn:</strong> ${linkedin || 'Not Provided'}</li>
        </ul>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    let previewUrl = null;
    if (!process.env.SMTP_USER) {
      previewUrl = nodemailer.getTestMessageUrl(info);
    }

    return NextResponse.json({ 
      message: 'Application received! We will be in touch shortly.',
      previewUrl: previewUrl 
    });
  } catch (error) {
    console.error("Error sending email: ", error);
    return NextResponse.json({ message: 'Failed to submit application. Please try again later.' }, { status: 500 });
  }
}
