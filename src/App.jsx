import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar';
import HeroCarousel from "./components/HeroCarousel";
import MenuSection from "./components/MenuSection";
import ServicesSection from "./components/ServiceSection";
import OutletsSection from "./components/OutletsSection";
import Footer from "./components/Footer";

// import Menu from './components/Menu';
// import Footer from './components/Footer';
// import OutletsSection from './components/OutletsSection';
// import ServicesSection from './components/ServiceSection';
// import AllProducts from './components/AllProducts';
// import Hero from "./components/Hero";
// import Login from "./components/Login/Login";
// import Signup from "./components/Login/Signup";
// import Cart from "./components/Cart";
function App() {
  return (
    <Router>
<div className="">
        {/* <Navbar /> */}
        <Navbar/>
        <HeroCarousel/>
        <MenuSection/>
        <ServicesSection/>
        <OutletsSection/>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
