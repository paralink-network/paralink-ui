import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders the page', () => {
    render(<App />);
    const linkElement = screen.getByText('Login into your account');
    expect(linkElement).toBeInTheDocument();
  });
});
