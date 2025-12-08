import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-display font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed rounded-full shadow-sm hover:shadow-md active:scale-95";
  
  const variants = {
    primary: "bg-latte-900 text-latte-50 hover:bg-latte-800",
    outline: "border-2 border-latte-900 text-latte-900 bg-transparent hover:bg-latte-100",
    ghost: "text-latte-900 hover:bg-latte-100 bg-transparent shadow-none hover:shadow-none",
  };

  const sizes = {
    sm: "text-xs px-4 py-2",
    md: "text-sm px-6 py-3",
    lg: "text-base px-10 py-4",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};