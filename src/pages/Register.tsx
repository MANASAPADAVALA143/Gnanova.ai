import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../hooks/useToast';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, User, Building2, Eye, EyeOff, Sparkles, CheckCircle2 } from 'lucide-react';

export const Register = () => {
  const [fullName, setFullName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!acceptTerms) {
      toast.error('Please accept the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      await signUp(email, password, fullName, 'client');
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to create account');
    } finally {
      setLoading(false);
    }
  };

  const parallaxStyle = {
    transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`,
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] text-white overflow-hidden">
      <div
        className="hidden lg:flex lg:w-2/5 p-20 flex-col justify-between relative overflow-hidden"
        style={{ background: '#0a0a0a' }}
      >
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              background: 'linear-gradient(135deg, #667eea, #f093fb)',
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: Math.random() * 5 + 's',
            }}
          ></div>
        ))}

        <div className="relative z-10 animate-slideUpFadeIn">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-[#667eea] via-[#f093fb] to-[#667eea] bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Gnanova.ai
            </h1>
          </div>
          <p className="text-xl text-gray-400">AI-Powered Marketing Automation</p>
        </div>

        <div className="relative z-10 space-y-6 animate-slideUpFadeIn" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-2xl font-bold mb-6">Why Choose Gnanova?</h3>

          <div className="space-y-4">
            <div className="flex items-start gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">AI Content Generation</div>
                <div className="text-sm text-gray-400">Generate engaging posts in seconds with advanced AI</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#f093fb] to-[#f5576c] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Multi-Platform Publishing</div>
                <div className="text-sm text-gray-400">Publish to Instagram, Facebook, LinkedIn & more</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4facfe] to-[#00f2fe] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Advanced Analytics</div>
                <div className="text-sm text-gray-400">Track performance with real-time insights</div>
              </div>
            </div>

            <div className="flex items-start gap-4 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#a855f7] to-[#ec4899] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-semibold text-white mb-1">Brand Alignment</div>
                <div className="text-sm text-gray-400">Content that matches your unique brand voice</div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-500 animate-slideUpFadeIn" style={{ animationDelay: '0.4s' }}>
          Join 500+ businesses automating their social media
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 lg:p-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#1a0a2e] to-[#0a0a0a]"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(102, 126, 234, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(102, 126, 234, 0.05) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div
          className="w-full max-w-md relative z-10"
          style={{ ...parallaxStyle, transition: 'transform 0.1s ease-out' }}
        >
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-10 border border-white/10 shadow-2xl animate-slideUpFadeIn">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
              <p className="text-gray-400">Get started with your free account</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-400 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-5 h-5 text-gray-500 group-focus-within:text-[#667eea] transition-colors" />
                  </div>
                  <input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all outline-none text-white placeholder-gray-500"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-400 mb-2">
                  Business Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Building2 className="w-5 h-5 text-gray-500 group-focus-within:text-[#667eea] transition-colors" />
                  </div>
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all outline-none text-white placeholder-gray-500"
                    placeholder="Acme Inc."
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-500 group-focus-within:text-[#667eea] transition-colors" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all outline-none text-white placeholder-gray-500"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="group">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-[#667eea] transition-colors" />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all outline-none text-white placeholder-gray-500"
                    placeholder="Min. 6 characters"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-500 group-focus-within:text-[#667eea] transition-colors" />
                  </div>
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-12 py-3.5 bg-white/5 border border-white/10 rounded-xl focus:bg-white/10 focus:border-[#667eea] focus:ring-2 focus:ring-[#667eea]/20 transition-all outline-none text-white placeholder-gray-500"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-500 hover:text-gray-300 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={acceptTerms}
                  onChange={(e) => setAcceptTerms(e.target.checked)}
                  className="w-4 h-4 mt-1 rounded border-white/10 bg-white/5 text-[#667eea] focus:ring-[#667eea] focus:ring-offset-0 transition-colors"
                />
                <span className="ml-2 text-sm text-gray-400">
                  I agree to the{' '}
                  <a href="/terms" className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent hover:opacity-80 transition-opacity">
                    Privacy Policy
                  </a>
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 px-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-[#667eea]/30 hover:-translate-y-0.5 focus:ring-4 focus:ring-[#667eea]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></span>
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-center text-gray-400 text-sm">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="bg-gradient-to-r from-[#667eea] to-[#f093fb] bg-clip-text text-transparent hover:opacity-80 transition-opacity font-semibold"
                >
                  Sign in →
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-20px) translateX(10px); }
          50% { transform: translateY(-10px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(15px); }
        }

        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        .animate-slideUpFadeIn {
          animation: slideUpFadeIn 0.6s ease-out forwards;
        }

        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
      `}</style>
    </div>
  );
};
