import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Use axios for backend requests
import { toast } from "sonner"; // Import Sonner Toast
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState(""); // State for storing email
    const [password, setPassword] = useState(""); // State for storing password
    const navigate = useNavigate(); // Hook for navigation after login

    // Function to handle form submission
    // const handleLogin = async (e) => {
    // 	e.preventDefault(); // Prevent page reload on form submit
    //
    // 	try {
    // 		const res = await axios.post("http://localhost:5000/api/auth/login", {
    // 			// Adjust with your backend login endpoint
    // 			email,
    // 			password,
    // 		});
    //
    // 		const { token, user } = res.data;
    //
    // 		// Store JWT token in localStorage
    // 		localStorage.setItem("token", token);
    // 		localStorage.setItem("user", user);
    //
    // 		// Show success message and redirect to dashboard after successful login
    // 		toast.success("Login successful! Redirecting to dashboard...");
    // 		navigate("/dashboard");
    // 	} catch (err) {
    // 		toast.error("Login failed. Please check your credentials."); // Show error message if login fails
    // 		console.log(err);
    // 	}
    // };
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        try {
            const res = await axios.post("http://localhost:5000/api/auth/login", {
                // Adjust with your backend login endpoint
                email,
                password,
            });

            const { token, user } = res.data;

            // Store JWT token, name, and email in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("name", user.name);
            localStorage.setItem("email", user.email);

            // Show success message and redirect to dashboard after successful login
            toast.success("Login successful! Redirecting to dashboard...");
            navigate("/dashboard");
        } catch (err) {
            toast.error("Login failed. Please check your credentials."); // Show error message if login fails
            console.log(err);
        }
    };


    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Login</h2>
                <p>Enter your email and password to login.</p>
                <form onSubmit={handleLogin}>
                    {" "}
                    {/* Add event handler on form submit */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter Email"
                            required
                            value={email} // Bind email state to input
                            onChange={(e) => setEmail(e.target.value)} // Update state on input change
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                            required
                            value={password} // Bind password state to input
                            onChange={(e) => setPassword(e.target.value)} // Update state on input change
                        />
                    </div>
                    <div className="login-btn-container">
                        <button type="submit" className="login-btn">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
