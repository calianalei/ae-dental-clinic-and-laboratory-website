import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Footer from './assets/footer.tsx';
import Home from './assets/homepage.tsx';
import Contact from './assets/contact-us.tsx';
import Admin from './assets/admin.tsx';
import Auth from './assets/login.tsx';
import AboutUs from './assets/about-us.tsx';
import Patient from './assets/patient.tsx';
import Header from './assets/header.tsx';
import ServiceListings from './assets/services.tsx';

function App() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userType, setUserType] = useState<'admin' | 'patient' | null>(null); // Track user type

  // Check login status on component mount
  useEffect(() => {
    const token = localStorage.getItem('userToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsLoggedIn(true);
      setUserType(role as 'admin' | 'patient');
    }
  }, []);

  const handlePopoverToggle = () => {
    setIsPopoverOpen(prevState => !prevState);
  };

  const handleLogin = (role: 'admin' | 'patient') => {
    setIsLoggedIn(true);
    setUserType(role);
  };

  const handleSignOut = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRole');
    setIsLoggedIn(false);
    setUserType(null);
  };

  return (
    <Router>
      {!isPopoverOpen && (
        <Header
          type={userType} // Pass userType (can be 'admin', 'patient', or null)
          isLoggedIn={isLoggedIn} // Pass login status
          onSignOut={handleSignOut} // Pass sign-out handler
          onPopoverToggle={handlePopoverToggle} // Pass popover toggle handler
        />
      )}

      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/admin" element={<Admin onScheduleClick={undefined} onPatientInfoClick={undefined} />} />
        <Route path="/services" element={<ServiceListings />} />
        <Route
          path="/login"
          element={<Auth onLogin={handleLogin} />} // Pass login handler to Auth
        />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;