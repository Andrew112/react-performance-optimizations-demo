import { render, screen } from '@testing-library/react';
import App from './App';

test('renders React Performance Optimization Demo', () => {
  render(<App />);
  const heading = screen.getByText(/React Performance Optimization Demo/i);
  expect(heading).toBeInTheDocument();
});

test('renders ProfilerPanel component', () => {
  render(<App />);
  const profilerPanel = screen.getByText(/Profiler Panel/i);
  expect(profilerPanel).toBeInTheDocument();
});
