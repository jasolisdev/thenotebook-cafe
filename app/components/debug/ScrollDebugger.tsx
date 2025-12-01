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

      // Live logging
      console.clear();
      console.log('=== LIVE SCROLL DEBUG ===');
      console.log('Document scrollHeight:', document.documentElement.scrollHeight);
      console.log('Body scrollHeight:', document.body.scrollHeight);
      console.log('Window innerHeight:', window.innerHeight);
      console.log('');
      console.log('Window scrollY:', window.scrollY);
      console.log('Document scrollTop:', document.documentElement.scrollTop);
      console.log('Body scrollTop:', document.body.scrollTop);
      console.log('');
      console.log('HTML overflow:', getComputedStyle(document.documentElement).overflow);
      console.log('HTML overflow-y:', getComputedStyle(document.documentElement).overflowY);
      console.log('Body overflow:', getComputedStyle(document.body).overflow);
      console.log('Body overflow-y:', getComputedStyle(document.body).overflowY);
      console.log('');
      console.log('Can scroll?', document.documentElement.scrollHeight > window.innerHeight);
      console.log('=======================');
    };

    updateMeasurements();

    // Update on scroll
    const handleScroll = () => {
      setScrollY(window.scrollY);
      updateMeasurements(); // Log on every scroll
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateMeasurements);

    // Also update every 500ms to catch any changes
    const interval = setInterval(updateMeasurements, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateMeasurements);
      clearInterval(interval);
    };
  }, []);

  // Log scroll position when page changes
  useEffect(() => {
    console.log('=== PAGE NAVIGATION ===');
    console.log('Pathname:', pathname);
    console.log('Scroll Y:', window.scrollY);
    console.log('Window Height:', window.innerHeight);
    console.log('Document Height:', document.documentElement.scrollHeight);
    console.log('Body Height:', document.body.scrollHeight);
    console.log('Body Overflow:', getComputedStyle(document.body).overflow);
    console.log('HTML Overflow:', getComputedStyle(document.documentElement).overflow);
    console.log('======================');

    // Check scroll position after delays
    setTimeout(() => {
      console.log('=== AFTER 100ms ===');
      console.log('Scroll Y:', window.scrollY);
      console.log('Can Scroll:', document.documentElement.scrollHeight > window.innerHeight);
      console.log('==================');
    }, 100);

    setTimeout(() => {
      console.log('=== AFTER 500ms ===');
      console.log('Scroll Y:', window.scrollY);
      console.log('Doc Height:', document.documentElement.scrollHeight);
      console.log('==================');
    }, 500);

    setTimeout(() => {
      console.log('=== AFTER 1000ms ===');
      console.log('Scroll Y:', window.scrollY);
      console.log('Doc Height:', document.documentElement.scrollHeight);
      console.log('==================');
    }, 1000);
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
      <div>Doc: {documentHeight}px</div>
      <div style={{
        color: documentHeight === windowHeight ? '#ff0000' : '#00ff00',
        fontWeight: 'bold',
        fontSize: '10px',
        marginTop: '4px'
      }}>
        {documentHeight === windowHeight ? '⚠️ Doc=Win (WRONG!)' : '✅ Doc > Win'}
      </div>
      <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid #333', fontSize: '10px' }}>
        {pathname}
      </div>
      <div style={{ marginTop: '4px', fontSize: '10px', color: '#888' }}>
        {scrollY === 0 ? '✅ At top' : `⚠️ ${scrollY}px from top`}
      </div>
      <div style={{ marginTop: '4px', fontSize: '9px', color: '#666' }}>
        Check console logs →
      </div>
    </div>
  );
}
