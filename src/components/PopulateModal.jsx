import React, { useEffect } from 'react';
import { Sparkles, X, Database } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

/**
 * Modern Confirmation Modal for Populating 50 Demo Transactions
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether the modal is visible
 * @param {Function} props.onConfirm - Callback when user confirms population
 * @param {Function} props.onCancel - Callback when user cancels or closes modal
 */
const PopulateModal = ({
  isOpen,
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="populate-modal-title"
    >
      {/* Backdrop click handler */}
      <div 
        className="fixed inset-0" 
        onClick={onCancel} 
        aria-hidden="true" 
      />

      <div className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border border-slate-100 relative z-10 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 sm:space-x-3.5 mb-4 pr-6">
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-200/60 flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <div>
            <h3 id="populate-modal-title" className="text-base sm:text-lg font-bold text-slate-900">
              Populate Demo Data?
            </h3>
            <p className="text-xs text-slate-500">Load 50 realistic transactions for full testing.</p>
          </div>
        </div>

        {/* Info Box */}
        <div className="my-4 bg-slate-50 border border-slate-150 rounded-xl p-3.5 sm:p-4 space-y-2">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-500">Total Transactions:</span>
            <span className="font-bold text-indigo-600">50 records (multi-page)</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-slate-200/60 pt-2">
            <span className="text-slate-500">Total Deposits:</span>
            <span className="font-semibold text-emerald-600">$16,545.00 (20 entries)</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-500">Total Withdrawals:</span>
            <span className="font-semibold text-rose-600">$4,259.97 (30 entries)</span>
          </div>
          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-slate-200/60 pt-2">
            <span className="text-slate-500">Resulting Balance:</span>
            <span className="font-bold text-slate-800">$12,285.03</span>
          </div>
        </div>

        <p className="text-xs text-slate-500 leading-relaxed mb-5 sm:mb-6">
          This will populate your account with 50 diverse banking transactions, enabling you to test modern pagination, filtering by deposits/withdrawals, search, and analytics.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs sm:text-sm hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-700 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01]"
          >
            <Sparkles className="w-4 h-4 text-indigo-200" />
            <span>Populate 50 Records</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopulateModal;
