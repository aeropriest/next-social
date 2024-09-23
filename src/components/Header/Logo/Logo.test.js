import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Logo from './Logo';

// Mock the CSS module
jest.mock('./styles.module.scss', () => ({
  container: 'mock-container',
  left: 'mock-left',
  right: 'mock-right',
}));

describe('Logo Component', () => {
  beforeEach(() => {
    render(<Logo />);
  });

  it('renders without crashing', () => {
    expect(screen.getByText('Next')).toBeInTheDocument();
    expect(screen.getByText('Social')).toBeInTheDocument();
  });

  it('has the correct structure', () => {
    const container = screen.getByTestId('logo-container');
    expect(container).toHaveClass('mock-container');
    expect(container.children.length).toBe(2);
  });

  it('renders "Next" in the left div', () => {
    const leftDiv = screen.getByText('Next').closest('div');
    expect(leftDiv).toHaveClass('mock-left');
  });

  it('renders "Social" in the right div', () => {
    const rightDiv = screen.getByText('Social').closest('div');
    expect(rightDiv).toHaveClass('mock-right');
  });

  it('applies correct classes to the elements', () => {
    const container = screen.getByTestId('logo-container');
    expect(container).toHaveClass('mock-container');
    expect(screen.getByText('Next').closest('div')).toHaveClass('mock-left');
    expect(screen.getByText('Social').closest('div')).toHaveClass('mock-right');
  });
});