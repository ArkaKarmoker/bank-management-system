import React, { useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

const ConfirmModal = ({
  isOpen,
  title = 'Confirm Withdrawal',
  amount = 0,
  currentBalance = 0,
  onConfirm,
  onCancel,
}) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const numAmount = parseFloat(amount) || 0;
  const newBalance = Math.max(0, currentBalance - numAmount);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 sm:space-x-3.5 mb-4 pr-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-amber-50 text-amber-600 border border-amber-150 flex items-center justify-center flex-shrink-0">
            <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 id="confirm-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
              {title}
            </h3>
            <p className="text-xs text-slate-500">Please review transaction details before proceeding.</p>
          </div>
        </div>

        <div className="my-4 sm:my-5 bg-slate-50 border border-slate-150 rounded-xl p-3.5 sm:p-4 space-y-2.5">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Withdrawal Amount:</span>
            <span className="font-bold text-rose-600 text-base">{formatCurrency(numAmount)}</span>
          </div>
          <div className="flex justify-between items-center text-sm border-t border-slate-200/60 pt-2">
            <span className="text-slate-500">Current Balance:</span>
            <span className="font-semibold text-slate-700">{formatCurrency(currentBalance)}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">Remaining Balance:</span>
            <span className="font-bold text-emerald-600">{formatCurrency(newBalance)}</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 mb-5 sm:mb-6">
          Are you sure you want to withdraw this amount from your account? This action will update your balance immediately.
        </p>

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-rose-600 text-white font-semibold text-sm hover:bg-rose-700 shadow-md shadow-rose-600/20 transition-all hover:scale-[1.01]"
          >
            Confirm Withdrawal
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
