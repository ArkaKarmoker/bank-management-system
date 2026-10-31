import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import DepositForm from '../components/DepositForm';
import { BankProvider } from '../context/BankContext';

describe('DepositForm Component', () => {
  const renderWithContext = (ui, initialState = null) => {
    return render(
      <BankProvider
        initialState={
          initialState || {
            bankName: 'AK Bank',
            appTitle: 'Bank Management System',
            accountHolder: 'Test User',
            accountNumber: 'ACC-0001',
            balance: 500.00,
            totalDeposited: 500.00,
            totalWithdrawn: 0.00,
            transactions: [],
          }
        }
      >
        {ui}
      </BankProvider>
    );
  };

  it('auto-focuses the deposit input field on mount using useRef', () => {
    renderWithContext(<DepositForm />);
    const input = screen.getByLabelText(/Amount to Deposit/i);
    expect(document.activeElement).toBe(input);
  });

  it('displays an error message when submitting an empty amount', async () => {
    renderWithContext(<DepositForm />);
    const submitBtn = screen.getByRole('button', { name: /Deposit Money/i });

    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/Please enter a deposit amount/i);
  });

  it('displays an error message when submitting zero or negative amount', async () => {
    renderWithContext(<DepositForm />);
    const input = screen.getByLabelText(/Amount to Deposit/i);
    const submitBtn = screen.getByRole('button', { name: /Deposit Money/i });

    await userEvent.type(input, '0');
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('alert')).toHaveTextContent(/greater than \$0\.00/i);
  });

  it('completes deposit successfully with valid amount and shows success message', async () => {
    const handleSuccess = vi.fn();
    renderWithContext(<DepositForm onDepositSuccess={handleSuccess} />);

    const input = screen.getByLabelText(/Amount to Deposit/i);
    const noteInput = screen.getByLabelText(/Description/i);
    const submitBtn = screen.getByRole('button', { name: /Deposit Money/i });

    await userEvent.type(input, '200');
    await userEvent.type(noteInput, 'Birthday Gift');
    fireEvent.click(submitBtn);

    const successAlert = await screen.findByRole('status');
    expect(successAlert).toHaveTextContent(/Successfully deposited \$200\.00/i);
    expect(input.value).toBe('');
    expect(handleSuccess).toHaveBeenCalledWith(200);
  });

  it('updates amount when quick add chips are clicked', async () => {
    renderWithContext(<DepositForm />);
    const quick100 = screen.getByRole('button', { name: /^\+\$100$/i });
    const input = screen.getByLabelText(/Amount to Deposit/i);

    fireEvent.click(quick100);
    expect(parseFloat(input.value)).toBe(100);

    fireEvent.click(quick100);
    expect(parseFloat(input.value)).toBe(200);
  });
});
