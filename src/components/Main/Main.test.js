// Main.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main'; // Adjust the import path as necessary

describe('Main Component', () => {
  test('renders children correctly', () => {
    render(
      <Main>
        <h1>Hello, World!</h1>
      </Main>
    );

    // Check if the child element is rendered
    const headingElement = screen.getByRole('heading', { name: /hello, world!/i });
    expect(headingElement).toBeInTheDocument();
  });

  test('applies correct class', () => {
    const { container } = render(
      <Main>
        <p>Test paragraph</p>
      </Main>
    );

    // Check if the main class is applied correctly
    expect(container.firstChild).toHaveClass('main'); // Adjust based on your styles.module.scss
  });
});