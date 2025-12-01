"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

/**
 * SCROLL DEBUGGER - Shows real-time scroll position info
 *
 * This component displays scroll position and other debug info
 * to help diagnose the scroll restoration issue.
 */
export default function ScrollDebugger() {
  const [scrollY, setScrollY] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    // Initial measurements
    const updateMeasurements = () => {
      setScrollY(window.scrollY);
      setWindowHeight(window.innerHeight);
      setDocumentHeight(document.documentElement.scrollHeight);

      // Measure navbar height
      const nav = document.querySelector('nav');
      if (nav) {
        setNavbarHeight(nav.offsetHeight);
      }
    };

    updateMeasurements();

    // Update on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateMeasurements);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMeasurements);
    };
  }, []);

  // Log scroll position when page changes
  useEffect(() => {
    console.log('=== PAGE NAVIGATION ===');
    console.log('Pathname:', pathname);
    console.log('Scroll Y:', window.scrollY);
    console.log('Window Height:', window.innerHeight);
    console.log('Document Height:', document.documentElement.scrollHeight);
    console.log('======================');

    // Check scroll position after a delay
    setTimeout(() => {
      console.log('=== AFTER 100ms ===');
      console.log('Scroll Y:', window.scrollY);
      console.log('==================');
    }, 100);

    setTimeout(() => {
      console.log('=== AFTER 500ms ===');
      console.log('Scroll Y:', window.scrollY);
      console.log('==================');
    }, 500);
  }, [pathname]);

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        color: '#00ff00',
        padding: '16px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 999999,
        minWidth: '200px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '8px', color: '#00ffff' }}>
        SCROLL DEBUGGER
      </div>
      <div>Scroll Y: <span style={{ color: scrollY === 0 ? '#00ff00' : '#ff0000', fontWeight: 'bold' }}>{scrollY}px</span></div>
      <div>Navbar: {navbarHeight}px</div>
      <div>Window: {windowHeight}px</div>
      <div>Doc Height: {documentHeight}px</div>
      <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #333' }}>
        Path: {pathname}
      </div>
      <div style={{ marginTop: '8px', fontSize: '10px', color: '#888' }}>
        {scrollY === 0 ? '✅ At top' : `⚠️ ${scrollY}px from top`}
      </div>
    </div>
  );
}
