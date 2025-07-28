import React from "react";
import { Calendar, Utensils, Truck } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Booking For Events",
    description: "Reserve our restaurant for your special occasions and corporate events",
    icon: Calendar,
    color: "from-emerald-500 to-emerald-600"
  },
  {
    id: 2,
    title: "Fresh Healthy Food",
    description: "We serve only the freshest ingredients prepared with utmost care",
    icon: Utensils,
    color: "from-teal-500 to-teal-600"
  },
  {
    id: 3,
    title: "Fast Home Delivery",
    description: "Quick and reliable delivery service bringing food to your doorstep",
    icon: Truck,
    color: "from-cyan-500 to-cyan-600"
  }
];

export default function ServicesSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-stone-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-stone-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-stone-600 max-w-2xl mx-auto">
            We provide exceptional services to make your dining experience memorable
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={service.id} 
              className="group hover:shadow-2xl transition-all duration-500 overflow-hidden border-0 bg-white rounded-2xl relative"
            >
              <div className="p-8 text-center space-y-6 relative">
                {/* Icon */}
                <div className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <service.icon className="w-10 h-10 text-white" />
                </div>

                {/* Step Number */}
                <div className="w-8 h-8 mx-auto bg-stone-100 text-stone-600 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>

                {/* Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-stone-900 group-hover:text-emerald-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-stone-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}