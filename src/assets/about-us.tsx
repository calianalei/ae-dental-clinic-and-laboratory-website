import './about-us.css'
import {
    Drawer,
    DrawerTrigger,
} from "@/components/ui/drawer";

function AboutUs (){
    const clinic = [
        { name: "Staff 1", image: "url('clinic-a-image-url')" },
        { name: "Staff 2", image: "url('clinic-b-image-url')" },
      ];
      
      const lab = [
        { name: "Lab Staff 1", image: "url('clinic-a-image-url')" },
        { name: "Lab Staff 2", image: "url('clinic-b-image-url')" },
        { name: "Lab Staff 3", image: "url('lab-x-image-url')" },
        { name: "Lab Staff 4", image: "url('lab-y-image-url')" },
        { name: "Lab Staff 5", image: "url('lab-x-image-url')" },
        { name: "Lab Staff 6", image: "url('lab-y-image-url')" },
      ];

      const facilities = [
        { image: "url('clinic-a-image-url')" },
        { image: "url('clinic-a-image-url')" },
        { image: "url('clinic-a-image-url')" },
        { image: "url('clinic-a-image-url')" },
        { image: "url('clinic-a-image-url')" },
        { image: "url('clinic-a-image-url')" },
      ]
      
    return(
        <div className="about">
             <h1>Our Doctors</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquam suscipit purus vitae venenatis. Nulla facilisi.</p>
            <div className="collage2">
            <div className="row3">
                <Drawer>
                <DrawerTrigger>
                    <div
                    className="image-placeholder"
                    style={{
                        backgroundImage: "url('your-placeholder-image-url')", // Background image in TSX
                    }}
                    ></div>
                    <div className="name">
                    <h3>Name of Doctor</h3>
                    </div>
                    <div className="position">
                    <h4>Position of Doctor</h4>
                    </div>
                </DrawerTrigger>
                </Drawer>
                <Drawer>
                <DrawerTrigger>
                    <div
                    className="image-placeholder"
                    style={{
                        backgroundImage: "url('your-placeholder-image-url')", // Background image in TSX
                    }}
                    ></div>
                    <div className="name">
                    <h3>Name of Doctor</h3>
                    </div>
                    <div className="position">
                    <h4>Position of Doctor</h4>
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
                        {facilities.slice(0, 4).map((facility, index) => (
                        <Drawer key={index}>
                            <DrawerTrigger>
                            <div
                                className="image-placeholder"
                                style={{ backgroundImage: facility.image }}
                            ></div>
                            </DrawerTrigger>
                        </Drawer>
                        ))}
                    </div>
                    <div className="row4">
                        {facilities.slice(4, 8).map((facility, index) => (
                        <Drawer key={index}>
                            <DrawerTrigger>
                            <div
                                className="image-placeholder"
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

