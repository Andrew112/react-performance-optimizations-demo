import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Performance Optimization Demo', () => {
  render(<App />);
  const titleElement = screen.getByText(/React Performance Optimization Demo/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders Profiler Panel', () => {
  render(<App />);
  const panelElement = screen.getByText(/Profiler Panel/i);
  expect(panelElement).toBeInTheDocument();
});
