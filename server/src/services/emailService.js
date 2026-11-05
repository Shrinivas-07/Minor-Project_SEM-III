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
    };

    const actionTextMap = {
      registration: 'completing your SahiChayan account registration',
      login: 'signing in to your SahiChayan advisory portal',
      reset: 'resetting your account password',
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
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #070A12; margin: 0; padding: 30px 15px; color: #E2E8F0; }
    .card { max-width: 520px; margin: 0 auto; background: #0E1322; border: 1px solid rgba(255, 255, 255, 0.12); border-radius: 24px; padding: 36px 28px; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6); }
    .logo-badge { display: inline-flex; align-items: center; gap: 8px; background: linear-gradient(135deg, #4F46E5, #9333EA); padding: 8px 16px; border-radius: 12px; color: #FFFFFF; font-weight: 800; font-size: 14px; letter-spacing: 0.5px; text-decoration: none; }
    .headline { font-size: 24px; font-weight: 800; margin-top: 24px; color: #FFFFFF; letter-spacing: -0.5px; }
    .subtext { font-size: 14px; line-height: 1.6; color: #94A3B8; margin-top: 10px; }
    .otp-box { background: linear-gradient(135deg, rgba(79, 70, 229, 0.15), rgba(236, 72, 153, 0.15)); border: 1px solid rgba(147, 51, 234, 0.4); border-radius: 18px; padding: 24px 20px; text-align: center; margin: 28px 0; }
    .otp-code { font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 900; letter-spacing: 10px; color: #F43F5E; text-shadow: 0 0 20px rgba(244, 63, 94, 0.4); margin: 0; }
    .otp-expiry { font-size: 12px; color: #CBD5E1; margin-top: 8px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .security-note { font-size: 12px; line-height: 1.5; color: #64748B; border-top: 1px solid rgba(255, 255, 255, 0.08); padding-top: 20px; margin-top: 24px; }
    .footer { text-align: center; font-size: 11px; color: #475569; margin-top: 24px; }
  </style>
</head>
<body>
  <div class="card">
    <div style="text-align: center;">
      <div class="logo-badge">🧭 SAHICHAYAN AI</div>
      <h1 class="headline">${title}</h1>
      <p class="subtext">
        Hello <strong>${toName || 'Future Leader'}</strong>,<br/>
        Use the 6-digit verification code below for ${actionText}.
      </p>
    </div>

    <div class="otp-box">
      <div class="otp-code">${otp}</div>
      <div class="otp-expiry">⏳ Valid for 10 minutes</div>
    </div>

    <p class="subtext" style="text-align: center; font-size: 13px;">
      If you did not request this verification code, please disregard this email or update your credentials immediately.
    </p>

    <div class="security-note">
      🔒 <strong>Security Notice:</strong> SahiChayan mentors and administrators will never ask you for this OTP code via phone or social media.
    </div>
  </div>

  <div class="footer">
    © ${new Date().getFullYear()} SahiChayan.Com — Scientific Career Guidance & AI Advisory Engine.
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
            name: BREVO_SENDER_NAME || 'SahiChayan AI Security',
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

