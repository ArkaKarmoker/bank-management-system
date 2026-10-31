import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, CheckCircle2, AlertCircle, DollarSign, Tag, ShieldCheck } from 'lucide-react';
import { useBank } from '../context/BankContext';
import { formatCurrency } from '../utils/formatters';
import ConfirmModal from './ConfirmModal';

const WithdrawForm = ({ onWithdrawSuccess, requireConfirmation = true }) => {
  const { withdraw, balance } = useBank();

  // State management
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingAmount, setPendingAmount] = useState(0);

  // Bonus Task: useRef to focus on the amount input
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the amount input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const validate = () => {
    setError('');
    setSuccessMessage('');

    if (!amount || amount.trim() === '') {
      setError('Please enter a withdrawal amount.');
      inputRef.current?.focus();
      return null;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Withdrawal amount must be greater than $0.00.');
      inputRef.current?.focus();
      return null;
    }

    if (numericAmount > balance) {
      setError(`Insufficient funds. Your available balance is ${formatCurrency(balance)}.`);
      inputRef.current?.focus();
      return null;
    }

    return numericAmount;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const validAmount = validate();
    if (!validAmount) return;

    if (requireConfirmation) {
      // Trigger Bonus confirmation modal
      setPendingAmount(validAmount);
      setShowConfirmModal(true);
    } else {
      executeWithdrawal(validAmount);
    }
  };

  const executeWithdrawal = (withdrawAmount) => {
    const result = withdraw(withdrawAmount, note);

    if (result.success) {
      setSuccessMessage(result.message);
      setAmount('');
      setNote('');
      setShowConfirmModal(false);
      if (onWithdrawSuccess) {
        onWithdrawSuccess(withdrawAmount);
      }
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setError(result.error || 'Failed to complete withdrawal.');
      setShowConfirmModal(false);
    }
  };

  const handlePercentageClick = (percentage) => {
    if (balance <= 0) return;
    const computed = (balance * percentage).toFixed(2);
    setAmount(computed);
    setError('');
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8">
        <div className="flex items-center space-x-3 mb-5 sm:mb-6">
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0">
            <ArrowUpCircle className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900">Withdraw Funds</h2>
            <p className="text-xs text-slate-500">
              Withdraw money from your balance. Available:{' '}
              <span className="font-semibold text-slate-700">{formatCurrency(balance)}</span>
            </p>
          </div>
        </div>

        {/* Success Notification */}
        {successMessage && (
          <div
            role="status"
            className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start space-x-3 animate-in fade-in"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Withdrawal Complete!</p>
              <p className="text-xs text-emerald-700 mt-0.5">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage('')}
              className="text-emerald-600 hover:text-emerald-800 text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Error Notification */}
        {error && (
          <div
            role="alert"
            className="mb-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-start space-x-3 animate-in fade-in"
          >
            <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1 text-sm">
              <p className="font-semibold">Withdrawal Error</p>
              <p className="text-xs text-rose-700 mt-0.5">{error}</p>
            </div>
            <button
              onClick={() => setError('')}
              className="text-rose-600 hover:text-rose-800 text-xs font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
          {/* Withdrawal Amount Input */}
          <div>
            <label htmlFor="withdraw-amount" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Amount to Withdraw <span className="text-rose-500">*</span>
            </label>
            <div className="relative rounded-xl shadow-xs group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-600 transition-colors">
                <DollarSign className="w-5 h-5" />
              </div>
              <input
                ref={inputRef}
                id="withdraw-amount"
                name="withdraw-amount"
                type="number"
                step="any"
                min="0.01"
                max={balance}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (error) setError('');
                }}
                placeholder="0.00"
                className="block w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 text-slate-900 text-lg font-semibold placeholder:text-slate-300 transition-all shadow-xs"
              />
            </div>
          </div>

          {/* Quick Balance Shortcuts */}
          <div>
            <span className="text-xs font-medium text-slate-500 block mb-2">Quick Select:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => handlePercentageClick(0.25)}
                className="py-2 px-2 text-center rounded-lg text-xs font-semibold bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-colors"
              >
                25%
              </button>
              <button
                type="button"
                onClick={() => handlePercentageClick(0.50)}
                className="py-2 px-2 text-center rounded-lg text-xs font-semibold bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-colors"
              >
                50%
              </button>
              <button
                type="button"
                onClick={() => handlePercentageClick(0.75)}
                className="py-2 px-2 text-center rounded-lg text-xs font-semibold bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-colors"
              >
                75%
              </button>
              <button
                type="button"
                onClick={() => handlePercentageClick(1.0)}
                className="py-2 px-2 text-center rounded-lg text-xs font-semibold bg-slate-50 hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-colors"
              >
                All Funds (100%)
              </button>
            </div>
          </div>

          {/* Optional Note / Purpose Input */}
          <div>
            <label htmlFor="withdraw-note" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Reason / Memo (Optional)
            </label>
            <div className="relative rounded-xl shadow-xs group">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-rose-600 transition-colors">
                <Tag className="w-4 h-4" />
              </div>
              <input
                id="withdraw-note"
                type="text"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Rent, Groceries, Utilities, Travel"
                className="block w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-rose-500 focus:ring-4 focus:ring-rose-500/15 text-sm text-slate-800 placeholder:text-slate-300 transition-all shadow-xs"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-slate-400" />
            <span>Withdrawals require a security confirmation dialog.</span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md shadow-rose-600/20 hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <ArrowUpCircle className="w-5 h-5" />
            <span>Withdraw Money</span>
          </button>
        </form>
      </div>

      {/* Confirmation Modal (Bonus Task) */}
      <ConfirmModal
        isOpen={showConfirmModal}
        amount={pendingAmount}
        currentBalance={balance}
        onConfirm={() => executeWithdrawal(pendingAmount)}
        onCancel={() => setShowConfirmModal(false)}
      />
    </>
  );
};

export default WithdrawForm;
