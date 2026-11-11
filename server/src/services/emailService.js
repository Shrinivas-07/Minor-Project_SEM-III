/**
 * Brevo (Sendinblue) Transactional Email Service
 * Handles high-deliverability OTP emails for registration and password resets.
 */

const { BREVO_API_KEY, BREVO_SENDER_EMAIL, BREVO_SENDER_NAME } = require('../config/env');

class EmailService {
  /**
   * Dispatches a 6-digit verification code email via Brevo REST API v3
   */
  async sendOtpEmail({ toEmail, toName, otp, purpose = 'registration' }) {
    if (!toEmail) {
      throw new Error('Recipient email is required.');
    }

    const titleMap = {
      registration: 'Verify Your Email Address',
      login: 'One-Time Login Passcode',
      reset: 'Reset Your SahiChayan Password',
      reset_password: 'Reset Your SahiChayan Password',
    };

    const actionTextMap = {
      registration: 'completing your SahiChayan account registration',
      login: 'signing in to your SahiChayan account',
      reset: 'resetting your account password',
      reset_password: 'resetting your account password',
    };

    const subject = `Your SahiChayan Verification Code: ${otp}`;
    const title = titleMap[purpose] || 'Verification Passcode';
    const actionText = actionTextMap[purpose] || 'verifying your identity';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F4F4F5; margin: 0; padding: 36px 16px; color: #18181B; }
    .card { max-width: 500px; margin: 0 auto; background: #FFFFFF; border: 1px solid #E4E4E7; border-radius: 16px; padding: 36px 32px; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04); }
    .brand-bar { font-size: 16px; font-weight: 800; letter-spacing: -0.3px; color: #0F172A; margin-bottom: 24px; }
    .brand-accent { color: #1D4ED8; }
    .headline { font-size: 22px; font-weight: 700; margin: 0; color: #0F172A; letter-spacing: -0.4px; }
    .subtext { font-size: 14px; line-height: 1.6; color: #52525B; margin-top: 10px; }
    .otp-box { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 22px 20px; text-align: center; margin: 26px 0; }
    .otp-code { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0F172A; margin: 0; }
    .otp-expiry { font-size: 12px; color: #64748B; margin-top: 8px; font-weight: 500; }
    .security-note { font-size: 12px; line-height: 1.5; color: #71717A; border-top: 1px solid #F4F4F5; padding-top: 18px; margin-top: 24px; }
    .footer { text-align: center; font-size: 12px; color: #71717A; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="brand-bar">Sahi<span class="brand-accent">Chayan</span></div>
    <h1 class="headline">${title}</h1>
    <p class="subtext">
      Hello <strong>${toName || 'Student'}</strong>,<br/>
      Use the 6-digit verification code below for ${actionText}.
    </p>

    <div class="otp-box">
      <div class="otp-code">${otp}</div>
      <div class="otp-expiry">This code expires in 10 minutes.</div>
    </div>

    <p class="subtext" style="font-size: 13px;">
      If you did not request this verification code, you can safely ignore this message.
    </p>

    <div class="security-note">
      <strong>Security Note:</strong> SahiChayan staff will never ask you to share this passcode.
    </div>
  </div>

  <div class="footer">
    © ${new Date().getFullYear()} SahiChayan.Com — Career Discovery &amp; Roadmap Platform.
  </div>
</body>
</html>
    `;

    // If Brevo API key is not configured, gracefully simulate in dev mode
    if (!BREVO_API_KEY) {
      console.log('====================================================');
      console.log(`✉️ [BREVO SIMULATION - DEV MODE]`);
      console.log(`To: ${toEmail} (${toName || 'User'})`);
      console.log(`Purpose: ${purpose}`);
      console.log(`🔑 Verification OTP: ${otp}`);
      console.log(`(Set BREVO_API_KEY in your server environment to deliver live emails)`);
      console.log('====================================================');

      return {
        success: true,
        mode: 'simulation',
        message: 'OTP generated (Brevo API key not set; logged to server console).',
        previewOtp: process.env.NODE_ENV !== 'production' ? otp : undefined,
      };
    }

    try {
      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': BREVO_API_KEY,
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          sender: {
            name: BREVO_SENDER_NAME || 'SahiChayan Security',
            email: BREVO_SENDER_EMAIL || 'support@sahichayan.com',
          },
          to: [
            {
              email: toEmail,
              name: toName || toEmail.split('@')[0],
            },
          ],
          subject,
          htmlContent,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        console.error('❌ Brevo API Dispatch Error:', data);
        throw new Error(data.message || `Brevo API rejected email dispatch (Status: ${response.status})`);
      }

      console.log(`✅ Brevo OTP email successfully dispatched to: ${toEmail} (MessageId: ${data.messageId || 'sent'})`);

      return {
        success: true,
        mode: 'brevo_live',
        messageId: data.messageId,
      };
    } catch (err) {
      console.error('⚠️ Brevo Dispatch Exception:', err.message);
      throw new Error(`Failed to send email verification: ${err.message}`);
    }
  }
}

module.exports = new EmailService();

