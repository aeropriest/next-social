import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Toggle from './';
import { ThemeProvider } from '@/app/contexts/theme';

// Mock the useTheme hook
jest.mock('@/app/contexts/theme', () => ({
  ...jest.requireActual('@/app/contexts/theme'),
  useTheme: jest.fn(),
}));

describe('Toggle Component', () => {
  it('renders in light mode', () => {
    const mockToggle = jest.fn();
    require('@/app/contexts/theme').useTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggle,
    });

    const { getByTestId } = render(<Toggle />);
    expect(getByTestId('moon-icon')).toBeInTheDocument();
  });

  it('renders in dark mode', () => {
    const mockToggle = jest.fn();
    require('@/app/contexts/theme').useTheme.mockReturnValue({
      isDarkMode: true,
      toggleDarkMode: mockToggle,
    });

    const { getByTestId } = render(<Toggle />);
    expect(getByTestId('sun-icon')).toBeInTheDocument();
  });

  it('calls toggleDarkMode when clicked', () => {
    const mockToggle = jest.fn();
    require('@/app/contexts/theme').useTheme.mockReturnValue({
      isDarkMode: false,
      toggleDarkMode: mockToggle,
    });

    const { getByRole } = render(<Toggle />);
    fireEvent.click(getByRole('button'));
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
});