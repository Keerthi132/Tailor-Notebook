import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page', () => {
  render(<App />);
  const loginElement = screen.getByText(/login/i); // Check for the login text
  expect(loginElement).toBeInTheDocument();
});

test('renders register page', () => {
  render(<App />);
  const registerLink = screen.getByText(/register/i); // Check for the register link
  expect(registerLink).toBeInTheDocument();
});
