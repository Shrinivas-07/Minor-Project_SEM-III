import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, Sparkles, ArrowRight, Lock, Mail, AlertCircle, 
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

  // Resend OTP countdown timer
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

    // Auto advance focus
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

  // Sign In handler
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

  // Step 1: Send OTP for Password Reset
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
      setSuccessMsg('6-digit security code dispatched to your inbox via Brevo.');
      if (res?.devOtp) {
        setDevOtpHint(`Dev preview code: ${res.devOtp}`);
      }
      setMode('forgot_otp');
      setResendTimer(45);
    } catch (err) {
      setError(err.message || 'Failed to dispatch verification code. Please check email address.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP & Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit OTP code.');
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
      setSuccessMsg('Password updated successfully! Signing you in...');
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
      setError(err.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4 relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Dynamic Iridescent Ambient Background Lights */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[500px] h-[400px] bg-gradient-to-tr from-brand-600/35 via-purple-600/25 to-pink-500/20 blur-[130px] rounded-full pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 w-[450px] h-[350px] bg-gradient-to-br from-cyan-500/25 via-indigo-600/25 to-emerald-500/15 blur-[120px] rounded-full pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 bg-grid-mesh opacity-30 pointer-events-none" />

      {/* Main Glass Card */}
      <div className="w-full max-w-md spatial-glass-card rounded-3xl p-8 sm:p-10 relative z-10 border border-white/15 cute-spring shadow-2xl backdrop-blur-2xl">
        {/* Iridescent Top Accent Bar */}
        <div className="absolute top-0 left-8 right-8 h-[3px] bg-gradient-to-r from-cyan-400 via-brand-500 to-pink-500 rounded-full animate-iridescent" />

        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-4 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-500 via-indigo-500 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30 group-hover:scale-110 transition-transform duration-300">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300 mb-2">
            <Sparkles className="w-3 h-3 text-amber-300" />
            <span>SECURE ACCESS PORTAL</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {mode === 'login' ? 'Welcome Back' : mode === 'forgot_email' ? 'Reset Password' : 'Verify Security OTP'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {mode === 'login' 
              ? 'Access your telemetry profile, saved career vectors, and AI mentor.'
              : mode === 'forgot_email'
              ? 'Enter your registered email to receive an instant Brevo verification code.'
              : `Enter the 6-digit OTP code sent to ${email}`}
          </p>
        </div>

        {/* Alert Notifications */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {successMsg && (
          <div className="mb-6 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span className="leading-snug">{successMsg}</span>
          </div>
        )}

        {devOtpHint && (
          <div className="mb-6 p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono flex items-center justify-between">
            <span>{devOtpHint}</span>
            <button 
              type="button" 
              onClick={() => {
                const code = devOtpHint.replace(/\D/g, '').slice(0, 6);
                if (code.length === 6) setOtp(code.split(''));
              }}
              className="underline text-amber-200 hover:text-white"
            >
              Auto-fill
            </button>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 1: STANDARD CREDENTIAL LOGIN                                         */}
        {/* ========================================================================= */}
        {mode === 'login' && (
          <form onSubmit={handleSignIn} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5 flex items-center justify-between">
                <span>Email Address</span>
                <span className="text-[10px] text-slate-400 font-normal">Registered email</span>
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@sahichayan.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setSuccessMsg('');
                    setMode('forgot_email');
                  }}
                  className="text-[11px] font-semibold text-brand-400 hover:text-brand-300 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-pink-600 hover:from-brand-500 hover:to-pink-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-brand-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Account'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 2: FORGOT PASSWORD - STEP 1 (ENTER EMAIL)                             */}
        {/* ========================================================================= */}
        {mode === 'forgot_email' && (
          <form onSubmit={handleSendResetOtp} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1.5">Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@sahichayan.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50"
            >
              <span>{loading ? 'Sending Security Code...' : 'Send Brevo OTP Code'}</span>
              <KeyRound className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setMode('login');
              }}
              className="w-full py-2.5 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* MODE 3: FORGOT PASSWORD - STEP 2 (VERIFY 6-DIGIT OTP & RESET)              */}
        {/* ========================================================================= */}
        {mode === 'forgot_otp' && (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2 text-center">
                Enter 6-Digit Brevo Verification Code
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
                    className="w-11 h-13 text-center text-lg font-mono font-bold rounded-xl bg-white/10 border border-white/20 text-cyan-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all"
                  />
                ))}
              </div>
              <div className="flex items-center justify-between mt-2.5 px-1">
                <span className="text-[11px] text-slate-400">Didn't receive code?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleSendResetOtp}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 disabled:text-slate-500 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">New Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Confirm New Password</label>
              <div className="relative">
                <ShieldCheck className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50"
            >
              <span>{loading ? 'Updating Credentials...' : 'Verify & Set New Password'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setMode('login');
              }}
              className="w-full py-2 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Sign In</span>
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            Don't have an advisory account?{' '}
            <Link to="/register" className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
              <span>Create Free Account</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
