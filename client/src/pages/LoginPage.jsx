import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, ArrowRight, Lock, Mail, AlertCircle, 
  KeyRound, CheckCircle2, RotateCcw, ShieldCheck, ArrowLeft, Eye, EyeOff
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, sendOtp, resetPassword } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' | 'forgot_email' | 'forgot_otp'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showPassword, setShowPassword] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');

  useEffect(() => {
    let interval = null;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleOtpChange = (val, index) => {
    const clean = val.replace(/[^0-9]/g, '');
    const updated = [...otp];
    updated[index] = clean.slice(-1);
    setOtp(updated);

    if (clean && index < 5) {
      const nextInput = document.getElementById(`login-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`login-otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').trim().replace(/[^0-9]/g, '').slice(0, 6);
    if (pasteData) {
      const updated = [...otp];
      pasteData.split('').forEach((char, i) => {
        if (i < 6) updated[i] = char;
      });
      setOtp(updated);
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await signIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed. Please verify your email and password.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendResetOtp = async (e) => {
    e?.preventDefault();
    if (!email) {
      setError('Please provide your registered email address.');
      return;
    }
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const res = await sendOtp(email, 'reset_password');
      setSuccessMsg('A 6-digit verification code has been sent to your email.');
      if (res?.devOtp) {
        setDevOtpHint(`Developer preview code: ${res.devOtp}`);
      }
      setMode('forgot_otp');
      setResendTimer(45);
    } catch (err) {
      setError(err.message || 'Failed to dispatch verification code. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await resetPassword({ email, otp: fullOtp, newPassword });
      setSuccessMsg('Password updated successfully. Signing you in...');
      setTimeout(async () => {
        try {
          await signIn(email, newPassword);
          navigate('/dashboard');
        } catch {
          setMode('login');
          setPassword(newPassword);
          setSuccessMsg('Password updated. Please sign in with your new password.');
        }
      }, 1000);
    } catch (err) {
      setError(err.message || 'Invalid or expired verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-soft">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white mb-4 hover:bg-brand-600 transition-colors">
            <Compass className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {mode === 'login' ? 'Sign in to SahiChayan' : mode === 'forgot_email' ? 'Reset your password' : 'Enter verification code'}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5">
            {mode === 'login'
              ? 'Access your saved careers, assessment score, and roadmaps.'
              : mode === 'forgot_email'
              ? 'Enter your email address to receive a 6-digit security code.'
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
            <span className="leading-snug">{successMsg}</span>
          </div>
        )}

        {devOtpHint && (
          <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs font-mono flex items-center justify-between">
            <span>{devOtpHint}</span>
            <button 
              type="button" 
              onClick={() => {
                const code = devOtpHint.replace(/\D/g, '').slice(0, 6);
                if (code.length === 6) setOtp(code.split(''));
              }}
              className="font-sans font-semibold underline text-amber-900 hover:text-amber-700"
            >
              Auto-fill
            </button>
          </div>
        )}

        {/* Mode 1: Credential Login */}
        {mode === 'login' && (
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Email address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setSuccessMsg('');
                    setMode('forgot_email');
                  }}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
            >
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Mode 2: Forgot Password - Email Input */}
        {mode === 'forgot_email' && (
          <form onSubmit={handleSendResetOtp} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Registered email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@university.edu"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Sending code...' : 'Send Verification Code'}</span>
              <KeyRound className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setMode('login');
              }}
              className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* Mode 3: Forgot Password - 6-Digit OTP & New Password */}
        {mode === 'forgot_otp' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2 text-center">
                6-digit verification code
              </label>
              <div className="flex justify-center gap-2" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`login-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-11 h-12 text-center text-lg font-mono font-bold rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-600/15 transition-all"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-xs text-slate-500">Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleSendResetOtp}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 disabled:text-slate-400 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">New password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Confirm new password</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Updating Password...' : 'Verify & Reset Password'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setMode('login');
              }}
              className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* Footer Link */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            New to SahiChayan?{' '}
            <Link to="/register" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              Create a student account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
