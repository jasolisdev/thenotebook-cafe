"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

type MenuItemModalProps = {
  isOpen: boolean;
  onClose: () => void;
  item: {
    name: string;
    description?: string;
    price?: string;
    section: string;
  } | null;
};

export default function MenuItemModal({ isOpen, onClose, item }: MenuItemModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !item) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="menu-modal-backdrop"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="menu-modal">
        {/* Close button */}
        <button
          className="menu-modal-close"
          onClick={onClose}
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Image */}
        <div className="menu-modal-image">
          <Image
            src="/unsplash/dark-coffee.png"
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="menu-modal-content">
          <h2 className="menu-modal-title">{item.name}</h2>

          {item.description && (
            <p className="menu-modal-description">{item.description}</p>
          )}

          {item.price && (
            <p className="menu-modal-price">${item.price}</p>
          )}

          {/* Size/Options section */}
          <div className="menu-modal-section">
            <h3 className="menu-modal-section-title">Size</h3>
            <div className="menu-modal-options">
              <button className="menu-modal-option active">Small</button>
              <button className="menu-modal-option">Medium</button>
              <button className="menu-modal-option">Large</button>
            </div>
          </div>

          {/* Quantity */}
          <div className="menu-modal-section">
            <h3 className="menu-modal-section-title">Quantity</h3>
            <div className="menu-modal-quantity">
              <button className="menu-modal-qty-btn">-</button>
              <span className="menu-modal-qty-value">1</span>
              <button className="menu-modal-qty-btn">+</button>
            </div>
          </div>

          {/* Add to order button */}
          <button className="menu-modal-add-btn">
            Add to Order - ${item.price}
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
