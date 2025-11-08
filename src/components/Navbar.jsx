import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils/index.js";
import { Menu, X, ShoppingCart, ChevronDown } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount] = useState(0); // You can connect this to your cart context later

  return (
    <nav className="bg-white shadow-sm border-b border-stone-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to={createPageUrl("Home")} className="text-2xl font-bold text-emerald-800">
            AANGAN
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <div className="ml-10 flex items-baseline space-x-8">
            <Link 
              to={createPageUrl("Home")} 
              className="text-stone-700 hover:text-emerald-700 px-3 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              to={createPageUrl("About")} 
              className="text-stone-700 hover:text-emerald-700 px-3 py-2 text-sm font-medium transition-colors"
            >
              About
            </Link>
            
            {/* Services Dropdown - Temporarily disabled until UI components are installed */}
            <div className="relative group">
              <button className="text-stone-700 hover:text-emerald-700 px-3 py-2 text-sm font-medium transition-colors flex items-center gap-1">
                Services <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 bg-white shadow-lg border border-stone-200 rounded-md py-2 min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link to={createPageUrl("Booking")} className="block px-4 py-2 text-sm text-stone-700 hover:text-emerald-700 hover:bg-stone-50">
                  Event Booking
                </Link>
                <Link to={createPageUrl("Delivery")} className="block px-4 py-2 text-sm text-stone-700 hover:text-emerald-700 hover:bg-stone-50">
                  Home Delivery
                </Link>
                <Link to={createPageUrl("Catering")} className="block px-4 py-2 text-sm text-stone-700 hover:text-emerald-700 hover:bg-stone-50">
                  Catering Services
                </Link>
              </div>
            </div>

            <Link 
              to={createPageUrl("Order")} 
              className="text-stone-700 hover:text-emerald-700 px-3 py-2 text-sm font-medium transition-colors"
            >
              Order
            </Link>
          </div>
        </div>

        {/* Cart Icon - Always Visible */}
        <div className="flex items-center space-x-4">
          <button className="relative p-2 hover:bg-stone-100 rounded-md transition-colors">
            <ShoppingCart className="w-5 h-5 text-stone-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="p-2 hover:bg-stone-100 rounded-md transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile Navigation */}
    {isOpen && (
      <div className="md:hidden bg-white border-t border-stone-200">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            to={createPageUrl("Home")}
            className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link
            to={createPageUrl("About")}
            className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
          <div className="px-3 py-2">
            <span className="text-base font-medium text-stone-700">Services</span>
            <div className="ml-4 mt-2 space-y-1">
              <Link
                to={createPageUrl("Booking")}
                className="block px-3 py-2 text-sm text-stone-600 hover:text-emerald-700 hover:bg-stone-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Event Booking
              </Link>
              <Link
                to={createPageUrl("Delivery")}
                className="block px-3 py-2 text-sm text-stone-600 hover:text-emerald-700 hover:bg-stone-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home Delivery
              </Link>
              <Link
                to={createPageUrl("Catering")}
                className="block px-3 py-2 text-sm text-stone-600 hover:text-emerald-700 hover:bg-stone-50 rounded-md transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Catering Services
              </Link>
            </div>
          </div>
          <Link
            to={createPageUrl("Order")}
            className="block px-3 py-2 text-base font-medium text-stone-700 hover:text-emerald-700 hover:bg-stone-50 rounded-md transition-colors"
            onClick={() => setIsOpen(false)}
          >
            Order
          </Link>
        </div>
      </div>
    )}
  </nav>
  )
}

export default Navbar

