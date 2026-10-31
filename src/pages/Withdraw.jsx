import React from 'react';
import { ArrowUpCircle, ArrowLeft, ShieldAlert, Wallet } from 'lucide-react';
import { Link } from 'react-router-dom';
import WithdrawForm from '../components/WithdrawForm';
import BalanceCard from '../components/BalanceCard';
import TransactionList from '../components/TransactionList';
import { useBank } from '../context/BankContext';

const Withdraw = () => {
  const { balance, totalWithdrawn, transactions } = useBank();

  // Filter only withdrawals for the recent sidebar
  const recentWithdrawals = transactions.filter((t) => t.type === 'Withdrawal').slice(0, 3);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <Link
            to="/"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center space-x-3">
            <span>Withdraw Money</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Safely withdraw money from your available balance.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Main Form (2 cols) */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          <WithdrawForm />

          {/* Policy / Guardrail Notice */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 flex items-start space-x-3 text-slate-600 text-xs leading-relaxed">
            <ShieldAlert className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-slate-800">Security & Overdraft Protection:</span> Withdrawals cannot exceed your current balance. Each transaction requires a confirmation modal check to protect against accidental submissions.
            </div>
          </div>
        </div>

        {/* Side Balance Overview & Recent Withdrawals */}
        <div className="space-y-5 sm:space-y-6">
          <BalanceCard
            title="Available Balance"
            amount={balance}
            icon={Wallet}
            variant="indigo"
            subtitle="Maximum amount you can withdraw"
          />

          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-800">Recent Withdrawals</h3>
              <Link to="/transactions" className="text-xs text-indigo-600 font-semibold hover:underline">
                All
              </Link>
            </div>
            
            <TransactionList
              transactions={recentWithdrawals}
              emptyTitle="No withdrawals yet"
              emptyMessage="Withdrawals you make will appear here."
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default Withdraw;
