import React from 'react';
import { ArrowDownLeft, ArrowUpRight } from 'lucide-react';
import { formatCurrency, formatDate } from '../utils/formatters';

/**
 * Reusable component for rendering an individual transaction entry
 * @param {Object} props
 * @param {Object} props.transaction
 * @param {string} props.transaction.id
 * @param {'Deposit'|'Withdrawal'} props.transaction.type
 * @param {number} props.transaction.amount
 * @param {string} props.transaction.date
 * @param {string} [props.transaction.note]
 */
const TransactionItem = ({ transaction }) => {
  const isDeposit = transaction.type === 'Deposit';

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-xs transition-all duration-150 gap-2.5 sm:gap-3">
      <div className="flex items-center space-x-2.5 sm:space-x-3.5 min-w-0 flex-1">
        <div
          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
            isDeposit
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
              : 'bg-rose-50 text-rose-600 border border-rose-100'
          }`}
        >
          {isDeposit ? (
            <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          ) : (
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2 flex-wrap gap-y-0.5">
            <span className="text-xs sm:text-sm font-bold text-slate-800">
              {transaction.type}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                isDeposit
                  ? 'bg-emerald-100/70 text-emerald-800'
                  : 'bg-rose-100/70 text-rose-800'
              }`}
            >
              {isDeposit ? 'Credit' : 'Debit'}
            </span>
          </div>

          {transaction.note ? (
            <div className="mt-0.5 min-w-0 space-y-0.5">
              <p
                className="text-xs font-medium text-slate-600 truncate"
                title={transaction.note}
              >
                {transaction.note}
              </p>
              <p className="text-[11px] text-slate-400">
                {formatDate(transaction.date)}
              </p>
            </div>
          ) : (
            <p className="text-[11px] sm:text-xs text-slate-400 mt-0.5">
              {formatDate(transaction.date)}
            </p>
          )}
        </div>
      </div>

      <div className="text-right flex-shrink-0 pl-1">
        <span
          className={`text-xs sm:text-base font-bold tabular-nums ${
            isDeposit ? 'text-emerald-600' : 'text-rose-600'
          }`}
        >
          {isDeposit ? `+${formatCurrency(transaction.amount)}` : `-${formatCurrency(transaction.amount)}`}
        </span>
      </div>
    </div>
  );
};

export default TransactionItem;
