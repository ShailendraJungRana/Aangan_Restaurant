import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-emerald-400">AANGAN</h3>
            <p className="text-stone-300 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-stone-400 hover:text-emerald-400 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Useful Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to={createPageUrl("About Us")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Our Chef")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Our Chef
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Secure Shopping")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Secure Shopping
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Privacy & Policy")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Privacy & Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay With Us */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay With Us</h4>
            <ul className="space-y-2">
              <li>
                <Link to={createPageUrl("Careers")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Our Services")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Delivery Information")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link to={createPageUrl("Payment & Tax")} className="text-stone-300 hover:text-emerald-400 transition-colors">
                  Payment & Tax
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-8 pt-8 text-center">
          <p className="text-stone-400">
            © 2024 Aangan Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}