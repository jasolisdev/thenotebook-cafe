import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import SiteFooter from '@/app/components/layout/SiteFooter';

describe('SiteFooter Component', () => {
  it('renders brand signature', () => {
    render(<SiteFooter />);
    expect(screen.getByText(/the notebook café/i)).toBeInTheDocument();
  });

  it('renders all social links with correct aria-labels', () => {
    render(<SiteFooter />);
    expect(screen.getByLabelText(/email us/i)).toHaveAttribute('href', 'mailto:thenotebookcafellc@gmail.com');
    expect(screen.getByLabelText(/yelp/i)).toHaveAttribute('href', 'https://yelp.com');
    expect(screen.getByLabelText(/tiktok/i)).toHaveAttribute('href', 'https://tiktok.com/@thenotebookcafe');
    expect(screen.getByLabelText(/instagram/i)).toHaveAttribute('href', 'https://www.instagram.com/thenotebookcafellc/');
  });

  it('renders legal links', () => {
    render(<SiteFooter />);
    expect(screen.getByRole('link', { name: /terms/i })).toHaveAttribute('href', '/terms');
    expect(screen.getByRole('link', { name: /policy/i })).toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: /refunds/i })).toHaveAttribute('href', '/refunds');
  });

  it('renders current year in copyright', () => {
    render(<SiteFooter />);
    const currentYear = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(currentYear))).toBeInTheDocument();
    expect(screen.getByText(/handcrafted with care/i)).toBeInTheDocument();
  });
});