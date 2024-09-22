import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header'

// Mock the Logo and Toggle components
jest.mock('@/components/Logo/Logo', () => () => <div data-testid="mock-logo">Logo</div>);
jest.mock('@/components/Toggle/Toggle', () => () => <div data-testid="mock-toggle">Toggle</div>);

describe('Header Component', () => {
  it('renders without crashing', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });

  it('contains a Logo component', () => {
    render(<Header />);
    expect(screen.getByTestId('mock-logo')).toBeInTheDocument();
  });

  it('contains a Toggle component', () => {
    render(<Header />);
    expect(screen.getByTestId('mock-toggle')).toBeInTheDocument();
  });

  it('has the correct CSS class', () => {
    render(<Header />);
    expect(screen.getByRole('banner')).toHaveClass('header');
  });

  it('has the correct structure', () => {
    render(<Header />);
    const header = screen.getByRole('banner');
    expect(header.children.length).toBe(2);
    expect(header.children[0]).toContainElement(screen.getByTestId('mock-logo'));
    expect(header.children[1]).toContainElement(screen.getByTestId('mock-toggle'));
  });
});