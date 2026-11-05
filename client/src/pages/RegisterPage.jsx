import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, Sparkles, ArrowRight, Lock, Mail, User, AlertCircle, 
  CheckCircle2, GraduationCap, School, Calendar, RotateCcw, ArrowLeft, KeyRound
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEGREE_CATEGORIES } from '../data/degreesData';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, sendOtp, verifyOtp } = useAuth();

  // Registration states
  const [step, setStep] = useState(1); // 1: form details, 2: 6-digit OTP
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('B.Tech / B.E. (Computer Science & AI)');
  const [college, setCollege] = useState('');
  const [targetYear, setTargetYear] = useState('2027');

  // OTP states
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [devOtpHint, setDevOtpHint] = useState('');

  // Countdown timer for Resend OTP
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
      const nextInput = document.getElementById(`reg-otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`reg-otp-${index - 1}`);
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

  // Step 1: Send OTP to Brevo
  const handleInitiateRegistration = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please provide your full legal or student name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await sendOtp(email.trim().toLowerCase(), 'registration');
      if (res?.devOtp) {
        setDevOtpHint(`Dev preview code: ${res.devOtp}`);
      }
      setStep(2);
      setResendTimer(45);
    } catch (err) {
      setError(err.message || 'Unable to dispatch verification OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendTimer > 0 || loading) return;
    setError('');
    setLoading(true);
    try {
      const res = await sendOtp(email.trim().toLowerCase(), 'registration');
      if (res?.devOtp) {
        setDevOtpHint(`Dev preview code: ${res.devOtp}`);
      }
      setResendTimer(45);
    } catch (err) {
      setError(err.message || 'Failed to resend code.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Register user in DB
  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the full 6-digit verification code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      // 1. Verify OTP with backend
      await verifyOtp(email.trim().toLowerCase(), fullOtp, 'registration');

      // 2. Perform Account Registration
      await signUp(email.trim().toLowerCase(), password, fullName.trim(), {
        stream: degree,
        college: college.trim(),
        targetYear: targetYear,
        educationLevel: degree.includes('Class') ? 'Secondary' : 'Undergraduate',
      });

      // 3. Direct to Dashboard
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'OTP verification or registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex items-center justify-center p-4 py-12 relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Dynamic Iridescent Ambient Background Lights */}
      <div className="absolute top-1/6 right-1/4 translate-x-1/3 w-[550px] h-[400px] bg-gradient-to-tr from-brand-600/30 via-pink-600/25 to-purple-500/20 blur-[140px] rounded-full pointer-events-none animate-float-slow" />
      <div className="absolute bottom-1/6 left-1/4 -translate-x-1/2 w-[500px] h-[380px] bg-gradient-to-br from-cyan-500/25 via-indigo-600/25 to-emerald-500/15 blur-[130px] rounded-full pointer-events-none animate-float-reverse" />
      <div className="absolute inset-0 bg-grid-mesh opacity-30 pointer-events-none" />

      {/* Main Glass Card */}
      <div className="w-full max-w-lg spatial-glass-card rounded-3xl p-8 sm:p-10 relative z-10 border border-white/15 cute-spring shadow-2xl backdrop-blur-2xl">
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
            <span>STEP {step} OF 2 • {step === 1 ? 'ACADEMIC PROFILE' : 'EMAIL OTP VERIFICATION'}</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            {step === 1 ? 'Create Student Account' : 'Verify Brevo Security OTP'}
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {step === 1 
              ? 'Join SahiChayan for 18-trait psychometric vectors, verified college curricula, and AI mentorship.'
              : `A 6-digit confirmation code was sent to ${email}`}
          </p>
        </div>

        {/* Alert Notifications */}
        {error && (
          <div className="mb-6 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 animate-in fade-in duration-200">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {devOtpHint && step === 2 && (
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
        {/* STEP 1: FORM PROFILE DETAILS                                              */}
        {/* ========================================================================= */}
        {step === 1 && (
          <form onSubmit={handleInitiateRegistration} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Full Legal Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shrinivas K."
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Email Address (for Brevo OTP)</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@student.edu"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium"
                  required
                />
              </div>
            </div>

            {/* Currently Pursuing Degree Dropdown */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1 flex items-center justify-between">
                <span>Current Pursuing Degree / Stream</span>
                <span className="text-[10px] text-cyan-400 font-normal">Categorized</span>
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all font-medium cursor-pointer"
                >
                  {DEGREE_CATEGORIES.map((cat) => (
                    <optgroup key={cat.category} label={`━━ ${cat.category} ━━`} className="bg-slate-900 text-cyan-400 font-bold">
                      {cat.degrees.map((d) => (
                        <option key={d} value={d} className="bg-slate-900 text-white font-normal">
                          {d}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            {/* College & Target Graduation Year Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">College / School</label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. State University"
                    className="w-full pl-11 pr-4 py-2 rounded-2xl bg-white/5 border border-white/10 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-brand-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">Target Year</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full pl-11 pr-4 py-2 rounded-2xl bg-slate-900 border border-white/15 text-xs text-white focus:outline-none focus:border-brand-500 transition-all cursor-pointer"
                  >
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                      <option key={yr} value={yr} className="bg-slate-900 text-white">
                        {yr}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 via-indigo-600 to-pink-600 hover:from-brand-500 hover:to-pink-500 text-white font-bold text-xs tracking-wide shadow-lg shadow-brand-600/30 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50"
            >
              <span>{loading ? 'Dispatching Brevo OTP...' : 'Continue to Email Verification'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: BREVO 6-DIGIT OTP VERIFICATION CARD                               */}
        {/* ========================================================================= */}
        {step === 2 && (
          <form onSubmit={handleCompleteRegistration} className="space-y-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
              <span className="text-[11px] text-slate-400 block mb-1">Security Code sent to:</span>
              <span className="text-xs font-mono font-bold text-cyan-300">{email}</span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-300 block mb-2 text-center">
                Enter 6-Digit Verification Code
              </label>
              <div className="flex justify-center gap-2 sm:gap-3" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`reg-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-11 h-14 text-center text-xl font-mono font-black rounded-2xl bg-white/10 border border-white/20 text-cyan-300 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/30 transition-all shadow-inner"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-3 px-1">
                <span className="text-[11px] text-slate-400">Didn't receive email?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleResendOtp}
                  className="text-[11px] font-semibold text-cyan-400 hover:text-cyan-300 disabled:text-slate-500 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white font-bold text-xs tracking-wide shadow-lg shadow-emerald-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 border border-white/20 disabled:opacity-50"
            >
              <span>{loading ? 'Verifying & Creating Profile...' : 'Verify & Launch Dashboard'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setStep(1);
              }}
              className="w-full py-2 text-xs text-slate-400 hover:text-white flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Edit Profile Details</span>
            </button>
          </form>
        )}

        {/* Footer Navigation */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-cyan-400 hover:text-cyan-300 transition-colors inline-flex items-center gap-1">
              <span>Sign In here</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
