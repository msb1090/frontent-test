import { describe, expect, it } from 'vitest';
import { render, screen, userEvent } from '../../../../test-utils';
import Login from '../Login';

describe('Login component', () => {
  it('should enable/disable Login button on form validation', async () => {
    render(<Login />);

    const emailElement = screen.getByRole('textbox', {
      name: /email/i,
    });
    const passwordElement = screen.getByLabelText(/password/i);
    const loginElement = screen.getByRole('button', {
      name: /login/i,
    });
    expect(loginElement).not.toBeDisabled();

    await userEvent.clear(emailElement);
    expect(emailElement).toHaveValue('');
    expect(loginElement).toBeDisabled();
    await userEvent.type(emailElement, 'test@email.com');
    expect(emailElement).toHaveValue('test@email.com');
    expect(loginElement).not.toBeDisabled();

    await userEvent.clear(passwordElement);
    expect(passwordElement).toHaveValue('');
    expect(loginElement).toBeDisabled();
    await userEvent.type(passwordElement, 'testpassword');
    expect(passwordElement).toHaveValue('testpassword');
    expect(loginElement).not.toBeDisabled();
  });
});
