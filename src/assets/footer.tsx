import './style.css'
import logo from './media/logo.png'
import { Button } from "@/components/ui/button"

function Footer() {
    return (
        <div className="footer">
            <div className="fleft">
                <img src={logo} />
                <h1>AE DENTAL CLINIC & LABORATORY</h1>
                <p>Formerly Arnel B. Rivera Laboratory & General Merchandise</p>
            </div>
            <div className="fright">
                <div className="nav-buttons">
                    <Button>Home</Button>
                    <Button>About</Button>
                    <Button>Contact Us</Button>
                    <div className="nav-services">
                        <h5>Services</h5>
                        <Button>Dental Care Services</Button>
                        <Button>Laboratory Services</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer