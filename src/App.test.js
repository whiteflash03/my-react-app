import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {

  test('renders learn react link', () => {
    render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
  });

  test('renders hello world message from Jenkins', () => {
    render(<App />);
    const message = screen.getByText(/hello world from jenkins/i);
    expect(message).toBeInTheDocument();
  });

});