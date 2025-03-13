import './about-us.css'
import {
    Drawer,
    DrawerTrigger,
} from "@/components/ui/drawer";
import doctor2 from './media/doctor-2.jpg'
import idPicture from './media/id-pic.png'
import inside from './media/inside-pic.jfif'
import waitingArea from './media/waiting-area.jfif'
import receptionArea from './media/reception-area.jfif'
import waitingReceptionArea from './media/waiting-reception-area.jfif'
import inside2 from './media/inside2.jfif'


function AboutUs (){
    const clinic = [
        { name: "Aira Nazel", image: `url(${idPicture})` },
        { name: "Edyui Raibo", image: `url(${idPicture})` },
        ];
      const lab = [
        { name: "Ramil Quibuyen", image: `url(${idPicture})` },
        { name: "Jelan Niepangui", image: `url(${idPicture})` },
        { name: "Jeffrey Adsuara", image: `url(${idPicture})` },
        { name: "Bryan Gonzales", image: `url(${idPicture})` },
        { name: "Jopie Retayco", image: `url(${idPicture})` },
        { name: "Stephen Delos Santos", image: `url(${idPicture})` },
      ];

      const facilities = [
        { image: `url(${inside})` },
        { image: `url(${waitingArea})` },
        { image: `url(${receptionArea})` },
        { image: `url(${waitingReceptionArea})` },
        { image: `url(${inside2})` },
      ]
      
    return(
        <div className="about">
             <h1>Our Doctors</h1>
            <p>
                Our professional doctors are dedicated to providing great care while guaranteeing each patient's 
                well-being and comfort. They collaborate to provide exceptional healthcare with compassion and 
                professionalism, drawing on experience from a variety of professions.
            </p>
            <div className="collage2">
            <div className="row3">
                <Drawer>
                <DrawerTrigger>
                    <div className="image-placeholder">
                        <img src={idPicture} style={{width: '100%', height: '100%'}}></img>
                    </div>
                    <div className="name">
                    <h3>Arnel B. Rivera</h3>
                    </div>
                    <div className="position">
                    <h4>Dentist</h4>
                    </div>
                </DrawerTrigger>
                </Drawer>
                <Drawer>
                <DrawerTrigger>
                    <div className="image-placeholder">
                        <img src={doctor2} style={{width: '100%', height: '100%'}}></img>
                    </div>
                    <div className="name">
                    <h3>Elishar C. Rivera</h3>
                    </div>
                    <div className="position">
                    <h4>Dentist</h4>
                    </div>
                </DrawerTrigger>
                </Drawer>
            </div>
            </div>

            <h2>Clinic StaffF</h2>
                <div className="collage2">
                <div className="row3">
                    {clinic.map((staff, index) => (
                    <Drawer key={index}>
                        <DrawerTrigger>
                        <div
                            className="image-placeholder2"
                            style={{ backgroundImage: staff.image }}
                        >
                            <div className="texts">
                            <h3>{staff.name}</h3>
                            </div>
                        </div>
                        </DrawerTrigger>
                    </Drawer>
                    ))}
                </div>
                </div>

            <h2>Laboratory Staff</h2>
                <div className="collage2">
                <div className="row3">
                    {lab.map((staff, index) => (
                    <Drawer key={index}>
                        <DrawerTrigger>
                        <div
                            className="image-placeholder2"
                            style={{ backgroundImage: staff.image }}
                        >
                            <div className="texts">
                            <h3>{staff.name}</h3>
                            </div>
                        </div>
                        </DrawerTrigger>
                    </Drawer>
                    ))}
                </div>
                </div>


                <h1>Our Facilities</h1>
                    <div className="collage2">
                    <div className="row3">
                        {facilities.slice(0, 3).map((facility, index) => (
                        <Drawer key={index}>
                            <DrawerTrigger>
                            <div
                                className="image-placeholder3"
                                style={{ backgroundImage: facility.image }}
                            ></div>
                            </DrawerTrigger>
                        </Drawer>
                        ))}
                    </div>
                    <div className="row4">
                        {facilities.slice(3, 8).map((facility, index) => (
                        <Drawer key={index}>
                            <DrawerTrigger>
                            <div
                                className="image-placeholder3"
                                style={{ backgroundImage: facility.image }}
                            ></div>
                            </DrawerTrigger>
                        </Drawer>
                        ))}
                    </div>
                    </div>

        </div>
       
    )
}

export default AboutUs

