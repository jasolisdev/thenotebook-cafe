import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import FadeInSection from '@/app/components/ui/FadeInSection';
import * as hooks from '@/app/hooks/useOnScreen';

describe('FadeInSection Component', () => {
  it('renders children correctly', () => {
    render(<FadeInSection><div data-testid="child">Hello</div></FadeInSection>);
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('initially has fade-up class and not visible', () => {
    // Mock isVisible as false
    vi.spyOn(hooks, 'useOnScreen').mockReturnValue([{ current: null }, false]);
    
    const { container } = render(<FadeInSection>Content</FadeInSection>);
    const element = container.firstChild as HTMLElement;
    
    expect(element).toHaveClass('fade-up');
    expect(element).not.toHaveClass('visible');
  });

  it('adds visible class when useOnScreen returns true', () => {
    // Mock isVisible as true
    vi.spyOn(hooks, 'useOnScreen').mockReturnValue([{ current: null }, true]);
    
    const { container } = render(<FadeInSection>Content</FadeInSection>);
    const element = container.firstChild as HTMLElement;
    
    expect(element).toHaveClass('fade-up');
    expect(element).toHaveClass('visible');
  });

  it('applies custom delay style', () => {
    render(<FadeInSection delay="500ms">Content</FadeInSection>);
    const element = screen.getByText('Content');
    expect(element.style.transitionDelay).toBe('500ms');
  });

  it('merges custom className', () => {
    render(<FadeInSection className="custom-class">Content</FadeInSection>);
    const element = screen.getByText('Content');
    expect(element).toHaveClass('fade-up');
    expect(element).toHaveClass('custom-class');
  });
});
