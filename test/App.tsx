import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MenuSection } from './components/MenuSection';
import { AiBarista } from './components/AiBarista';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

function App() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <MenuSection />
      <AiBarista />
      <Footer />
    </main>
  );
}

export default App;