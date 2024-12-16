import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from './Login';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('Login Component', () => {
  test('renders login form fields and button', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('handles successful login submission', async () => {

    fetch.mockResponseOnce(
      JSON.stringify({ user: { name: 'Test User' } }),
      { status: 200 }
    );
    

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );


    const alertSpy = jest.spyOn(window, 'alert').mockImplementation(() => {});

  
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /login/i }));


    await waitFor(() =>
      expect(fetch).toHaveBeenCalledWith('http://localhost:5000/login', expect.any(Object))
    );

    expect(alertSpy).toHaveBeenCalledWith('Login successful!');

    alertSpy.mockRestore();
  });

  test('shows "Invalid email address" message for wrong email', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ message: 'Invalid email address' }),
      { status: 401 }
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'wrong@example.com' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/invalid email address/i)).toBeInTheDocument();
  });

  test('shows "Invalid password" message for wrong password', async () => {
    fetch.mockResponseOnce(
      JSON.stringify({ message: 'Invalid password' }),
      { status: 401 }
    );

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByText(/login/i));

    expect(await screen.findByText(/invalid password/i)).toBeInTheDocument();
  });
});
