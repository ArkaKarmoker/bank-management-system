import React from 'react';
import TransactionItem from './TransactionItem';
import { History, Inbox } from 'lucide-react';

/**
 * Reusable list component that maps through transactions with conditional empty state
 * @param {Object} props
 * @param {Array} props.transactions
 * @param {number} [props.limit]
 * @param {string} [props.emptyTitle]
 * @param {string} [props.emptyMessage]
 */
const TransactionList = ({
  transactions = [],
  limit,
  emptyTitle = 'No transactions yet',
  emptyMessage = 'Your account history will appear here once you make your first deposit or withdrawal.',
}) => {
  const displayedTransactions = limit ? transactions.slice(0, limit) : transactions;

  // Conditional Rendering: Empty State
  if (!transactions || transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-white rounded-2xl border border-slate-100 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-3.5">
          <Inbox className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-700">{emptyTitle}</h3>
        <p className="mt-1 text-sm text-slate-400 max-w-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {displayedTransactions.map((tx) => (
        <TransactionItem key={tx.id} transaction={tx} />
      ))}
    </div>
  );
};

export default TransactionList;
