import { Link, useNavigate } from 'react-router-dom';
import './style.css'
import logo from './media/logo.png'
import { Button } from "@/components/ui/button"

function Footer() {
    const navigate = useNavigate(); // ✅ Hook to handle navigation

    // Fixing the type for the parameter
    const handleNavigation = (path: string) => {
        navigate(path); // Navigate to the selected page
        window.scrollTo(0, 0); // Scroll to the top of the page
    };

    return (
        <div className="footer">
            <div className="fleft">
                <Link to="/homepage"><img src={logo} alt="Logo" /></Link>
                <h1>AE DENTAL CLINIC & LABORATORY</h1>
                <p>Formerly Arnel B. Rivera Laboratory & General Merchandise</p>
            </div>
            <div className="fright">
                <div className="nav-buttons">
                    <Button onClick={() => handleNavigation("/homepage")}>Home</Button>
                    <Button onClick={() => handleNavigation("/about-us")}>About</Button>
                    <Button onClick={() => handleNavigation("/contact-us")}>Contact Us</Button>
                    <Button onClick={() => handleNavigation("/services")}>Services</Button>
                </div>
            </div>
        </div>
    )
}

export default Footer;
