import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Pantallas/Home';
import App from '../App';
import { UserProvider } from '../Hooks/UserContext';

const MockUserContext = ({ children }) => {
  const user = {
    username: 'testUser',
    password: 'testPassword',
    mail: 'test@example.com',
  };

  return (
    <UserProvider value={{ user }}>
      {children}
    </UserProvider>
  );
};

describe.skip('Home Component', () => {
  test('renders user information correctly', () => {
    render(
      <MockUserContext>
        <Home />
      </MockUserContext>
    );

    // expect(screen.getByTestId('USER')).toHaveTextContent('USER: testUser');
    // expect(screen.getByTestId('PASS')).toHaveTextContent('PASS: testPassword');
    // expect(screen.getByTestId('MAIL')).toHaveTextContent('MAIL: test@example.com');
  });
});
