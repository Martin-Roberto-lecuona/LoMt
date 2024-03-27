import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Profile from '../Pantallas/Profile';
import { UserProvider } from '../Hooks/UserContext';
import { useState } from 'react'

const MockUserContext = ({ children }) => {
  const [user, setUser] = useState({
    username: 'valid1',
    password: 'Passw0rd!',
    mail: 'okMail@example.com',
  });

  return (
    <UserProvider value={{ user, setUser }}>
      {children}
    </UserProvider>
  );
};
describe('Profile default data', () => { 
  test('Renders User', () => {
    render(
      <MockUserContext>
          <Profile />       
      </MockUserContext>
    );
    const emailInput = screen.getByLabelText('E-mail:');
    const userInput = screen.getByLabelText('Username:');
    const passwordInput = screen.getByLabelText('Password:');
    expect(1).toBe(1);

  });
 })
describe('Profile Inputs tests', () => {
  test('Checking valid email', () => {
    render(
      <MockUserContext>
          <Profile />       
      </MockUserContext>
    );
    const emailInput = screen.getByLabelText('E-mail:');
    // right
    fireEvent.change(emailInput, { target: { value: 'okMail@example.com' } });
    expect(screen.getByTestId('right-mail')).toBeInTheDocument();

    // wrong
    fireEvent.change(emailInput, { target: { value: 'wrongMail@' } });
    expect(screen.getByTestId('wrong-mail')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: '@' } });
    expect(screen.getByTestId('wrong-mail')).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: 'wrongMail@example' } });
    expect(screen.getByTestId('wrong-mail')).toBeInTheDocument();
  });

  test('Checking valid UserName', () => {
    render(
      <MockUserContext>
          <Profile />       
      </MockUserContext>
    );
    const userInput = screen.getByLabelText('Username:');

    // right
    fireEvent.change(userInput, { target: { value: 'usu1' } });
    expect(screen.getByTestId('right-username')).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: 'usuario' } });
    expect(screen.getByTestId('right-username')).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: 'u1234567890123456789012' } });
    expect(screen.getByTestId('right-username')).toBeInTheDocument();

    // wrong
    fireEvent.change(userInput, { target: { value: '1' } });
    expect(screen.getByTestId('wrong-username')).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: 'ab' } });
    expect(screen.getByTestId('wrong-username')).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: 'abc' } });
    expect(screen.getByTestId('wrong-username')).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: 'u123456789012345678901234' } });
    expect(screen.getByTestId('wrong-username')).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: '123456' } });
    expect(screen.getByTestId('wrong-username')).toBeInTheDocument();
  });

  test('Checking valid Password', () => {
    render(
      <MockUserContext>
          <Profile />       
      </MockUserContext>
    );
    const passwordInput = screen.getByLabelText('Password:');
  
    // right
    fireEvent.change(passwordInput, { target: { value: 'Passw0rd!' } });
    expect(screen.getByTestId('right-password')).toBeInTheDocument();
  
    fireEvent.change(passwordInput, { target: { value: '#Password123' } });
    expect(screen.getByTestId('right-password')).toBeInTheDocument();
  
    // wrong
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    expect(screen.getByTestId('wrong-password')).toBeInTheDocument();
  
    fireEvent.change(passwordInput, { target: { value: 'PASSWORD' } });
    expect(screen.getByTestId('wrong-password')).toBeInTheDocument();
  
    fireEvent.change(passwordInput, { target: { value: 'Passw0rd' } });
    expect(screen.getByTestId('wrong-password')).toBeInTheDocument();
  
    fireEvent.change(passwordInput, { target: { value: 'Passw0rd' } });
    expect(screen.getByTestId('wrong-password')).toBeInTheDocument();
  
    fireEvent.change(passwordInput, { target: { value: 'P@ssword!' } });
    expect(screen.getByTestId('wrong-password')).toBeInTheDocument();
  
    fireEvent.change(passwordInput, { target: { value: 'Passw0rdLongerThan24Characters!' } });
    expect(screen.getByTestId('wrong-password')).toBeInTheDocument();
  });
  
  test('Checking valid Confirm Password', () => {
    render(
      <MockUserContext>
          <Profile />       
      </MockUserContext>
    );
    const passwordInput = screen.getByLabelText('Password:');
    const confirmPasswordInput = screen.getByLabelText('Confirm Password:');
    
    // right
    fireEvent.change(passwordInput, { target: { value: 'Passw0rd!' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Passw0rd!' } });
    expect(screen.getByTestId('right-confirm-password')).toBeInTheDocument();
  
    // wrong
    fireEvent.change(passwordInput, { target: { value: '#Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '#Password12' } });
    expect(screen.getByTestId('wrong-confirm-password')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: '#Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: '#Password123a' } });
    expect(screen.getByTestId('wrong-confirm-password')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: '#Password123' } });
    fireEvent.change(confirmPasswordInput, { target: { value: 'Password123a' } });
    expect(screen.getByTestId('wrong-confirm-password')).toBeInTheDocument();
  });
});
test.skip('FAIL', () => {
  expect(1).toBe(2)
});