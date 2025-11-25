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
    imageUrl?: string;
  } | null;
};

export default function MenuItemModal({ isOpen, onClose, item }: MenuItemModalProps) {
  const [mounted, setMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Drink customization state
  const [size, setSize] = useState("12 oz");
  const [temperature, setTemperature] = useState("Hot");
  const [milk, setMilk] = useState("Whole Milk");
  const [syrup, setSyrup] = useState("None");
  const [coldFoam, setColdFoam] = useState(false);
  const [extraShot, setExtraShot] = useState(false);
  const [sweetener, setSweetener] = useState("Regular");

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle modal animation and scroll lock
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;

      // Trigger animation after a brief delay
      setTimeout(() => setIsAnimating(true), 10);

      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
    } else {
      setIsAnimating(false);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);

      // Restore scroll position
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    };
  }, [isOpen, onClose]);

  if (!mounted || !isOpen || !item) return null;

  // Check if item is a drink
  const isDrink = item.section === "drinks" || item.section === "seasonal";

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`menu-modal-backdrop ${isAnimating ? 'is-visible' : ''}`}
        onClick={onClose}
      />

      {/* Modal - Now scrollable */}
      <div
        className={`menu-modal-container ${isAnimating ? 'is-visible' : ''}`}
        onClick={onClose}
      >
        <div
          className="menu-modal"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Image */}
          <div className="menu-modal-image">
            <Image
              src={item.imageUrl || "/unsplash/dark-coffee.png"}
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

          {/* Drink-specific options */}
          {isDrink && (
            <>
              {/* Size */}
              <div className="menu-modal-section">
                <h3 className="menu-modal-section-title">Size</h3>
                <div className="menu-modal-options">
                  <button
                    className={`menu-modal-option ${size === "12 oz" ? "active" : ""}`}
                    onClick={() => setSize("12 oz")}
                  >
                    12 oz
                  </button>
                  <button
                    className={`menu-modal-option ${size === "16 oz" ? "active" : ""}`}
                    onClick={() => setSize("16 oz")}
                  >
                    16 oz
                  </button>
                </div>
              </div>

              {/* Temperature */}
              <div className="menu-modal-section">
                <h3 className="menu-modal-section-title">Temperature</h3>
                <div className="menu-modal-options">
                  <button
                    className={`menu-modal-option ${temperature === "Hot" ? "active" : ""}`}
                    onClick={() => setTemperature("Hot")}
                  >
                    Hot
                  </button>
                  <button
                    className={`menu-modal-option ${temperature === "Iced" ? "active" : ""}`}
                    onClick={() => setTemperature("Iced")}
                  >
                    Iced
                  </button>
                </div>
              </div>

              {/* Milk */}
              <div className="menu-modal-section">
                <h3 className="menu-modal-section-title">Milk</h3>
                <div className="menu-modal-options menu-modal-options-wrap">
                  <button
                    className={`menu-modal-option ${milk === "Whole Milk" ? "active" : ""}`}
                    onClick={() => setMilk("Whole Milk")}
                  >
                    Whole
                  </button>
                  <button
                    className={`menu-modal-option ${milk === "Almond" ? "active" : ""}`}
                    onClick={() => setMilk("Almond")}
                  >
                    Almond
                  </button>
                  <button
                    className={`menu-modal-option ${milk === "Oat" ? "active" : ""}`}
                    onClick={() => setMilk("Oat")}
                  >
                    Oat
                  </button>
                  <button
                    className={`menu-modal-option ${milk === "Soy" ? "active" : ""}`}
                    onClick={() => setMilk("Soy")}
                  >
                    Soy
                  </button>
                  <button
                    className={`menu-modal-option ${milk === "Coconut" ? "active" : ""}`}
                    onClick={() => setMilk("Coconut")}
                  >
                    Coconut
                  </button>
                </div>
              </div>

              {/* Syrup Flavor */}
              <div className="menu-modal-section">
                <h3 className="menu-modal-section-title">Syrup Flavor</h3>
                <div className="menu-modal-options menu-modal-options-wrap">
                  <button
                    className={`menu-modal-option ${syrup === "None" ? "active" : ""}`}
                    onClick={() => setSyrup("None")}
                  >
                    None
                  </button>
                  <button
                    className={`menu-modal-option ${syrup === "Vanilla" ? "active" : ""}`}
                    onClick={() => setSyrup("Vanilla")}
                  >
                    Vanilla
                  </button>
                  <button
                    className={`menu-modal-option ${syrup === "Caramel" ? "active" : ""}`}
                    onClick={() => setSyrup("Caramel")}
                  >
                    Caramel
                  </button>
                  <button
                    className={`menu-modal-option ${syrup === "Hazelnut" ? "active" : ""}`}
                    onClick={() => setSyrup("Hazelnut")}
                  >
                    Hazelnut
                  </button>
                  <button
                    className={`menu-modal-option ${syrup === "Mocha" ? "active" : ""}`}
                    onClick={() => setSyrup("Mocha")}
                  >
                    Mocha
                  </button>
                </div>
              </div>

              {/* Add-ons */}
              <div className="menu-modal-section">
                <h3 className="menu-modal-section-title">Add-ons</h3>
                <div className="menu-modal-options menu-modal-options-wrap">
                  <button
                    className={`menu-modal-option ${coldFoam ? "active" : ""}`}
                    onClick={() => setColdFoam(!coldFoam)}
                  >
                    Cold Foam
                  </button>
                  <button
                    className={`menu-modal-option ${extraShot ? "active" : ""}`}
                    onClick={() => setExtraShot(!extraShot)}
                  >
                    Extra Shot
                  </button>
                </div>
              </div>

              {/* Sweetener */}
              <div className="menu-modal-section">
                <h3 className="menu-modal-section-title">Sweetener</h3>
                <div className="menu-modal-options menu-modal-options-wrap">
                  <button
                    className={`menu-modal-option ${sweetener === "Regular" ? "active" : ""}`}
                    onClick={() => setSweetener("Regular")}
                  >
                    Regular
                  </button>
                  <button
                    className={`menu-modal-option ${sweetener === "Sugar-Free" ? "active" : ""}`}
                    onClick={() => setSweetener("Sugar-Free")}
                  >
                    Sugar-Free
                  </button>
                  <button
                    className={`menu-modal-option ${sweetener === "No Sugar" ? "active" : ""}`}
                    onClick={() => setSweetener("No Sugar")}
                  >
                    No Sugar
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Quantity */}
          <div className="menu-modal-section">
            <h3 className="menu-modal-section-title">Quantity</h3>
            <div className="menu-modal-quantity">
              <button className="menu-modal-qty-btn">-</button>
              <span className="menu-modal-qty-value">1</span>
              <button className="menu-modal-qty-btn">+</button>
            </div>
          </div>

          {/* Action buttons - Close and Add to Order */}
          <div className={`menu-modal-actions ${isAnimating ? 'is-visible' : ''}`}>
            <button
              className="menu-modal-close-btn"
              onClick={onClose}
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <button className="menu-modal-add-btn">
              Add to Order - ${item.price}
            </button>
          </div>
        </div>
        </div>
      </div>
    </>,
    document.body
  );
}
