import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Pantallas/Home';
import { UserProvider } from '../Hooks/UserContext';

describe.skip('Home Component', () => {
  test('renders user information correctly', () => {
    const user = {
      username: 'testUser',
      password: 'testPassword',
      mail: 'test@example.com',
    };

    render(
      <UserProvider value={{ user }}>
        <Home />
      </UserProvider>
    );

    expect(screen.getByText(`USER: ${user.username}`)).toBeInTheDocument();
    expect(screen.getByText(`PASS: ${user.password}`)).toBeInTheDocument();
    expect(screen.getByText(`MAIL: ${user.mail}`)).toBeInTheDocument();
  });
});
