import './service-listings.css';
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerTrigger } from "@/components/ui/drawer";
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import extraction from './media/dental-care/tooth-ectraction.webp'
import braces from './media/dental-care/braces.jpg'
import cleaning from './media/dental-care/dental-cleaning.webp'
import canals from './media/dental-care/fill-and-root-canal.jpg'
import restoration from './media/dental-care/restoration.jfif'
import surgery from './media/dental-care/surgery.jpg'
import veneers from './media/dental-care/veneers.jpg'
import retainer from './media/dental-care/retainer.jfif'
import bridge from './media/dental-care/bridge.webp'
import ceramics from './media/laboratory/ceramics.jpg'
import jacket from './media/laboratory/jacket.jpg'
import metal from './media/laboratory/metal.webp'
import ortho from './media/laboratory/retainer.jfif'
import repairs from './media/laboratory/repair.jfif'
import removable from './media/laboratory/dentures.jfif'


interface Service {
  title: string;
  description: string;
  drawerDescription: string;
  image: string;
  prices?: { type: string; price: string }[];
}

// DentCare Component
function DentCare() {
  const location = useLocation();

  useEffect(() => {
    const hash = location.hash; // Get the hash from the URL
    if (hash) {
      const element = document.getElementById(hash.replace("#", "")); // Get the element with the corresponding id
      if (element) {
        element.scrollIntoView({ behavior: "smooth" }); // Scroll the element into view smoothly
      }
    }
  }, [location]); // Run this whenever the location changes

const services: Service[] = [
    { 
        title: "Tooth Extraction", 
        description: "Safe and painless removal of damaged or decayed teeth.", 
        drawerDescription: "Tooth extraction is a procedure used to remove teeth that are severely decayed, damaged, or impacted. Our professional approach ensures a painless and efficient experience with minimal recovery time. Post-extraction care instructions are provided to promote healing and prevent complications.", 
        image: extraction 
    },
    { 
        title: "Dental Cleaning", 
        description: "Professional cleaning to remove plaque and tartar for healthier gums.", 
        drawerDescription: "Regular dental cleanings are essential for maintaining oral health. Our thorough cleaning process removes plaque, tartar, and surface stains, reducing the risk of cavities and gum disease. A professional cleaning helps maintain fresh breath and a bright smile.", 
        image: cleaning 
    },
    { 
        title: "Fill & Root Canals", 
        description: "Treatment to repair and save severely decayed or infected teeth.", 
        drawerDescription: "Root canal therapy is a specialized treatment used to save teeth that have been severely decayed or infected. The procedure involves removing infected pulp, cleaning the root canals, and sealing the tooth to prevent further damage. Fillings restore cavities and minor tooth damage.", 
        image: canals 
    },
    { 
        title: "Cosmetic Restoration", 
        description: "Enhancing your smile with restorative and aesthetic treatments.", 
        drawerDescription: "Cosmetic restoration includes treatments designed to improve the appearance and function of teeth. Whether it’s bonding, contouring, or full smile makeovers, our procedures restore confidence and ensure a natural-looking, aesthetically pleasing result.", 
        image: restoration 
    },
    { 
        title: "Fixed Bridge", 
        description: "A non-removable bridge to replace missing teeth and restore function.", 
        drawerDescription: "A fixed dental bridge is a permanent solution for missing teeth. It consists of artificial teeth anchored securely to adjacent natural teeth or implants. Bridges restore function, prevent shifting of remaining teeth, and enhance overall oral aesthetics.", 
        image: bridge 
    },
    { 
        title: "Teeth Retainer", 
        description: "Custom retainers to maintain teeth alignment after orthodontic treatment.", 
        drawerDescription: "Teeth retainers help maintain the alignment of teeth after orthodontic treatment. Custom-fit retainers prevent shifting, ensuring long-term stability and preserving the results of braces or Invisalign treatments.", 
        image: retainer 
    },
    { 
        title: "Dental Braces", 
        description: "Straighten teeth and improve bite alignment with orthodontic braces.", 
        drawerDescription: "Orthodontic braces are designed to correct misaligned teeth and bite issues. Available in traditional metal, ceramic, and invisible aligner options, braces gradually shift teeth into their ideal position, enhancing both function and aesthetics.", 
        image: braces 
    },
    { 
        title: "Veneers", 
        description: "Thin porcelain shells to enhance the appearance of your teeth.", 
        drawerDescription: "Veneers are ultra-thin porcelain shells that are bonded to the front of teeth to improve their shape, color, and alignment. They offer a long-lasting, natural-looking solution for chipped, discolored, or misaligned teeth.", 
        image: veneers 
    },
    { 
        title: "Laser Surgery", 
        description: "Advanced laser treatments for gum contouring and periodontal therapy.", 
        drawerDescription: "Laser surgery is a modern approach to treating various gum and periodontal issues. It is minimally invasive, reduces recovery time, and provides precise treatment for gum contouring, periodontal disease, and soft tissue procedures.", 
        image: surgery 
    }
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
              <Button className="hover:bg-[#f7f7f7]" style={{ background: "none", color: "black", display: "flex", justifyContent: "center" }}>
                <ChevronsUpDown />
              </Button>
            </div>
          </CollapsibleTrigger>
          <div className="collage">
            {services.slice(0, 3).map((service, index) => (
              <ServiceDrawer key={index} service={service} />
            ))}
          </div>
          <CollapsibleContent>
            <div className="collage">
              {services.slice(3).map((service, index) => (
                <ServiceDrawer key={index} service={service} />
              ))}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
}

// Lab Component
function Lab() {
  const services: Service[] = [
    { 
        title: "Jacket Crowns", 
        description: "High-quality crowns that provide a natural appearance and fit.", 
        drawerDescription: "Jacket crowns are designed to cover the entire surface of a tooth, restoring its shape, size, and strength. These crowns are crafted from high-quality materials that ensure durability while maintaining a natural aesthetic. They are ideal for patients who need full coverage restoration due to extensive damage or decay.", 
        prices: [{ type: "Posterior  or Anterior", price: "Php700/Unit" }, { type: "Dowel Post", price: "Php200/Unit" }, { type: "Coated Inlay", price: "Php400/Unit" }, { type: "Tilite Metal", price: "Php1500/Unit" }], 
        image: jacket 
    },
    { 
        title: "Full Ceramics", 
        description: "Durable and aesthetic ceramic dental restorations for a perfect smile.", 
        drawerDescription: "Full ceramic crowns are a popular choice for those looking for metal-free restorations that blend seamlessly with natural teeth. Made from advanced ceramic materials, these crowns offer excellent durability, biocompatibility, and a lifelike appearance, making them an excellent option for front teeth restorations.", 
        prices: [{ type: "Zirconia", price: "Php7000/Unit" }, { type: "Veneers/Crown", price: "Php3800/Unit" }, { type: "Plastic Jacket", price: "Php300/Unit" }, { type: "Temporary Crowns", price: "Php100/Unit" }, { type: "Composite Jacket", price: "Php200/Unit" }], 
        image: ceramics 
    },
    { 
        title: "Full Shell Metal Crown", 
        description: "Strong metal crowns with a full shell design for long-lasting durability.", 
        drawerDescription: "Full shell metal crowns are known for their exceptional strength and longevity. These crowns are typically used for molars and back teeth that endure heavy chewing forces. They provide a reliable and cost-effective solution for patients needing durable restorations.", 
        prices: [{ type: "Anterior", price: "Php400/Unit" }, { type: "Posterior", price: "Php500/Unit" }, { type: "Open Face", price: "Php350/Unit" }, { type: "3/4", price: "Php350/Unit" }], 
        image: metal 
    },
    { 
        title: "Denture Repairs", 
        description: "Quick and reliable repairs to restore your dentures.", 
        drawerDescription: "Denture repairs involve fixing cracks, fractures, or other damages in dentures to restore their functionality and comfort. Our expert technicians ensure seamless repairs, extending the life of your dentures while maintaining a perfect fit.", 
        prices: [{ type: "Wire Reinforcement", price: "Php150" }, { type: "Reattachment of Pontic", price: "Php200/Unit" }, { type: "Add Pontic", price: "Php200" }, { type: "Rebase", price: "Php750" }, { type: "Realign", price: "Php500" }], 
        image: repairs 
    },
    { 
        title: "Removable Dentures", 
        description: "Custom-fit removable dentures for restoring missing teeth functionality.", 
        drawerDescription: "Removable dentures are designed to replace missing teeth while maintaining the integrity of the remaining natural teeth. They provide an affordable and effective solution for improving chewing ability, speech, and facial aesthetics.", 
        prices: [{ type: "FRS: Complete Dentures", price: "Php4500/Arch" }, { type: "FRS: Unilateral", price: "Php2500/Arch"}, { type: "FRS: Bilateral", price: "Php4200/Arch" }, { type: "FRS: Thermosens CD Vertex", price: "Php4400/Arch"}], 
        image: removable 
    },
    { 
        title: "Orthodontics", 
        description: "Custom orthodontic retainers for long-term teeth alignment.", 
        drawerDescription: "Orthodontic retainers help maintain teeth alignment after braces or other orthodontic treatments. We offer a variety of retainers designed for durability, comfort, and aesthetic appeal.", 
        prices: [{ type: "Wrap Around Retainer", price: "Php600/arch" }, { type: "Inclide Plane", price: "Php350/arch" }, { type: "Invisible Retainer", price: "Php850/arch" }, { type: "Hawley's Retainer (Colored Base)", price: "Php850/arch" }, { type: "Hawley's Retainer (Clear Palate)", price: "Php800/arch" }], 
        image: ortho
    }
];



    return (
      <div className="container-sl">
        <div className="top">
          <h1>Good Casts Lead to Good Prosthesis</h1>
          <p>At AE Dental Clinic & Laboratory, we specialize in high-quality dental prosthetics, including dentures, crowns, bridges, and more. Our skilled technicians use the latest materials and technology to ensure each piece is crafted to fit perfectly, providing comfort, durability, and a natural appearance.</p>
        </div>
        <div className="bottom">
          <Collapsible>
            <CollapsibleTrigger asChild>
              <div style={{ marginBottom: '25px', background: "none", width: "100%", color: "black", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", gap: "10px", fontWeight: "400" }}>
                <h1>Laboratory Services</h1>
                <Button variant="ghost" style={{ background: "none", color: "black" }}>
                  <ChevronsUpDown />
                </Button>
              </div>
            </CollapsibleTrigger>
            <div className="collage">
              {services.slice(0, 3).map((service, index) => (
                <ServiceDrawer key={index} service={service} />
              ))}
            </div>
            <CollapsibleContent>
              <div className="collage">
                {services.slice(3).map((service, index) => (
                  <ServiceDrawer key={index} service={service} />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>
    );
}

function ServiceDrawer({ service }: { service: Service }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="image-placeholder" style={{ backgroundImage: `url(${service.image})` }}>
          <div className="texts">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent className="drawer-content">
        <DrawerHeader>
          <div className="image-placeholder-content" style={{ backgroundImage: `url(${service.image})` }} />
          <DrawerTitle className="drawer-title">{service.title}</DrawerTitle>
          <DrawerDescription>{service.drawerDescription}</DrawerDescription>
        </DrawerHeader>
        {service.prices && (
          <div className="drawer-body">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {service.prices.map((price, index) => (
                  <tr key={index}>
                    <td>{price.type}</td>
                    <td>{price.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="note">Note: Prices may vary depending on complexity and materials used. Please consult our doctors.</p>
          </div>
        )}
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
