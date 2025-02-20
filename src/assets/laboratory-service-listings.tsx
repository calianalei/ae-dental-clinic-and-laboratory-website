import './service-listings.css';
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import Header from './admin-header';
import React, { useState } from "react";
import Schedule from './admin'; // Ensure the correct path
import PatientInfoHistory from './admin'; // Ensure the correct path

const services = [
  {
    title: "Jacket Crowns",
    description: "High-quality crowns that provide a natural appearance and fit.",
    prices: [
      { type: "Standard", price: "$500" },
      { type: "Premium", price: "$750" }
    ],
    image: "your-placeholder-image-url"
  },
  {
    title: "Full Ceramics",
    description: "Durable and aesthetic ceramic dental restorations for a perfect smile.",
    prices: [
      { type: "Standard", price: "$600" },
      { type: "Advanced", price: "$900" }
    ],
    image: "your-placeholder-image-url"
  },
  {
    title: "Full Shell Metal Crown",
    description: "Strong metal crowns with a full shell design for long-lasting durability.",
    prices: [
      { type: "Standard", price: "$400" },
      { type: "Deluxe", price: "$650" }
    ],
    image: "your-placeholder-image-url"
  },
  {
    title: "Dental Bridges",
    description: "High-quality bridges to replace missing teeth and restore function.",
    prices: [
      { type: "Standard", price: "$700" },
      { type: "Advanced", price: "$950" }
    ],
    image: "your-placeholder-image-url"
  },
  {
    title: "Partial Dentures",
    description: "Custom-fit partial dentures for restoring missing teeth functionality.",
    prices: [
      { type: "Standard", price: "$500" },
      { type: "Premium", price: "$750" }
    ],
    image: "your-placeholder-image-url"
  },
  {
    title: "Teeth Whitening",
    description: "Advanced teeth whitening services to restore your natural smile.",
    prices: [
      { type: "Standard", price: "$250" },
      { type: "Advanced", price: "$400" }
    ],
    image: "your-placeholder-image-url"
  }
];

function ServiceDrawer({ service }) {
  return (
    <Drawer>
      <DrawerTrigger>
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
              {service.prices.map((price, index) => (
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

function LaboratorySL() {
    const [activeTab, setActiveTab] = React.useState<'schedule' | 'patientInfo'>('schedule'); // Track active tab
    const [activeComponent, setActiveComponent] = useState<'schedule' | 'patientInfo'>('schedule');

  const handleScheduleClick = () => {
    setActiveComponent('schedule');
  };

  const handlePatientInfoClick = () => {
    setActiveComponent('patientInfo');
  };

  return (
    <div>
      <Header 
  onScheduleClick={() => setActiveComponent('schedule')} 
  onPatientInfoClick={() => setActiveComponent('patientInfo')} 
/>

      <div className="container-sl">
        <div className="top">
          <h1>Good Casts Lead to Good Prosthesis</h1>
          <p>At AE Dental Clinic & Laboratory, we specialize in high-quality dental prosthetics, including dentures, crowns, bridges, and more. Our skilled technicians use the latest materials and technology to ensure each piece is crafted to fit perfectly, providing comfort, durability, and a natural appearance.</p>
        </div>
        <div className="bottom">
          <h1>Laboratory Services</h1>
          <div className="collage">
            {services.map((service, index) => (
              <ServiceDrawer key={index} service={service} />
            ))}
          </div>
        </div>
      </div>
   </div>  
  );
}

export default LaboratorySL;
