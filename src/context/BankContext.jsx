import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_50_TRANSACTIONS, 
  TOTAL_DEPOSITED, 
  TOTAL_WITHDRAWN, 
  INITIAL_BALANCE,
  BLANK_STATE,
  DEMO_50_STATE
} from '../data/mockTransactions';

const STORAGE_KEY = 'ak_bank_account_data_v4';

const INITIAL_STATE = {
  bankName: 'AK Bank',
  appTitle: 'Bank Management System',
  accountHolder: 'Arka Karmoker',
  accountNumber: 'ACC-84920193',
  balance: BLANK_STATE.balance,
  totalDeposited: BLANK_STATE.totalDeposited,
  totalWithdrawn: BLANK_STATE.totalWithdrawn,
  transactions: BLANK_STATE.transactions,
};

export const BankContext = createContext(null);

export const BankProvider = ({ children, initialState = null }) => {
  const [accountData, setAccountData] = useState(() => {
    if (initialState) return initialState;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.balance === 'number') {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to read from localStorage:', e);
    }
    return INITIAL_STATE;
  });

  // Sync state to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(accountData));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }, [accountData]);

  /**
   * Deposit Money
   * @param {number|string} rawAmount
   * @param {string} [note]
   * @returns {{ success: boolean, message?: string, error?: string }}
   */
  const deposit = (rawAmount, note = 'Online Deposit') => {
    const amount = parseFloat(rawAmount);

    if (rawAmount === '' || rawAmount === null || rawAmount === undefined || isNaN(amount)) {
      return { success: false, error: 'Please enter a valid deposit amount.' };
    }
    if (amount <= 0) {
      return { success: false, error: 'Deposit amount must be greater than $0.00.' };
    }

    const newTx = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: 'Deposit',
      amount,
      date: new Date().toISOString(),
      note: note.trim() || 'Online Deposit',
    };

    setAccountData((prev) => ({
      ...prev,
      balance: Math.round((prev.balance + amount) * 100) / 100,
      totalDeposited: Math.round((prev.totalDeposited + amount) * 100) / 100,
      transactions: [newTx, ...prev.transactions],
    }));

    return {
      success: true,
      message: `Successfully deposited $${amount.toFixed(2)} to your account.`,
    };
  };

  /**
   * Withdraw Money
   * @param {number|string} rawAmount
   * @param {string} [note]
   * @returns {{ success: boolean, message?: string, error?: string }}
   */
  const withdraw = (rawAmount, note = 'Online Withdrawal') => {
    const amount = parseFloat(rawAmount);

    if (rawAmount === '' || rawAmount === null || rawAmount === undefined || isNaN(amount)) {
      return { success: false, error: 'Please enter a valid withdrawal amount.' };
    }
    if (amount <= 0) {
      return { success: false, error: 'Withdrawal amount must be greater than $0.00.' };
    }
    if (amount > accountData.balance) {
      return {
        success: false,
        error: `Insufficient funds. Your available balance is $${accountData.balance.toFixed(2)}.`,
      };
    }

    const newTx = {
      id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      type: 'Withdrawal',
      amount,
      date: new Date().toISOString(),
      note: note.trim() || 'Online Withdrawal',
    };

    setAccountData((prev) => ({
      ...prev,
      balance: Math.round((prev.balance - amount) * 100) / 100,
      totalWithdrawn: Math.round((prev.totalWithdrawn + amount) * 100) / 100,
      transactions: [newTx, ...prev.transactions],
    }));

    return {
      success: true,
      message: `Successfully withdrew $${amount.toFixed(2)} from your account.`,
    };
  };

  /**
   * Reset account back to clean blank state (1 initial deposit of $1,000.00)
   */
  const resetToBlank = () => {
    setAccountData((prev) => ({
      ...prev,
      balance: BLANK_STATE.balance,
      totalDeposited: BLANK_STATE.totalDeposited,
      totalWithdrawn: BLANK_STATE.totalWithdrawn,
      transactions: BLANK_STATE.transactions,
    }));
  };

  /**
   * Populate account with 50 rich demo transactions
   */
  const populateDemoData = () => {
    setAccountData((prev) => ({
      ...prev,
      balance: DEMO_50_STATE.balance,
      totalDeposited: DEMO_50_STATE.totalDeposited,
      totalWithdrawn: DEMO_50_STATE.totalWithdrawn,
      transactions: DEMO_50_STATE.transactions,
    }));
  };

  /**
   * Reset account alias for backward compatibility
   */
  const resetAccount = resetToBlank;

  return (
    <BankContext.Provider
      value={{
        bankName: accountData.bankName,
        appTitle: accountData.appTitle,
        accountHolder: accountData.accountHolder,
        accountNumber: accountData.accountNumber,
        balance: accountData.balance,
        totalDeposited: accountData.totalDeposited,
        totalWithdrawn: accountData.totalWithdrawn,
        transactions: accountData.transactions,
        deposit,
        withdraw,
        resetAccount,
        resetToBlank,
        populateDemoData,
      }}
    >
      {children}
    </BankContext.Provider>
  );
};

export const useBank = () => {
  const context = useContext(BankContext);
  if (!context) {
    throw new Error('useBank must be used within a BankProvider');
  }
  return context;
};
