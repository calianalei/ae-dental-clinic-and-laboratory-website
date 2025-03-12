import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './media/logo.png';
import user from './media/user.png';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import './style.css';

function Header({
  }: {
  type?: "admin" | "patient";
  onPopoverToggle?: () => void;
  onScheduleClick?: () => void;
  onPatientInfoClick?: () => void;
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate(); // ✅ Hook to handle navigation

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="container">
      <div className="left">
        <Link to="/homepage"><img src={logo} alt="Logo" /></Link>
        <h1> AE DENTAL CLINIC & LABORATORY</h1>
      </div>
      <div className="right">
        <Menubar className="menubar">
          <MenubarMenu>
            <MenubarTrigger onClick={() => navigate("/about-us")}>About</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => navigate("/services")}>Services</MenubarTrigger>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger onClick={() => navigate("/contact-us")}>Contact Us</MenubarTrigger>
          </MenubarMenu>
        </Menubar>

        <div className="login">
          <Menubar className="menu">
            <MenubarMenu>
              <MenubarTrigger onClick={handleMenuToggle}>
                <img src={user} alt="User Avatar" className="user-icon" />
              </MenubarTrigger>
              {openMenu && (
                <MenubarContent>
                  <MenubarItem onClick={() => navigate("/login")}>Login</MenubarItem>
                  <MenubarItem onClick={() => navigate("/patient")}>Patient</MenubarItem>
                  <MenubarItem onClick={() => navigate("/admin")}>Admin</MenubarItem>
                </MenubarContent>
              )}
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  );
}

export default Header;
