import { useState } from 'react';
import logo from './media/logo.png';
import user from './media/user.png';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "@/components/ui/menubar";

function Header({ onPopoverToggle }: { onPopoverToggle: () => void }) {
  const [openMenu, setOpenMenu] = useState(false);

  const handleMenuToggle = () => {
    setOpenMenu(!openMenu);
    onPopoverToggle(); // This will toggle the visibility of the header
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
            <MenubarContent className="menubarcontent">
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
          <Menubar className="menu">
            <MenubarMenu>
              <MenubarTrigger onClick={handleMenuToggle}>
                <img src={user} alt="User Avatar" />
              </MenubarTrigger>
              {openMenu && (
                <MenubarContent>
                  <MenubarItem>Schedule</MenubarItem>
                  <MenubarItem>Patient Info & History</MenubarItem>
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
