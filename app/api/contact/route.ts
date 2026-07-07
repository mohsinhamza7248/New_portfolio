import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields required' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || 'mohsinhamza7248@gmail.com',
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.EMAIL_USER || 'mohsinhamza7248@gmail.com'}>`,
      to: 'mohsinhamza7248@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      html: `
        <div style="font-family: 'Space Grotesk', Arial, sans-serif; max-width: 600px; background: #050508; color: #fff; padding: 40px; border-radius: 16px;">
          <h1 style="font-size: 28px; font-weight: 700; margin-bottom: 8px; color: #fff;">
            New Message from Portfolio
          </h1>
          <p style="color: #94a3b8; margin-bottom: 32px; font-size: 14px;">Someone reached out via your portfolio contact form.</p>

          <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; width: 80px; font-family: monospace; letter-spacing: 0.05em;">FROM</td>
                <td style="padding: 8px 0; color: #e2e8f0; font-size: 14px; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-family: monospace; letter-spacing: 0.05em;">EMAIL</td>
                <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; font-size: 14px;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b; font-size: 12px; font-family: monospace; letter-spacing: 0.05em;">SUBJECT</td>
                <td style="padding: 8px 0; color: #e2e8f0; font-size: 14px;">${subject}</td>
              </tr>
            </table>
          </div>

          <div style="background: rgba(14,165,233,0.06); border: 1px solid rgba(14,165,233,0.15); border-radius: 12px; padding: 24px;">
            <p style="color: #64748b; font-size: 12px; font-family: monospace; letter-spacing: 0.05em; margin-bottom: 12px;">MESSAGE</p>
            <p style="color: #e2e8f0; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #475569; font-size: 12px; margin-top: 32px; text-align: center;">
            Sent from mohsinansari.dev portfolio
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
