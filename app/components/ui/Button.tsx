"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cafe-tan focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none px-6 py-3 text-xs tracking-widest uppercase active:scale-[0.98]";

  const variants = {
    primary: "bg-cafe-black text-cafe-cream hover:bg-cafe-brown shadow-lg shadow-cafe-black/10",
    secondary: "bg-cafe-tan text-white hover:bg-[#8e7965] shadow-lg shadow-cafe-tan/20",
    outline: "border-2 border-cafe-black text-cafe-black hover:bg-cafe-black hover:text-cafe-cream bg-transparent",
    ghost: "text-cafe-black hover:bg-cafe-black/5"
  };

  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
