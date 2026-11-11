import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Compass, ArrowRight, Lock, Mail, User, AlertCircle, 
  CheckCircle2, GraduationCap, School, Calendar, RotateCcw, ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { DEGREE_CATEGORIES } from '../data/degreesData';

export default function RegisterPage() {
  const navigate = useNavigate();
  const { signUp, sendOtp, verifyOtp } = useAuth();

  const [step, setStep] = useState(1); // 1: account details, 2: 6-digit OTP verification
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [degree, setDegree] = useState('B.Tech / B.E. (Computer Science & AI)');
  const [college, setCollege] = useState('');
  const [targetYear, setTargetYear] = useState('2027');

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
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

  const handleInitiateRegistration = async (e) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
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
        setDevOtpHint(`Developer preview code: ${res.devOtp}`);
      }
      setStep(2);
      setResendTimer(45);
    } catch (err) {
      setError(err.message || 'Unable to send verification code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    if (resendTimer > 0 || loading) return;
    setError('');
    setLoading(true);
    try {
      const res = await sendOtp(email.trim().toLowerCase(), 'registration');
      if (res?.devOtp) {
        setDevOtpHint(`Developer preview code: ${res.devOtp}`);
      }
      setResendTimer(45);
    } catch (err) {
      setError(err.message || 'Failed to resend verification code.');
    } finally {
      setLoading(false);
    }
  };

  const handleCompleteRegistration = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length !== 6) {
      setError('Please enter the complete 6-digit verification code.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      await verifyOtp(email.trim().toLowerCase(), fullOtp, 'registration');

      await signUp(email.trim().toLowerCase(), password, fullName.trim(), {
        stream: degree,
        college: college.trim(),
        targetYear: targetYear,
        educationLevel: degree.includes('Class') ? 'Secondary' : 'Undergraduate',
      });

      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Verification or registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-lg bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-soft">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 text-white mb-4 hover:bg-brand-600 transition-colors">
            <Compass className="w-5 h-5" />
          </Link>
          <div className="mb-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-[11px] font-semibold text-slate-600">
              Step {step} of 2
            </span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {step === 1 ? 'Create your student account' : 'Verify your email address'}
          </h1>
          <p className="text-sm text-slate-500 mt-1.5 max-w-sm mx-auto">
            {step === 1
              ? 'Save your career matches, academic track, and customized learning roadmaps.'
              : `Enter the 6-digit verification code sent to ${email}`}
          </p>
        </div>

        {/* Notifications */}
        {error && (
          <div className="mb-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span className="leading-snug">{error}</span>
          </div>
        )}

        {devOtpHint && step === 2 && (
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

        {/* Step 1: Account & Academic Details */}
        {step === 1 && (
          <form onSubmit={handleInitiateRegistration} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Full name</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Shrinivas Kulkarni"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all"
                  required
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                Current degree or academic stream
              </label>
              <div className="relative">
                <GraduationCap className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-600/15 transition-all cursor-pointer"
                >
                  {DEGREE_CATEGORIES.map((cat) => (
                    <optgroup key={cat.category} label={cat.category} className="font-semibold text-slate-800">
                      {cat.degrees.map((d) => (
                        <option key={d} value={d} className="font-normal text-slate-900">
                          {d}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">College or school</label>
                <div className="relative">
                  <School className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Pune University"
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-brand-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1.5">Graduation year</label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <select
                    value={targetYear}
                    onChange={(e) => setTargetYear(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-slate-300 text-sm text-slate-900 focus:outline-none focus:border-brand-600 transition-all cursor-pointer"
                  >
                    {[2024, 2025, 2026, 2027, 2028, 2029, 2030].map((yr) => (
                      <option key={yr} value={yr}>
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
              className="w-full mt-2 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-xs"
            >
              <span>{loading ? 'Sending verification code...' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Step 2: 6-Digit Email OTP */}
        {step === 2 && (
          <form onSubmit={handleCompleteRegistration} className="space-y-6">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-center">
              <span className="text-xs text-slate-500 block">Verification code sent to</span>
              <span className="text-sm font-semibold text-slate-900">{email}</span>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-2.5 text-center">
                Enter 6-digit code
              </label>
              <div className="flex justify-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`reg-otp-${idx}`}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, idx)}
                    onKeyDown={(e) => handleOtpKeyDown(e, idx)}
                    className="w-11 h-13 py-2.5 text-center text-xl font-mono font-bold rounded-xl bg-slate-50 border border-slate-300 text-slate-900 focus:outline-none focus:border-brand-600 focus:bg-white focus:ring-2 focus:ring-brand-600/15 transition-all"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-3.5 px-1">
                <span className="text-xs text-slate-500">Didn't receive email?</span>
                <button
                  type="button"
                  disabled={resendTimer > 0 || loading}
                  onClick={handleResendOtp}
                  className="text-xs font-semibold text-brand-600 hover:text-brand-700 disabled:text-slate-400 transition-colors flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{resendTimer > 0 ? `Resend in ${resendTimer}s` : 'Resend Code'}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{loading ? 'Creating Account...' : 'Verify & Create Account'}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                setError('');
                setStep(1);
              }}
              className="w-full py-2 text-xs font-medium text-slate-500 hover:text-slate-900 flex items-center justify-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit account details</span>
            </button>
          </form>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-brand-600 hover:text-brand-700 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
