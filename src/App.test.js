import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Performance Optimization Demo heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/React Performance Optimization Demo/i);
  expect(headingElement).toBeInTheDocument();
});
