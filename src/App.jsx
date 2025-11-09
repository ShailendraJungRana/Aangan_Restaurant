import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HeroCarousel from "./components/HeroCarousel";
import MenuSection from "./components/MenuSection";
import ServicesSection from "./components/ServiceSection";
import OutletsSection from "./components/OutletsSection";
import Footer from "./components/Footer";
import OrderNow from "./pages/OrderNow";

// Home page component
function Home() {
  return (
    <div className="">
      <HeroCarousel/>
      <MenuSection/>
      <ServicesSection/>
      <OutletsSection/>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar/>
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ordernow" element={<OrderNow />} />
          </Routes>
        </main>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
