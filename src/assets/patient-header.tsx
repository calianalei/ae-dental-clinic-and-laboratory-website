import './style.css'
import logo from './media/logo.png'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar"
import { useState } from 'react'
import user from './media/user.png'

function PatientHeader({
  onScheduleClick,
  onPatientInfoClick
}: {
  onScheduleClick: () => void;
  onPatientInfoClick: () => void;
}) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="container">
      <div className="left">
        <img src={logo} alt="Logo" />
        <h1> AE DENTAL CLINIC & LABORATORY</h1>
      </div>        
      <div className="right">
        <Menubar className="menubar">
          <MenubarMenu>
            <MenubarTrigger>About</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Services</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                Dental Care Services
              </MenubarItem>
              <MenubarItem>
                Laboratory Services
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Contact Us</MenubarTrigger>
          </MenubarMenu>
        </Menubar>
        
        <div className="login">
          <img src={user} alt="User Avatar" onClick={handleMenuToggle} className="user-icon" />
        </div>
      </div>
    </div>
  )
}

export default PatientHeader;
