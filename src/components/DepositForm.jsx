import React, { useState, useRef, useEffect } from 'react';
import { ArrowDownCircle, CheckCircle2, AlertCircle, DollarSign, Tag } from 'lucide-react';
import { useBank } from '../context/BankContext';
import { formatCurrency } from '../utils/formatters';

const QUICK_AMOUNTS = [50, 100, 250, 500, 1000];

const DepositForm = ({ onDepositSuccess }) => {
  const { deposit, balance } = useBank();
  
  // State management
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Bonus Task: useRef to focus on the amount input
  const inputRef = useRef(null);

  useEffect(() => {
    // Focus the amount input on component mount
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // Validation: prevent empty, zero, or negative amounts
    if (!amount || amount.trim() === '') {
      setError('Please enter a deposit amount.');
      inputRef.current?.focus();
      return;
    }

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid deposit amount greater than $0.00.');
      inputRef.current?.focus();
      return;
    }

    setIsSubmitting(true);

    const result = deposit(numericAmount, note);

    if (result.success) {
      setSuccessMessage(result.message);
      setAmount('');
      setNote('');
      if (onDepositSuccess) {
        onDepositSuccess(numericAmount);
      }
      // Re-focus the input after successful deposit
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setError(result.error || 'Failed to complete deposit.');
    }

    setIsSubmitting(false);
  };

  const handleQuickAdd = (val) => {
    const current = parseFloat(amount) || 0;
    const updated = current + val;
    setAmount(updated.toFixed(2));
    setError('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 sm:p-8">
      <div className="flex items-center space-x-3 mb-5 sm:mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
          <ArrowDownCircle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">Deposit Funds</h2>
          <p className="text-xs text-slate-500">
            Add money securely to your account. Current balance: <span className="font-semibold text-slate-700">{formatCurrency(balance)}</span>
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
            <p className="font-semibold">Deposit Successful!</p>
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
            <p className="font-semibold">Deposit Error</p>
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

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Deposit Amount Input */}
        <div>
          <label htmlFor="deposit-amount" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Amount to Deposit <span className="text-rose-500">*</span>
          </label>
          <div className="relative rounded-xl shadow-xs group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
              <DollarSign className="w-5 h-5" />
            </div>
            <input
              ref={inputRef}
              id="deposit-amount"
              name="deposit-amount"
              type="number"
              step="any"
              min="0.01"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                if (error) setError('');
              }}
              placeholder="0.00"
              className="block w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 text-slate-900 text-lg font-semibold placeholder:text-slate-300 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Quick Amount Helper Chips */}
        <div>
          <span className="text-xs font-medium text-slate-500 block mb-2">Quick Add:</span>
          <div className="grid grid-cols-5 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
            {QUICK_AMOUNTS.map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handleQuickAdd(val)}
                className="py-2 px-1 sm:px-3 sm:py-1.5 rounded-lg text-xs font-semibold text-center bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 border border-slate-200 hover:border-emerald-200 transition-colors"
              >
                +${val}
              </button>
            ))}
          </div>
        </div>

        {/* Optional Note / Purpose Input */}
        <div>
          <label htmlFor="deposit-note" className="block text-sm font-semibold text-slate-700 mb-1.5">
            Description / Reference (Optional)
          </label>
          <div className="relative rounded-xl shadow-xs group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-600 transition-colors">
              <Tag className="w-4 h-4" />
            </div>
            <input
              id="deposit-note"
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Salary, Client payment, Savings"
              className="block w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/15 text-sm text-slate-800 placeholder:text-slate-300 transition-all shadow-xs"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-[0.99] flex items-center justify-center space-x-2"
        >
          <ArrowDownCircle className="w-5 h-5" />
          <span>Deposit Money</span>
        </button>
      </form>
    </div>
  );
};

export default DepositForm;
