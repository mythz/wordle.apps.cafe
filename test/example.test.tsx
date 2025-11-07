import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../src/App';

describe('Aloha Wordle App', () => {
  it('should render the app title', () => {
    render(<App />);
    expect(screen.getByText(/Aloha Wordle/i)).toBeInTheDocument();
  });

  it('should render the subtitle', () => {
    render(<App />);
    expect(screen.getByText(/Guess the Hawaiian-vibes word!/i)).toBeInTheDocument();
  });

  it('should render the game board with 6 rows', () => {
    const { container } = render(<App />);
    const rows = container.querySelectorAll('.grid.grid-cols-5');
    expect(rows).toHaveLength(6);
  });

  it('should render the virtual keyboard', () => {
    render(<App />);
    expect(screen.getByText('Q')).toBeInTheDocument();
    expect(screen.getByText('ENTER')).toBeInTheDocument();
    expect(screen.getByText('⌫')).toBeInTheDocument();
  });
});

