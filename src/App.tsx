import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
/* import AdminHeader from './assets/admin-header.tsx';
import PatientHeader from './assets/patient-header.tsx'; */
import Footer from './assets/footer.tsx';
import Home from './assets/homepage.tsx';
import Contact from './assets/contact-us.tsx';
import Admin from './assets/admin.tsx';
/* import DentCareSL from './assets/dentcare-service-listings.tsx';
import LaboratorySL from './assets/laboratory-service-listings.tsx'; */
import Auth from './assets/login.tsx';
import AboutUs from './assets/about-us.tsx';
import Patient from './assets/patient.tsx';
import Header from './assets/header.tsx';
import ServiceListings from './assets/services.tsx';

function App() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverToggle = () => {
    setIsPopoverOpen(prevState => !prevState);
  };

  return (
    <Router>
      {!isPopoverOpen && <Header onPopoverToggle={handlePopoverToggle} />}
      
      {/* Define Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/homepage" element={<Home />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/admin" element={<Admin onScheduleClick={undefined} onPatientInfoClick={undefined} />} />
        {/* <Route path="/dentcare-service-listings" element={<DentCareSL />} />
        <Route path="./assets/laboratory-service-listings" element={<LaboratorySL />} /> */}
        <Route path="/services" element={<ServiceListings />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
