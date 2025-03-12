import './service-listings.css';
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function DentCare() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash; // Get the hash from the URL
    if (hash) {
      const element = document.getElementById(hash.replace('#', '')); // Get the element with the corresponding id
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' }); // Scroll the element into view smoothly
      }
    }
  }, [location]); // Run this whenever the location changes
    const services = [
      { title: "Tooth Extraction", description: "Safe and painless removal of damaged or decayed teeth.", image: "your-placeholder-image-url" },
      { title: "Dental Cleaning", description: "Professional cleaning to remove plaque and tartar for healthier gums.", image: "your-placeholder-image-url" },
      { title: "Fill & Root Canals", description: "Treatment to repair and save severely decayed or infected teeth.", image: "your-placeholder-image-url" },
      { title: "Dentures", description: "Custom-fit dentures to restore your smile and chewing ability.", image: "your-placeholder-image-url" },
      { title: "Cosmetic Restoration", description: "Enhancing your smile with restorative and aesthetic treatments.", image: "your-placeholder-image-url" },
      { title: "Fixed Bridge", description: "A non-removable bridge to replace missing teeth and restore function.", image: "your-placeholder-image-url" },
      { title: "Teeth Retainer", description: "Custom retainers to maintain teeth alignment after orthodontic treatment.", image: "your-placeholder-image-url" },
      { title: "Dental Braces", description: "Straighten teeth and improve bite alignment with orthodontic braces.", image: "your-placeholder-image-url" },
      { title: "Veneers", description: "Thin porcelain shells to enhance the appearance of your teeth.", image: "your-placeholder-image-url" },
      { title: "Laser Surgery", description: "Advanced laser treatments for gum contouring and periodontal therapy.", image: "your-placeholder-image-url" }
    ];
  
    return (
      <div className="container-sl">
        <div className="top">
          <h1>Bright Smiles, Healthy Lives!</h1>
          <p>Discover top-quality dental care tailored to your needs. From routine check-ups to advanced treatments, our expert team ensures a healthier, brighter smile for you and your family.</p>
        </div>
        <div className="bottom">
        <Collapsible>
            <CollapsibleTrigger>
                <div style={{ background: "none", width: "1000px", color: "black", display: "flex", gap: "100px", justifyContent: "center", fontWeight: "400" }}>
                    <h1>Dental Care Services</h1>
                    <Button className="hover:bg-[#f7f7f7]" style={{ background: "none", color: "black", display: "flex", justifyContent: "center"}}> <ChevronsUpDown /></Button>
                </div>
            </CollapsibleTrigger>
            <div className="collage">
              {services.slice(0, 3).map((service, index) => (
                <Drawer key={index}>
                  <DrawerTrigger>
                    <div className="image-placeholder" style={{ backgroundImage: `url('${service.image}')` }}>
                      <div className="texts">
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="drawer-content">
                    <DrawerHeader>
                      <div className="image-placeholder-content" style={{ backgroundImage: `url('${service.image}')` }} />
                      <DrawerTitle className="drawer-title">{service.title}</DrawerTitle>
                      <DrawerDescription>{service.description}</DrawerDescription>
                    </DrawerHeader>
                    <p className="note">Note: Consult our specialists for personalized treatment options.</p>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>
  
            <CollapsibleContent>
              <div className="collage">
                {services.slice(3).map((service, index) => (
                  <Drawer key={index}>
                    <DrawerTrigger>
                      <div className="image-placeholder" style={{ backgroundImage: `url('${service.image}')` }}>
                        <div className="texts">
                          <h2>{service.title}</h2>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent className="drawer-content">
                      <DrawerHeader>
                        <div className="image-placeholder-content" style={{ backgroundImage: `url('${service.image}')` }} />
                        <DrawerTitle className="drawer-title">{service.title}</DrawerTitle>
                        <DrawerDescription>{service.description}</DrawerDescription>
                      </DrawerHeader>
                      <p className="note">Note: Consult our specialists for personalized treatment options.</p>
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  }
  

function Lab() {
    const services = [
      { title: "Jacket Crowns", description: "High-quality crowns that provide a natural appearance and fit.", prices: [{ type: "Standard", price: "$500" }, { type: "Premium", price: "$750" }], image: "your-placeholder-image-url" },
      { title: "Full Ceramics", description: "Durable and aesthetic ceramic dental restorations for a perfect smile.", prices: [{ type: "Standard", price: "$600" }, { type: "Advanced", price: "$900" }], image: "your-placeholder-image-url" },
      { title: "Full Shell Metal Crown", description: "Strong metal crowns with a full shell design for long-lasting durability.", prices: [{ type: "Standard", price: "$400" }, { type: "Deluxe", price: "$650" }], image: "your-placeholder-image-url" },
      { title: "Dental Bridges", description: "High-quality bridges to replace missing teeth and restore function.", prices: [{ type: "Standard", price: "$700" }, { type: "Advanced", price: "$950" }], image: "your-placeholder-image-url" },
      { title: "Partial Dentures", description: "Custom-fit partial dentures for restoring missing teeth functionality.", prices: [{ type: "Standard", price: "$500" }, { type: "Premium", price: "$750" }], image: "your-placeholder-image-url" },
      { title: "Teeth Whitening", description: "Advanced teeth whitening services to restore your natural smile.", prices: [{ type: "Standard", price: "$250" }, { type: "Advanced", price: "$400" }], image: "your-placeholder-image-url" }
    ];
  
    return (
      <div className="container-sl">
        <div className="top">
          <h1>Good Casts Lead to Good Prosthesis</h1>
          <p>At AE Dental Clinic & Laboratory, we specialize in high-quality dental prosthetics, including dentures, crowns, bridges, and more. Our skilled technicians use the latest materials and technology to ensure each piece is crafted to fit perfectly, providing comfort, durability, and a natural appearance.</p>
        </div>
        <div className="bottom">
          <Collapsible>
            <CollapsibleTrigger>
                <div style={{ background: "none", width: "1000px", color: "black", display: "flex", gap: "100px", justifyContent: "center", fontWeight: "400" }}>
                    <h1>Laboratory Services</h1>
                    <Button style={{ background: "none", color: "black", display: "flex", justifyContent: "center" }}> <ChevronsUpDown /></Button>
                </div>
            </CollapsibleTrigger>
            <div className="collage">
              {services.slice(0, 3).map((service, index) => (
                <Drawer key={index}>
                  <DrawerTrigger>
                    <div className="image-placeholder" style={{ backgroundImage: `url('${service.image}')` }}>
                      <div className="texts">
                        <h2>{service.title}</h2>
                        <p>{service.description}</p>
                      </div>
                    </div>
                  </DrawerTrigger>
                  <DrawerContent className="drawer-content">
                    <DrawerHeader>
                      <div className="image-placeholder-content" style={{ backgroundImage: `url('${service.image}')` }} />
                      <DrawerTitle className="drawer-title">{service.title}</DrawerTitle>
                      <DrawerDescription>{service.description}</DrawerDescription>
                    </DrawerHeader>
                    <p className="note">Note: Consult our specialists for personalized treatment options.</p>
                  </DrawerContent>
                </Drawer>
              ))}
            </div>
  
            <CollapsibleContent>
              <div className="collage">
                {services.slice(3).map((service, index) => (
                  <Drawer key={index}>
                    <DrawerTrigger>
                      <div className="image-placeholder" style={{ backgroundImage: `url('${service.image}')` }}>
                        <div className="texts">
                          <h2>{service.title}</h2>
                          <p>{service.description}</p>
                        </div>
                      </div>
                    </DrawerTrigger>
                    <DrawerContent className="drawer-content">
                      <DrawerHeader>
                        <div className="image-placeholder-content" style={{ backgroundImage: `url('${service.image}')` }} />
                        <DrawerTitle className="drawer-title">{service.title}</DrawerTitle>
                        <DrawerDescription>{service.description}</DrawerDescription>
                      </DrawerHeader>
                      <p className="note">Note: Consult our specialists for personalized treatment options.</p>
                    </DrawerContent>
                  </Drawer>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
  }
  

function ServiceDrawer({ services }) {
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="image-placeholder" style={{ backgroundImage: `url(${services.image})` }}>
          <div className="texts">
            <h2>{services.title}</h2>
            <p>{services.description}</p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="drawer-content">
        <DrawerHeader>
          <div className="image-placeholder-content" style={{ backgroundImage: `url(${services.image})` }} />
          <DrawerTitle className="drawer-title">{services.title}</DrawerTitle>
        </DrawerHeader>
        <div className="drawer-body">
          <table className="price-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {services.prices.map((price, index) => (
                <tr key={index}>
                  <td>{price.type}</td>
                  <td>{price.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note">Note: Prices may vary depending on complexity and materials used.</p>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function ServiceListings() {
  return (
    <div className="flex flex-col items-center justify-center mb-12"> 
      <div className="top" id="dental">
        <DentCare />
      </div>

      <div className="bottom" id="laboratory">
        <Lab />
      </div>
    </div>
  );
}

export default ServiceListings;
