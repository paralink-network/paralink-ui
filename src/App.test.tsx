import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App';

describe('App', () => {
  test('renders the page', () => {
    render(<App />);
    const linkElement = screen.getByText(/Paralink Network/i);
    expect(linkElement).toBeInTheDocument();
  });
});
