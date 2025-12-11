import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone || phone.length < 10) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStep('otp');
    setLoading(false);
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) return;
    
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setLoading(false);
    // Handle successful login
    onLogin();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-gray-900 dark:to-gray-800">
      <div className="flex min-h-screen">
        {/* Left Side - Geographic Image/Illustration */}
        <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(var(--primary))] to-primary">
            <div className="absolute inset-0 bg-black/20"></div>
            {/* Geometric patterns */}
            <div className="absolute top-20 left-20 w-32 h-32 rounded-full border-2 border-white/30"></div>
            <div className="absolute top-40 right-32 w-24 h-24 rotate-45 border-2 border-white/20"></div>
            <div className="absolute bottom-32 left-32 w-40 h-40 rounded-full bg-white/10"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 rotate-12 border-2 border-white/25"></div>
            
            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full px-16 text-white">
              <div className="max-w-lg">
                <h1 className="text-5xl font-bold leading-tight mb-6 text-white">
                  Your Financial Wellness Partner
                </h1>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  Access banking and financial services seamlessly within your work ecosystem. 
                  Get personalized financial products based on your profile.
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Secure Banking</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Instant Loans</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm">Smart Savings</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex w-full lg:w-1/2 xl:w-2/5">
          <div className="flex flex-col justify-center w-full px-8 sm:px-16 lg:px-20">
            <div className="w-full max-w-md mx-auto">
              {/* Logo/Brand */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-foreground">Welcome Back</h2>
                <p className="text-muted-foreground mt-2">
                  Sign in to access your financial wellness dashboard
                </p>
              </div>

              {/* Login Form */}
              {step === 'phone' ? (
                <form onSubmit={handleSendOTP} className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium leading-none text-foreground">
                      Mobile Number
                    </label>
                    <Input
                      type="tel"
                      placeholder="Enter your 10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      required
                      autoFocus
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || phone.length < 10}
                  >
                    {loading ? "Sending OTP..." : "Send OTP"}
                  </Button>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      By continuing, you agree to our Terms of Service and Privacy Policy
                    </p>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleVerifyOTP} className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-4">
                      We've sent a 6-digit OTP to <span className="font-medium">+91 {phone}</span>
                    </p>
                    <div className="space-y-2">
                      <label className="text-sm font-medium leading-none text-foreground">
                        Enter OTP
                      </label>
                      <Input
                        type="text"
                        placeholder="000000"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        required
                        maxLength={6}
                        autoFocus
                      />
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={loading || otp.length < 6}
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep('phone')}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      ← Change number
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSendOTP({ preventDefault: () => {} } as any)}
                      className="text-sm text-primary hover:text-primary/80"
                    >
                      Resend OTP
                    </button>
                  </div>
                </form>
              )}

              {/* Footer */}
              <div className="mt-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Powered by{" "}
                  <span className="font-semibold text-primary">Kotak811</span>{" "}
                  & <span className="font-semibold text-primary/80">Tartan</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

