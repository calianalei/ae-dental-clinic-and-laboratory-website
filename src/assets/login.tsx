"use client";
import "./start.css";
import clinicImage from "./media/clinic.jpeg";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from 'react-router-dom';

// Define types for the props
interface AuthComponentProps {
  switchToLogin?: () => void;
  switchToSignup?: () => void;
  switchToForgotPassword?: () => void;
  onLogin?: (role: 'admin' | 'patient') => void; // Add onLogin prop
}

const API_BASE_URL = "http://localhost:5000/auth";

// Login Component
function Login({ switchToSignup, switchToForgotPassword, onLogin }: AuthComponentProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); 

  const handleLogin = async () => {
    if (email === 'aeadmin@gmail.com' && password === 'admin123') {
      localStorage.setItem('userToken', 'admin-token');
      localStorage.setItem('userRole', 'admin');
      onLogin?.('admin'); // Call onLogin if it exists
      navigate('/admin');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('userToken', data.token); // Assuming the backend returns a token
        localStorage.setItem('userRole', 'patient');
        onLogin?.('patient'); // Call onLogin if it exists
        navigate('/patient'); 
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="auth-container">
      <Card className="card-container">
        <CardContent className="card-content">
          <div className="image-container">
            <img src={clinicImage} alt="Dental Clinic" className="image" />
          </div>
          <div className="form-container">
            <h2 className="header-text">Login</h2>
            <div className="input-container">
              <Input type="email" placeholder="E-mail" className="mb-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Input type="password" placeholder="Password" className="mb-2" value={password} onChange={(e) => setPassword(e.target.value)}/>
              <Button className="w-full" variant="default" onClick={handleLogin}>
                LOGIN
              </Button>
              {message && <p>{message}</p>}
            </div>
            <div className="footer-text">
              <Button onClick={switchToForgotPassword} variant="link">
                Forgot Password?
              </Button>
              <Button onClick={switchToSignup} variant="link">
                Create an Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Signup Component
function Signup({ switchToLogin }: AuthComponentProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contactnumber, setContactNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [message, setMessage] = useState("");

  const handleSignup = async () => {
    if (password !== repeatPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, contactnumber, birthday, password }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Account created successfully!");
      } else {
        setMessage(data.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      setMessage("Network error. Please check your connection.");
    }
  };

  return (
    <div className="auth-container">
      <Card className="card-container">
        <CardContent className="card-content">
          <div className="image-container">
            <img src={clinicImage} alt="Dental Clinic" className="image" />
          </div>
          <div className="form-container">
            <h2 className="header-text">Signup</h2>
            <div className="input-container">
              <Input type="text" placeholder="Name" className="mb-2" value={name} onChange={(e) => setName(e.target.value)}/>
              <Input type="email" placeholder="E-mail" className="mb-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Input type="text" placeholder="Contact Number" value={contactnumber} onChange={(e) => setContactNumber(e.target.value)} className="mb-2" />
              <Input type="date" placeholder="Birthdate" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="mb-2" />
              <Input type="password" placeholder="Password" className="mb-2" value={password} onChange={(e) => setPassword(e.target.value)} />
              <Input type="password" placeholder="Repeat Password" className="mb-2" value={repeatPassword} onChange={(e) => setRepeatPassword(e.target.value)}/>
              <Button className="w-full" variant="default" onClick={handleSignup}>
                CREATE
              </Button>
              {message && <p>{message}</p>}
            </div>
            <div className="footer-text">
              <Button onClick={switchToLogin} variant="link">
                Already have an account? Login
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Forgot Password Component
function ForgotPassword({ switchToLogin, switchToSignup }: AuthComponentProps) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage("Password reset successfully! You can now log in.");
      } else {
        setMessage(data.message || "Password reset failed.");
      }
    } catch (error) {
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <Card className="card-container">
        <CardContent className="card-content">
          <div className="image-container">
            <img src={clinicImage} alt="Dental Clinic" className="image" />
          </div>
          <div className="form-container">
            <h2 className="header-text">Forgot Password</h2>
            <div className="input-container">
              <Input type="email" placeholder="E-mail" className="mb-2" value={email} onChange={(e) => setEmail(e.target.value)}/>
              <Input type="password" placeholder="New Password" className="mb-2" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}/>
              <Input type="password" placeholder="Re-enter New Password" className="mb-2" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
              <Button className="w-full" variant="default" onClick={handleResetPassword}>
                RESET PASSWORD
              </Button>
              {message && <p>{message}</p>}
            </div>
            <div className="footer-text">
              <Button onClick={switchToLogin} variant="link">
                Remembered your password? Login
              </Button>
              <Button onClick={switchToSignup} variant="link">
                Create an Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AuthPage({ onLogin }: { onLogin?: (role: 'admin' | 'patient') => void }) {
  const [view, setView] = useState<"login" | "signup" | "forgotPassword">("login");

  const switchToLogin = () => setView("login");
  const switchToSignup = () => setView("signup");
  const switchToForgotPassword = () => setView("forgotPassword");

  const renderComponent = () => {
    switch (view) {
      case "login":
        return (
          <Login
            switchToSignup={switchToSignup}
            switchToForgotPassword={switchToForgotPassword}
            onLogin={onLogin} // Pass onLogin to Login
          />
        );
      case "signup":
        return <Signup switchToLogin={switchToLogin} />;
      case "forgotPassword":
        return (
          <ForgotPassword
            switchToLogin={switchToLogin}
            switchToSignup={switchToSignup}
          />
        );
      default:
        return (
          <Login
            switchToSignup={switchToSignup}
            switchToForgotPassword={switchToForgotPassword}
            onLogin={onLogin} // Pass onLogin to Login
          />
        );
    }
  };

  return <div>{renderComponent()}</div>;
}

export default AuthPage;
