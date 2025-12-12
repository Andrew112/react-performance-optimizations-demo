import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Performance Optimization Demo', () => {
  render(<App />);
  const headingElement = screen.getByText(/React Performance Optimization Demo/i);
  expect(headingElement).toBeInTheDocument();
});

test('renders profiler panel', () => {
  render(<App />);
  const panelElement = screen.getByText(/Profiler Panel/i);
  expect(panelElement).toBeInTheDocument();
});
