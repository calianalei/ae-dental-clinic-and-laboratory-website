import './service-listings.css';

import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerDescription,
    DrawerTrigger,
} from "@/components/ui/drawer";

function DentCareSL() {
    const services = [
        { name: "Tooth Extraction", desc: "Safe and painless removal of damaged or decayed teeth.", img: "your-placeholder-image-url" },
        { name: "Dental Cleaning", desc: "Professional cleaning to remove plaque and tartar for healthier gums.", img: "your-placeholder-image-url" },
        { name: "Fill & Root Canals", desc: "Treatment to repair and save severely decayed or infected teeth.", img: "your-placeholder-image-url" },
        { name: "Dentures", desc: "Custom-fit dentures to restore your smile and chewing ability.", img: "your-placeholder-image-url" },
        { name: "Cosmetic Restoration", desc: "Enhancing your smile with restorative and aesthetic treatments.", img: "your-placeholder-image-url" },
        { name: "Fixed Bridge", desc: "A non-removable bridge to replace missing teeth and restore function.", img: "your-placeholder-image-url" },
        { name: "Teeth Retainer", desc: "Custom retainers to maintain teeth alignment after orthodontic treatment.", img: "your-placeholder-image-url" },
        { name: "Dental Braces", desc: "Straighten teeth and improve bite alignment with orthodontic braces.", img: "your-placeholder-image-url" },
        { name: "Veneers", desc: "Thin porcelain shells to enhance the appearance of your teeth.", img: "your-placeholder-image-url" },
        { name: "Laser Surgery", desc: "Advanced laser treatments for gum contouring and periodontal therapy.", img: "your-placeholder-image-url" }
    ];

    return (
        <div className="container-sl">
            <div className="top">
                <h1>Bright Smiles, Healthy Lives!</h1>
                <p>Discover top-quality dental care tailored to your needs. From routine check-ups to advanced treatments, our expert team ensures a healthier, brighter smile for you and your family.</p>
            </div>
            <div className="bottom">
                <h1>Dental Care Services</h1>
                <div className="collage">
                    {services.map((service, index) => (
                        <Drawer key={index}>
                            <DrawerTrigger>
                                <div className="image-placeholder" style={{ backgroundImage: `url('${service.img}')` }}>
                                    <div className="texts">
                                        <h2>{service.name}</h2>
                                        <p>{service.desc}</p>
                                    </div>
                                </div>
                            </DrawerTrigger>
                            <DrawerContent className="drawer-content">
                                <DrawerHeader>
                                    <div className="image-placeholder-content" style={{ backgroundImage: `url('${service.img}')` }} />
                                    <DrawerTitle className="drawer-title">{service.name}</DrawerTitle>
                                    <DrawerDescription>{service.desc}</DrawerDescription>
                                </DrawerHeader>
                                <p className="note">Note: Consult our specialists for personalized treatment options.</p>
                            </DrawerContent>
                        </Drawer>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default DentCareSL;
