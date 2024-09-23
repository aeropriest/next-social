// Main.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Main Component', () => {
  test('renders children correctly', () => {
    render(
      <Main>
        <h1>Hello, World!</h1>
      </Main>
    );

    const headingElement = screen.getByRole('heading', {
      name: /hello, world!/i,
    });
    expect(headingElement).toBeInTheDocument();
  });

  test('applies correct class', () => {
    const { container } = render(
      <Main>
        <p>Test paragraph</p>
      </Main>
    );
    expect(container.firstChild).toHaveClass('main');
  });
});
