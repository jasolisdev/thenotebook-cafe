"use client";

import React from 'react';
import Link from 'next/link';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'cta';
  fullWidth?: boolean;
  withArrow?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface ButtonElementProps extends BaseProps, React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: never;
}

interface LinkProps extends BaseProps, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
}

export type ButtonProps = ButtonElementProps | LinkProps;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidth = false,
  withArrow = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cafe-tan focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none text-xs uppercase";
  
  // Standard metrics for non-CTA buttons
  const standardMetrics = "px-6 py-3 tracking-widest rounded-lg font-bold active:scale-[0.98]";

  const variants = {
    primary: `${standardMetrics} bg-cafe-black text-cafe-cream hover:bg-cafe-brown shadow-lg shadow-cafe-black/10`,
    secondary: `${standardMetrics} bg-cafe-tan text-white hover:bg-cafe-tan-dark shadow-lg shadow-cafe-tan/20`,
    outline: `${standardMetrics} border-2 border-cafe-black text-cafe-black hover:bg-cafe-black hover:text-cafe-cream bg-transparent`,
    ghost: `${standardMetrics} text-cafe-black hover:bg-cafe-black/5`,
    // CTA variant with specific styling
    cta: "px-8 py-3 tracking-[0.25em] rounded-sm border-2 border-cafe-black font-semibold hover:bg-cafe-black hover:text-cafe-white hover:-translate-y-0.5 hover:shadow-lg shadow-[0_4px_12px_rgba(44,36,32,0.08)] group gap-2 text-cafe-black transition-all duration-300"
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseStyles} ${variants[variant]} ${widthClass} ${className}`;

  const content = (
    <>
      {children}
      {withArrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      )}
    </>
  );

  if ('href' in props && props.href) {
    const { href, ...rest } = props as LinkProps;
    return (
      <Link href={href} className={classes} {...rest}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(props as ButtonElementProps)}>
      {content}
    </button>
  );
};
