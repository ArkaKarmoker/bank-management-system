import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import App from '../App';
import { BankProvider } from '../context/BankContext';

describe('Bank Management System Integration', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const renderApp = (initialRoute = '/') => {
    return render(
      <BankProvider
        initialState={{
          bankName: 'AK Bank',
          appTitle: 'Bank Management System',
          accountHolder: 'Arka Karmoker',
          accountNumber: 'ACC-84920193',
          balance: 2000.00,
          totalDeposited: 2000.00,
          totalWithdrawn: 0.00,
          transactions: [
            {
              id: 'init-1',
              type: 'Deposit',
              amount: 2000.00,
              date: '2026-10-30T10:00:00Z',
              note: 'Initial Deposit',
            },
          ],
        }}
      >
        <MemoryRouter initialEntries={[initialRoute]}>
          <App />
        </MemoryRouter>
      </BankProvider>
    );
  };

  it('renders Dashboard with initial account information and balance cards', () => {
    renderApp('/');

    expect(screen.getAllByText(/AK Bank/i)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Arka Karmoker/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/ACC-84920193/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText('$2,000.00').length).toBeGreaterThan(0);
  });

  it('navigates to Deposit page and completes a deposit', async () => {
    renderApp('/deposit');

    expect(screen.getByRole('heading', { name: /Deposit Funds/i })).toBeInTheDocument();

    const input = screen.getByLabelText(/Amount to Deposit/i);
    const submitBtn = screen.getByRole('button', { name: /Deposit Money/i });

    await userEvent.type(input, '500');
    fireEvent.click(submitBtn);

    expect(await screen.findByRole('status')).toHaveTextContent(/Successfully deposited \$500\.00/i);
    // Header balance should now reflect $2,500.00
    expect(screen.getAllByText('$2,500.00').length).toBeGreaterThan(0);
  });

  it('navigates to Withdraw page and completes withdrawal with modal confirmation', async () => {
    renderApp('/withdraw');

    const input = screen.getByLabelText(/Amount to Withdraw/i);
    const submitBtn = screen.getByRole('button', { name: /Withdraw Money/i });

    await userEvent.type(input, '400');
    fireEvent.click(submitBtn);

    // Modal popup
    expect(await screen.findByRole('dialog')).toBeInTheDocument();
    const confirmBtn = screen.getByRole('button', { name: /Confirm Withdrawal/i });
    fireEvent.click(confirmBtn);

    // Modal closes and success message displays
    expect(await screen.findByRole('status')).toHaveTextContent(/Successfully withdrew \$400\.00/i);
    // Header balance should now reflect $1,600.00
    expect(screen.getAllByText('$1,600.00').length).toBeGreaterThan(0);
  });

  it('displays transaction history and allows filtering by type', async () => {
    renderApp('/transactions');

    expect(screen.getByRole('heading', { name: /Transaction History/i })).toBeInTheDocument();
    expect(screen.getByText('+$2,000.00')).toBeInTheDocument();
    expect(screen.getByText('Initial Deposit')).toBeInTheDocument();

    // Click Withdrawals filter tab (currently 0 withdrawals in initial state)
    const withdrawalsTab = screen.getByRole('button', { name: /Withdrawals \(0\)/i });
    fireEvent.click(withdrawalsTab);

    expect(screen.getByText(/No matching transactions/i)).toBeInTheDocument();
  });

  it('toggles between blank state and 50 populated demo records using navbar modals', async () => {
    renderApp('/');

    // 1. Click "Demo Data" button in navbar
    const populateBtn = screen.getByLabelText(/Populate Demo Data/i);
    fireEvent.click(populateBtn);

    // Populate Modal appears
    const populateModal = screen.getByRole('dialog');
    expect(populateModal).toBeInTheDocument();
    const confirmPopulateBtn = within(populateModal).getByRole('button', { name: /Populate 50 Records/i });
    fireEvent.click(confirmPopulateBtn);

    // Balance should now reflect $12,285.03
    expect(await screen.findAllByText('$12,285.03')).not.toHaveLength(0);

    // 2. Click "Reset" button in navbar
    const resetBtn = screen.getByLabelText(/Reset to Blank Account/i);
    fireEvent.click(resetBtn);

    // Reset Modal appears
    const resetModal = screen.getByRole('dialog');
    expect(resetModal).toBeInTheDocument();
    const confirmResetBtn = within(resetModal).getByRole('button', { name: /Reset to Blank/i });
    fireEvent.click(confirmResetBtn);

    // Balance should now reset to $1,000.00
    expect(await screen.findAllByText('$1,000.00')).not.toHaveLength(0);
  });

  it('persists deposits in localStorage across re-render (simulated page refresh)', async () => {
    const { unmount } = renderApp('/deposit');

    // Deposit $300
    const input = screen.getByLabelText(/Amount to Deposit/i);
    await userEvent.type(input, '300');
    fireEvent.click(screen.getByRole('button', { name: /Deposit Money/i }));

    expect(await screen.findByRole('status')).toHaveTextContent(/Successfully deposited \$300\.00/i);
    expect(screen.getAllByText('$2,300.00').length).toBeGreaterThan(0);

    // Simulate page refresh: unmount and re-render without initial state (reads from localStorage)
    unmount();

    render(
      <BankProvider>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </BankProvider>
    );

    // New render should load $2,300.00 directly from localStorage
    expect(screen.getAllByText('$2,300.00').length).toBeGreaterThan(0);
  });
});
