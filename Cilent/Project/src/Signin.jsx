import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signin.css';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5630/api/auth/signin';
import { toast } from 'react-toastify';

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = () => {
        if (loading) return;
        if (!email || !password) {
            toast.error('Please fill all fields');
            return;
        }
        setLoading(true);
        axios.post(API, {
            email,
            password
        })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                toast.success('Signed in successfully!');
                navigate('/page');
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response.data.message || 'Something went wrong, please try again.');
            })
            .finally(() => {
                setLoading(false);
            });
    }
    return (
        <div className="signin-container">
            <div className="signin-card">
                <div className="signin-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to manage your todos.</p>
                </div>
                <form className="signin-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {!showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="signin-btn"
                    >
                        {loading ? (
                            <>
                                <span className="spinner"></span>
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>
                </form>
                <div className="signin-footer">
                    <p>
                        Don't have an account?{' '}
                        <Link to='/signup'>Sign Up</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignIn;