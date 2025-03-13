import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './media/logo.png';
import user from './media/user.png';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";
import './style.css';

interface HeaderProps {
  type?: 'admin' | 'patient' | null; // Allow null as a type
  isLoggedIn: boolean;
  onSignOut: () => void;
  onPopoverToggle?: () => void;
}

function Header({ type, isLoggedIn, onSignOut }: HeaderProps) {
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
  };

  const handleSignOut = () => {
    onSignOut(); // Call the sign-out handler from props
    navigate('/homepage'); // Redirect to homepage
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
                  {/* Conditionally render Login/Sign Out */}
                  {isLoggedIn ? (
                    <MenubarItem onClick={handleSignOut}>Sign Out</MenubarItem>
                  ) : (
                    <MenubarItem onClick={() => navigate("/login")}>Login</MenubarItem>
                  )}

                  {/* Conditionally render Patient/Admin menu items */}
                  {type === 'admin' && (
                    <MenubarItem onClick={() => navigate("/admin")}>Admin</MenubarItem>
                  )}
                  {type === 'patient' && (
                    <MenubarItem onClick={() => navigate("/patient")}>Patient</MenubarItem>
                  )}
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