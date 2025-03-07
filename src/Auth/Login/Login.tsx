import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../AuthProvider/AuthContext';

import axios, { AxiosError } from 'axios'; 
const Login: React.FC = () => {
    const { signinUser, googleLogin, loading } = useAuth();
    const [googleLoading, setGoogleLoading] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passError, setPassError] = useState<string>(''); // State to handle password error
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        if (loading) return;
        try {
            await signinUser(email, password);
            navigate('/'); // Navigate to home page after successful login
        } catch (error) {
            console.error('Login error:', error);
            setPassError('Invalid email or password'); // Set error message for invalid login
        }
    };

   // Import AxiosError

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        try {
            const user = await googleLogin(); // Capture the user data
            console.log("Logged-in user:", user?.user?.displayName);
    
            // Attempt to register the user
            const response = await axios.post("https://share-trip-serverv1.vercel.app/api/users/register", {
                name: user?.user?.displayName,
                email: user?.user?.email,
                password: '12345' // Default password or handle it as needed
            });
    
            // If registration is successful (201)
            navigate("/"); // Navigate to home after successful registration
    
        } catch (error) {
            const axiosError = error as AxiosError; // Assert the type
    
            if (axiosError.response && axiosError.response.status === 400) {
                // User already exists, log them in
                console.log("User already exists, logging in...");
                navigate("/"); // Navigate to home since user is considered logged in
            } else {
                setPassError("Google login failed. Try again.");
                console.error("Google login error:", axiosError);
            }
        } finally {
            setGoogleLoading(false);
        }
    };
    
    

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border border-blue-300">
                <h2 className="text-2xl font-bold text-blue-600 mb-2 text-center">Please Sign in</h2>
                <p className="text-gray-600 text-center text-base mb-2">
                    You need to Sign in first to continue
                </p>
                {passError && <p className="text-red-500 text-center">{passError}</p>} {/* Error message display */}
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
                    disabled={googleLoading || loading} // Disable if Google login is loading or regular login is ongoing
                >
                    {googleLoading ? 'Logging in with Google...' : 'Login with Google'}
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
