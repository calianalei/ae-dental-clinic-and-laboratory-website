import './contact-us.css'
import { Textarea } from "@/components/ui/textarea"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import phone from './media/phone.png'
import mail from './media/envelope.png'


function Contact() {
    return (
        <div className="contact">
            <div className="top">
                <div className="form-container">
                    <form className="form">
                        <div className="form-group">
                        <Input type="text" id="name" name="name" placeholder="Name" required />
                        <Input type="text" id="subject" name="subject" placeholder="Subject" required />
                        <Textarea id="message" name="message" placeholder="Message"/>
                        </div>
                        <Button type="submit">Send Email</Button>
                    </form>
                </div>
                <div className="text">
                    <h1>We Would Like To <br/> Hear From You</h1>
                    <p>Let us know how we can help! Fill out the form below, 
                        and our team will get back to you as soon as possible.</p>
                </div>
            </div>
            <div className="bot">
                <div className="left">
                    <div className="operating-hours">
                        <h2>Operating Hours</h2>
                        <h3>Monday - Saturday</h3>
                        <p>8:30am - 5:00pm</p>
                        <h3>Sunday</h3>
                        <p>8:30am - 12:00pm</p>
                    </div>
                    <div className="contact-details">
                        <div className="phone">
                            <div><img src={phone} /></div>
                            <div className="phone-list">
                                <h3>Contact Number</h3>
                                <ul>
                                    <li>09123456789</li>
                                    <li>09123456789</li>
                                </ul>
                            </div>
                        </div>
                        <div className="mail">
                            <div><img src={mail} /></div>
                            <div className="mail-list">
                                <h3>Email</h3>
                                <ul>
                                    <li>email@email.com</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="right">
                    <h2>Visit Us</h2>
                    <p>Located behind 7-Eleven in Moncada Public Market, Poblacion 1, Moncada, Tarlac</p>
                    <div className="map">
                    <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3840.266409131224!2d120.57192784134989!3d15.73703978495828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33913434cc0baa0d%3A0x40c130360fb126f6!2s7-Eleven!5e0!3m2!1sen!2sph!4v1739699252541!5m2!1sen!2sph"
                        width="600"
                        height="300"
                        style={{ border: "10px solid #383737" }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact