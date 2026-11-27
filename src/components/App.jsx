
import React, { useState } from 'react';

import Navbar from './navbar';
import Hero from './Hero';
import Menu from './Menu';
import Reviews from './Reviews';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import Order from './Order';
import AdminPanel from './Admin/AdminPanel';

import '../App.css';

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const handleOrder = (item) => {
    setSelectedItem(item);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedItem(null);
    window.scrollTo(0, 0);
  };

  if (showAdmin) {
    return <AdminPanel />;
  }

  if (selectedItem !== null) {
    return (
      <Order
        item={selectedItem}
        onBack={handleBack}
      />
    );
  }

  return (
    <>
      <Navbar onAdminClick={() => setShowAdmin(true)} />

      <Hero />

      <Menu onOrder={handleOrder} />

      <Reviews />

      <About />

      <Contact />

      <Footer />
    </>
  );
}

export default App;
