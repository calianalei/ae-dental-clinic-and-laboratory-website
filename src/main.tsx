import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Header from './assets/header.tsx'
import Footer from './assets/footer.tsx'
import Home from './assets/homepage.tsx'
import Contact from './assets/contact-us.tsx'
import LaboratorySL from './assets/laboratory-service-listings.tsx'
import Admin from './assets/admin.tsx'
import DentCareSL from './assets/dentcare-service-listings.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <Header />
      <DentCareSL />
      <Footer />
    </>
    
  </StrictMode>,
)
