import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  it('should render the app title', () => {
    render(<App />);
    expect(screen.getByText('WXT + React')).toBeInTheDocument();
  });

  it('should display initial count as 0', () => {
    render(<App />);
    expect(screen.getByText('count is 0')).toBeInTheDocument();
  });

  it('should increment count when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button', { name: /count is/i });
    await user.click(button);

    expect(screen.getByText('count is 1')).toBeInTheDocument();
  });

  it('should increment count multiple times', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button', { name: /count is/i });
    await user.click(button);
    await user.click(button);
    await user.click(button);

    expect(screen.getByText('count is 3')).toBeInTheDocument();
  });
});
