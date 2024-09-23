import React from 'react';
import { render, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/theme/ThemeContext';

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

Object.defineProperty(window, 'matchMedia', {
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  })),
});

const TestComponent = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  return (
    <div>
      <span data-testid="mode">{isDarkMode ? 'Dark' : 'Light'}</span>
      <button onClick={toggleDarkMode}>Toggle</button>
    </div>
  );
};

describe('ThemeProvider', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with light mode when no theme is stored', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('mode')).toHaveTextContent('Light');
  });

  it('should initialize with dark mode when dark theme is stored', () => {
    localStorageMock.getItem.mockReturnValueOnce('dark');
    const { getByTestId } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('mode')).toHaveTextContent('Dark');
  });

  it('should toggle theme when button is clicked', () => {
    localStorageMock.getItem.mockReturnValueOnce(null);
    const { getByTestId, getByRole } = render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );
    expect(getByTestId('mode')).toHaveTextContent('Light');
    act(() => {
      getByRole('button').click();
    });
    expect(getByTestId('mode')).toHaveTextContent('Dark');
  });
});
