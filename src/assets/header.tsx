import './style.css'
import logo from './media/logo.png'
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"



function Header() {
    return (
      <div className="container">
        <div className="left">
          <img src={logo} />
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
            <Button>Login</Button>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          
        </div>
      </div>
    )
  }
  
  export default Header