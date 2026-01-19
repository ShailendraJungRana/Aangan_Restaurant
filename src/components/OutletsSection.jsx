import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import aaganB from "../assets/Aangan.png";

const outlets = [
  {
    id: 1,
    name: "Aangan Bardaghat",
    address: "Bardaghat-04, Nawalparasi, Nepal",
    hours: "10:00 AM - 10:00 PM",
    phone: "+977-9749795695",
    src: aaganB,
    description: "Located beside Bardaghat Municipality, featuring separate cabins for families, friends, and couples, along with delicious food items.",
    mapUrl: "https://maps.app.goo.gl/GLhrji5iJTHqhNQe6"
  },
  {
    id: 2,
    name: "Aangan Resort ",
    address: "Baruwa, Nawalparasi, Nepal",
    hours: "10:00 AM - 10:00 PM",
    phone: "+977-9749795695",
    src: aaganB,
    description: "Located in a serene area with spacious seating, Friday night DJ parties, and delicious food items.",
    mapUrl: "https://maps.app.goo.gl/jfeh8o1LqhgoJvYP7"
  },
  {
    id: 3,
    name: "Aangan Home Stay ",
    address: "Bidhut, Nawalparasi, Nepal",
    hours: "8:00 AM - 12:00 PM",
    phone: "+977-9749795695",
    src: aaganB,
    description: "Aangan Home Stay — perfect for parties, chill nights, and cozy getaways with your favorite people.",
    mapUrl: "https://maps.app.goo.gl/jfeh8o1LqhgoJvYP7"
  }
];

export default function OutletsSection() {
  const openDirections = (mapUrl) => {
    window.open(mapUrl, '_blank');
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">
            Other Outlets
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            Visit us at any of our convenient locations across the city
          </p>
        </div>

        {/* Outlets Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {outlets.map((outlet) => (
            <div 
              key={outlet.id} 
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 border-0 bg-white rounded-2xl relative"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={outlet.image}
                  alt={outlet.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                
                {/* Direction Button Overlay */}
                <button
                  onClick={() => openDirections(outlet.mapUrl)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-700 p-2 rounded-full shadow-lg transition-all duration-300"
                  type="button"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                {/* Outlet Name */}
                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors duration-300">
                  {outlet.name}
                </h3>

                {/* Description */}
                <p className="text-stone-600 leading-relaxed">
                  {outlet.description}
                </p>

                {/* Contact Info */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-stone-700">{outlet.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-stone-700">{outlet.hours}</span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span className="text-stone-700">{outlet.phone}</span>
                  </div>
                </div>

                {/* Direction Button */}
                <button
                  onClick={() => openDirections(outlet.mapUrl)}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-semibold transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 mt-6"
                  type="button"
                >
                  <MapPin className="w-4 h-4" />
                  Get Directions
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}