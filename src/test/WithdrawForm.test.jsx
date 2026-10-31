import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import WithdrawForm from '../components/WithdrawForm';
import { BankProvider } from '../context/BankContext';

describe('WithdrawForm Component', () => {
  const renderWithContext = (ui, balance = 500.00) => {
    return render(
      <BankProvider
        initialState={{
          bankName: 'AK Bank',
          appTitle: 'Bank Management System',
          accountHolder: 'Test User',
          accountNumber: 'ACC-0001',
          balance,
          totalDeposited: balance,
          totalWithdrawn: 0.00,
          transactions: [],
        }}
      >
        {ui}
      </BankProvider>
    );
  };

  it('auto-focuses the withdraw input field on mount using useRef', () => {
    renderWithContext(<WithdrawForm />);
    const input = screen.getByLabelText(/Amount to Withdraw/i);
    expect(document.activeElement).toBe(input);
  });

  it('displays an error message when submitting an empty amount', async () => {
    renderWithContext(<WithdrawForm />);
    const submitBtn = screen.getByRole('button', { name: /Withdraw Money/i });

    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/Please enter a withdrawal amount/i);
  });

  it('displays an error message when submitting zero or negative amount', async () => {
    renderWithContext(<WithdrawForm />);
    const input = screen.getByLabelText(/Amount to Withdraw/i);
    const submitBtn = screen.getByRole('button', { name: /Withdraw Money/i });

    await userEvent.type(input, '-10');
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/greater than \$0\.00/i);
  });

  it('prevents withdrawal greater than available balance', async () => {
    renderWithContext(<WithdrawForm />, 300.00);
    const input = screen.getByLabelText(/Amount to Withdraw/i);
    const submitBtn = screen.getByRole('button', { name: /Withdraw Money/i });

    await userEvent.type(input, '500');
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/Insufficient funds/i);
  });

  it('triggers confirmation modal before withdrawal and completes on confirm', async () => {
    const handleSuccess = vi.fn();
    renderWithContext(<WithdrawForm onWithdrawSuccess={handleSuccess} />, 500.00);

    const input = screen.getByLabelText(/Amount to Withdraw/i);
    const submitBtn = screen.getByRole('button', { name: /Withdraw Money/i });

    await userEvent.type(input, '150');
    fireEvent.click(submitBtn);

    // Confirmation modal should now be visible
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /Confirm Withdrawal/i })).toBeInTheDocument();
    expect(screen.getByText(/\$150\.00/i)).toBeInTheDocument();

    // Click confirm in modal
    const confirmBtn = screen.getByRole('button', { name: /Confirm Withdrawal/i });
    fireEvent.click(confirmBtn);

    // Modal closes and success message shows
    expect(await screen.findByRole('status')).toHaveTextContent(/Successfully withdrew \$150\.00/i);
    expect(input.value).toBe('');
    expect(handleSuccess).toHaveBeenCalledWith(150);
  });

  it('cancels withdrawal when modal Cancel button is clicked', async () => {
    renderWithContext(<WithdrawForm />, 500.00);

    const input = screen.getByLabelText(/Amount to Withdraw/i);
    const submitBtn = screen.getByRole('button', { name: /Withdraw Money/i });

    await userEvent.type(input, '100');
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    const cancelBtn = screen.getByRole('button', { name: /Cancel/i });
    fireEvent.click(cancelBtn);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
