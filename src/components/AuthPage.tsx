import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Chrome, Facebook, Apple } from 'lucide-react';

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  email?: string;
  username?: string;
  password?: string;
  confirmPassword?: string;
}

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Username validation (only for signup)
    if (!isLogin && !formData.username) {
      newErrors.username = 'Username is required';
    } else if (!isLogin && formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation (only for signup)
    if (!isLogin && !formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    console.log(isLogin ? 'Login' : 'Signup', formData);
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      username: '',
      password: '',
      confirmPassword: ''
    });
    setErrors({});
  };

  const socialLoginHandler = (provider: string) => {
    console.log(`${provider} login clicked`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Background 3D shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-20 animate-pulse transform rotate-12"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-gradient-to-r from-purple-200 to-pink-200 rounded-lg opacity-15 animate-bounce transform -rotate-12"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-cyan-200 to-blue-200 rounded-full opacity-25 animate-pulse"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-gradient-to-r from-indigo-200 to-purple-200 rounded-lg opacity-20 animate-bounce transform rotate-45"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md">
          {/* Logo/Branding */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg transform hover:scale-105 transition-all duration-300">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded"></div>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Welcome Back</h1>
            <p className="text-gray-600 mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your new account'}
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 transform transition-all duration-500 hover:shadow-3xl backdrop-blur-sm border border-white/20 relative overflow-hidden">
            {/* Card glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 rounded-3xl"></div>
            
            <div className="relative z-10">
              {/* Toggle Buttons */}
              <div className="flex bg-gray-100 rounded-2xl p-1 mb-6 relative">
                <div
                  className={`absolute top-1 bottom-1 rounded-xl bg-white shadow-lg transition-all duration-300 ${
                    isLogin ? 'left-1 right-1/2' : 'left-1/2 right-1'
                  }`}
                ></div>
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${
                    isLogin ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 text-sm font-medium rounded-xl transition-all duration-300 relative z-10 ${
                    !isLogin ? 'text-blue-600' : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Sign Up
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 transition-all duration-300 transform
                      bg-gray-50 hover:bg-gray-100 focus:bg-white
                      ${errors.email 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }
                      hover:shadow-md focus:shadow-lg hover:-translate-y-0.5 focus:-translate-y-1
                    `}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.email}</p>
                  )}
                </div>

                {/* Username Input (Signup only) */}
                <div className={`relative group transition-all duration-300 overflow-hidden ${
                  isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
                }`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleInputChange('username')}
                    className={`block w-full pl-10 pr-3 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 transition-all duration-300 transform
                      bg-gray-50 hover:bg-gray-100 focus:bg-white
                      ${errors.username 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }
                      hover:shadow-md focus:shadow-lg hover:-translate-y-0.5 focus:-translate-y-1
                    `}
                  />
                  {errors.username && (
                    <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.username}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    className={`block w-full pl-10 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 transition-all duration-300 transform
                      bg-gray-50 hover:bg-gray-100 focus:bg-white
                      ${errors.password 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }
                      hover:shadow-md focus:shadow-lg hover:-translate-y-0.5 focus:-translate-y-1
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 hover:scale-110 transition-transform"
                  >
                    {showPassword ? 
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    }
                  </button>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password Input (Signup only) */}
                <div className={`relative group transition-all duration-300 overflow-hidden ${
                  isLogin ? 'max-h-0 opacity-0' : 'max-h-24 opacity-100'
                }`}>
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange('confirmPassword')}
                    className={`block w-full pl-10 pr-12 py-3 border-2 rounded-xl text-gray-900 placeholder-gray-500 
                      focus:outline-none focus:ring-0 transition-all duration-300 transform
                      bg-gray-50 hover:bg-gray-100 focus:bg-white
                      ${errors.confirmPassword 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-blue-500 hover:border-gray-300'
                      }
                      hover:shadow-md focus:shadow-lg hover:-translate-y-0.5 focus:-translate-y-1
                    `}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center z-10 hover:scale-110 transition-transform"
                  >
                    {showConfirmPassword ? 
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" /> : 
                      <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                    }
                  </button>
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600 animate-fadeIn">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Forgot Password (Login only) */}
                {isLogin && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-blue-600 hover:text-blue-500 font-medium hover:underline transition-all duration-200"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-xl font-medium
                    hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-blue-500/25
                    transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl
                    active:translate-y-0 active:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed
                    disabled:transform-none relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:animate-shimmer"></div>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    isLogin ? 'Sign In' : 'Create Account'
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Social Login Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => socialLoginHandler('Google')}
                    className="flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl
                      hover:border-red-300 hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-500/25
                      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <Chrome className="h-5 w-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                  </button>
                  <button
                    type="button"
                    onClick={() => socialLoginHandler('Facebook')}
                    className="flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl
                      hover:border-blue-300 hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-500/25
                      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <Facebook className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  </button>
                  <button
                    type="button"
                    onClick={() => socialLoginHandler('Apple')}
                    className="flex justify-center items-center py-3 px-4 border-2 border-gray-200 rounded-xl
                      hover:border-gray-400 hover:bg-gray-50 focus:outline-none focus:ring-4 focus:ring-gray-500/25
                      transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group"
                  >
                    <Apple className="h-5 w-5 text-gray-600 group-hover:text-gray-800 transition-colors" />
                  </button>
                </div>

                {/* Toggle Mode */}
                <div className="text-center mt-6">
                  <span className="text-gray-600 text-sm">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </span>
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="ml-2 text-blue-600 hover:text-blue-500 font-medium text-sm hover:underline transition-all duration-200"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 text-sm text-gray-500">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;