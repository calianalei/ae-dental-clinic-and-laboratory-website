import { useState } from 'react';
import Header from './assets/admin-header.tsx'
import Footer from './assets/footer.tsx'
import Home from './assets/homepage.tsx'
import Contact from './assets/contact-us.tsx'
import LaboratorySL from './assets/laboratory-service-listings.tsx'
import Admin from './assets/admin.tsx'
import DentCareSL from './assets/dentcare-service-listings.tsx'
import Auth from './assets/login.tsx'
import AboutUs from './assets/about-us.tsx'
import Patient from './assets/patient.tsx'
import PatientHeader from './assets/patient-header.tsx'

function App() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverToggle = () => {
    setIsPopoverOpen(prevState => !prevState);
  };

  return (
    <>
      {!isPopoverOpen && <Header onPopoverToggle={handlePopoverToggle} />}
      <Patient />
      <Footer />
    </>
  );
}

export default App;
