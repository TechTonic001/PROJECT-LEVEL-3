import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import './Signup.css';

const Signup = () => {
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();
    const API_URL = `http://localhost:5630/api/auth/signup`;

    const handleSignUp = async () => {
        if (!username || !email || !password) {
            setError("Please fill all fields");
            return;
        }
        setError(null);
        setMessage(null)
        setLoading(true);
        try {
            const userData = { username, email, password }
            const response = await axios.post(API_URL, userData)
            localStorage.setItem("token", response.data.token);
            toast.success(response?.data?.message || "Signup successful!")
            navigate('/login')
        } catch (error) {
            setLoading(false);
            const message = error.response?.data?.message || "Signup failed!";
            console.log(message);
            setError(message);
            toast.error(message);
        }
        setLoading(false)
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Create your account</h2>
                </div>

                {error && (
                    <div className="error-message">{error}</div>
                )}

                <form className="signup-form" onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            type="text"
                            name="name"
                            autoComplete="name"
                            placeholder="Enter your name"
                            required
                            value={username}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            autoComplete="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            autoComplete="current-password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="signup-btn"
                    >
                        {loading ? 'Creating...' : 'Sign up'}
                    </button>
                    {message && <p className="success-message">{message}</p>}
                </form>
                <div className="signup-footer">
                    <p>
                        Already have an account?{' '}
                        <Link to="/login">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;