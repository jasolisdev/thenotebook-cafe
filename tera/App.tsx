import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Story } from './pages/Story';
import { Contact } from './pages/Contact';
import { Careers } from './pages/Careers';
import { StyleGuide } from './pages/StyleGuide';
import { PageView } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setPage={setCurrentPage} />;
      case 'menu':
        return <Menu />;
      case 'story':
        return <Story />;
      case 'contact':
        return <Contact />;
      case 'careers':
        return <Careers />;
      case 'styleguide':
        return <StyleGuide />;
      default:
        return <Home setPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-charcoal bg-cream selection:bg-terra-200">
      <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;