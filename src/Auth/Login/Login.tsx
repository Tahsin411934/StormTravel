import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/AuthContext';

const Login: React.FC = () => {
    const { signinUser, googleLogin, loading } = useAuth();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        try {
            await signinUser(email, password);
            navigate('/'); // Navigate to home page after successful login
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    const handleGoogleLogin = async () => {
        if (loading) return;
        try {
            await googleLogin();
            navigate('/'); // Navigate to home page after successful Google login
        } catch (error) {
            console.error('Google login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-blue-300">
                <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Please Sign in</h2>
                <p className="text-gray-600 text-center text-base mb-2">
                    You need to Sign in first to continue
                </p>
                <div className="flex items-center justify-between">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">Sign in</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
                <div className="flex items-center justify-between">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500">OR</span>
                    <hr className="flex-grow border-gray-300" />
                </div>
                <button
                    onClick={handleGoogleLogin}
                    className="w-full p-2 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Login with Google
                </button>
                <div className="text-center">
                    <p className="mt-4 text-sm text-gray-600">
                        New user?{' '}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
