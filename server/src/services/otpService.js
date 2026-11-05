/**
 * OTP Generation, Storage & Verification Service
 * Features rate-limiting, secure random generation, and automatic expiration.
 */

const crypto = require('crypto');
const emailService = require('./emailService');
const { isValidEmail } = require('../utils/validators');

class OtpService {
  constructor() {
    // In-memory store: Map<key, { otp, expiresAt, attempts, createdAt }>
    this.otpStore = new Map();

    // Clean up expired OTPs every 5 minutes
    setInterval(() => this.cleanupExpired(), 5 * 60 * 1000);
  }

  getStoreKey(email, purpose = 'registration') {
    return `${email.toLowerCase().trim()}:${purpose}`;
  }

  /**
   * Generates a 6-digit numeric OTP and dispatches via Brevo
   */
  async generateAndSendOtp({ email, fullName, purpose = 'registration' }) {
    if (!email || !isValidEmail(email)) {
      throw new Error('Please provide a valid email address.');
    }

    const key = this.getStoreKey(email, purpose);
    const existing = this.otpStore.get(key);

    // Rate-limit: Cannot request more than 1 OTP within 45 seconds
    if (existing && Date.now() - existing.createdAt < 45 * 1000) {
      const waitSeconds = Math.ceil((45 * 1000 - (Date.now() - existing.createdAt)) / 1000);
      throw new Error(`Please wait ${waitSeconds}s before requesting a new verification code.`);
    }

    // Cryptographically secure 6-digit number between 100000 and 999999
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes TTL

    this.otpStore.set(key, {
      otp,
      expiresAt,
      attempts: 0,
      createdAt: Date.now(),
    });

    // Send email via Brevo
    const emailResult = await emailService.sendOtpEmail({
      toEmail: email,
      toName: fullName,
      otp,
      purpose,
    });

    return {
      success: true,
      email,
      expiresInMinutes: 10,
      mode: emailResult.mode,
      previewOtp: emailResult.previewOtp,
      message: `A 6-digit verification code has been sent to ${email}.`,
    };
  }

  /**
   * Verifies if the provided OTP matches and is still within TTL
   */
  verifyOtp(email, inputOtp, purpose = 'registration') {
    if (!email || !inputOtp) {
      throw new Error('Email and verification code are required.');
    }

    const key = this.getStoreKey(email, purpose);
    const record = this.otpStore.get(key);

    if (!record) {
      throw new Error('Verification code expired or not found. Please request a new code.');
    }

    if (Date.now() > record.expiresAt) {
      this.otpStore.delete(key);
      throw new Error('Verification code has expired (10-minute limit). Please request a new one.');
    }

    // Guard against brute force: Max 5 wrong attempts per OTP
    if (record.attempts >= 5) {
      this.otpStore.delete(key);
      throw new Error('Too many invalid attempts. For your security, this code was invalidated. Request a new code.');
    }

    const cleanInput = inputOtp.toString().trim();
    if (record.otp !== cleanInput) {
      record.attempts += 1;
      const remaining = 5 - record.attempts;
      throw new Error(`Invalid verification code. ${remaining} attempt(s) remaining.`);
    }

    // OTP verified successfully - consume it
    this.otpStore.delete(key);
    return true;
  }

  /**
   * Garbage collector for expired OTPs
   */
  cleanupExpired() {
    const now = Date.now();
    for (const [key, record] of this.otpStore.entries()) {
      if (now > record.expiresAt) {
        this.otpStore.delete(key);
      }
    }
  }
}

module.exports = new OtpService();

