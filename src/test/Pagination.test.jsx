import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import Transactions from '../pages/Transactions';
import { BankProvider } from '../context/BankContext';

describe('Transaction Smart Pagination', () => {
  const generateMockTransactions = (count) => {
    return Array.from({ length: count }, (_, i) => ({
      id: `mock-tx-${i + 1}`,
      type: i % 2 === 0 ? 'Deposit' : 'Withdrawal',
      amount: (i + 1) * 50,
      date: new Date(Date.now() - i * 3600000).toISOString(),
      note: `Transaction ${i + 1}`,
    }));
  };

  const renderTransactionsPage = (mockTransactions) => {
    return render(
      <BankProvider
        initialState={{
          bankName: 'AK Bank',
          appTitle: 'Bank Management System',
          accountHolder: 'Arka Karmoker',
          accountNumber: 'ACC-84920193',
          balance: 5000.00,
          totalDeposited: 5000.00,
          totalWithdrawn: 0.00,
          transactions: mockTransactions,
        }}
      >
        <MemoryRouter initialEntries={['/transactions']}>
          <Transactions />
        </MemoryRouter>
      </BankProvider>
    );
  };

  it('does NOT render pagination controls when transactions count is 5 or fewer', () => {
    renderTransactionsPage(generateMockTransactions(4));

    expect(screen.queryByRole('button', { name: /Previous page/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /Next page/i })).not.toBeInTheDocument();
    expect(screen.queryByText(/Showing 1 to/i)).not.toBeInTheDocument();
  });

  it('renders smart pagination controls when transactions count exceeds 5', () => {
    renderTransactionsPage(generateMockTransactions(8));

    // Shows 5 items on page 1
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 5')).toBeInTheDocument();
    expect(screen.queryByText('Transaction 6')).not.toBeInTheDocument();

    // Pagination controls visible
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Next page/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Previous page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Next page/i })).not.toBeDisabled();
    expect(screen.getByText(/transactions/i, { selector: 'p' })).toHaveTextContent('Showing 1 to 5 of 8 transactions');
  });

  it('navigates to next page on clicking Next or page number button', async () => {
    renderTransactionsPage(generateMockTransactions(8));

    const nextBtn = screen.getByRole('button', { name: /Next page/i });
    fireEvent.click(nextBtn);

    // Page 2 should now display transactions 6 to 8
    expect(screen.getByText('Transaction 6')).toBeInTheDocument();
    expect(screen.getByText('Transaction 8')).toBeInTheDocument();
    expect(screen.queryByText('Transaction 1')).not.toBeInTheDocument();

    // Next button should now be disabled on last page
    expect(screen.getByRole('button', { name: /Next page/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /Previous page/i })).not.toBeDisabled();
  });

  it('navigates back to previous page on clicking Previous button', async () => {
    renderTransactionsPage(generateMockTransactions(8));

    // Go to page 2
    fireEvent.click(screen.getByRole('button', { name: /Next page/i }));
    expect(screen.getByText('Transaction 6')).toBeInTheDocument();

    // Click Previous
    fireEvent.click(screen.getByRole('button', { name: /Previous page/i }));
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
  });

  it('resets to page 1 when search query changes', async () => {
    renderTransactionsPage(generateMockTransactions(8));

    // Go to page 2
    fireEvent.click(screen.getByRole('button', { name: /Next page/i }));
    expect(screen.getByText('Transaction 6')).toBeInTheDocument();

    // Type in search
    const searchInput = screen.getByPlaceholderText(/Search by note/i);
    await userEvent.type(searchInput, 'Transaction 1');

    // Should automatically reset to page 1 and show matching result
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.queryByText('Transaction 6')).not.toBeInTheDocument();
  });

  it('updates items per page and recalculates pagination when entries dropdown changes', async () => {
    renderTransactionsPage(generateMockTransactions(50));

    // Initially showing 1 to 5 of 50
    expect(screen.getByText(/transactions/i, { selector: 'p' })).toHaveTextContent('Showing 1 to 5 of 50 transactions');
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 5')).toBeInTheDocument();
    expect(screen.queryByText('Transaction 6')).not.toBeInTheDocument();

    // Change dropdown to 10
    const dropdown = screen.getByLabelText(/Show number of entries/i);
    fireEvent.change(dropdown, { target: { value: '10' } });

    // Now showing 1 to 10 of 50
    expect(screen.getByText(/transactions/i, { selector: 'p' })).toHaveTextContent('Showing 1 to 10 of 50 transactions');
    expect(screen.getByText('Transaction 1')).toBeInTheDocument();
    expect(screen.getByText('Transaction 10')).toBeInTheDocument();
    expect(screen.queryByText('Transaction 11')).not.toBeInTheDocument();
  });

  it('displays modern pagination with ellipsis (...) when total pages exceed 7', () => {
    renderTransactionsPage(generateMockTransactions(50)); // 50 items / 5 = 10 pages

    // On page 1: should show 1, 2, 3, 4, 5, ..., 10
    expect(screen.getByRole('button', { name: /^Go to page 1$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Go to page 5$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Go to page 10$/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Go to page 6$/i })).not.toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();

    // Jump to page 10: should show 1, ..., 6, 7, 8, 9, 10
    fireEvent.click(screen.getByRole('button', { name: /^Go to page 10$/i }));
    expect(screen.getByRole('button', { name: /^Go to page 1$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Go to page 6$/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^Go to page 10$/i })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /^Go to page 2$/i })).not.toBeInTheDocument();
    expect(screen.getByText('...')).toBeInTheDocument();
  });
});
