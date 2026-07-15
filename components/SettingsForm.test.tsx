import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { SettingsForm } from './SettingsForm';

describe('SettingsForm', () => {
  it('submits successfully for valid input', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/display name/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');
    await user.type(screen.getByLabelText(/bio/i), 'A curious engineer');

    await user.click(screen.getByRole('button', { name: /save settings/i }));

    expect(screen.getByText(/success: your settings have been saved/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /saved/i })).toBeDisabled();
  });

  it('shows the correct error for a name that is too short', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const input = screen.getByLabelText(/display name/i);
    await user.type(input, 'A');
    await user.tab();

    expect(screen.getByText(/display name must be between 2 and 50 characters/i)).toBeInTheDocument();
  });

  it('shows an error when the email is missing', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const input = screen.getByLabelText(/email/i);
    await user.click(input);
    await user.tab();

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });

  it('shows an error for an invalid email format', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const input = screen.getByLabelText(/email/i);
    await user.type(input, 'not-an-email');
    await user.tab();

    expect(screen.getByText(/email must be a valid email address/i)).toBeInTheDocument();
  });

  it('shows an error for a bio that exceeds 200 characters', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const input = screen.getByLabelText(/bio/i);
    await user.type(input, 'x'.repeat(201));
    await user.tab();

    expect(screen.getByText(/bio must be 200 characters or fewer/i)).toBeInTheDocument();
  });

  it('disables the submit button while the form is invalid', async () => {
    render(<SettingsForm />);

    const button = screen.getByRole('button', { name: /save settings/i });
    expect(button).toBeDisabled();
  });

  it('disables the submit button after a valid submit to prevent double submission', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    await user.type(screen.getByLabelText(/display name/i), 'Ada Lovelace');
    await user.type(screen.getByLabelText(/email/i), 'ada@example.com');

    const button = screen.getByRole('button', { name: /save settings/i });
    await user.click(button);

    expect(button).toBeDisabled();
  });

  it('does not show errors while typing and only shows them after blur', async () => {
    const user = userEvent.setup();
    render(<SettingsForm />);

    const input = screen.getByLabelText(/display name/i);
    await user.type(input, 'A');

    expect(screen.queryByText(/display name is required/i)).not.toBeInTheDocument();

    await user.click(screen.getByLabelText(/email/i));
    await user.tab();

    expect(screen.getByText(/email is required/i)).toBeInTheDocument();
  });
});
