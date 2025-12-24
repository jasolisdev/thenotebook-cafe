import { render, screen, fireEvent, waitFor, userEvent } from '@/tests/utils/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import SiteHeader from '@/app/components/layout/SiteHeader';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
  useRouter: vi.fn(() => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  })),
}));

describe('SiteHeader Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders brand logo and name', () => {
    render(<SiteHeader />);
    expect(screen.getByAltText(/the notebook café logo/i)).toBeInTheDocument();
    expect(screen.getByText(/the notebook/i)).toBeInTheDocument();
    expect(screen.getByText(/café/i)).toBeInTheDocument();
  });

  it('renders main navigation links on desktop', () => {
    render(<SiteHeader />);
    // On desktop links are hidden by md:hidden but present in DOM
    expect(screen.getAllByRole('link', { name: /home/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /menu/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /story/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /contact/i })[0]).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /careers/i })[0]).toBeInTheDocument();
  });

  it('shopping cart buttons are hidden until online ordering launches', () => {
    render(<SiteHeader />);
    // Cart buttons exist in DOM but are hidden until online ordering launches
    const cartButtons = screen.getAllByLabelText(/shopping cart/i);
    expect(cartButtons.length).toBeGreaterThan(0);
    // Both buttons should have hidden class
    cartButtons.forEach((button) => {
      expect(button).toHaveClass('hidden');
    });
  });

  it('toggles mobile menu on hamburger click', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    
    // Get the hamburger button (the one that toggles)
    const toggleButton = screen.getByRole('button', { name: /open menu/i });
    
    await user.click(toggleButton);
    
    // After click, the same button should change label to "Close menu"
    await waitFor(() => {
      const closeButtons = screen.getAllByRole('button', { name: /close menu/i });
      expect(closeButtons.length).toBeGreaterThan(0);
    });
    
    // Drawer should have open class
    const drawers = document.querySelectorAll('.menu-drawer-cinematic');
    expect(drawers[0]).toHaveClass('open');
  });

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<SiteHeader />);
    
    // Open it
    await user.click(screen.getByRole('button', { name: /open menu/i }));
    
    // Close it - use the first available close button (the toggle)
    const closeButton = screen.getAllByRole('button', { name: /close menu/i })[0];
    await user.click(closeButton);
    
    // Button label should revert
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
    });
    
    // Drawer should not have open class
    const drawers = document.querySelectorAll('.menu-drawer-cinematic');
    expect(drawers[0]).not.toHaveClass('open');
  });

  it('applies scrolled styles based on window scroll position', async () => {
    render(<SiteHeader />);
    
    // Initially at top (transparent)
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('data-at-top', 'true');

    // Mock scroll
    Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
    fireEvent.scroll(window);

    // React to scroll (wait for raf/state update)
    await waitFor(() => {
      expect(nav).toHaveAttribute('data-at-top', 'false');
    });
  });
});