import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import PasswordGate from '@/app/components/ui/PasswordGate';
import userEvent from '@testing-library/user-event';

// Mock useRouter
const mockRouter = {
  push: vi.fn(),
  refresh: vi.fn(),
};

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
}));

describe('PasswordGate Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders correctly', () => {
    render(<PasswordGate />);
    expect(screen.getByText(/the notebook café/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter site/i })).toBeInTheDocument();
  });

  it('disables submit button initially or when password is empty', () => {
    render(<PasswordGate />);
    const submitButton = screen.getByRole('button', { name: /enter site/i });
    expect(submitButton).toBeDisabled();
  });

  it('enables submit button when password is entered', async () => {
    render(<PasswordGate />);
    const input = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /enter site/i });
    
    await userEvent.type(input, 'password123');
    expect(submitButton).toBeEnabled();
  });

  it('handles successful verification', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: true }),
    });

    render(<PasswordGate />);
    const input = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /enter site/i });
    
    await userEvent.type(input, 'correct-password');
    await userEvent.click(submitButton);

    expect(global.fetch).toHaveBeenCalledWith('/api/auth/verify', expect.objectContaining({
      method: 'POST',
      body: JSON.stringify({ password: 'correct-password' }),
    }));
    
    await waitFor(() => {
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  it('handles incorrect password', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      json: async () => ({ success: false }),
    });

    render(<PasswordGate />);
    const input = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /enter site/i });
    
    await userEvent.type(input, 'wrong-password');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/incorrect password/i)).toBeInTheDocument();
    });
    
    // Password input should be cleared
    expect(input).toHaveValue('');
  });

  it('handles API errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    render(<PasswordGate />);
    const input = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /enter site/i });
    
    await userEvent.type(input, 'any-password');
    await userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('shows loading state during submission', async () => {
    // Delay resolution
    (global.fetch as any).mockImplementationOnce(() => new Promise(resolve => setTimeout(() => resolve({
      json: async () => ({ success: true })
    }), 100)));

    render(<PasswordGate />);
    const input = screen.getByPlaceholderText(/enter password/i);
    const submitButton = screen.getByRole('button', { name: /enter site/i });
    
    await userEvent.type(input, 'password');
    await userEvent.click(submitButton);

    expect(screen.getByRole('button', { name: /verifying/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /verifying/i })).toBeDisabled();
    
    await waitFor(() => {
      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });
});