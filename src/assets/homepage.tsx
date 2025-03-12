import './home.css'
import { Button } from "@/components/ui/button"
import smile from './media/smiling-girl.png' /*https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fwoman-smiling-showing-teeth&psig=AOvVaw14pXQThTiWtEBOMZUTuiZ0&ust=1739763346213000&source=images&cd=vfe&opi=89978449&ved=0CBcQjhxqFwoTCJDOgOGhx4sDFQAAAAAdAAAAABAE*/
import lab from './media/lab.png' /*https://www.bolton.ac.uk/blogs/behind-the-scenes-of-dental-laboratories*/
import dental from './media/dental-care.jpg' /*https://parthadental.com/10-besdental-care-tips-to-improve-your-health/*/
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home">
            <div className="top">
                <div className="top-text">
                    <h1> Where <em>Artistry</em> <br />meets <em>Dentistry</em></h1>
                    <h3> Bringing precision and creativity to every smile. </h3>
                </div>
                <div className="circle-background">
                    <img src={smile} alt="Smiling Girl" /> 
                </div>
            </div>
            <div className="mid">
                    <h2>Dedicated to Your Smile, <br />Committed to Excellence</h2>
                    <p>At AE Dental Clinic & Laboratory, we combine expert dental care with
                        innovative laboratory services to provide a comprehensive approach
                        to your oral health. With a team of skilled professionals, we are
                        dedicated to delivering the highest standards of care in a comfortable
                        and welcoming environment. Whether you're visiting for routine check-ups
                        or specialized treatments, your smile is in good hands.</p>
                    <Button>About Us</Button>
            </div>
            <div className="bot">
                <div className="nav-pics">
                    <div className="circle-design1"></div>
                    <div className="circle-design2"></div> 
                        <div className="circle-bg">
                            <img src={dental} alt="Dental Image" />
                            <Link to="/services#dental"><div className="hover-text">Dental Care Services</div></Link>
                        </div>
                        <div>
                            <img src={lab} alt="Lab Image" />
                            <Link to="/services#laboratory"><div className="hover-text">Laboratory Services</div></Link>
                        </div>  
                </div>
                <div className="bot-text">
                    <h2>What Can We Do For You?</h2>
                    <p>From routine check-ups to specialized treatments, AE Dental Clinic
                        & Laboratory is here to address all your dental and laboratory needs.                            
                        Our expert team is committed to ensuring your comfort while providing
                        the highest level of care and service.</p>
                </div>
            </div>
        </div>
    )
}

export default Home