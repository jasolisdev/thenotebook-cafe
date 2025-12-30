"use client";

import React from 'react';
import Link from 'next/link';

interface BaseProps {
  variant?: 'primary' | 'secondary' | 'brand' | 'outline' | 'ghost' | 'cta' | 'underline';
  size?: 'sm' | 'md' | 'lg';
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
  size = 'md',
  fullWidth = false,
  withArrow = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center gap-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cafe-tan focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none uppercase font-semibold font-sans active:scale-[0.98] group";

  const variants = {
    primary: "bg-cafe-luxe-oat text-cafe-black hover:bg-cafe-toasted-oat shadow-none hover:shadow-sm rounded-none tracking-[0.15em]",
    secondary: "border border-cafe-luxe-oat text-cafe-black hover:bg-cafe-luxe-oat bg-transparent rounded-none tracking-[0.15em]",
    brand: "bg-cafe-brown text-cafe-cream hover:bg-cafe-black shadow-lg shadow-cafe-black/10 rounded-sm",
    outline: "border-2 border-cafe-black text-cafe-black hover:bg-cafe-black hover:text-cafe-cream bg-transparent rounded-none",
    ghost: "text-cafe-black hover:bg-cafe-black/5 rounded-none",
    cta: "relative overflow-hidden bg-cafe-black text-cafe-white hover:bg-cafe-brown hover:-translate-y-0.5 hover:shadow-lg shadow-[0_4px_12px_rgba(44,36,32,0.08)] rounded-none tracking-[0.25em] duration-300",
    underline: "relative bg-transparent border border-cafe-luxe-oat text-cafe-black hover:bg-transparent rounded-none tracking-[0.15em]"
  };

  const sizes = {
    sm: "px-4 py-2 text-2xs",
    md: "px-6 py-3 text-xs",
    lg: "px-8 py-3.5 text-xs"
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseStyles} ${sizes[size]} ${variants[variant]} ${widthClass} ${className}`;

  const isCta = variant === "cta";
  const isUnderline = variant === "underline";
  const content = (
    <>
      <span
        className={[
          isCta ? "relative z-10 flex items-center gap-2" : "flex items-center gap-2",
          isUnderline
            ? "relative after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2 after:bottom-0 after:h-px after:w-full after:bg-cafe-tan after:scale-x-0 after:transition-transform after:duration-300 group-hover:after:scale-x-100 group-focus-visible:after:scale-x-100"
            : ""
        ].join(" ")}
      >
        {children}
        {withArrow && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        )}
      </span>
      {isCta && (
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-cafe-tan opacity-0 transition-opacity duration-300 group-hover:opacity-10"
        />
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
