import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import aaganB from "../assets/Aangan.png";
import Baruwa from "../assets/Baruwa.png";

const outlets = [
  {
    id: 1,
    name: "Aangan Bardaghat",
    address: "Bardaghat-04, Nawalparasi, Nepal",
    hours: "10:00 AM - 10:00 PM",
    phone: "+977-9749795695",
    image: aaganB,
    description:
      "Located beside Bardaghat Municipality, featuring separate cabins for families, friends, and couples, along with delicious food items.",
    mapUrl: "https://maps.app.goo.gl/GLhrji5iJTHqhNQe6",
  },
  {
    id: 2,
    name: "Aangan Resort",
    address: "Baruwa, Nawalparasi, Nepal",
    hours: "10:00 AM - 10:00 PM",
    phone: "+977-9749795695",
    image: Baruwa,
    description:
      "Located in a serene area with spacious seating, Friday night DJ parties, and delicious food items.",
    mapUrl: "https://maps.app.goo.gl/jfeh8o1LqhgoJvYP7",
  },
  {
    id: 3,
    name: "Aangan Home Stay",
    address: "Bidhut, Nawalparasi, Nepal",
    hours: "8:00 AM - 12:00 PM",
    phone: "+977-9749795695",
    image: Baruwa,
    description:
      "Aangan Home Stay — perfect for parties, chill nights, and cozy getaways with your favorite people.",
    mapUrl: "https://maps.app.goo.gl/jfeh8o1LqhgoJvYP7",
  },
];

export default function OutletsSection() {
  const openDirections = (mapUrl) => {
    window.open(mapUrl, "_blank");
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
              className="group overflow-hidden hover:shadow-2xl transition-all duration-500 bg-white rounded-2xl"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={outlet.image}
                  alt={outlet.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

                {/* Map Button */}
                <button
                  onClick={() => openDirections(outlet.mapUrl)}
                  className="absolute top-4 right-4 bg-white/90 hover:bg-white text-stone-700 hover:text-emerald-700 p-2 rounded-full shadow-lg transition-all duration-300"
                  type="button"
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors duration-300">
                  {outlet.name}
                </h3>

                <p className="text-stone-600">{outlet.description}</p>

                <div className="space-y-3 pt-2">
                  <div className="flex gap-3">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                    <span>{outlet.address}</span>
                  </div>

                  <div className="flex gap-3">
                    <Clock className="w-5 h-5 text-emerald-600" />
                    <span>{outlet.hours}</span>
                  </div>

                  <div className="flex gap-3">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <span>{outlet.phone}</span>
                  </div>
                </div>

                <button
                  onClick={() => openDirections(outlet.mapUrl)}
                  className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-full font-semibold transition-all"
                  type="button"
                >
                  <MapPin className="w-4 h-4 inline mr-2" />
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
