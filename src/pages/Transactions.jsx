import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  History, 
  ArrowLeft, 
  Search, 
  Filter, 
  ArrowDownLeft, 
  ArrowUpRight,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useBank } from '../context/BankContext';
import TransactionList from '../components/TransactionList';
import { formatCurrency } from '../utils/formatters';

const ITEMS_PER_PAGE = 5;

/**
 * Generates modern pagination items with ellipsis (e.g. [1, 2, 3, 4, '...', 10])
 */
const getPaginationRange = (currentPage, totalPages) => {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - 1, 1);
  const rightSibling = Math.min(currentPage + 1, totalPages);

  const shouldShowLeftDots = leftSibling > 2;
  const shouldShowRightDots = rightSibling < totalPages - 1;

  if (!shouldShowLeftDots && shouldShowRightDots) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (shouldShowLeftDots && !shouldShowRightDots) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  if (shouldShowLeftDots && shouldShowRightDots) {
    return [1, '...', leftSibling, currentPage, rightSibling, '...', totalPages];
  }

  return Array.from({ length: totalPages }, (_, i) => i + 1);
};

const Transactions = () => {
  const { transactions, totalDeposited, totalWithdrawn } = useBank();
  const [filterType, setFilterType] = useState('ALL'); // 'ALL' | 'Deposit' | 'Withdrawal'
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(ITEMS_PER_PAGE);
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when filtering or searching
  useEffect(() => {
    setCurrentPage(1);
  }, [filterType, searchQuery]);

  // Filter and search transactions
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesType =
        filterType === 'ALL' ? true : tx.type === filterType;
      
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === '' ||
        tx.type.toLowerCase().includes(query) ||
        (tx.note && tx.note.toLowerCase().includes(query)) ||
        tx.amount.toString().includes(query);

      return matchesType && matchesSearch;
    });
  }, [transactions, filterType, searchQuery]);

  // Smart Pagination calculations
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTransactions = useMemo(() => {
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, startIndex, itemsPerPage]);

  const paginationRange = useMemo(() => {
    return getPaginationRange(currentPage, totalPages);
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 sm:gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-2.5 sm:space-x-3">
            <History className="w-6 h-6 sm:w-7 sm:h-7 text-indigo-600 flex-shrink-0" />
            <span>Transaction History</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Complete record of your deposits and withdrawals.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:space-x-2 w-full sm:w-auto">
          <Link
            to="/deposit"
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
          >
            <ArrowDownLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Deposit</span>
          </Link>
          <Link
            to="/withdraw"
            className="inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            <span>Withdraw</span>
          </Link>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-4">
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Records</p>
            <p className="text-lg sm:text-xl font-bold text-slate-800">{transactions.length}</p>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 text-slate-500">
            <History className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-emerald-600 uppercase tracking-wider">Total Credited</p>
            <p className="text-lg sm:text-xl font-bold text-slate-800">{formatCurrency(totalDeposited)}</p>
          </div>
          <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
            <ArrowDownLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
        <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-slate-100 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] sm:text-xs font-semibold text-rose-600 uppercase tracking-wider">Total Debited</p>
            <p className="text-lg sm:text-xl font-bold text-slate-800">{formatCurrency(totalWithdrawn)}</p>
          </div>
          <div className="p-2 rounded-lg bg-rose-50 text-rose-600">
            <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-2.5 sm:p-4 rounded-2xl border border-slate-100 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5 sm:gap-4">
        {/* Type Filter Buttons */}
        <div className="grid grid-cols-3 sm:flex sm:items-center gap-1 sm:space-x-1.5 p-1 bg-slate-100/80 rounded-xl w-full md:w-auto min-h-[38px]">
          <button
            type="button"
            onClick={() => setFilterType('ALL')}
            className={`min-h-[34px] px-1.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center transition-all ${
              filterType === 'ALL'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-indigo-700'
            }`}
          >
            All ({transactions.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('Deposit')}
            className={`min-h-[34px] px-1.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center transition-all ${
              filterType === 'Deposit'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            Deposits ({transactions.filter((t) => t.type === 'Deposit').length})
          </button>
          <button
            type="button"
            onClick={() => setFilterType('Withdrawal')}
            className={`min-h-[34px] px-1.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-bold flex items-center justify-center transition-all ${
              filterType === 'Withdrawal'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-rose-700'
            }`}
          >
            Withdrawals ({transactions.filter((t) => t.type === 'Withdrawal').length})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-sm h-10 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by note, type or amount..."
            className="h-full w-full pl-9 pr-3 text-xs rounded-xl border border-slate-200 bg-white hover:border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/15 placeholder:text-slate-400 text-slate-800 transition-all shadow-xs"
          />
        </div>
      </div>

      {/* Transaction List with Conditional Rendering */}
      <div className="space-y-4 sm:space-y-5">
        <TransactionList
          transactions={paginatedTransactions}
          emptyTitle={
            searchQuery || filterType !== 'ALL'
              ? 'No matching transactions'
              : 'No transactions found'
          }
          emptyMessage={
            searchQuery || filterType !== 'ALL'
              ? 'Try adjusting your search query or filter selection.'
              : 'Your transactions will appear here as soon as you deposit or withdraw funds.'
          }
        />

        {/* Smart Pagination Controls: shown if total count > 5 or multiple pages */}
        {(filteredTransactions.length > 5 || totalPages > 1) && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4 pt-4 border-t border-slate-200/80">
            {/* Left: Show Entries Dropdown & Counter */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-3 w-full sm:w-auto">
              <div className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
                <span>Show</span>
                <select
                  id="entries-per-page"
                  aria-label="Show number of entries"
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="h-8 px-2 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 hover:border-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 cursor-pointer shadow-2xs transition-all"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>entries</span>
              </div>

              <span className="text-slate-300 select-none">|</span>

              <p className="text-xs text-slate-500 font-medium text-center sm:text-left">
                Showing <span className="font-bold text-slate-700">{filteredTransactions.length === 0 ? 0 : startIndex + 1}</span> to{' '}
                <span className="font-bold text-slate-700">
                  {Math.min(startIndex + itemsPerPage, filteredTransactions.length)}
                </span>{' '}
                of <span className="font-bold text-slate-700">{filteredTransactions.length}</span> transactions
              </p>
            </div>

            {/* Right: Modern Pagination Buttons with Ellipsis */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-1 sm:space-x-1.5 w-full sm:w-auto max-w-full overflow-x-auto py-1">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  aria-label="Previous page"
                  className="inline-flex items-center justify-center h-8 px-2 sm:px-3 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline ml-1">Previous</span>
                </button>

                {/* Page Numbers & Ellipsis */}
                <div className="flex items-center space-x-1 flex-shrink-0">
                  {paginationRange.map((item, idx) => {
                    if (item === '...') {
                      return (
                        <span
                          key={`dots-${idx}`}
                          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs font-bold text-slate-400 select-none tracking-widest"
                          aria-hidden="true"
                        >
                          ...
                        </span>
                      );
                    }

                    const pageNum = Number(item);
                    return (
                      <button
                        key={pageNum}
                        type="button"
                        onClick={() => setCurrentPage(pageNum)}
                        aria-label={`Go to page ${pageNum}`}
                        aria-current={currentPage === pageNum ? 'page' : undefined}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                          currentPage === pageNum
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  aria-label="Next page"
                  className="inline-flex items-center justify-center h-8 px-2 sm:px-3 rounded-lg text-xs font-semibold border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex-shrink-0"
                >
                  <span className="hidden sm:inline mr-1">Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};

export default Transactions;
