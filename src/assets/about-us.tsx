import './about-us.css'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

function AboutUs (){
    return(
        <div className="about">
             <h1>Our Doctors</h1>
             <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque aliquam suscipit purus vitae venenatis. Nulla facilisi. </p>
             <div className="collage2">
                <div className="row3">
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                            <div className="texts"><h3>Name of Doctor</h3></div>
                            <div className="texts"><h4>Position of Doctor</h4></div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                            <div className="texts"><h3>Name of Doctor</h3></div>
                            <div className="texts"><h4>Position of Doctor</h4></div>
                        </DrawerTrigger>
                    </Drawer>
                </div>
            </div>

            <p>our staff. last na to iedit</p>

            <h2>LABORATORY</h2>
            <div className="collage2">
                <div className="row3">
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder2" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> 
                                <div className="texts"><h3>Name of Staff</h3></div>
                            </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder2" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> 
                                <div className="texts"><h3>Name of Staff</h3></div>
                            </div>
                           </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder2" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> 
                                <div className="texts"><h3>Name of Staff</h3></div>
                            </div>
                           </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder2" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> 
                                <div className="texts"><h3>Name of Staff</h3></div>
                            </div>
                           </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder2" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> 
                                <div className="texts"><h3>Name of Staff</h3></div>
                            </div>
                           </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder2" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> 
                                <div className="texts"><h3>Name of Staff</h3></div>
                            </div>
                           </DrawerTrigger>
                    </Drawer>
                </div>
            </div>
            <h1>Our Facilities</h1>
             <div className="collage2">
                <div className="row3">
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                </div>
                <div className="row4">
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                    <Drawer>
                        <DrawerTrigger>
                            <div className="image-placeholder" style={{ backgroundImage: "url('your-placeholder-image-url')" }}> </div>
                        </DrawerTrigger>
                    </Drawer>
                </div>
            </div>

        </div>
       
    )
}

export default AboutUs

// <h1 style={{  }}>Our Doctors</h1>