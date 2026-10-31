import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BankProvider, useBank } from '../context/BankContext';

describe('BankContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const wrapper = ({ children }) => (
    <BankProvider
      initialState={{
        bankName: 'AK Bank',
        appTitle: 'Bank Management System',
        accountHolder: 'Test User',
        accountNumber: 'ACC-0001',
        balance: 1000.00,
        totalDeposited: 1000.00,
        totalWithdrawn: 0.00,
        transactions: [],
      }}
    >
      {children}
    </BankProvider>
  );

  it('provides default initial state correctly', () => {
    const { result } = renderHook(() => useBank(), { wrapper });

    expect(result.current.accountHolder).toBe('Test User');
    expect(result.current.balance).toBe(1000.00);
    expect(result.current.totalDeposited).toBe(1000.00);
    expect(result.current.totalWithdrawn).toBe(0.00);
    expect(result.current.transactions).toEqual([]);
  });

  it('deposits money successfully and updates balance and transactions', () => {
    const { result } = renderHook(() => useBank(), { wrapper });

    let response;
    act(() => {
      response = result.current.deposit(250, 'Paycheck');
    });

    expect(response.success).toBe(true);
    expect(result.current.balance).toBe(1250.00);
    expect(result.current.totalDeposited).toBe(1250.00);
    expect(result.current.transactions.length).toBe(1);
    expect(result.current.transactions[0].type).toBe('Deposit');
    expect(result.current.transactions[0].amount).toBe(250);
  });

  it('rejects deposit with zero or negative amounts', () => {
    const { result } = renderHook(() => useBank(), { wrapper });

    let resZero;
    act(() => {
      resZero = result.current.deposit(0);
    });
    expect(resZero.success).toBe(false);
    expect(result.current.balance).toBe(1000.00);

    let resNeg;
    act(() => {
      resNeg = result.current.deposit(-50);
    });
    expect(resNeg.success).toBe(false);
    expect(result.current.balance).toBe(1000.00);
  });

  it('withdraws money successfully and updates balance and debits', () => {
    const { result } = renderHook(() => useBank(), { wrapper });

    let response;
    act(() => {
      response = result.current.withdraw(300, 'Rent');
    });

    expect(response.success).toBe(true);
    expect(result.current.balance).toBe(700.00);
    expect(result.current.totalWithdrawn).toBe(300.00);
    expect(result.current.transactions.length).toBe(1);
    expect(result.current.transactions[0].type).toBe('Withdrawal');
    expect(result.current.transactions[0].amount).toBe(300);
  });

  it('prevents overdraft when withdrawal exceeds available balance', () => {
    const { result } = renderHook(() => useBank(), { wrapper });

    let response;
    act(() => {
      response = result.current.withdraw(1500);
    });

    expect(response.success).toBe(false);
    expect(response.error).toContain('Insufficient funds');
    expect(result.current.balance).toBe(1000.00);
    expect(result.current.transactions.length).toBe(0);
  });

  it('rejects withdrawal with negative or zero amounts', () => {
    const { result } = renderHook(() => useBank(), { wrapper });

    let resZero;
    act(() => {
      resZero = result.current.withdraw(0);
    });
    expect(resZero.success).toBe(false);

    let resNeg;
    act(() => {
      resNeg = result.current.withdraw(-100);
    });
    expect(resNeg.success).toBe(false);
    expect(result.current.balance).toBe(1000.00);
  });

  it('throws an error if useBank is used outside of BankProvider', () => {
    // suppress console.error for expected throw
    const originalError = console.error;
    console.error = () => {};

    expect(() => {
      renderHook(() => useBank());
    }).toThrow('useBank must be used within a BankProvider');

    console.error = originalError;
  });
});
