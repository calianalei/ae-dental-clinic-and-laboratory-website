"use client";
import "./start.css";
import clinicImage from "./media/clinic.jpeg";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Define types for the props
interface AuthComponentProps {
  switchToLogin?: () => void;
  switchToSignup?: () => void;
  switchToForgotPassword?: () => void;
}

// Login Component
function Login({ switchToSignup, switchToForgotPassword }: AuthComponentProps) {
  console.log("Rendering Login");
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
              <Input type="email" placeholder="E-mail" className="mb-2" />
              <Input type="password" placeholder="Password" className="mb-2" />
              <Button className="w-full" variant="default">
                LOGIN
              </Button>
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
  console.log("Rendering Signup");
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
              <Input type="text" placeholder="Name" className="mb-2" />
              <Input type="email" placeholder="E-mail" className="mb-2" />
              <Input type="password" placeholder="Password" className="mb-2" />
              <Input type="password" placeholder="Repeat Password" className="mb-2" />
              <Button className="w-full" variant="default">
                CREATE
              </Button>
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
  console.log("Rendering ForgotPassword");
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
              <Input type="email" placeholder="E-mail" className="mb-2" />
              <Input type="password" placeholder="New Password" className="mb-2" />
              <Input type="password" placeholder="Re-enter New Password" className="mb-2" />
              <Button className="w-full" variant="default">
                RESET PASSWORD
              </Button>
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

// Main Component to switch between Login, Signup, and ForgotPassword
function AuthPage() {
  const [view, setView] = useState<"login" | "signup" | "forgotPassword">("login");
  console.log("Current view: ", view);

  const switchToLogin = () => setView("login");
  const switchToSignup = () => setView("signup");
  const switchToForgotPassword = () => setView("forgotPassword");

  const renderComponent = () => {
    switch (view) {
      case "login":
        return <Login switchToSignup={switchToSignup} switchToForgotPassword={switchToForgotPassword} />;
      case "signup":
        return <Signup switchToLogin={switchToLogin} />;
      case "forgotPassword":
        return <ForgotPassword switchToLogin={switchToLogin} switchToSignup={switchToSignup} />;
      default:
        return <Login switchToSignup={switchToSignup} switchToForgotPassword={switchToForgotPassword} />;
    }
  };

  return <div>{renderComponent()}</div>;
}

export default AuthPage;