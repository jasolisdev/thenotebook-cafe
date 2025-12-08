
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { SiteHeader } from './components/SiteHeader';
import { SiteFooter } from './components/SiteFooter';
import { CartDrawer } from './components/CartDrawer';
import { CookieConsent } from './components/CookieConsent';
import { AccessibilityWidget } from './components/AccessibilityWidget';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Story } from './pages/Story';
import { Events } from './pages/Events';
import { Contact } from './pages/Contact';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen font-sans text-latte-900 bg-latte-50 selection:bg-latte-200 selection:text-latte-900 relative">
          <div className="bg-noise" />
          <SiteHeader />
          <CartDrawer />
          <CookieConsent />
          <AccessibilityWidget />
          <main className="flex-grow z-10 relative">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/story" element={<Story />} />
              <Route path="/events" element={<Events />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>
          <SiteFooter />
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;